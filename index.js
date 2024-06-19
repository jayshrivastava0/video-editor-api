const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper function to get video duration
function getVideoDuration(filePath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        resolve(metadata.format.duration);
      }
    });
  });
}

// Endpoint to clip a video
app.post('/clip', async (req, res) => {
  const { startTime, endTime, duration, inputFile, outputFile } = req.body;

  if (!inputFile || !outputFile) {
    return res.status(400).send('Missing required fields');
  }

  const inputPath = path.join(__dirname, 'uploads', inputFile);
  const outputPath = path.join(__dirname, 'uploads', outputFile);

  try {
    const videoDuration = await getVideoDuration(inputPath);

    if (duration) {
      if (startTime) {
        const start = parseFloat(startTime);
        const dur = parseFloat(duration);

        if (start < 0 || start + dur > videoDuration) {
          return res.status(400).send('Start time or duration is out of bounds');
        }

        ffmpeg(inputPath)
          .setStartTime(startTime)
          .setDuration(duration)
          .output(outputPath)
          .on('end', () => {
            res.send(`Video clipped successfully: ${outputFile}`);
          })
          .on('error', (err) => {
            res.status(500).send(`Error clipping video: ${err.message}`);
          })
          .run();
      } else {
        return res.status(400).send('Start time is required when duration is provided');
      }
    } else if (startTime && endTime) {
      const start = parseFloat(startTime);
      const end = parseFloat(endTime);

      if (start < 0 || end > videoDuration || start >= end) {
        return res.status(400).send('Start time or end time is out of bounds');
      }

      const dur = end - start;

      ffmpeg(inputPath)
        .setStartTime(startTime)
        .setDuration(dur)
        .output(outputPath)
        .on('end', () => {
          res.send(`Video clipped successfully: ${outputFile}`);
        })
        .on('error', (err) => {
          res.status(500).send(`Error clipping video: ${err.message}`);
        })
        .run();
    } else {
      return res.status(400).send('Provide either duration or both start and end times');
    }
  } catch (err) {
    res.status(500).send(`Error processing video: ${err.message}`);
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Video Editor API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
