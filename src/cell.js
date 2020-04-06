import React from "react";
import mario from "./imgs/mario.png";
import blank from "./imgs/blank.png";
const Cell = props => {
  const cls = props.value === props.player ? "square zero" : "square";
  return props.value === props.player ? (
    <img
      className={cls}
      onClick={() => props.clickHandler()}
      alt="person"
      style={{ width: 60 }}
      src={mario}
    />
  ) : (
    <img
      className={cls}
      onClick={() => props.clickHandler()}
      style={{ width: 60 }}
      alt={props.value}
      src={blank}
    />
  );
};

export default Cell;
