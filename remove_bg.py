import cv2
import numpy as np

# Initialize the background subtractor
backSub = cv2.createBackgroundSubtractorMOG2()

# Open the input video file
cap = cv2.VideoCapture('uploads\input.mp4')

# Get the video frame width, height and frames per second
frame_width = int(cap.get(3))
frame_height = int(cap.get(4))
fps = cap.get(cv2.CAP_PROP_FPS)

# Define the codec and create VideoWriter object
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter('uploads\output_no_background.mp4', fourcc, fps, (frame_width, frame_height))

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Apply the background subtractor
    fgMask = backSub.apply(frame)

    # Use the mask to extract the foreground
    fg = cv2.bitwise_and(frame, frame, mask=fgMask)

    # Write the frame with background removed
    out.write(fg)

    # Display the resulting frame (optional)
    cv2.imshow('Frame', fg)

    # Press 'q' to exit the loop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release everything
cap.release()
out.release()
cv2.destroyAllWindows()
