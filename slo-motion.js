const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffprobeInstaller = require('@ffprobe-installer/ffprobe');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);

function createSlowMotion(inputVideoPath, outputVideoPath, slowFactor) {
  // Calculate the speed factor
  const speedFactor = 1.0 / slowFactor;

  // Apply the slow motion effect
  ffmpeg(inputVideoPath)
    .videoFilters(`setpts=${slowFactor}*PTS`)
    .outputOptions('-r', Math.floor(30 / speedFactor)) // Adjust frame rate
    .on('end', () => {
      console.log(`Slow-motion video created successfully: ${outputVideoPath}`);
    })
    .on('error', (err) => {
      console.error(`Error creating slow-motion video: ${err.message}`);
    })
    .save(outputVideoPath);
}

// Example usage
const inputVideoPath = path.join(__dirname, 'uploads', 'input.mp4');
const outputVideoPath = path.join(__dirname, 'uploads', 'output_slow_motion.mp4');
const slowFactor = 2.0;  // Slow down the video by a factor of 2

createSlowMotion(inputVideoPath, outputVideoPath, slowFactor);
