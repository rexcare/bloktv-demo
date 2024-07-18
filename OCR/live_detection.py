from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import request
import threading
import time
import requests
import signal
import os
from queue import Queue
import cv2
import numpy as np
from mss import mss
from utils import extract_ROI, extract_text_with_keywords_and_time, draw_text_rectangles, check_for_black_screen, load_conf, adjust_bbox, draw_bounding_box
from ocr import apply_ocr, apply_ocr_mthreaded, load_easyocr
from dataclass import FrameProcessingFlags, load_platform_data, load_frame_processing_variables_from_json
	
app = Flask(__name__)
CORS(app)

# Define Queue for ocr thread
results_queue = Queue()
filtered_results = None

ocr_object = load_easyocr()

Conf = load_frame_processing_variables_from_json(json_file_path='conf.json')

flags = FrameProcessingFlags(tmp_numbers_frames_to_wait=Conf.numbers_frames_to_wait)

current_platform = 'All'
platform = load_platform_data(current_platform)

frame_number = 0
message_frames_count = 0
consecutive_black_frames = 0

color_ROI = (0, 255, 0)

sct = mss()

mode_lock = threading.Lock()

mode = 'NONE'
state = 'OFF'

def send_start_signal():
    print('======= COMMERCIAL STARTED =======')

def send_end_signal():
    print('======= COMMERCIAL ENDED =======')

