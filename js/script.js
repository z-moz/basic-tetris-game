// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");

// function drawTeeshape() {
//   ctx.fillRect(150, 0, 50, 50);
//   ctx.fillRect(200, 0, 50, 50);
//   ctx.fillRect(250, 0, 50, 50);
//   ctx.fillRect(200, 50, 50, 50);
// }

// drawTeeshape();

const squares = document.querySelectorAll(".square");
let a = 0;
let b = 0;
let c = 0;
let d = 0;
let squareColor = "yellow";

function rotation1() {
  a = 14;
  b = 15;
  c = 16;
  d = 17;
}

function rotation2() {
  a -= 8;
  b += 1;
  c += 10;
  d += 19;
}

function rotation3() {
  a += 21;
  b += 10;
  c -= 1;
  d -= 12;
}

function rotation4() {
  a += 8;
  b -= 1;
  c -= 10;
  d -= 19;
}

function rotation5() {
  a -= 21;
  b -= 10;
  c += 1;
  d += 12;
}

function spawnBlock() {
  squares[a].classList.add(squareColor);
  squares[b].classList.add(squareColor);
  squares[c].classList.add(squareColor);
  squares[d].classList.add(squareColor);
}

rotation1();
rotation2();
spawnBlock();

function removeBlock() {
  squares[a].classList.remove(squareColor);
  squares[b].classList.remove(squareColor);
  squares[c].classList.remove(squareColor);
  squares[d].classList.remove(squareColor);
}

function dropBlock() {
  removeBlock();
  a += 10;
  b += 10;
  c += 10;
  d += 10;
  spawnBlock();
}

dropBlock();
dropBlock();
dropBlock();
