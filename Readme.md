# Video Editor API

This repository contains a simple video editor API that allows users to upload videos and clip them according to specified start and end times or duration. The API supports multiple video formats and ensures that inputs are validated to prevent errors.

## Requirements

- Node.js
- Express
- Fluent-ffmpeg
- npm
- opencv-python

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jayshrivastava0/video-editor.git
   cd video-editor
   ```

2. Initialize npm and install dependencies:

   ```bash
   npm init -y
   npm install express fluent-ffmpeg multer axios form-data fs path
   ```

3. Make sure the file structure is like this:

   ```
   video-editor/
   ├── clip.js
   ├── alternative_clip.js
   ├── uploads/
   ├── index.html
   └── other_files
   ```

## Usage

### Running the Application

To start the application, run:

```bash
node clip.js
```

### Endpoints

#### Root Endpoint

- **GET /**

  Returns a welcome message.

#### Clip a Video

- **POST /clip**

  Clips a video based on provided start time, end time, or duration.

  **Request Headers:**

  - `Content-Type: application/json`

  **Request Body:**

  ```json
  {
    "startTime": "00:00:10",
    "duration": 13,
    "endTime": "00:00:20",
    "inputFile": "input.mp4",
    "outputFile": "output_check1.mp4"
  }
  ```

  **Response:**

  - Success: `200 OK` with a message `Video clipped successfully: output_check1.mp4`
  - Error: `400 Bad Request` with an appropriate error message

### Example Usage

- To clip a video between specific timestamps:

  ```json
  {
    "startTime": "00:00:10",
    "endTime": "00:00:20",
    "inputFile": "input.mp4",
    "outputFile": "output_check1.mp4"
  }
  ```

- To clip a video for a specific duration from the start time:

  ```json
  {
    "startTime": "00:00:10",
    "duration": 13,
    "inputFile": "input.mp4",
    "outputFile": "output_check1.mp4"
  }
  ```

### File Structure

- `clip.js`: Handles video clipping functionality using Fluent-ffmpeg.
- `alternative_clip.js`: Alternative implementation using `api.video`.
- `index.html`: Simple front-end to upload and process videos for slow motion.
- `uploads/`: Directory to store uploaded and processed videos.

## Functionality Overview

### clip.js

This file contains the core logic for handling video clipping. It uses the `fluent-ffmpeg` library to process videos. It includes functions to get video duration, convert time format to seconds, and handle the video clipping request.

### alternative_clip.js

An alternative implementation using `api.video` for uploading, clipping, and downloading videos. This implementation uses `multer` for handling file uploads, `axios` for making API requests, and `form-data` for handling form data.

### index.html

A simple HTML file to upload a video and process it to create a slow-motion effect. It uses JavaScript to capture frames from the video, adjust the playback speed, and generate the output video.

### Deployment

To deploy the application, you can use any Node.js compatible hosting service. Ensure that the required dependencies are installed and the server is properly configured to handle file uploads and API requests.
