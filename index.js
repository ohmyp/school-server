require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose');
const multer = require("multer");
const router = require('./Routers/routes')
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { formatDate } = require('./Handlers/DateHandler')

mongoose.connect(process.env.MONGO_URL).then(() => {
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
        d = new Date()
        filename = `${formatDate(d.getHours())}:${formatDate(d.getMinutes())}_${formatDate(d.getDay())}:${formatDate(d.getMonth())}:${d.getFullYear()}__${file.originalname}`
        cb(null, filename);
    }
});

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('files'));
app.use(multer({storage: storageConfig}).array("filedata"));
app.use(cors())
app.use('/api', router)

app.listen(process.env.PORT || 3001, () => {
    console.log('server started')
})