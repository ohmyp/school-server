const fs = require('fs');
const fsFileTree = require("fs-file-tree");

class downloadController {
    async upload(req, res) {
        let filedata = req.files
        if (!filedata)
            res.send("Ошибка при загрузке файла")
        else {
            const link = "https://api.oneschool511.ru/static/"  + req.params.path.split('-').join('/') + '/' + filedata[0].filename
            res.status(200).json({
                message: 'Файл успешно загружен',
                link
            })
        }
    }
    async getFiles(req, res) {
       const testFolder = `${process.env.FILES_PATH}admin/${req.params.category}`
        fs.readdir(testFolder, (err, files) => {
            let filesInFolder = []
            files.forEach(file => {
                filesInFolder.push(file)
            })
            res.json(JSON.stringify(filesInFolder))
        })
    }
    getFileTree(req, res, next) {
        (async () => {
            const tree = await fsFileTree(process.env.FILES_PATH + 'profession')
            res.send(tree)
        })()

    }
    async downloadFile(req, res) {
        try {
            const filename = req.params.filename.split('&').join('/')
            const file = `${process.env.FILES_PATH}${filename}`
            return res.download(file)
        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
}
module.exports = new downloadController()
