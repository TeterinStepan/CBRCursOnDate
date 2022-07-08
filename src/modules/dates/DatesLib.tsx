/**
 * Переводит номер дня в формат строки с подстановкой 0
 * @param value
 */
export const getNumberZeroFormat = (value:number):string => String(value >= 0 && value < 10 ? '0' + value : value)

/**
 * Возвращает строку даты в формате YYYY-MM-DD
 * Если параметры не заданы, то возвращает строку даты текущего дня
 * @param day
 * @param monthIndex
 * @param fullYear
 */
export const getFormattedDate = (
    day:number = (new Date()).getDate(),
    monthIndex:number = (new Date()).getMonth(),
    fullYear:number = (new Date()).getFullYear()
) => `${fullYear}-${getNumberZeroFormat(monthIndex + 1)}-${getNumberZeroFormat(day)}`


export const getDateFormatted = (date:Date = new Date()) => getFormattedDate(date.getDate(), date.getMonth(), date.getFullYear())

export const getTimeFormatted = (dateTime: Date = new Date()) => {
    const hoursFormatted = dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours();
    const minuteFormatted = dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes();
    const secondFormatted = dateTime.getSeconds() < 10 ? '0' + dateTime.getSeconds() : dateTime.getSeconds();
    return hoursFormatted + ':' + minuteFormatted + ':' + secondFormatted;
}
