import axios from "axios";
import {ICurrentWeather} from "../models/ICurrentWeather";
import {ICity} from "../models/ICity";
import {IDayForecast, IForecast} from "../models/IForecast";
import {groupPerDayForecast} from "../utils/groupForecast";

const current_weather_url = '/api/current'
const search_url = '/api/find'
const forecast_url = '/api/forecast'
const detail_url = 'https://api.openweathermap.org/data/2.5/forecast'

type ParamsType = {[key: string]: string | undefined}

async function getServerData <T>(url: string, params: ParamsType) {
    const {data} = await axios.get<T>(url, {params})
    return data
}

export const getCurrentWeather = async (city?: string) => {
    return await getServerData<ICurrentWeather>(current_weather_url, {city})
}

export const findCity = async (search: string) => {
    return await getServerData<ICity[]>(search_url, {search})
}

export const getForecast = async (city: string) => {
    return await getServerData<IDayForecast[]>(forecast_url, {city})
}

export const getFullForecast = async (city: string) => {
    if (city?.length) {
        const {data} = await axios.get<IForecast>(detail_url, {
            params: {
                q: city,
                units: 'metric',
                appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
                lang: 'ru'
            }
        })
        return {
            name: data.city.name,
            items: groupPerDayForecast(data)
        }
    }
}

