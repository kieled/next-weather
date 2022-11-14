import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {ICity} from "../../models/ICity";

const search_url = 'https://api.openweathermap.org/geo/1.0/direct'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {query: {search}} = req
    if (search?.length) {
        const {data} = await axios.get<ICity[]>(search_url, {
            params: {
                q: search,
                limit: 5,
                appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY
            }
        })
        res.status(200).json(data)
    } else {
        res.status(404).json({'result': 'Not Found'})
    }
}