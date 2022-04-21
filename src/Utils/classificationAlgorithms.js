import { Jenks } from "jenks";

export const getEqualIntervals = (dataset) => {
    const numberOfClasses = 10
    const lowestValue = Math.min(...dataset) 
    const highestValue = Math.max(...dataset) 
    const classRange = (highestValue - lowestValue) / numberOfClasses
    let resultArray = []
    resultArray[0] = lowestValue + classRange
    resultArray[1] = resultArray[0] + classRange
    resultArray[2] = resultArray[1] + classRange
    resultArray[3] = resultArray[2] + classRange
    resultArray[4] = resultArray[3] + classRange
    resultArray[5] = resultArray[4] + classRange
    resultArray[6] = resultArray[5] + classRange
    resultArray[7] = resultArray[6] + classRange
    resultArray[8] = resultArray[7] + classRange
    resultArray[9] = resultArray[8] + classRange + 1

    return resultArray
}

export const getNaturalBreaks = (dataset,n_classes) => {
    // console.log(dataset)
    let result = new Jenks(dataset, n_classes).naturalBreak()
    let filteredResult = result.filter((item) => {
        return item !== undefined;
   });
   return filteredResult
}