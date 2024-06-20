from moviepy.editor import VideoFileClip, vfx

def create_slow_motion(input_video_path, output_video_path, slow_factor):
    # Load the input video
    clip = VideoFileClip(input_video_path)

    # Apply the slow motion effect
    slow_clip = clip.fx(vfx.speedx, factor=1.0/slow_factor)

    # Write the slow-motion video to the output path
    slow_clip.write_videofile(output_video_path, codec='libx264')

# Example usage
input_video_path = "uploads\input.mp4"
output_video_path = "uploads\output_slow_motion.mp4"
slow_factor = 2.0  # Slow down the video by a factor of 2

create_slow_motion(input_video_path, output_video_path, slow_factor)
