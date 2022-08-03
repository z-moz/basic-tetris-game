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

// grid[0][22].classList.add("yellow");
// grid[9][23].classList.add("yellow");

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
  shiftBlock(direction) {
    this.removeBlock();
    this.Ax += direction;
    this.Bx += direction;
    this.Cx += direction;
    this.Ox += direction;
    this.drawBlock();
  }
  rotateClockwise() {
    this.removeBlock();
    let oldAx = this.Ax;
    let oldBx = this.Bx;
    let oldCx = this.Cx;
    this.Ax = -(this.Ay - this.Oy) + this.Ox;
    this.Ay = oldAx - this.Ox + this.Oy;
    this.Bx = -(this.By - this.Oy) + this.Ox;
    this.By = oldBx - this.Ox + this.Oy;
    this.Cx = -(this.Cy - this.Oy) + this.Ox;
    this.Cy = oldCx - this.Ox + this.Oy;
    this.drawBlock();
  }
  rotateAnticlockwise() {
    this.removeBlock();
    let oldAx = this.Ax;
    let oldBx = this.Bx;
    let oldCx = this.Cx;
    this.Ax = this.Ay - this.Oy + this.Ox;
    this.Ay = -(oldAx - this.Ox) + this.Oy;
    this.Bx = this.By - this.Oy + this.Ox;
    this.By = -(oldBx - this.Ox) + this.Oy;
    this.Cx = this.Cy - this.Oy + this.Ox;
    this.Cy = -(oldCx - this.Ox) + this.Oy;
    this.drawBlock();
  }
  handleEvent(e) {
    switch (e.code) {
      case "ArrowUp":
        this.rotateClockwise();
        break;
      case "ArrowLeft":
        this.shiftBlock(-1);
        break;
      case "ArrowRight":
        this.shiftBlock(1);
        break;
      case "ArrowDown":
        this.dropBlock();
        break;
    }
  }
}

const yellowL = new Block(4, 1, 4, 0, 6, 0, 5, 0, "yellow");
yellowL.drawBlock();
