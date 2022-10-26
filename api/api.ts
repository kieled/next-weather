import axios from "axios";
import {ICurrentWeather} from "../models/ICurrentWeather";
import {ICity} from "../models/ICity";
import {IForecast} from "../models/IForecast";
import {groupForecast, groupPerDayForecast} from "../utils/groupForecast";

const current_weather_url = 'https://api.openweathermap.org/data/2.5/weather'
const search_url = 'https://api.openweathermap.org/geo/1.0/direct'
const forecast_url = 'https://api.openweathermap.org/data/2.5/forecast'

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY

export const getCurrentWeather = async (city?: string) => {
    if (city?.length) {
        const {data} = await axios.get<ICurrentWeather>(current_weather_url, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
                lang: 'ru'
            }
        })
        return data
    }
}


export const findCity = async (search: string) => {
    if (search.length) {
        const {data} = await axios.get<ICity[]>(search_url, {
            params: {
                q: search,
                limit: 5,
                appid: API_KEY
            }
        })
        return data
    }
}

export const getForecast = async (city: string) => {
    if (city.length) {
        const {data} = await axios.get<IForecast>(forecast_url, {
            params: {
                q: city,
                units: 'metric',
                appid: API_KEY,
                lang: 'ru'
            }
        })
        return groupForecast(data).slice(0, 3)
    }
}

export const getFullForecast = async (city: string) => {
    if (city.length) {
        const {data} = await axios.get<IForecast>(forecast_url, {
            params: {
                q: city,
                units: 'metric',
                appid: API_KEY,
                lang: 'ru'
            }
        })
        return {
            name: data.city.name,
            items: groupPerDayForecast(data)
        }
    }
}

