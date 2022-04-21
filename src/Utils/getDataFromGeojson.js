
export const getDataFromGeojson = (geometry) => {
    let valueArray = []
    // console.log(geometry)
    let features = geometry.features
    // console.log(features)

let properties = features.forEach((item) => {
    valueArray.push(item.properties.SHAPE_Area)
})
// console.log(valueArray)
return valueArray
}