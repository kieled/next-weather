import React, {FC} from 'react';
import {IDayForecast} from "../models/IForecast";
import {format} from "date-fns";
import IconComponent from "./IconComponent";
import {getTemp} from "../utils/getTemp";
import {ru} from "date-fns/locale";

interface ComponentProps {
    date: string
    items: IDayForecast[]
}

const ExtendedDayWeather: FC<ComponentProps> = ({date, items}) => {
    return (
        <div className='mb-4'>
            <h2 className='text-xl text-center mb-3'>{format(new Date(date), 'd MMMM', {locale: ru})}</h2>
            <div className='flex gap-4 flex-wrap justify-center'>
                {items.map(i =>
                    <div key={i.dt} className='flex justify-between items-center bg-white rounded-2xl p-4'>
                        <div className='flex flex-col items-center'>
                            <IconComponent className='w-20 h-12 px-5' name={i.weather[0].icon} />
                        </div>
                        <div>
                            <div className='min-w-[6rem]'>{format(new Date(i.dt_txt), 'H:mm')}</div>
                            <div className='text-2xl'>{getTemp(i.main.temp)}°C</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default React.memo(ExtendedDayWeather)