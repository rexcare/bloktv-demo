from dataclasses import dataclass, field
from typing import List
import json

@dataclass
class PlatformIndicator:
    bboxes: List[List[float]]
    keywords: List[str] = field(default_factory=list)

@dataclass
class PlatformData:
    indicator: PlatformIndicator

@dataclass
class FrameProcessingFlags:
    black_screen_detected: bool = False
    commercial: bool = False
    tmp_commercial: bool = False
    tmp_numbers_frames_to_wait: int = 30
    check_for_commercial: bool = False
    commercial_start: bool = False
    commercial_end: bool = False

@dataclass
class FrameProcessingConfiguration:
    threshold: int = 5
    num_consecutive_frames: int = 5
    message_frames: int = 25
    num_skip_frames: int = 5
    frame_number: int = 0
    analysis_frame_shape: tuple = (1280, 720)
    consecutive_black_frames: int = 0
    message_frames_count: int = 0
    numbers_frames_to_wait: int = 50
    show_fps: bool = True
    save_demo: bool = False
    ocr_detector: str = "easyocr"
    wait_for_black_screen: bool = False
    monitor: int = 1


def load_platform_data(platform_name):
    with open('platforms.json') as f:
        data = json.load(f)

    platform_data = data.get(platform_name)
    if platform_data:
        indicator_data = platform_data.get('Indicator', {})
        bboxes = indicator_data.get('bboxes', [[]])
        keywords = indicator_data.get('Keywords', [])
        platform_indicator = PlatformIndicator(bboxes=bboxes, keywords=keywords)

        return PlatformData(indicator=platform_indicator)
    else:
        raise ValueError(f"No data found for the platform: {platform_name}")
    

def load_frame_processing_variables_from_json(json_file_path=r'.\conf.json'):

    with open(json_file_path) as f:
        variables_dict = json.load(f)

    return FrameProcessingConfiguration(
        threshold=variables_dict.get("threshold", 5),
        num_consecutive_frames=variables_dict.get("num_consecutive_frames", 5),
        message_frames=variables_dict.get("message_frames", 25),
        num_skip_frames=variables_dict.get("num_skip_frames", 5),
        analysis_frame_shape=variables_dict.get("analysis_frame_shape", (1280, 720)),
        numbers_frames_to_wait=variables_dict.get("numbers_frames_to_wait", 50),
        show_fps=variables_dict.get("show_fps", True),
        save_demo=variables_dict.get("save_demo", False),
        ocr_detector=variables_dict.get("ocr_detector", "easyocr"),
        wait_for_black_screen=variables_dict.get("wait_for_black_screen", False),
        monitor=variables_dict.get("monitor", 1)
    )

