class dateHandler {
    formatDate = (date) => {
        return String(date).length === 1 ? '0' + date : String(date)
    }
    dateToNormal = (date) => {
        const formatDate = (date) => {
            return String(date).length === 1 ? '0' + date : String(date)
        }
        const parsedDate = new Date(date)
        return `${formatDate(parsedDate.getDate())}.${formatDate(parsedDate.getMonth())}.${parsedDate.getFullYear()} ${formatDate(parsedDate.getHours())}:${formatDate(parsedDate.getMinutes())}`
    }
}

module.exports = new dateHandler