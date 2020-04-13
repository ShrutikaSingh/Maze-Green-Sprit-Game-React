import React, { Component } from "react";
import Cell from "./cell";
import sprite from "./imgs/green.jpg";

export default class Board extends Component {
  state = {
    count: 1,
    zero: "",
    possibleTopIdx: "",
    possiblRightIdx: "",
    possiblBottomIdx: "",
    possibleLeftIdx: ""
  };
  componentDidMount() {
    this.size = this.props.height * this.props.width;
    this.findClickables(
      this.props.board,
      this.props.mid,
      this.props.height,
      this.props.width
    );
    document.addEventListener("keydown", this._handleKeyDown);
  }
  componentWillReceiveProps(nextProps) {
    this.findClickables(
      nextProps.board,
      nextProps.mid,
      nextProps.height,
      nextProps.width
    );
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.mid !== this.props.mid;
  }
  _handleKeyDown = event => {
    switch (event.keyCode) {
      case 37:
        this.cellClickHandler(this.state.possibleLeftIdx);
        break;
      case 38:
        this.cellClickHandler(this.state.possibleTopIdx);
        break;
      case 39:
        this.cellClickHandler(this.state.possibleRightIdx);
        break;
      case 40:
        this.cellClickHandler(this.state.possibleBottomIdx);
        break;
      default:
        alert("error occurred");
    }
  };
  findClickables = (board, mid, height, width) => {
    const zeroIndex = board.indexOf(0);
    mid = Number(mid);
    height = Number(height);
    width = Number(width);
    const possibleLeftIdx = mid > 0 ? mid - 1 : 0;  //allow left move until mid is greater mid is greater than zero for every left mid becomes mid-1

    const possibleRightIdx = mid === board.length - 1 ? mid : mid + 1; //if mid has reached the board length-1 means end then don't increase it else increase it
    const possibleTopIdx = mid - width < 0 ? mid : mid - width; //if up arrow then mid-10, in 1st row the value of mid is (0to9) therefore if mid-10<0 , there can't go more up
    const possibleBottomIdx = mid + width > board.length ? mid : mid + width;
    this.setState({
      zero: zeroIndex,
      possibleTopIdx: possibleTopIdx,
      possibleRightIdx: possibleRightIdx,
      possibleBottomIdx: possibleBottomIdx,
      possibleLeftIdx: possibleLeftIdx
    });
  };
  cellClickHandler = index => {
    if (
      index === this.state.possibleTopIdx ||
      index === this.state.possibleRightIdx ||
      index === this.state.possibleBottomIdx ||
      index === this.state.possibleLeftIdx
    )
      this.nextBoard(index);
  };
  nextBoard = index => {
    this.setState({ count: this.state.count + 1 }); //count is to count number of steps mario takes
    const indexx = this.props.sprite.indexOf(index);  //since this.props.spirit is the array if indexes of spirits, it returns the index of first item in the spirit array
    if (indexx > -1) { //if the index of mario from spirit is -1 , then remove the spirit at that index
      this.props.sprite.splice(indexx, 1);//removes 1 elements at index of indexx basically removes one spirit at index of indexx
    }
    this.props.updateSprite(this.props.board, this.props.sprite, index); //index is basically mid that is basically the position where mario currently is
    if (this.props.sprite.length === 0) {// this.props.sprite.length is the length of array of spirits if its becomes 0, means game over
      alert(`Game Over. Total moves to save princess: ${this.state.count}`);
      window.location.href = "/"; //localhost:3000
    }
  };
  render() {
    const squares = this.props.board.map((val, index) => { //this code is basically for random generation of spirits and the else part is for cells
      if ((index + 1) % this.props.width === 0) { //// it can be (index+2) but in that case the board will not look good
        if (this.props.sprite.includes(val)) {
          return (
            <span key={"i" + index}>
              <img
                key={index}
                alt="sprite"
                style={{ width: 60, height: 60 }}
                src={sprite} 
                onClick={() => this.cellClickHandler(index)} //will return the next board position after key pressed
              />
              <br />
            </span>
          );
        } else {
          return (
            <span key={"i" + index}>
              {
                <Cell
                  key={index}
                  value={val}
                  sprite={this.props.sprite}
                  player={this.props.mid}
                  clickHandler={() => this.cellClickHandler(index)}
                />
              }
              <br />
            </span>
          );
        }
      }
      if (this.props.sprite.includes(val)) { //if index of sprites containes val then place the spirits there
        return (
          <img
            key={index}
            alt="sprite"
            style={{ width: 60, height: 60 }}
            src={sprite}
            onClick={() => this.cellClickHandler(index)}
          />
        );
      } else {
        return (
          <Cell
            key={index}
            value={val}
            player={this.props.mid}
            clickHandler={() => this.cellClickHandler(index)}
          />
        );
      }
    });
    return <div className="board">{squares}</div>;
  }
}
