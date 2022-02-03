class downloadController {
    async download(req, res) {
        try {
            const file = `public/Documents/${req.params.filename}`;
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
            const link = "http://" + process.env.HOST_NAME + req.params.path.split('-').join('/') + '/' + filedata[0].filename

            res.status(200).json({
                message: 'Файл успешно загружен',
                link
            })
        }

    }
}
module.exports = new downloadController()