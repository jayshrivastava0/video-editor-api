import cv2
import numpy as np
from rembg import remove
from concurrent.futures import ThreadPoolExecutor, as_completed

# Input and output video paths
input_video_path = 'uploads\\input.mp4'
output_video_path = 'uploads\\output.mp4'

# Number of frames to skip
frame_skip = 10

# Function to remove background from a frame
def process_frame(frame):
    frame_no_bg = remove(frame)
    frame_no_bg = cv2.cvtColor(frame_no_bg, cv2.COLOR_RGBA2BGR)
    return frame_no_bg

# Open the input video
cap = cv2.VideoCapture(input_video_path)

# Get video properties
fps = int(cap.get(cv2.CAP_PROP_FPS))
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
num_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fourcc = cv2.VideoWriter_fourcc(*'mp4v')

# Open the output video writer
out = cv2.VideoWriter(output_video_path, fourcc, fps, (frame_width, frame_height))

frame_index = 0
processed_frames = []

while True:
    ret, frame = cap.read()
    if not ret:
        break
    if frame_index % frame_skip == 0:
        processed_frame = process_frame(frame)
        processed_frames.append(processed_frame)
    frame_index += 1

cap.release()

# Function to duplicate frames for skipped frames
def get_processed_frame(index):
    return processed_frames[min(index // frame_skip, len(processed_frames) - 1)]

# Write output video with processed frames and fill in skipped frames
cap = cv2.VideoCapture(input_video_path)
frame_index = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break
    processed_frame = get_processed_frame(frame_index)
    out.write(processed_frame)
    frame_index += 1

cap.release()
out.release()
# cv2.destroyAllWindows()
