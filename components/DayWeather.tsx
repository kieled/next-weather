import React, {FC} from "react";
import IconComponent from "./IconComponent";
import {getTemp} from "../utils/getTemp";
import {IDayForecast} from "../models/IForecast";
import { format } from 'date-fns'
import {ru} from "date-fns/locale";

interface ComponentProps {
    data: IDayForecast
}

const DayWeather: FC<ComponentProps> = ({data}) => {
    const getDate = () => {
        const date = new Date(data?.dt_txt)
        return format(date, 'd MMMM, EEEE', {locale: ru})
    }

    return (
        <div className='flex justify-between items-center bg-white rounded-2xl p-4'>
            <div className='flex flex-col items-center'>
                {data && <IconComponent className='w-20 h-12 px-5' name={data?.weather[0].icon} />}
            </div>
            <div>
                <div className='min-w-[6rem]'>{getDate()}</div>
                <div className='text-2xl'>{getTemp(data?.main.temp)}°C</div>
            </div>
        </div>
    )
}

export default DayWeather