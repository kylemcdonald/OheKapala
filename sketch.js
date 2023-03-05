let strokes = [];
let w = 350, h = 60;
let rows, cols;
let inv = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = width / w;
  rows = height / h;
}

function draw() {
  background(inv ? 32 : 224);
  
  noFill();
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      
      push();
      translate(col * w, row * h);
      
      stroke(inv ? 64 : 192);
      strokeWeight(1);
      rect(0, 0, w, h);
      
      if (row % 2 == 0) {
        translate(0, h);
        scale(1, -1);
      }
      
      if (col % 2 == 0) {
        translate(w, 0);
        scale(-1, 1);
      }
      
      stroke(inv ? 250 : 5);
      strokeWeight(4);
      strokes.forEach(p => {
        beginShape();
        p.forEach(e => {
          vertex(e.x, e.y);
        });
        endShape();
      });
      pop();
    }
  }
}

function keyPressed() {
  if (key == 'i') {
    inv = !inv;
  }
  if (key == ' ') {
    strokes = [];
  }
}

let fs = false;
function start() {
  strokes.push([]);
}

function touchStarted(e) {
  // var fs = fullscreen();
  // if (!fs) {
  //   fullscreen(true);
  // }
  start();
  return false;
}

function mousePressed() {
  start();
}

function drag(x, y) {
  let cxx = x % w;
  let cyy = y % h;
  let cx = Math.floor(x / w);
  let cy = Math.floor(y / h);
  if (cx % 2 == 0) {
    cxx = w - cxx;
  }
  if (cy % 2 == 0) {
    cyy = h - cyy;
  }
  let p = {x: cxx, y: cyy}
  strokes[strokes.length-1].push(p);
}

function touchMoved(t) {
  drag(t.touches[0].pageX, t.touches[0].pageY);
  return false;
}

function mouseDragged(e) {
  drag(e.x, e.y);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cols = width / w;
  rows = height / h;
}
