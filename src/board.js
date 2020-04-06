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
    const possibleLeftIdx = mid > 0 ? mid - 1 : 0;
    const possibleRightIdx = mid === board.length - 1 ? mid : mid + 1;
    const possibleTopIdx = mid - width < 0 ? mid : mid - width;
    const possibleBottomIdx = mid + width > board.length ? mid : mid + width;
    this.setState({
      zero: zeroIndex,
      possibleTopIdx: possibleTopIdx,
      possibleRightIdx: possibleRightIdx,
      possibleBottomIdx: possibleBottomIdx,
      possibleLeftIdx: possibleLeftIdx
    });
  };
  getCoordFromIndex = (idx, size) => {
    return {
      row: Math.floor(idx / size) + 1,
      column: (idx % size) + 1
    };
  };
  getIndexFromCoord = (row, col, size) => {
    return size * (row - 1) + col - 1;
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
    this.setState({ count: this.state.count + 1 });

    const indexx = this.props.sprite.indexOf(index);
    if (indexx > -1) {
      this.props.sprite.splice(indexx, 1);
    }
    this.props.updateSprite(this.props.board, this.props.sprite, index);
    if (this.props.sprite.length === 0) {
      alert(`Game Over. Total moves to save princess: ${this.state.count}`);
      window.location.href = "/";
    }
  };
  render() {
    const squares = this.props.board.map((val, index) => {
      if ((index + 1) % this.props.width === 0) {
        if (this.props.sprite.includes(val)) {
          return (
            <span key={"i" + index}>
              <img
                key={index}
                alt="sprite"
                style={{ width: 60, height: 60 }}
                src={sprite}
                onClick={() => this.cellClickHandler(index)}
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
      if (this.props.sprite.includes(val)) {
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
