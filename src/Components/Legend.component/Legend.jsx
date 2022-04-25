export const Legend = ({ mapTitle, classes, colourArray }) => {
  let legendArray = [];
  for (let i = 0; i < classes.length; i++) {
    let legendObject = {};
    legendObject.id = i;
    legendObject.value = classes[i];
    legendObject.hexColour = colourArray[i];
    legendArray.push(legendObject);
  }

  return (
    <div className="legend">
      <div className="AlgoName">{mapTitle}</div>
      {legendArray.map((item) => {
        return (
          <div className="legendRow">
            <div className="legendValue">{item.value.toPrecision(3)}</div>
            <div
              style={{
                backgroundColor: item.hexColour,
                padding: "15px",
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};
