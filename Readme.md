Video Editing API
1. https://json2video.com/
2. https://creatomate.com/developers
3. https://www.plainlyvideos.com/solution/video-editing-api
4. https://shotstack.io/product/

Paid
1. https://www.openshot.org/cloud-api/



Requirements
1. Node.js
2. Express
3. Fluent-ffmpeg
4. npm
5. opencv-python



In main folder

1. ```npm init -y```
2. ```npm install express fluent-ffmpeg```


Make sure the file structure is like this

```
video-editor/
├── index.js
└── uploads/
```

Run this to run the application

```node index.js```




The clip.js in the main folder is for handling the functionality of clip

in ```clip.js``` mppeg library was used was used.

POST http://localhost:3000/clip

```
Header Content-Type: application/json
```

Body json

```json
{
  "startTime": "00:00:10",
  "duration": 13,
  "endTime": "00:00:20",
  "inputFile": "input.mp4",
  "outputFile": "output_check1.mp4"
}
```