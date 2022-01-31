require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose');
const multer = require("multer");
const router = require('./Routers/routes')
const fs = require('fs');
const path = require('path');



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB Connected");
});

mongoose.connection.on("error", err => {
    console.log(`DB Connection Error: ${err.message}`);
});

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log();
        const reqPath = req.url.split('-').slice(1).join('/')
        const uploadPath = path.join(__dirname, 'files', reqPath)
        fs.mkdir(uploadPath, {recursive: true}, (err) => {
            if (err) {return console.error(err)}
        })
        setTimeout(() => {
            cb(null, uploadPath)
        }, 1000);
        
    },
    filename: (req, file, cb) => {
        d = new Date()
        filename = `${d.getHours()}:${d.getMinutes()}_${d.getDay()}:${d.getMonth()}:${d.getFullYear()}__${file.originalname}`
        cb(null, filename);
    }
});

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('files'));
app.use(multer({
    storage: storageConfig
}).array("filedata"));

app.use('/api', router)

app.listen(process.env.PORT || 3001, async () => {
    console.log('server started')
})