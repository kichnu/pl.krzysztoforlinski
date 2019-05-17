const parameters = {
  numberColumns: 10,
  numberRows: 15,
  numberColors: 10,
  numberLevels: 2,
  speedMoveDownMax: 50,
  speedMoveDown: 1000,
  numberPoints: 0,
  arrayColors: []
};

function permissioToStart() {
  createSizeBlock();
  createSpeedMoveDown();
  createArrayColors();
  addNewBlock();
  move();
}

document.querySelector(".column-display").innerText = parameters.numberColumns;
document.querySelector(".row-display").innerText = parameters.numberRows;
document.querySelector(".color-display").innerText = parameters.numberColors;
document.querySelector(".level-display").innerText = parameters.numberLevels;

document.querySelector("nav").addEventListener("click", function(e) {
  if (e.target.classList.contains("columns-minus")) {
    parameters.numberColumns -= 5;
    if (parameters.numberColumns >= 5) {
      document.querySelector(".column-display").innerText =
        parameters.numberColumns;
    } else parameters.numberColumns = 5;
  }
  if (e.target.classList.contains("rows-minus")) {
    parameters.numberRows -= 5;
    if (parameters.numberRows >= 10) {
      document.querySelector(".row-display").innerText = parameters.numberRows;
    } else parameters.numberRows = 10;
  }
  if (e.target.classList.contains("colors-minus")) {
    parameters.numberColors -= 1;
    if (parameters.numberColors >= 1) {
      document.querySelector(".color-display").innerText =
        parameters.numberColors;
    } else parameters.numberColors = 1;
  }
  if (e.target.classList.contains("levels-minus")) {
    parameters.numberLevels -= 1;
    if (parameters.numberLevels >= 1) {
      document.querySelector(".level-display").innerText =
        parameters.numberLevels;
    } else parameters.numberLevels = 1;
  }

  if (e.target.classList.contains("columns-plus")) {
    parameters.numberColumns += 5;
    if (parameters.numberColumns <= 25) {
      document.querySelector(".column-display").innerText =
        parameters.numberColumns;
    } else parameters.numberColumns = 25;
  }
  if (e.target.classList.contains("rows-plus")) {
    parameters.numberRows += 5;
    if (parameters.numberRows <= 25) {
      document.querySelector(".row-display").innerText = parameters.numberRows;
    } else parameters.numberRows = 25;
  }
  if (e.target.classList.contains("colors-plus")) {
    parameters.numberColors += 1;
    if (parameters.numberColors <= 19) {
      document.querySelector(".color-display").innerText =
        parameters.numberColors;
    } else parameters.numberColors = 19;
  }
  if (e.target.classList.contains("levels-plus")) {
    parameters.numberLevels += 1;
    if (parameters.numberLevels <= 3) {
      document.querySelector(".level-display").innerText =
        parameters.numberLevels;
    } else parameters.numberLevels = 3;
  }

  if (e.target.classList.contains("control")) {
    const classStop = document.querySelector(".control");
    const guidebook = document.querySelector(".guidebook");
    if (classStop.classList.contains("stop")) {
      classStop.classList.remove("stop");
      classStop.innerText = "Start";
      location.reload();
    } else {
      classStop.classList.add("stop");
      guidebook.classList.add("hidden");
      classStop.innerText = "Stop";
      permissioToStart();
    }
  }
});
