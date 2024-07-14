# Video Editor API

This repository contains a simple video editor API that allows users to upload videos and clip them according to specified start and end times or duration. The API supports multiple video formats and ensures that inputs are validated to prevent errors. Additionally, it includes a script to create slow-motion videos.

## Functionalities Offered

1. [**Clipping**](https://github.com/jayshrivastava0/video-editor-api?tab=readme-ov-file#clip-a-video): Clip videos according to specified start and end times or duration.
2. [**Slow Motion**](https://github.com/jayshrivastava0/video-editing/blob/512c2f8800cff68da28ccfc3640de8fa2cb88df7/Readme.md#L127): Apply a slow-motion effect to videos.
3. **Remove Background (Experimental)**: Remove the background from videos (under development).

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
   npm install @ffmpeg-installer/ffmpeg
   npm install @ffprobe-installer/ffprobe
   ```

3. Make sure the file structure is like this:

   ```
   video-editor/
   ├── clip.js
   ├── alternative_clip.js
   ├── slow_motion.js
   ├── uploads/
   │   ├── input.mp4
   │   └── output.mp4
   ├── index.html
   ├── experimental/
   │   ├── remove-bg.py
   │   └── test.py
   ├── .gitignore
   ├── package-lock.json
   ├── package.json
   └── Readme.md
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



## Clip a Video


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

## Creating Slow-Motion Videos

#### Script: slow_motion.js

This script uses `fluent-ffmpeg` to apply a slow-motion effect to a video.

**Code Explanation**:

1. **Imports**:
   - `ffmpeg` is imported to handle video processing.
   - `path` is imported to handle file paths.
   - `@ffmpeg-installer/ffmpeg` and `@ffprobe-installer/ffprobe` are used to set the paths for `ffmpeg` and `ffprobe`.

2. **Function `createSlowMotion`**:
   - Takes `inputVideoPath`, `outputVideoPath`, and `slowFactor` as parameters.
   - Uses `ffmpeg` to apply the slow-motion effect by adjusting the PTS (Presentation Time Stamp) of the video frames.
   - Adjusts the frame rate to match the slow-motion effect.

3. **Example Usage**:
   - Defines the input and output video paths.
   - Defines the slow-motion factor.
   - Calls the `createSlowMotion` function with these parameters.

### Experimental Scripts

The `experimental/` directory contains scripts that are still under development and may be written in different languages.

### File Structure

- `clip.js`: Handles video clipping functionality using Fluent-ffmpeg.
- `alternative_clip.js`: Alternative implementation using `api.video`.
- `slow_motion.js`: Script to create slow-motion videos using Fluent-ffmpeg.
- `index.html`: Simple front-end to upload and process videos for slow motion.
- `uploads/`: Directory to store uploaded and processed videos.
- `experimental/`: Contains scripts that are under development and in different languages.

### Deployment

To deploy the application, you can use any Node.js compatible hosting service. Ensure that the required dependencies are installed and the server is properly configured to handle file uploads and API requests.
