const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get video duration
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

// time format to seconds
function timeToSeconds(time) {
  const parts = time.split(':');
  return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseFloat(parts[2]);
}

// Endtimestamp to clip a video
app.post('/clip', async (req, res) => {
  const { startTime, endTime, duration, inputFile, outputFile } = req.body;

  if (!inputFile || !outputFile) {
    return res.status(400).send('Missing required fields');
  }

  const inputPath = path.join(__dirname, 'uploads', inputFile);
  const outputPath = path.join(__dirname, 'uploads', outputFile);

  try {
    const videoDuration = await getVideoDuration(inputPath);

    const start = startTime ? timeToSeconds(startTime) : null;
    const end = endTime ? timeToSeconds(endTime) : null;
    const dur = duration ? parseFloat(duration) : null;

    if (start !== null && start >= videoDuration) {
      return res.status(400).send('Start time is out of bounds');
    }

    if (dur !== null && (start + dur > videoDuration)) {
      return res.status(400).send('Duration is out of bounds');
    }

    if (start !== null && end !== null && (start >= end || end > videoDuration)) {
      return res.status(400).send('Start time or end time is out of bounds');
    }

    if (duration) {
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
    } else if (startTime && endTime) {
      ffmpeg(inputPath)
        .setStartTime(startTime)
        .setDuration(end - start)
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
