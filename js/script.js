const rows = 24;
const columns = 10;
const board = document.querySelector("#board");

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
// coordinates are: grid[y][x] or grid[row][column]

// grid[0][8].classList.add("yellow");
// grid[0][9].classList.add("yellow");

// grid[7][5].classList.add("yellow");
// grid[7][7].classList.add("yellow");

// function switchRowToYellow(row) {
//   grid[row].forEach((element) => {
//     element.classList.add("yellow");
//     element.classList.toggle("empty");
//   });
// }

// switchRowToYellow(4);
// switchRowToYellow(11);
// switchRowToYellow(23);

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
  drawBlock() {
    grid[this.Ay][this.Ax].classList.add(this.color);
    grid[this.By][this.Bx].classList.add(this.color);
    grid[this.Cy][this.Cx].classList.add(this.color);
    grid[this.Oy][this.Ox].classList.add(this.color);
    grid[this.Ay][this.Ax].classList.toggle("empty");
    grid[this.By][this.Bx].classList.toggle("empty");
    grid[this.Cy][this.Cx].classList.toggle("empty");
    grid[this.Oy][this.Ox].classList.toggle("empty");
  }
  removeBlock() {
    grid[this.Ay][this.Ax].classList.remove(this.color);
    grid[this.By][this.Bx].classList.remove(this.color);
    grid[this.Cy][this.Cx].classList.remove(this.color);
    grid[this.Oy][this.Ox].classList.remove(this.color);
    grid[this.Ay][this.Ax].classList.toggle("empty");
    grid[this.By][this.Bx].classList.toggle("empty");
    grid[this.Cy][this.Cx].classList.toggle("empty");
    grid[this.Oy][this.Ox].classList.toggle("empty");
  }
  dropBlock() {
    this.removeBlock();
    this.Ay += 1;
    this.By += 1;
    this.Cy += 1;
    this.Oy += 1;
    this.drawBlock();
  }
  // left: shiftBlock(-1), right: shiftBlock(1)
  shiftBlock(direction) {
    this.removeBlock();
    this.Ax += direction;
    this.Bx += direction;
    this.Cx += direction;
    this.Ox += direction;
    this.drawBlock();
  }
  wallKick() {
    while (this.Ax < 0 || this.Bx < 0 || this.Cx < 0 || this.Ox < 0) {
      this.shiftBlock(1);
    }
    while (this.Ax > 9 || this.Bx > 9 || this.Cx > 9 || this.Ox > 9) {
      this.shiftBlock(-1);
    }
  }

  // clockwise: rotateBlock(-1,1), anticlockwise: rotateBlock(1,-1)
  rotateBlock(m, n) {
    this.removeBlock();
    let oldAx = this.Ax;
    let oldBx = this.Bx;
    let oldCx = this.Cx;
    this.Ax = m * (this.Ay - this.Oy) + this.Ox;
    this.Ay = n * (oldAx - this.Ox) + this.Oy;
    this.Bx = m * (this.By - this.Oy) + this.Ox;
    this.By = n * (oldBx - this.Ox) + this.Oy;
    this.Cx = m * (this.Cy - this.Oy) + this.Ox;
    this.Cy = n * (oldCx - this.Ox) + this.Oy;
    this.wallKick();
    this.drawBlock();
  }
  handleEvent(e) {
    switch (e.code) {
      case "ArrowUp":
        this.rotateBlock(-1, 1);
        break;
      case "ArrowLeft":
        this.shiftBlock(-1);
        break;
      case "ArrowRight":
        this.shiftBlock(1);
        break;
      case "ArrowDown":
        this.dropBlock();
        // document.removeEventListener("keyup", this);
        break;
    }
  }
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
      const newrowzero = new Array();
      grid.unshift(newrowzero);
      for (let k = 0; k < columns; k++) {
        const cell = document.createElement("div");
        cell.classList.add("empty");
        newrowzero.unshift(cell);
        board.prepend(cell);
      }
    }
  }
}

const yellowL = new Block(5, 2, 6, 2, 8, 2, 7, 2, "yellow");
yellowL.drawBlock();

deleteFullRow();
