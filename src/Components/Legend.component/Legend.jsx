export const Legend = ({ mapTitle, classes }) => {
  let styleBox1 = {
    backgroundColor: "#f7f4f9",
    padding: "15px",
  };
  let legendArray = [];
  let colourArray = [
    "#fff7fb",
    "#ece2f0",
    "#d0d1e6",
    "#a6bddb",
    "#67a9cf",
    "#3690c0",
    "#02818a",
    "#016c59",
    "#014636",
    "#023020"
  ];

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
