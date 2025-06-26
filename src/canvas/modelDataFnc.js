export const pecDataFnc = (data) => {
    const pecData = data
    const segmentData = pecData.reduce((acc, curr) => {
        const { Location, ...rest } = curr
        let i = 0
        Object.entries(rest).forEach(([key, value]) => {
            if(value !== undefined) {
                let keyName = "segment_" + i
                acc[keyName] = acc[keyName] || {}
                acc[keyName][Location] = value
                i++
            }
        })
        return acc
    }, {})

    let {max, min} = pecMaxMinFnc(segmentData)

    return {segmentData, max, min}
}

export const lrutDataFnc = (data) => {
    const lrutData = data
    let ind1 = lrutData[1]
    let axialloc = ind1["1000mm"]

    return axialloc
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
