interface IWeather {
    id: number
    main: string
    description: string
    icon: string
}

interface ITemperatures {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
}

interface IWind {
    speed: number
    deg: number
    gust: number
}

interface ISys {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
}

export interface ICurrentWeather {
    coord: {
        lon: number
        lat: number
    }
    weather: IWeather[]
    base: string
    main: ITemperatures
    visibility: number
    wind: IWind
    clouds: {
        all: number
    }
    dt: number
    sys: ISys
    timezone: number
    id: number
    name: string
    cod: number
}