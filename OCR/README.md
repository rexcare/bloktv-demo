# OCR-based-Ad-Detection

This project process a video to detect Ads in a specified platform.

## Usage

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/tahayass/OCR-based-Ad-Detection.git
    cd OCR-based-Ad-Detection
    ```

2. **Create Conda Environment:**
    ```bash
    conda env create -f environment.yml
    conda activate Ads-OCR
    ```

3. **Run the Script:**
    ```bash
    python live_detction.py --platform <platform_name> --config_path <path_to_config_json> --output_path <output_video_path>
    ```

   Replace `<platform_name>`, `<path_to_config_json>`, and `<output_directory>` with your specific values.

   Example:
    ```bash
    python live_detection.py --platform Netflix --config_path path/to/config.json --output_path path/to/output.mp4
    ```

## Command Line Arguments

- `--platform`: Name of the platform.
- `--config_path`: Path to the configuration JSON file.
- `--output_path`: Path to the output video.

## Configuration Parameters

The configuration file should have the following parameters:

- `threshold`: An integer (default: 5) - The threshold value to consider a frame a black frame.
- `num_consecutive_frames`: An integer (default: 5) - Number of consecutive black frames detected to signal a black screen.
- `message_frames`: An integer (default: 50) - Number of frames to display a message.
- `num_skip_frames`: An integer (default: 3) - Number of frames to skip for ocr detection.
- `analysis_frame_shape`: A list [width, height] (default: [1280, 720]) - The shape of the frame for ocr detection (reduced from original shape to improve detection speed).
- `numbers_frames_to_wait`: An integer (default: 30) - Number of frames to wait before signaling a start or an end of a commercial.
- `show_fps`: A boolean (default: true) - show fps in the output video.
- `save_demo`: A boolean (default: true) - save demonstration video.
- `ocr_detector`: A string (default: "easyocr") - The chosen ocr detector ("easyocr" or "paddleocr").
- `wait_for_black_screen`: A boolean (default: false) - Wait for a black screen to start checking for commercials.
- `monitor`: An integer (default: 1) - Number of the monitor to process.

  ## Platform Parameters
  
  To add a platform you should add a platform in the json file the following parameters:
  
  - `Indicator`: This attribute determines what trigger a frame to be considered as an Ad frame.
  The indicator has 2 parameters: (Note: for now, this project works with only one bounding box)
      - `bboxes`: A list [bbox] - A list of bounding boxes to extract the region of interest (the values for the bounding box [left,top,right,bottom], the values are relative to the shape of the frame).
      - `Keywords`: A list [str] - Keywords to look for in the ROI.
  
  
