// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");

// function drawTeeshape() {
//   ctx.fillRect(150, 0, 50, 50);
//   ctx.fillRect(200, 0, 50, 50);
//   ctx.fillRect(250, 0, 50, 50);
//   ctx.fillRect(200, 50, 50, 50);
// }

// drawTeeshape();

// const squares = document.querySelectorAll(".square");
// let a = 0;
// let b = 0;
// let c = 0;
// let d = 0;
// let squareColor = "yellow";

// function rotation1() {
//   a = 14;
//   b = 15;
//   c = 16;
//   d = 17;
// }

// function rotation2() {
//   a -= 8;
//   b += 1;
//   c += 10;
//   d += 19;
// }

// function rotation3() {
//   a += 21;
//   b += 10;
//   c -= 1;
//   d -= 12;
// }

// function rotation4() {
//   a += 8;
//   b -= 1;
//   c -= 10;
//   d -= 19;
// }

// function rotation5() {
//   a -= 21;
//   b -= 10;
//   c += 1;
//   d += 12;
// }

// function spawnBlock() {
//   squares[a].classList.add(squareColor);
//   squares[b].classList.add(squareColor);
//   squares[c].classList.add(squareColor);
//   squares[d].classList.add(squareColor);
// }

// rotation1();
// rotation2();
// spawnBlock();

// function removeBlock() {
//   squares[a].classList.remove(squareColor);
//   squares[b].classList.remove(squareColor);
//   squares[c].classList.remove(squareColor);
//   squares[d].classList.remove(squareColor);
// }

// function dropBlock() {
//   removeBlock();
//   a += 10;
//   b += 10;
//   c += 10;
//   d += 10;
//   spawnBlock();
// }

// dropBlock();
// dropBlock();
// dropBlock();

const height = 24;
const width = 10;
const board = document.querySelector("#board");

let grid = new Array(width);
for (let i = 0; i < width; i++) {
  grid[i] = new Array(height);
  for (let j = 0; j < height; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid[i][j] = cell;
    board.append(cell);
  }
}

grid[0][22].classList.add("yellow");
grid[9][23].classList.add("yellow");

// main class for block
// properties: coordinates, x and y for a b c and d each
// functions: draw block,
// remove block,
// rotate(remove block, change coordinates, draw block),
// drop(remove block, increase y coordinates, draw block),
// move sideways(remove block, change x coordinates, draw block)

class Block {
  constructor(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, color) {
    this.Ax = Ax;
    this.Ay = Ay;
    this.Bx = Bx;
    this.By = By;
    this.Cx = Cx;
    this.Cy = Cy;
    this.Dx = Dx;
    this.Dy = Dy;
    this.color = color;
  }
  drawBlock() {
    grid[this.Ax][this.Ay].classList.add(this.color);
    grid[this.Bx][this.By].classList.add(this.color);
    grid[this.Cx][this.Cy].classList.add(this.color);
    grid[this.Dx][this.Dy].classList.add(this.color);
  }
  removeBlock() {
    grid[this.Ax][this.Ay].classList.remove(this.color);
    grid[this.Bx][this.By].classList.remove(this.color);
    grid[this.Cx][this.Cy].classList.remove(this.color);
    grid[this.Dx][this.Dy].classList.remove(this.color);
  }
  dropBlock() {
    this.removeBlock();
    this.Ay += 1;
    this.By += 1;
    this.Cy += 1;
    this.Dy += 1;
    this.drawBlock();
  }
  shiftBlock(direction) {
    this.removeBlock();
    this.Ax += direction;
    this.Bx += direction;
    this.Cx += direction;
    this.Dx += direction;
    this.drawBlock();
  }
}

const yellowL = new Block(4, 0, 5, 0, 6, 0, 4, 1, "yellow");
yellowL.drawBlock();
yellowL.dropBlock();
yellowL.dropBlock();
yellowL.dropBlock();
yellowL.shiftBlock(-2);
