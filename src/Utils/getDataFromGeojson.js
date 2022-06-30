export const getDataFromGeojson = (geometry) => {
  let valueArray = [];
  console.log(geometry);
  // let features = JSON.parse(geometry).features
  let features = geometry.features;
  // console.log(features)

  let properties = features.forEach((item) => {
    valueArray.push(item.properties.SHAPE_Area);
  });
  // console.log(valueArray)
  return valueArray;
};

export const getMetricsFromGeojson = (metricName, geometry) => {
  let valueArray = [];
  console.log(geometry, metricName);
  let features = JSON.parse(geometry).features;
  //     let features = geometry.features
  console.log(features);

  features.forEach((item) => {
    valueArray.push(item.properties[metricName]);
  });
  console.log(valueArray);
  return valueArray;
};
