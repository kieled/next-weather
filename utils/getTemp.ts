export const getTemp = (value?: number) => {
    const temp = Math.round(value || 0)

    if (temp > 0) {
        return `+${temp}`
    }
    return temp
}