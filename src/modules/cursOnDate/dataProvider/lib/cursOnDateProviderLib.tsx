import CursOnDateInterface from "../interfaces/CursOnDateInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {CursCurrencyInterface} from "../interfaces/CursCurrencyInterface";
import {extractData} from "./XMLParserLibrary";
import {getDateFormatted} from "../../../dates/DatesLib";

const getRequestGetCursOnDateBodyXML = (date: string): string => (
    '<?xml version="1.0" encoding="utf-8"?>\n' +
    '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">\n' +
    '  <soap12:Body>\n' +
    '    <GetCursOnDate xmlns="http://web.cbr.ru/">\n' +
    '      <On_date>' + date + '</On_date>\n' +
    '    </GetCursOnDate>\n' +
    '  </soap12:Body>\n' +
    '</soap12:Envelope>'
)


// Запрос на получение данных
export const fetchCursInformation = async (date: Date): Promise<CursCurrencyInterface[]> => {
    const bodyXML = getRequestGetCursOnDateBodyXML(getDateFormatted(date))
    const request = await fetch('https://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/soap+xml; charset=utf-8',
            'Content-Length': String(bodyXML.length),
        },
        body: bodyXML
    })
    if (request.ok) {
        const XMLText = await request.text()
        return extractData(
            XMLText,
            'ValuteCursOnDate',
            {
                "Vname": "name",
                "Vnom": "nom",
                "Vcurs": 'curs',
                "Vcode": 'code',
                "VchCode": 'chCode'
            }
        )
    }
}

// Обновление кэшированных данных
export const updateCachedCursInformation = (data: CursOnDateInterface) => {
    AsyncStorage.setItem('CursOnDate', JSON.stringify(data))
        .then()
        .catch()
        .finally()
}

// Получение сохраненных данных по курсу
export const getCachedCursInformation = async (): Promise<CursOnDateInterface|null> => {
    const cachedData:string = await AsyncStorage.getItem('CursOnDate')
    if (cachedData) {
        return JSON.parse(cachedData)
    }
    return null
}