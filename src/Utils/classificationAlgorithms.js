import { Jenks } from "jenks";

export const getEqualIntervals = (dataset, n_classes) => {
  const lowestValue = Math.min(...dataset);
  const highestValue = Math.max(...dataset);
  const classRange = (highestValue - lowestValue) / n_classes;
  let resultArray = [];
  resultArray[0] = lowestValue + classRange;
  resultArray[1] = resultArray[0] + classRange;
  resultArray[2] = resultArray[1] + classRange;
  resultArray[3] = resultArray[2] + classRange;
  resultArray[4] = resultArray[3] + classRange;
  resultArray[5] = resultArray[4] + classRange;
  resultArray[6] = resultArray[5] + classRange;
  resultArray[7] = resultArray[6] + classRange;
  resultArray[8] = resultArray[7] + classRange;
  resultArray[9] = resultArray[8] + classRange + 1;

  return resultArray;
};

export const getNaturalBreaks = (dataset, n_classes) => {
  const numberOfClasses = n_classes - 1;
  let result = new Jenks(dataset, numberOfClasses).naturalBreak();
  let filteredResult = result.filter((item) => {
    return item !== undefined;
  });
  return filteredResult;
};

export const getQuantiles = (dataset, n_classes) => {
  let sortedDataset = dataset.sort();
  console.log(sortedDataset);
  let arrayLength = sortedDataset.length;
  let equalClassCount = Math.round(arrayLength / n_classes);
  console.log(arrayLength, equalClassCount);
  let classesArray = [];
  for (let i = 0; i < n_classes; i++) {
    console.log(i * equalClassCount);
    classesArray.push(sortedDataset[i * equalClassCount]);
  }
  return classesArray;
};
