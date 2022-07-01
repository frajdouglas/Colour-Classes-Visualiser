export const getDataFromGeojson = (metricName, geometry) => {
  let valueArray = [];
  console.log(geometry, metricName);
  let features = JSON.parse(geometry).features;
  features.forEach((item) => {
    valueArray.push(item.properties[metricName]);
  });
  return valueArray;
};

export const getMetricsListFromGeojson = (geometry) => {
  let properties = JSON.parse(geometry).features[0].properties;
  console.log(properties)
  let metricsList = Object.keys(properties);
  let filteredMetricsList = metricsList.filter((item) => {
    return typeof(properties[item]) === 'number'
  })
  return filteredMetricsList;
};
