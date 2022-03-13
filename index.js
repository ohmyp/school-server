require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose');
const multer = require("multer");
const router = require('./Routers/routes')
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 3001
const host = process.env.HOST_NAME || '127.0.0.1'
const mongo_uri = process.env.MONGO_URI

mongoose.connect(mongo_uri).then(() => {
    console.log("DB Connected");
});

mongoose.connection.on("error", err => {
    console.log(`DB Connection Error: ${err.message}`);
});

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        const reqPath = req.url.split('/upload/')[1].split('-').join('/')
        const uploadPath = path.join(__dirname, 'files', reqPath)
        fs.mkdir(uploadPath, {
            recursive: true
        }, (err) => {
            if (err) {
                return console.error(err)
            }
        })
        setTimeout(() => {
            cb(null, uploadPath)
        }, 1000);

    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname + '/files'));
app.use(multer({storage: storageConfig}).array("filedata"));
app.use(cors())
app.use('/api', router)

app.listen(port, host, () => {
    console.log(`server started on ${host}:${port}`)
})
