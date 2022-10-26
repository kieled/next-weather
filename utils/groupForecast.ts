import {IDayForecast, IForecast} from "../models/IForecast";


export const groupForecast = (data: IForecast): IDayForecast[] => {
    let result = data.list.reduce((groups: any, value)  => {
        const date = value.dt_txt.split(' ')[0]
        groups[date] = value
        return groups
    }, {})
    return Object.values(result)
}

type ItemType = {[key: string]: IDayForecast[]}

export const groupPerDayForecast = (data: IForecast): ItemType => {
    return data.list.reduce((dates: ItemType, value) => {
        const date = value.dt_txt.split(' ')[0]
        if (!dates[date]) {
            dates[date] = []
        }
        dates[date].push(value)
        return dates
    }, {})
}