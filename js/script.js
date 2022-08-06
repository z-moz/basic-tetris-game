let arrayOfBlocks = [
  [4, 0, 5, 0, 7, 0, 6, 0, "aqua"],
  [4, 0, 4, 1, 6, 1, 5, 1, "blue"],
  [4, 1, 6, 1, 6, 0, 5, 1, "darkorange"],
  [4, 0, 4, 1, 5, 0, 5, 1, "yellow"],
  [4, 1, 5, 0, 6, 0, 5, 1, "green"],
  [4, 1, 5, 0, 6, 1, 5, 1, "blueviolet"],
  [4, 0, 5, 0, 6, 1, 5, 1, "red"],
];

let oldAx;
let oldBx;
let oldCx;
let oldOx;
let oldAy;
let oldBy;
let oldCy;
let oldOy;
let interval;
let activeBlock;

const rows = 24;
const columns = 10;
const board = document.querySelector("#board");

function generateBlock() {
  activeBlock = new Block(...arrayOfBlocks[Math.floor(Math.random() * 7)]);
  activeBlock.draw();
}

function deleteFullRow() {
  // finds full row, returns row number
  for (let i = 0; i < rows; i++) {
    let count = 0;
    for (let j = 0; j < columns; j++) {
      if (grid[i][j].classList.contains("empty") === false) {
        count++;
      }
    }
    if (count === 10) {
      let fullRowNumber = i;
      // deletes full row from HTML and then script
      grid[fullRowNumber].forEach((element) => element.remove());
      grid.splice(fullRowNumber, 1);
      // add row 0 to the script and HTML
      const newRow0 = new Array();
      grid.unshift(newRow0);
      for (let k = 0; k < columns; k++) {
        const cell = document.createElement("div");
        cell.classList.add("empty");
        newRow0.unshift(cell);
        board.prepend(cell);
      }
    }
  }
}

// create grid
// order of coordinates: grid[y][x] or grid[row][column]
let grid = new Array(rows);
for (let i = 0; i < rows; i++) {
  grid[i] = new Array(columns);
  for (let j = 0; j < columns; j++) {
    const cell = document.createElement("div");
    cell.classList.add("empty");
    grid[i][j] = cell;
    board.append(cell);
  }
}

class Block {
  constructor(Ax, Ay, Bx, By, Cx, Cy, Ox, Oy, color) {
    this.Ax = Ax;
    this.Ay = Ay;
    this.Bx = Bx;
    this.By = By;
    this.Cx = Cx;
    this.Cy = Cy;
    this.Ox = Ox;
    this.Oy = Oy;
    this.color = color;
    document.addEventListener("keyup", this);
  }
  draw() {
    grid[this.Ay][this.Ax].classList.add(this.color);
    grid[this.By][this.Bx].classList.add(this.color);
    grid[this.Cy][this.Cx].classList.add(this.color);
    grid[this.Oy][this.Ox].classList.add(this.color);
    grid[this.Ay][this.Ax].classList.remove("empty");
    grid[this.By][this.Bx].classList.remove("empty");
    grid[this.Cy][this.Cx].classList.remove("empty");
    grid[this.Oy][this.Ox].classList.remove("empty");
  }
  delete() {
    grid[this.Ay][this.Ax].classList.remove(this.color);
    grid[this.By][this.Bx].classList.remove(this.color);
    grid[this.Cy][this.Cx].classList.remove(this.color);
    grid[this.Oy][this.Ox].classList.remove(this.color);
    grid[this.Ay][this.Ax].classList.add("empty");
    grid[this.By][this.Bx].classList.add("empty");
    grid[this.Cy][this.Cx].classList.add("empty");
    grid[this.Oy][this.Ox].classList.add("empty");
  }
  storeOrigXY() {
    oldAx = this.Ax;
    oldBx = this.Bx;
    oldCx = this.Cx;
    oldOx = this.Ox;
    oldAy = this.Ay;
    oldBy = this.By;
    oldCy = this.Cy;
    oldOy = this.Oy;
  }
  returnOrigXY() {
    this.Ax = oldAx;
    this.Bx = oldBx;
    this.Cx = oldCx;
    this.Ox = oldOx;
    this.Ay = oldAy;
    this.By = oldBy;
    this.Cy = oldCy;
    this.Oy = oldOy;
  }
  // to left: shiftXY(-1, 0), to right: shiftXY(1, 0), down: shiftXY(0, 1), up: shiftXY(0, -1)
  shiftXY(a, b) {
    this.Ax += a;
    this.Bx += a;
    this.Cx += a;
    this.Ox += a;
    this.Ay += b;
    this.By += b;
    this.Cy += b;
    this.Oy += b;
  }
  // clockwise: rotateXY(-1,1), anticlockwise: rotateXY(1,-1)
  rotateXY(a, b) {
    this.Ax = a * (this.Ay - this.Oy) + this.Ox;
    this.Ay = b * (oldAx - this.Ox) + this.Oy;
    this.Bx = a * (this.By - this.Oy) + this.Ox;
    this.By = b * (oldBx - this.Ox) + this.Oy;
    this.Cx = a * (this.Cy - this.Oy) + this.Ox;
    this.Cy = b * (oldCx - this.Ox) + this.Oy;
  }
  wallKickFloorKick() {
    while (this.Ax < 0 || this.Bx < 0 || this.Cx < 0 || this.Ox < 0) {
      this.shiftXY(1, 0);
    }
    while (this.Ax > 9 || this.Bx > 9 || this.Cx > 9 || this.Ox > 9) {
      this.shiftXY(-1, 0);
    }
    while (this.Ay > 23 || this.By > 23 || this.Cy > 23 || this.Oy > 23) {
      this.shiftXY(0, -1);
    }
  }
  isCellEmpty() {
    if (
      grid[this.Ay][this.Ax].classList.contains("empty") &&
      grid[this.By][this.Bx].classList.contains("empty") &&
      grid[this.Cy][this.Cx].classList.contains("empty") &&
      grid[this.Oy][this.Ox].classList.contains("empty")
    ) {
      return true;
    } else {
      return false;
    }
  }
  move(a, b, operation) {
    this.delete();
    this.storeOrigXY();
    switch (operation) {
      case "rotate":
        this.rotateXY(a, b);
        break;
      case "shift":
        this.shiftXY(a, b);
        break;
    }
    this.wallKickFloorKick();
    if (!this.isCellEmpty()) {
      this.returnOrigXY();
    }
    this.draw();
  }
  handleEvent(e) {
    switch (e.code) {
      case "ArrowUp":
        this.move(-1, 1, "rotate");
        break;
      case "ArrowLeft":
        this.move(-1, 0, "shift");
        break;
      case "ArrowRight":
        this.move(1, 0, "shift");
        break;
      case "ArrowDown":
        this.move(0, 1, "shift");
        break;
    }
  }
  stop() {
    document.removeEventListener("keyup", this);
    deleteFullRow();
    generateBlock();
    // when highest row is filled with a block:
    // clearInterval(interval);
    // alert("GAME OVER");
  }
  fall() {
    this.delete();
    this.storeOrigXY();
    this.shiftXY(0, 1);
    if (
      this.Ay > 23 ||
      this.By > 23 ||
      this.Cy > 23 ||
      this.Oy > 23 ||
      !this.isCellEmpty()
    ) {
      this.returnOrigXY();
      this.draw();
      this.stop();
    } else {
      this.draw();
    }
  }
}

generateBlock();
interval = setInterval(function () {
  activeBlock.fall(0, 1, "shift");
}, 500);
