process.env.PATH = process.env.PATH + ';D:\\ffmpeg-master-latest-win64-gpl\\bin';

const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to clip a video
app.post('/clip', (req, res) => {
  const { startTime, duration, inputFile, outputFile } = req.body;

  if (!startTime || !duration || !inputFile || !outputFile) {
    return res.status(400).send('Missing required fields');
  }

  const inputPath = path.join(__dirname, 'uploads', inputFile);
  const outputPath = path.join(__dirname, 'uploads', outputFile);

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
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Video Editor API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
