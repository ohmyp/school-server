class dateHandler {
    formatDate = (date) => {
        return String(date).length === 1 ? '0' + date : String(date)
    }
    dateToNormal = (date) => {
        const formatDate = (date) => {
            return String(date).length === 1 ? '0' + date : String(date)
        }
        const parsedDate = new Date(date)
        return `${parsedDate.getFullYear()}-${formatDate(parsedDate.getMonth())}-${formatDate(parsedDate.getDate())} ${formatDate(parsedDate.getHours())}:${formatDate(parsedDate.getMinutes())}:${formatDate(parsedDate.getSeconds())}`
    }
}

module.exports = new dateHandler