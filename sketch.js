let strokes = [];
let rows = 21;
let cols = 3;
let w, h;
let inv = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = width / cols;
  h = height / rows;
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

let fullscreen = false;
function touchStarted(e) {
  var fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }

  strokes.push([]);
  // return false;
}

function touchMoved(e) {
  let cxx = e.x % w;
  let cyy = e.y % h;
  let cx = Math.floor(e.x / w);
  let cy = Math.floor(e.y / h);
  if (cx % 2 == 0) {
    cxx = w - cxx;
  }
  if (cy % 2 == 0) {
    cyy = h - cyy;
  }
  let p = {x: cxx, y: cyy}
  strokes[strokes.length-1].push(p);
  // return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