def runtime_loop():
    global frame_number, message_frames_count, consecutive_black_frames, filtered_results, mode, state, color_ROI
    ocr_thread = threading.Thread(target=apply_ocr_mthreaded, args=(None, None, None,))

    start_time = time.time()

    vidObj = cv2.VideoCapture('admix.mp4')   
    success = 1

    terminate_run = 0

    while True:
        if terminate_run:
            print("terminate")
        
        success, image = vidObj.read()
        if not success:
            break
        frame = np.array(image)
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        analysis_frame = cv2.resize(frame, Conf.analysis_frame_shape, interpolation=cv2.INTER_LINEAR)

        # Acquire lock to print the current mode and state
        with mode_lock:
            mode_colors = {
                'Replacement': (0, 255, 255),
                'Auto-Mute': (0, 0, 255),
                'Screensaver Mode': (255, 0, 0),
                'Word of the Day': (255, 255, 0),
                'Jokes': (255, 0, 255),
                'Trivia': (200, 200, 200),
                'Daily Devotion': (200, 200, 0)
            }
            if state == 'OFF':
                color_ROI = (0, 255, 0) # default green
            elif state == 'ON':
                color_ROI = mode_colors.get(mode, (255, 255, 255))  # if mode is not found

        # Highlight ROI
        if flags.check_for_commercial:
            frame = draw_bounding_box(frame, platform.indicator.bboxes[0], color_ROI)

        # Perform OCR if black screen is detected (works for Netflix)
        if (frame_number % Conf.num_skip_frames == 0) & flags.check_for_commercial & (Conf.numbers_frames_to_wait > 0):
            if Conf.ocr_detector == "easyocr":
                analysis_frame = cv2.cvtColor(analysis_frame, cv2.COLOR_BGR2RGB)

            corner, x_offset, y_offset = extract_ROI(analysis_frame, platform.indicator.bboxes[0])

            # Start OCR thread
            if not ocr_thread.is_alive():
                ocr_thread = threading.Thread(target=apply_ocr_mthreaded, args=(corner, ocr_object, results_queue,))
                ocr_thread.start()

            # Process OCR results when available
            if not results_queue.empty():
                filtered_results = results_queue.get()
                if filtered_results != None:
                    #filter text to look for reference words
                    ad_detection = extract_text_with_keywords_and_time(filtered_results, platform.indicator.keywords)

                    # Correct the bounding box coordinates to fit the original image
                    if len(ad_detection) != 0:
                        adjusted_results = adjust_bbox(ad_detection[0][0], x_offset, y_offset, original_shape=(1920, 1080), analysis_frame_shape=Conf.analysis_frame_shape)

                    # Look for the Ad indicator and wait for a set number of frames before disengaging OCR
                    if len(ad_detection) != 0:
                        flags.commercial = True
                        if not flags.commercial_start:
                            flags.commercial_start = True
                            send_start_signal()  # This signals the start of the commercial

                        flags.tmp_numbers_frames_to_wait = Conf.numbers_frames_to_wait
                    else:
                        flags.commercial = False
                        flags.tmp_numbers_frames_to_wait -= Conf.num_skip_frames

        # Highlight Ad indicator
        if flags.commercial:
            frame = draw_text_rectangles(frame, adjusted_results)

        if flags.tmp_numbers_frames_to_wait <= 0:
            if Conf.wait_for_black_screen:
                flags.check_for_commercial = False
            else:
                flags.check_for_commercial = True

            flags.black_screen_detected = False
            flags.tmp_numbers_frames_to_wait = Conf.numbers_frames_to_wait

            if flags.commercial_start:
                flags.commercial_end = True
                flags.commercial_start = False
                send_end_signal()  # This signals the end of the commercial
                flags.commercial_end = False

        # Check for a black screen
        if Conf.wait_for_black_screen:
            if check_for_black_screen(frame, Conf.threshold) & (not flags.black_screen_detected):
                consecutive_black_frames += 1
            else:
                consecutive_black_frames = 0

            if consecutive_black_frames >= Conf.num_consecutive_frames:
                flags.black_screen_detected = True

            if flags.black_screen_detected:
                flags.check_for_commercial = True
                consecutive_black_frames = 0
        else:
            flags.check_for_commercial = True

        ####################################### DISPLAY MESSAGES AND INFORMATION ##################################################

        # Display "Potential Commercial Starting" message
        if (message_frames_count < Conf.message_frames) & flags.black_screen_detected & (not flags.commercial_start):
            font = cv2.FONT_HERSHEY_SIMPLEX
            font_scale = 0.5
            font_color = (255, 255, 255)
            line_type = 2
            message = "Potential Commercial (Black screen)"
            text_position = (20, 40)
            cv2.putText(frame, message, text_position, font, font_scale, font_color, line_type)
            message_frames_count += 1
        else:
            message_frames_count = 0

        if flags.check_for_commercial:
            if flags.commercial:
                font = cv2.FONT_HERSHEY_SIMPLEX
                font_scale = 0.5
                font_color = (255, 255, 255)
                line_type = 2
                cv2.putText(frame, "Commercial Detected", (20, 70), font, font_scale, font_color, line_type)
                try:
                    cv2.putText(frame, f"Ad ends in {ad_detection[0][1]}s", (20, 100), font, font_scale, font_color, line_type)
                except:
                    pass

        # Update the progress bar
        #pbar.update(1)

        if Conf.show_fps:
            # Calculate FPS and draw it on the frame
            frame_height, frame_width, _ = frame.shape
            # Define the position for the FPS text (bottom left corner)
            text_position = (10, frame_height - 50)
            # Calculate FPS and draw it on the frame every n frames
            if frame_number % 12 == 0:
                end_time = time.time()
                elapsed_time = end_time - start_time
                fps = 12 / elapsed_time
                start_time = end_time
            fps_text = f"FPS: {fps:.2f}"
            cv2.putText(frame, fps_text, text_position, cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        ####################################### DISPLAY MESSAGES AND INFORMATION ##################################################
        # Display the processed frame
        cv2.imshow('Output', cv2.resize(frame, (1280, 720))) 
        frame_number += 1
	
		
        # Break the loop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            print("exiting......")
            os.system('killall pt_main_thread')
            break

    # Release the VideoWriter and cleanup	
    cv2.destroyAllWindows()


@app.route('/trigger', methods=['POST'])
def trigger():
    data = request.get_json()
    global mode, state

    # Acquire lock to update mode and state
    with mode_lock:
        new_mode = data.get('mode')
        replacement_state = data.get('state')
        mode_on = data.get('isOn')
        state = 'ON' if replacement_state or mode_on else 'OFF'
        mode = 'Replacement' if new_mode is None else new_mode
        mode = 'Auto-Mute' if mode == 'Replacement' and replacement_state else mode
        
        print(f"Mode: {mode}, State: {state}")

    return jsonify({"message": f"{mode} state updated to {state}"}), 200


if __name__ == '__main__':
    runtime_thread = threading.Thread(target=runtime_loop)
    runtime_thread.daemon = True
    runtime_thread.start()
    app.run(port=5050)

