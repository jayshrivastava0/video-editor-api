import cv2
from rembg import remove
import numpy as np
from moviepy.editor import VideoFileClip

def remove_background_from_frame(frame):
    # Convert the frame from BGR to RGB
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    # Remove the background
    removed_bg_frame = remove(rgb_frame)
    
    # Convert the frame back from RGB to BGR
    bgr_frame = cv2.cvtColor(removed_bg_frame, cv2.COLOR_RGB2BGR)
    
    return bgr_frame

def process_video(input_video_path, output_video_path, target_fps=10, width=None, height=None):
    # Open the input video
    cap = cv2.VideoCapture(input_video_path)
    if not cap.isOpened():
        print("Error: Could not open input video.")
        return
    
    # Get video properties
    original_fps = cap.get(cv2.CAP_PROP_FPS)
    original_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    original_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    # Set target dimensions
    if width is None:
        width = original_width
    if height is None:
        height = original_height
    
    # Define the codec and create VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_video_path, fourcc, target_fps, (width, height))
    
    frame_count = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        frame_count += 1
        
        # Skip frames to match target FPS
        if frame_count % int(original_fps / target_fps) != 0:
            continue
        
        # Resize the frame
        frame = cv2.resize(frame, (width, height))
        
        # Remove background from the frame
        frame_without_bg = remove_background_from_frame(frame)
        
        # Write the frame to the output video
        out.write(frame_without_bg)
    
    # Release everything if job is finished
    cap.release()
    out.release()
    cv2.destroyAllWindows()

# Example usage
input_video_path = "uploads\\input.mp4"
output_video_path = "uploads\\output_video_no_bg159.mp4"

process_video(input_video_path, output_video_path, target_fps=10, width=640, height=360)
