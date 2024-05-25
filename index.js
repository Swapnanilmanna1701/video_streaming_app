import express from "express";
import multer from "multer";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import {exec} from "child_process";
const app = express();


// multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname = "=" + uuidv4() + path.extname(file.originalname)
    );
  },
});

//multer configuration
const upload = multer({ storage: storage });

app.use(
  cors({
    origin: ["https://localhost:3000", "https://localhost:5713"],
    credentials: true,
  })
);






app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*") // watch it
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next()
})
app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/", function (req, res) {
  res.json({ message: "Hello world" });
});

app.post("/upload", upload.single('file'), function (req, res) {
  const lessonId = uuidv4()
  const videoPath = req.file.path
  const outputPath = `./uploads/courses/${lessonId}`
  const hlsPath = `${outputPath}/index.m3u8`
  console.log("hlsPath", hlsPath)


  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, {recursive: true})
  }


  const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}

`;


});

app.listen(8000, function () {
  console.log("app is listening on port 8000");
});
