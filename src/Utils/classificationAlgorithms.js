import { Jenks } from "jenks";

export const getEqualIntervals = (dataset, n_classes) => {
  const lowestValue = Math.min(...dataset);
  const highestValue = Math.max(...dataset);
  const classRange = (highestValue - lowestValue) / n_classes;
  let resultArray = [];
  resultArray[0] = lowestValue + classRange;
  for (let i = 0; i < (n_classes - 1); i++) {
    resultArray.push(resultArray[i] + classRange);
  }


  return resultArray;
};

export const getNaturalBreaks = (dataset, n_classes) => {
  // console.log(n_classes)
  const numberOfClasses = Number(n_classes) - 1;
  console.log(typeof(numberOfClasses),numberOfClasses)
  let result = new Jenks(dataset, numberOfClasses).naturalBreak();
  let filteredResult = result.filter((item) => {
    return item !== undefined;
  });
  return filteredResult;
};

export const getQuantiles = (dataset, n_classes) => {
  console.log(n_classes)

  let sortedDataset = dataset.sort();
  let arrayLength = sortedDataset.length;
  let equalClassCount = Math.round(arrayLength / n_classes);
  let classesArray = [];
  for (let i = 0; i < n_classes; i++) {
    classesArray.push(sortedDataset[i * equalClassCount]);
  }
  return classesArray;
};

// export const getLogScale = (dataset, n_classes) => {
//     let sortedDataset = dataset.sort();
//     const highestValue = Math.max(...dataset);
//     let classesArray = [];
//     for (let i = 0; i < n_classes; i++) {
//       classesArray.push(sortedDataset[i * equalClassCount]);
//     }
//     return classesArray;
//   };