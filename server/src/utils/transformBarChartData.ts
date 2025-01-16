type BarChartFacet = {
    [key: string]: Array<{ _id: null; count: number }> | [];
};

type TransformedData = Array<
    {
        range: string,
        count: number
    }
>

export function transformBarChartData(data: BarChartFacet): TransformedData {
    const transformedData: TransformedData = [];

    for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value) && value.length > 0 && value[0].count !== undefined) {
            transformedData.push({ range: key, count: value[0].count })
            // transformedData[key] = value[0].count;
        } else {
            transformedData.push({ range: key, count: 0 })

            // transformedData[key] = 0;
        }
    }
    return transformedData;
}