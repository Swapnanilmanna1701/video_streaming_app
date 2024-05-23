import express from "express";
import multer from "multer";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import path from "path";
const app = express();
app.use(cors({
    origin: ["https://localhost:3000", 'https://localhost:5713'],
    credentials: true,
    
})
)

// multer middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname = "=" + uuidv4() + path.extname(file.originalname))
    }
});



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","Origin, x-Requested-With, Content-Type, Accept");
    next();
})

app.use(express.json);
app.use(express.urlencoded({ extended: true}));
app.use("/uploads", express.static("uploads"));



app.get('/', function(req,res){
    res.json({message: "Hello world"})
})
app.listen(8000, function(){
    console.log("app is listening on port 3000")
});