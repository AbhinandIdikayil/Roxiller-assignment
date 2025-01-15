type BarChartFacet = {
    [key: string]: Array<{ _id: null; count: number }> | [];
};

type TransformedData = {
    [key: string]: number;
};

export function transformBarChartData(data: BarChartFacet): TransformedData {
    const transformedData: TransformedData = {};

    for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value) && value.length > 0 && value[0].count !== undefined) {
            transformedData[key] = value[0].count;
        } else {
            transformedData[key] = 0; 
        }
    }
console.log(transformedData)
    return transformedData;
}