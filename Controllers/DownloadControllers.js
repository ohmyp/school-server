const fs = require('fs');

class downloadController {
    async download(req, res) {
        try {
            const file = `${process.env.FILES_PATH}admin/createlesson/${req.params.filename}`;
            return res.download(file)
        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
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
}
module.exports = new downloadController()
