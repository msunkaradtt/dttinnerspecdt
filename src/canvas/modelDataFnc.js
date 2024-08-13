export const pecDataFnc = (data) => {
    const pecData = data
    const segmentData = pecData.reduce((acc, curr) => {
        const { Location, ...rest } = curr
        Object.entries(rest).forEach(([key, value]) => {
            if(value !== undefined) {
                acc[key] = acc[key] || {}
                acc[key][Location] = value
            }
        })
        return acc
    }, {})

    let {max, min} = pecMaxMinFnc(segmentData)

    return {segmentData, max, min}
}


const pecMaxMinFnc = (data) => {
    let max = -Infinity;
    let min = Infinity;

    for (const values of Object.values(data)) {
        for (const num of Object.values(values)) {
            const value = Number(num);
            if (value > max) {
                max = value;
            }
            if (value < min) {
                min = value;
            }
        }
    }

    return { max, min };
}
