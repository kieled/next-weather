import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {ICurrentWeather} from "../../models/ICurrentWeather";

const current_weather_url = 'https://api.openweathermap.org/data/2.5/weather'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {query: { city }} = req
    if (city?.length) {
        const {data} = await axios.get<ICurrentWeather>(current_weather_url, {
            params: {
                q: city,
                appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
                units: 'metric',
                lang: 'ru'
            }
        })
        res.status(200).json(data)
    } else {
        res.status(404).json({'result': 'Not Found'})
    }
}