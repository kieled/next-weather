import React, {FC, useState} from 'react';
import {GetServerSideProps} from "next";
import {findCity, getFullForecast} from "../api";
import {IDayForecast} from "../models/IForecast";
import Head from 'next/head'
import ExtendedDayWeather from "../components/ExtendedDayWeather";
import SearchBox from "../components/SearchBox";
import {ICity} from "../models/ICity";
import { useRouter } from 'next/router'
import ErrorComponent from "../components/ErrorComponent";

interface ComponentProps {
    data?: {
        name: string
        items: { [key: string]: IDayForecast[] }
    }
}

const CityDetail: FC<ComponentProps> = ({data}) => {
    const [findList, setFindList] = useState<ICity[]>()
    const router = useRouter()


    const onChange = (value: string) => {
        if (value.length) {
            findCity(value).then(setFindList)
        } else {
            setFindList(undefined)
        }
    }

    const onSelect = async (value: ICity) => {
        await router.push(value.name)
    }

    if (!data) {
        return <ErrorComponent />
    }

    return (
        <div>
            <Head>
                <title>Погода</title>
            </Head>

            <main className='px-36'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl mt-3 mb-5'>
                        Город: {data?.name}
                    </h1>
                    <SearchBox onSelectCity={onSelect} onChange={onChange} list={findList} />
                </div>

                <div>
                    {Object.keys(data?.items || {}).map(i =>
                        <ExtendedDayWeather
                            key={i}
                            date={i}
                            items={data?.items[i] || []}
                        />)}
                </div>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const city = Array.isArray(params?.city) ? params?.city[0] : params?.city
    if (city) {
        try {
            const data = await getFullForecast(city)
            return {props: {data}}
        } catch (e) {
            console.log(e)
            return {props: {}}
        }
    }
    return {props: {}}
}

export default CityDetail