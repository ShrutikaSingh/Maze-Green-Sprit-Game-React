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
      board = new Array(size),
      sl = new Array(size / 2);
    var n,
      r = [];
    for (let i = 0; i < board.length; ++i) board[i] = i;
    let bl = JSON.parse(JSON.stringify(board));

    let mid = Math.round(Math.abs((size - 1) / 2));
    bl.splice(mid, 1);
    for (n = 1; n <= sl.length; ++n) {
      var i = Math.floor(Math.random() * (bl.length - n) + 1);
      r.push(bl[i]);

      bl.splice(i, 1);
    }
    let sprite = r;

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
      board: board,
      sprite: sprite,
      mid: Number(mid)
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
