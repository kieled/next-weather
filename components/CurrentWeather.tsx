import React, {FC} from 'react';
import {ICurrentWeather} from "../models/ICurrentWeather";
import {getTemp} from "../utils/getTemp";
import IconComponent from "./IconComponent";

interface ComponentProps {
    data?: ICurrentWeather
}

const CurrentWeather: FC<ComponentProps> = ({data}) => {
    return (
        <div className='bg-white rounded-2xl p-4 w-2/5'>
            <div className='flex justify-between items-center mb-3'>
                <div className='flex flex-col items-center'>
                    {data && <IconComponent className='w-28 h-24 px-5' name={data?.weather[0].icon} />}
                </div>
                <div>
                    <div className='text-2xl'>{getTemp(data?.main.temp)}°C</div>
                    <div>Влажность: {data?.main.humidity}%</div>
                    <div>Ветер: {data?.wind.speed} м\с</div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CurrentWeather)