let globalQueue = [];
let options = {
  output: document.getElementById("displayOutput").getContext("2d"),
  mousePressed: false,
  brushSize: 5,
  brushColor: "#FFFFFF",
  lastCoordinate: 0,
  lastWebCoordinate: 10,
}

function setup() {
  options.output.fillStyle = options.brushColor;
  options.output.strokeStyle = options.brushColor;
}

function renderDisplay(coordinates) {
  options.output.beginPath();
  options.output.arc(coordinates[0], coordinates[1], options.brushSize, 0, 2 * Math.PI, false);
  options.output.fill();
  options.output.stroke();
}

function drawRectangle(event) {
  if (options.mousePressed) {
    renderDisplay([event.offsetX, event.offsetY]);
    globalQueue.push([event.offsetX, event.offsetY]);
  }
}

function connectDots() {
  options.output.lineWidth = (options.brushSize*2)+1;
  for (coordinate=options.lastCoordinate; coordinate<globalQueue.length-1; coordinate++) {
    options.output.beginPath();
    options.output.moveTo(globalQueue[coordinate][0], globalQueue[coordinate][1]);
    options.output.lineTo(globalQueue[coordinate+1][0], globalQueue[coordinate+1][1]);
    options.output.stroke();
  }
  options.lastCoordinate = globalQueue.length;
  options.output.lineWidth = 1;
}

function triggerDrawOn(event) {
  options.mousePressed = true;
  drawRectangle(event);
}

function triggerDrawOff() {
  options.mousePressed = false;
  connectDots();
}

function changeColor(colorPicker) {
  options.output.fillStyle = colorPicker.value;
  options.output.strokeStyle = colorPicker.value;
}

function changeBrush(brushPicker) {
  options.brushSize = brushPicker.value;
}

function renderWebEffect() {
  options.output.lineWidth = (options.brushSize*2)+1;
  for (coordinate=options.lastWebCoordinate; coordinate<globalQueue.length-1; coordinate++) {
    options.output.beginPath();
    options.output.moveTo(globalQueue[coordinate][0], globalQueue[coordinate][1]);
    options.output.lineTo(globalQueue[coordinate-10][0], globalQueue[coordinate-10][1]);
    options.output.stroke();
  }
  options.lastWebCoordinate=globalQueue.length+10;
  options.output.lineWidth = 1;
}

function clearCanvas() {
  options.output.clearRect(0, 0, 1000, 450);
  globalQueue=[];
  options.lastCoordinate = 0;
  options.lastWebCoordinate = 10;
}

setup();