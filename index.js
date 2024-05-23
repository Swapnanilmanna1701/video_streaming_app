import express from "express";
import multer from "multer";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.get('/', function(req,res){
    res.json({message: "Hello world"})
})
app.listen(3000, function(){
    console.log("app is listening on port 3000")
});