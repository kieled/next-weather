import {IDayForecast, IForecast} from "../models/IForecast";


export const groupForecast = (data: IForecast): IDayForecast[] => {
    let result = data.list.reduce((groups: any, value)  => {
        const date = value.dt_txt.split(' ')[0]
        groups[date] = value
        return groups
    }, {})
    result = Object.values(result)
    return result
}