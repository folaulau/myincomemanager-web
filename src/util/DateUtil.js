
const DateUtil = {

    convertUTCDateToLocalDateStr: (utcDate) => {
        let datetime = new Date(new Date(utcDate + 'Z').toLocaleString())
        const month = String(datetime.getMonth() + 1).padStart(2, '0');
        const date = String(datetime.getDate()).padStart(2, '0');
        const hours = String(datetime.getHours()).padStart(2, '0');
        const minutes = String(datetime.getMinutes()).padStart(2, '0');
        datetime = datetime.getFullYear()+'-'+(month)+'-'+(date)+'T'+(hours)+':'+(minutes)
        return datetime
    },
    convertLocalDateToUTCStr: (localDateStr) => {
        return new Date(localDateStr).toISOString()
    }
    
}

export default DateUtil;