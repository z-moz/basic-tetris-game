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

grid[0][12].classList.add("yellow");
grid[0][14].classList.add("yellow");

grid[7][12].classList.add("yellow");
grid[7][14].classList.add("yellow");

for (let i = 0; i < width; i++) {
  grid[i][23].classList.add("yellow");
}
// to delete column 7 from the HTML
for (let i = 0; i < height; i++) {
  grid[7][i].remove();
}
// to delete column 7 from the script
grid.splice(7, 1);
console.log(grid);

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
    grid[this.Ax][this.Ay].classList.add(this.color);
    grid[this.Bx][this.By].classList.add(this.color);
    grid[this.Cx][this.Cy].classList.add(this.color);
    grid[this.Ox][this.Oy].classList.add(this.color);
  }
  removeBlock() {
    grid[this.Ax][this.Ay].classList.remove(this.color);
    grid[this.Bx][this.By].classList.remove(this.color);
    grid[this.Cx][this.Cy].classList.remove(this.color);
    grid[this.Ox][this.Oy].classList.remove(this.color);
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

const yellowL = new Block(0, 1, 0, 0, 2, 0, 1, 0, "yellow");
yellowL.drawBlock();
