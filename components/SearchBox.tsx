import React, {ChangeEvent, ChangeEventHandler, FC, useEffect, useState} from 'react';
import IconComponent from "./IconComponent";
import useDebounce from "../hooks/useDebounce";
import {findCity} from "../api/api";
import {ICity} from "../models/ICity";

interface ComponentProps {
    onChange: (value: string) => void
    list?: ICity[]
    onSelectCity: (value: ICity) => void
}

const SearchBox: FC<ComponentProps> = ({onChange, list, onSelectCity}) => {
    const [inputCity, setInputCity] = useState('')

    const debouncedCity = useDebounce<string>(inputCity, 500)

    const onCityChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputCity(e.target.value)
    }

    const onSelect = (value: ICity) => {
        onSelectCity(value)
        setInputCity('')
    }

    useEffect(() => {
        onChange(debouncedCity)
    }, [debouncedCity, onChange])

    return (
        <div className='flex gap-2 items-center'>
            <div className='text-lg'>Поиск:</div>
            <div className='relative flex border rounded-2xl items-center px-3 py-1.5'>
                <input
                    onChange={onCityChange}
                    value={inputCity}
                    className='placeholder:text-slate-600 text-xl bg-transparent w-full focus:outline-none pl-1'
                    type="text" placeholder='Введите название города'/>

                {list && <ul className='bg-white border rounded-2xl absolute top-full w-full left-0 translate-y-1'>
                    {list.map(i => <li
                        key={i.lat}
                        className='p-3 hover:bg-slate-50 first:rounded-t-2xl last:rounded-b-2xl hover:cursor-pointer'
                        onClick={() => onSelect(i)}
                    >
                        {i.local_names?.ru || i.name}
                    </li>)}
                </ul>}
            </div>
        </div>
    )
}

export default React.memo(SearchBox)