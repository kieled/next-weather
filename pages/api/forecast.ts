import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {IForecast} from "../../models/IForecast";
import {groupForecast} from "../../utils/groupForecast";

const forecast_url = 'https://api.openweathermap.org/data/2.5/forecast'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {query: { city }} = req
    if (city?.length) {
        const {data} = await axios.get<IForecast>(forecast_url, {
            params: {
                q: city,
                units: 'metric',
                appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
                lang: 'ru'
            }
        })
        const responseData = groupForecast(data).slice(0, 3)
        res.status(200).json(responseData)
    } else {
        res.status(404).json({'result': 'Not Found'})
    }
}