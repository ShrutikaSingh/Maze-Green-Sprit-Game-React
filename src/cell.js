import React from "react";
import mario from "./imgs/mario.png";
import blank from "./imgs/blank.png";
const Cell = props => {
  const cls = props.value === props.player ? "square zero" : "square";  //for outlining square see in css .square
  return props.value === props.player ? ( //if value coming from porps is that of mario iindex, place the mario image there
    <img
      className={cls}
      onClick={() => props.clickHandler()}
      alt="mario"
      style={{ width: 60 }}
      src={mario}
    />
  ) : (
    <img
      className={cls}
      onClick={() => props.clickHandler()}
      style={{ width: 60 }}
      alt={props.value} //else value is all those are which are blank ,keep the blank images
      src={blank}
    />
  );
};

export default Cell;
