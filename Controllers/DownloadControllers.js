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
        let filedata = req.files;
        console.log(filedata);
        if (!filedata)
            res.send("Ошибка при загрузке файла");
        else
            res.send("Файл загружен");
    }
}
module.exports = new downloadController()