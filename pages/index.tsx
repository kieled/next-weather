import Head from 'next/head'
import {findCity, getCurrentWeather, getForecast} from "../api/api";
import SearchBox from "../components/SearchBox";
import CityButton from "../components/CityButton";
import {useEffect, useState} from "react";
import {ICity} from "../models/ICity";
import {ICurrentWeather} from "../models/ICurrentWeather";
import CurrentWeather from "../components/CurrentWeather";
import {getLocalStorage, setLocalStorage} from "../utils/localstorage";
import IconComponent from "../components/IconComponent";
import {IDayForecast} from "../models/IForecast";
import DayWeather from "../components/DayWeather";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import Link from "next/link";


export const Home = () => {
    const defaultCities = ['Минск', 'Москва', 'Братислава']
    const [city, setCity] = useState<ICity>()
    const [findList, setFindList] = useState<ICity[]>()
    const [weatherData, setWeatherData] = useState<ICurrentWeather>()
    const [forecastData, setForecastData] = useState<IDayForecast[]>()

    const onChange = (value: string) => {
        if (value.length) {
            findCity(value).then(setFindList)
        } else {
            setFindList(undefined)
        }
    }

    const onSelect = (value: ICity) => {
        setCity(value)
        setFindList(undefined)
    }

    useEffect(() => {
        if (city) {
            getCurrentWeather(city.name).then(setWeatherData)
            getForecast(city.name).then(setForecastData)
            setLocalStorage('city', city)
        }
    }, [city])

    useEffect(() => {
        const cityName = getLocalStorage('city')?.name || 'Minsk'
        findCity(cityName).then(r => r && setCity(r[0]))
    }, [])

    return (
        <div className='px-12 xl:px-36'>
            <Head>
                <title>Weather App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className='flex gap-3 mt-4 justify-center'>
                {defaultCities.map(i => <CityButton key={i} name={i}
                                                    onClick={() => findCity(i).then(r => setCity(r && r[0]))}/>)}
            </div>

            <header className='flex my-4 items-center gap-4 justify-between bg-white rounded-2xl py-3 px-6'>
                <h1 className='flex w-min whitespace-nowrap text-xl py-1.5 items-center'>
                    <IconComponent className='w-6 h-6 mr-2' name={'city'}/>
                    {city?.local_names?.ru || city?.name}, {format(new Date(), 'd MMMM hh:mm', {locale: ru})}
                </h1>
                <div className='flex items-center gap-2'>
                    <SearchBox onSelectCity={onSelect} onChange={onChange} list={findList}/>
                </div>
            </header>

            <main>
                <div className='flex gap-4 mb-4'>
                    <CurrentWeather data={weatherData}/>
                    <div
                        className='flex gap-4 bg-white rounded-2xl p-4 w-full justify-between overflow-x-auto custom-scroll'>
                        {forecastData?.map(i => <DayWeather key={i.dt} data={i}/>)}
                    </div>
                </div>
                <Link href={`/${city?.name}`}
                      className='flex justify-center w-full py-2 px-6 rounded-2xl bg-white hover:scale-105 transition-all'>Прогноз
                    на 10 дней</Link>
            </main>
        </div>
    )
}

export default Home