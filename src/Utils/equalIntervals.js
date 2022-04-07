export const getEqualIntervals = (dataset) => {
    const numberOfClasses = 5
    const lowestValue = Math.min(...dataset) 
    const highestValue = Math.max(...dataset) 
    const classRange = (highestValue - lowestValue) / numberOfClasses
    let resultArray = []
    resultArray[0] = lowestValue + classRange
    resultArray[1] = resultArray[0] + classRange
    resultArray[2] = resultArray[1] + classRange
    resultArray[3] = resultArray[2] + classRange
    resultArray[4] = resultArray[3] + classRange
    return resultArray
}