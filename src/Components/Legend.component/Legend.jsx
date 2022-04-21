export const Legend = ({mapTitle, classes}) => {
    console.log(classes, mapTitle
        )
  return (
    <div  >
      <div>{mapTitle}</div>
      {classes.map((item) => {
        return (
          <ul key={item}>
            <li>{item.toPrecision(3)}</li>
          </ul>
        );
      })}
    </div>
  );
};
