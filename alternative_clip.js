const express = require('express');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });

// Replace this with your actual api.video API key
const apiKey = 'crDmnkHGOCr4Ao3yzR221oRtussJPF2PW62hIRrZdyQ';

// time format to seconds
function timeToSeconds(time) {
  const parts = time.split(':');
  return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseFloat(parts[2]);
}

// Upload and clip a video
app.post('/clip', upload.single('video'), async (req, res) => {
  const { startTime, endTime, duration, outputFile } = req.body;
  const videoFile = req.file;

  if (!videoFile || !outputFile) {
    return res.status(400).send('Missing required fields');
  }

  const filePath = path.join(__dirname, videoFile.path);

  try {
    // Upload the video to api.video
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    const uploadResponse = await axios.post('https://sandbox.api.video/videos', form, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        ...form.getHeaders(),
      },
    });

    const videoId = uploadResponse.data.videoId;
    console.log('Video uploaded successfully with ID:', videoId);

    const start = startTime ? timeToSeconds(startTime) : null;
    const end = endTime ? timeToSeconds(endTime) : null;
    const dur = duration ? parseFloat(duration) : null;

    if (start !== null && end !== null && start >= end) {
      return res.status(400).send('Start time must be before end time');
    }

    const clipParams = {
      start: start !== null ? start : undefined,
      end: end !== null ? end : undefined,
      duration: dur !== null ? dur : undefined,
    };

    console.log('Clipping video with parameters:', clipParams);

    // Clip the video using api.video
    const clipResponse = await axios.post(`https://sandbox.api.video/videos/${videoId}/clips`, clipParams, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const clipId = clipResponse.data.videoId;
    console.log('Video clipped successfully with ID:', clipId);

    // Download the clipped video
    const downloadResponse = await axios({
      url: `https://sandbox.api.video/videos/${clipId}/source`,
      method: 'GET',
      responseType: 'stream',
    });

    const outputPath = path.join(__dirname, 'uploads', outputFile);
    const writer = fs.createWriteStream(outputPath);

    downloadResponse.data.pipe(writer);

    writer.on('finish', () => {
      res.send(`Video clipped successfully: ${outputFile}`);
    });

    writer.on('error', (err) => {
      console.error('Error writing file:', err.message);
      res.status(500).send(`Error downloading clipped video: ${err.message}`);
    });
  } catch (err) {
    console.error('Error processing video:', err.response ? err.response.data : err.message);
    res.status(500).send(`Error processing video: ${err.response ? err.response.data : err.message}`);
  } finally {
    // Clean up uploaded file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting uploaded file:', err.message);
      }
    });
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
