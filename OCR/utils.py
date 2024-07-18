import cv2
import numpy as np
import re
import json

def draw_text_rectangles(image, detections):
    for detection in detections:
        bounding_box, text, _ = detection
        top_left = tuple(map(int, bounding_box[0]))
        bottom_right = tuple(map(int, bounding_box[2]))

        # Draw the bounding box
        image = cv2.rectangle(image, top_left, bottom_right, (255, 0, 0), 2)

        text_width, text_height = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 1)[0]
        text_x = top_left[0] + (bottom_right[0] - top_left[0] - text_width) // 2
        text_y = bottom_right[1] + 30

        font = cv2.FONT_HERSHEY_SIMPLEX
        font_scale = 0.75
        font_color = (255, 0, 0)
        line_type = 1
        
        #Draw text
        image = cv2.putText(image, text, (text_x, text_y), font, font_scale, font_color, line_type)

    return image


def filter_results_by_confidence(results, confidence_threshold):
    filtered_results = []

    for detection in results:
        bounding_box, text, confidence = detection

        if confidence >= confidence_threshold:
            filtered_results.append(detection)

    return filtered_results


def check_for_black_screen(frame, threshold):
    return np.mean(frame) <= threshold


def extract_text_with_ad_and_time(results):
    ad_detections = []

    for detection in results: 
        ad_match = re.search(f'\bAd\b', detection[1], flags=re.IGNORECASE)
        if ad_match:
            ad_text = ad_match.group(0)
            ad_seconds = None
            time_match = re.search(r'\b(\d+)\b', detection[1])
            if time_match:
                ad_seconds = int(time_match.group(1))
            ad_detections.append((detection, ad_seconds))

    return ad_detections

def extract_text_with_keywords_and_time(results, keywords):
    keyword_detections = []

    for detection in results:
        for keyword in keywords:
            keyword_match = re.search(rf'\b{re.escape(keyword)}\b', detection[1], flags=re.IGNORECASE)
            if keyword_match:
                keyword_text = keyword_match.group(0)
                keyword_seconds = None
                time_match = re.search(r'\b(\d+)\b', detection[1])
                if time_match:
                    keyword_seconds = int(time_match.group(1))
                keyword_detections.append((detection, keyword_seconds))

    return keyword_detections

def load_conf(json_file_path):
    try:
        with open(json_file_path, 'r') as json_file:
            variables_dict = json.load(json_file)

        return variables_dict

    except FileNotFoundError:
        print(f"Error: File not found - {json_file_path}")
        return None
    except json.JSONDecodeError:
        print(f"Error: Unable to decode JSON in the file - {json_file_path}")
        return None
    
def adjust_bbox(ocr_detections,x_offset,y_offset,original_shape,analysis_frame_shape):

    adjusted_results = []
    for (bbox, text, prob) in [ocr_detections]:
        x1, y1, x2, y2 = bbox
        x1[0] = int((x1[0] + x_offset) * (original_shape[0]/analysis_frame_shape[0]))
        x2[0] = int((x2[0] + x_offset) * (original_shape[0]/analysis_frame_shape[0]))
        y1[0] = int((y1[0] + x_offset) * (original_shape[0]/analysis_frame_shape[0]))
        y2[0] = int((y2[0] + x_offset) * (original_shape[0]/analysis_frame_shape[0]))

        x1[1] = int((x1[1] + y_offset) * (original_shape[1]/analysis_frame_shape[1]))
        x2[1] = int((x2[1] + y_offset) * (original_shape[1]/analysis_frame_shape[1]))
        y1[1] = int((y1[1] + y_offset) * (original_shape[1]/analysis_frame_shape[1]))
        y2[1] = int((y2[1] + y_offset) * (original_shape[1]/analysis_frame_shape[1]))


        adjusted_bbox = [x1,y1,x2,y2]
        adjusted_results.append((adjusted_bbox, text, prob))

    return adjusted_results

def extract_ROI(frame, bounding_box):
    """
    Extracts a region of interest (ROI) from the given frame based on the specified bounding box.

    Parameters:
    - frame: The input frame (image).
    - bounding_box: A tuple representing the bounding box (left, top, right, bottom) as values between 0 and 1.

    Returns:
    - cropped_frame: The cropped frame within the bounding box.
    - x_offset: The x-coordinate offset of the bounding box.
    - y_offset: The y-coordinate offset of the bounding box.
    """
    height, width, _ = frame.shape

    left, top, right, bottom = bounding_box
    left_pixel = int(left * width)
    top_pixel = int(top * height)
    right_pixel = int(right * width)
    bottom_pixel = int(bottom * height)

    cropped_frame = frame[top_pixel:bottom_pixel, left_pixel:right_pixel]

    x_offset = left_pixel
    y_offset = top_pixel

    return cropped_frame, x_offset, y_offset

def draw_bounding_box(frame, bounding_box, color, thickness=2):
    """
    Draws a bounding box on the input frame.

    Parameters:
    - frame: The input frame (image).
    - bounding_box: A tuple representing the bounding box (left, top, right, bottom) as values between 0 and 1.
    - color: Color of the bounding box outline in BGR format. Default is green.
    - thickness: Thickness of the bounding box outline. Default is 2.

    Returns:
    - frame_with_bbox: The frame with the bounding box drawn.
    """
    frame_with_bbox = frame.copy()

    height, width, _ = frame.shape

    left, top, right, bottom = bounding_box
    left_pixel = int(left * width)
    top_pixel = int(top * height)
    right_pixel = int(right * width)
    bottom_pixel = int(bottom * height)

    cv2.rectangle(frame_with_bbox, (left_pixel, top_pixel), (right_pixel, bottom_pixel), color, thickness)

    return frame_with_bbox



