import React, { Component } from "react";
import "./app.css";

import Board from "./board";

class App extends Component {
  state = {
    board: [],
    height: 0,
    width: 0,
    mid: 0,
    sprite: []
  };

  componentWillMount() {
    const height = prompt("Please enter board height ?");
    if (/^\d+$/.test(height)) {
      const width = prompt("Please enter board width ?");
      if (/^\d+$/.test(width)) {
        this.newGame(height, width);
      } else {
        alert("Please input only numbers");
        window.location.href = "/";
      }
    } else {
      alert("Please input only numbers");
      window.location.href = "/";
    }
  }

  newGame = (height, width) => {
    let size = height * width,
      board = new Array(size);
      var n,
      r = [];
    for (let i = 0; i < board.length; ++i) board[i] = i;
    let bl = JSON.parse(JSON.stringify(board));// it's 0to99 for 10*10 array
    let mid = Math.round(Math.abs((size - 1) / 2)); //50
    bl.splice(mid, 1); //removes one element at the index of mid i.e remove 50 from 0 to 99
    for (n = 1; n <= height; ++n) { //we can change n range to generate the number of spirits
      var i = Math.floor(Math.random() * (bl.length - n) + 1); //for generating 50 random sprits
      r.push(bl[i]);  //generating 50 random sprits
      bl.splice(i, 1); //remove than random number from bl 
    }
    let sprite = r; //aray of the random generated index for sprites
    this.updateBoard(board);
    this.setState({
      height: height,
      width: width,
      mid: mid,
      sprite
    });
  };
  updateBoard = board => {
    this.setState({ board: board });
  };
  updateSprite = (board, sprite, mid) => {
    this.setState({
      board: board, //remains the array of 0 to 99
      sprite: sprite, //get update everytime with the index of the remaining spirits
      mid: Number(mid) //mid is basically the undex where the mario currently is
    });
  };
  render() {
    return (
      <div className="puzzle">
        <h1>Maze-Green-Sprit-Game </h1>
        {this.state && this.state.board ? (
          <Board
            height={this.state.height}
            width={this.state.width}
            board={this.state.board}
            mid={this.state.mid}
            updateSprite={this.updateSprite}
            sprite={this.state.sprite}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
