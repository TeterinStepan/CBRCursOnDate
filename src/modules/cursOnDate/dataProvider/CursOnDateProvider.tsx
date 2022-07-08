import React, {memo, useEffect, useState} from "react";
import CursOnDateInterface from "./interfaces/CursOnDateInterface";
import {CursOnDateStatusType} from "./interfaces/CursOnDateStatusType";
import {CursCurrencyInterface} from "./interfaces/CursCurrencyInterface";
import cursOnDateStatus from "./assets/CursOnDateStatuses";
import {fetchCursInformation, getCachedCursInformation, updateCachedCursInformation} from "./lib/cursOnDateProviderLib";


export const CursOnDateContext = React.createContext(null)

export const useCursOnDateContext = ():CursOnDateInterface => React.useContext(CursOnDateContext)
export const useCursOnDateDate = ():Date => useCursOnDateContext().date
export const useCursOnDateInformation = ():CursCurrencyInterface[] => useCursOnDateContext().information
export const useCursOnDateStatus = ():CursOnDateStatusType => useCursOnDateContext().status

type CursOnDateProviderType = {
    children: React.ReactNode,
    checkInterval: number
}


const CursOnDateProvider = ({children, checkInterval = 15000}: CursOnDateProviderType) => {
    const [emptyStatus, pendingStatus, idleStatus, errorStatus] = cursOnDateStatus
    const [cursOnDate, setCursOnDate] = useState<CursOnDateInterface>({
        date: new Date(),
        information: [],
        status: emptyStatus
    })

    const updateCursOnDateStatus = (newStatus: CursOnDateStatusType) => (
        setCursOnDate((state) => ({...state, status: newStatus}))
    )

    // Проверка наличия кэша и обновление состояния
    const initFromCache = () => {
        getCachedCursInformation()
            .then((cachedData:CursOnDateInterface) => {
                updateCursOnDateStatus(idleStatus)
                if (!!cachedData) {
                    console.log('cachedData')
                    setCursOnDate({...cachedData, date: new Date(cachedData.date)})
                }
            })
            .catch(() => updateCursOnDateStatus(errorStatus))
    }

    // Инициализация данных по курсу по выбранной дате по запросу или из хранилища
    const initCursOnDate = (date: Date = new Date()) => {
        updateCursOnDateStatus(pendingStatus)
        fetchCursInformation(date)
            .then((information:CursCurrencyInterface[]) => {
                setCursOnDate(() => ({
                    date: date,
                    information: information,
                    status: idleStatus
                }))
            })
            .then(() => updateCursOnDateStatus(idleStatus))
            .catch(() => {
                updateCursOnDateStatus(errorStatus)
                initFromCache()
            })
    }

    // После обновления состояния сохраняем его в хранилище
    useEffect(() => {
        if (cursOnDate.status === idleStatus) {
            updateCachedCursInformation(cursOnDate)
        }
    }, [cursOnDate])

    // При инициализации компонента вызываем метод получения и обновления состояния
    useEffect(initCursOnDate, [])

    /**
     * Effect on init this component
     * Запускает обновление данных каждые checkInterval миллисекунд для currentDate
     */
    useEffect(() => {
        const intervalID = setInterval(initCursOnDate, checkInterval)
        return () => clearInterval(intervalID)
    }, [])

    return (
        <CursOnDateContext.Provider value={cursOnDate}>
            {children}
        </CursOnDateContext.Provider>
    )
}

export default memo(CursOnDateProvider)