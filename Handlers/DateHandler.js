class dateHandler {
    formatDate = (date) => {
        return String(date).length === 1 ? '0' + date : String(date)
    }
}

module.exports = new dateHandler