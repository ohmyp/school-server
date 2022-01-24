require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose');
const multer = require("multer");
const router = require('./Routers/routes')

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB Connected");
});

mongoose.connection.on("error", err => {
    console.log(`DB Connection Error: ${err.message}`);
});

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "files");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});
 
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('files'));
app.use(express.static('public'));
app.use(multer({storage:storageConfig}).array("filedata"));

app.use('/api', router)

app.listen(process.env.PORT || 3001, async () => {
    console.log('server started')
})