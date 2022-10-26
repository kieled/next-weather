export const setLocalStorage = (key: string, value: any) => {
    if (typeof window !== undefined) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const getLocalStorage = (key: string) => {
    if (typeof window !== undefined) {
        const value = localStorage.getItem(key)
        if (value) {
            return JSON.parse(value)
        }
    }
}