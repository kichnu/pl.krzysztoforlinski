const data = {
  withWindow: 0,
  widthCanvas: 0,
  heightCanvas: 0,
  widthBlock: 0,
  heightBlock: 0,
  point: 0
};

const nav = document.querySelector("nav");
const canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");

const listBlocks = [];
let index = -1;

function createSizeCanvas() {
  data.withWindow = window.innerWidth;

  if (data.withWindow > 1800) {
    data.widthCanvas = 1500;
    data.heightCanvas = 600;
  } else if (data.withWindow <= 1800 && data.withWindow > 1100) {
    data.widthCanvas = 800;
    data.heightCanvas = 600;
  } else {
    data.widthCanvas = 500;
    data.heightCanvas = 600;
  }
}

window.onresize = function() {
  createSizeCanvas();
};

window.onload = function() {
  createSizeCanvas();
};

function createSizeBlock() {
  data.widthBlock = data.widthCanvas / parameters.numberColumns;
  data.heightBlock = data.heightCanvas / parameters.numberRows;
}

function createArrayColors() {
  const colors = [
    "red",
    "green",
    "yellow",
    "blue",
    "lime",
    "purple",
    "olive",
    "yellow",
    "navy",
    "blue",
    "teal",
    "aqua",
    "orange",
    "cadetblue",
    "silver",
    "gray",
    "fuchsia",
    "white",
    "maroon"
  ];
  for (let i = 0; i < parameters.numberColors; i++) {
    parameters.arrayColors.push(colors[i]);
  }
}

function randomColorBlock() {
  return parameters.arrayColors[
    Math.floor(Math.random() * parameters.arrayColors.length)
  ];
}

function randomPositionX() {
  return Math.floor(Math.random() * parameters.numberColumns);
}

function addNewBlock() {
  index++;
  block = {
    index: index,
    y: 0,
    x: randomPositionX(),
    color: randomColorBlock()
  };
  listBlocks.push(block);
}

function createSpeedMoveDown(factor = 100) {
  parameters.speedMoveDown =
    (25 / parameters.numberRows / parameters.numberLevels) * factor;
}

function showCanvas() {
  nav.style.height = `${data.heightCanvas}px`;
  canvas.width = data.widthCanvas;
  canvas.height = data.heightCanvas;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  for (let i = 0; i < listBlocks.length; i++) {
    // console.log('draw');
    ctx.fillStyle = listBlocks[i].color;
    ctx.fillRect(
      listBlocks[i].x * data.widthBlock,
      listBlocks[i].y * data.heightBlock,
      data.widthBlock,
      data.heightBlock
    );
  }
}

let canMoveLeft = false;
let canMoveRight = false;

document.addEventListener("keydown", function(e) {
  if (e.keyCode === 37) canMoveLeft = true;
  else if (e.keyCode === 39) canMoveRight = true;
});

document.addEventListener("keydown", function(e) {
  if (e.keyCode === 40) {
    createSpeedMoveDown(30);
  }
});
document.addEventListener("keyup", function(e) {
  if (e.keyCode === 40) {
    createSpeedMoveDown(100);
  }
});

let canAddNewBlock = true;
let canShowGameOver = false;

function canMove() {
  let canDown = true;
  let canLeft = true;
  let canRight = true;

  if (listBlocks[index].x === 0) canLeft = false;
  for (let j = 0; j < listBlocks.length; j++) {
    if (
      listBlocks[index].x === listBlocks[j].x + 1 &&
      listBlocks[index].y === listBlocks[j].y
    )
      canLeft = false;
  }
  if (canMoveLeft && canLeft) {
    listBlocks[index].x -= 1;
    canMoveLeft = false;
  }
  if (listBlocks[index].x > parameters.numberColumns - 2) canRight = false;
  for (let j = 0; j < listBlocks.length; j++) {
    if (
      listBlocks[index].x === listBlocks[j].x - 1 &&
      listBlocks[index].y === listBlocks[j].y
    )
      canRight = false;
  }
  if (canMoveRight && canRight) {
    listBlocks[index].x += 1;
    canMoveRight = false;
  }

  for (let i = 0; i < listBlocks.length; i++) {
    if (listBlocks[index].y === parameters.numberRows - 1) canDown = false;
    if (listBlocks[index].x === listBlocks[i].x && listBlocks.length > 1) {
      if (listBlocks[index].y === listBlocks[i].y - 1) {
        if (listBlocks[index].color != listBlocks[i].color) {
          canDown = false;
          if (!canDown && listBlocks[index].y === 0) {
            canAddNewBlock = false;
          }
        }
      }
    }
  }

  if (
    listBlocks.length === 1 &&
    listBlocks[index].y === parameters.numberRows - 1
  )
    canDown = false;

  if (canDown) {
    listBlocks[index].y += 1;
  } else if (canAddNewBlock) {
    addNewBlock();
    document.querySelector(".result").innerText = data.point += 1;
  }
  if (!canAddNewBlock) gameOver();
}

function gameOver() {
  const gOver = document.querySelector(".game-over");
  const game = document.querySelector(".game");
  const over = document.querySelector(".over");
  if (gameOver.done) return;
  gameOver.done = true;
  gOver.classList.add("show");
  game.innerText = "game";
  over.innerText = "over";

  setInterval(function() {
    gOver.classList.remove("show");
    game.innerText = "";
    over.innerText = "";
  }, 2000);
}

function move() {
  setTimeout(function run() {
    canMove();
    setTimeout(run, parameters.speedMoveDown);
  }, parameters.speedMoveDown);
}

window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 50);
    }
  );
})();

function animation() {
  showCanvas();
  draw();
  window.requestAnimFrame(animation);
}
requestAnimationFrame(animation);
