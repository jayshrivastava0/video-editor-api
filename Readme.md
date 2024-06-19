Video Editing API
1. https://json2video.com/
2. https://creatomate.com/developers
3. https://www.plainlyvideos.com/solution/video-editing-api
4. https://shotstack.io/product/

Paid
1. https://www.openshot.org/cloud-api/



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



CLIP 
in ```clip.js```

```
# API used to clip the video
```
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
```

### Explanation

1. **Triple Backticks for Code Block**: Use three backticks (```) to open and close the code block.
2. **Syntax Highlighting**: Add the language identifier (e.g., `json`) immediately after the opening backticks for syntax highlighting.

In your Markdown file, it will look like this:

```markdown
# API used to clip the video

```http
POST http://localhost:3000/clip
```

```http
Header Content-Type: application/json
```

```json
{
  "startTime": "00:00:10",
  "duration": 13,
  "endTime": "00:00:20",
  "inputFile": "input.mp4",
  "outputFile": "output_check1.mp4"
}
```
```