let lightsOn = true;

function setup() {
  createCanvas(1000, 600);
  angleMode(DEGREES);
  noStroke();
  textAlign(LEFT, BASELINE);
}

function draw() {
  // ensure rectangles that expect CORNER mode draw correctly
  rectMode(CORNER);

  background(10, 20, 40);

  drawSnow();
  drawMoon();
  drawHouse();
  drawTree();
  drawSanta();

  if (lightsOn) drawLightGlow();

  drawBigPopText();
}

function mousePressed() {
  // toggle only when clicking inside the canvas
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    lightsOn = !lightsOn;
  }
}

// ---------------- BACKGROUND ----------------
function drawSnow() {
  fill(240);
  rect(0, height * 0.7, width, height * 0.3);
}

function drawMoon() {
  fill(255, 240, 200);
  ellipse(width * 0.93, height * 0.19, 90, 90);
}

// ---------------- HOUSE ----------------
function drawHouse() {
 
  rectMode(CENTER);

  let x = width * 0.5;
  let w = 520;
  let h = 260;
  let y = height * 0.63;

  // walls (soft winter blue)
  fill(140, 180, 240);
  rect(x, y, w, h, 8);

  // trim
  fill(255);
  rect(x, y - h/2 - 3, w, 19);

  // roof
  fill(70, 40, 30);
  triangle(x - w/2 - 30, y - h/2 + 10, x, y - h - 80, x + w/2 + 10, y - h/2 + 5);

  drawWindows(x, y, w, h);
  drawDoor(x, y, w, h);
  drawRoofLights(x, y, w, h);
  drawWindowLights(x, y, w, h);
  drawBushLights(x, y, w, h);
  drawWalkwayLights(x, y);

  // restore CORNER mode for other elements
  rectMode(CORNER);
}

function drawWindows(x, y, w, h) {
  // left window
  fill(lightsOn ? color(255, 240, 180) : color(70, 70, 80));
  rect(x - 140 - 45, y - 60 - 35, 90, 70, 10); // adjusted for CORNER mode when called outside house
  // right window
  rect(x + 140 - 30, y - 60 - 35, 90, 70, 20);
}

function drawDoor(x, y, w, h) {
  // door drawn in CENTER mode inside drawHouse, so use those coords
  rectMode(CENTER);
  fill(255);
  rect(x, y + 30, 80, 120, 10);

  // wreath
  if (lightsOn) fill(20,160,60);
  else fill(30,80,40);
  ellipse(x, y + 10, 40);

  // door lights
  for (let i = -1; i <= 1; i++) {
    fill(lightsOn ? color(255, 140 + i*20, 120) : color(60));
    ellipse(x + i * 30, y + 80, 14);
  }

  rectMode(CORNER); // restore
}

function drawRoofLights(x, y, w, h) {
  // more lights across roof
  for (let i = 0; i < 28; i++) {
    let lx = map(i, 0, 27, x - w/2 + 12, x + w/2 - 12);
    let ly = y - h/2 - 8;
    if (lightsOn) {
      let flicker = sin(frameCount * 6 + i * 15) * 30;
      // cycle colors (red/green/gold/blue)
      let c = i % 4;
      if (c === 0) fill(255, 40 + flicker, 40);      // red
      if (c === 1) fill(30, 220 + flicker/2, 60);    // green
      if (c === 2) fill(240, 200 + flicker/2, 60);   // gold
      if (c === 3) fill(60, 150 + flicker, 240);    // blue
    } else fill(50);
    ellipse(lx, ly, 14);
  }
}

function drawWindowLights(x, y, w, h) {
  let positions = [
    [x - 160, y - 60], [x - 80, y - 60],
    [x + 80, y - 60], [x + 160, y - 60]
  ];
  for (let i = 0; i < positions.length; i++) {
    let p = positions[i];
    if (lightsOn) {
      // alternate red/green for pop
      if (i % 2 === 0) fill(255, 0, 0, 220);
      else fill(0, 200, 0, 220);
    } else fill(60);
    // when drawWindowLights is called from inside drawHouse() we were in CENTER mode,
    // but we restored CORNER before calling this. So convert center coords to corner coords:
    ellipse(p[0], p[1] - 50, 14);
  }
}

function drawBushLights(x, y, w, h) {
  let bushes = [
    [x - 220, y + 100],
    [x - 150, y + 110],
    [x + 180, y + 100],
    [x + 120, y + 115]
  ];

  bushes.forEach((b, i) => {
    fill(40, 120, 50);
    ellipse(b[0], b[1], 70, 40);

    if (lightsOn) {
      // multiple bulbs per bush with different colors
      fill(i % 2 === 0 ? color(255, 0, 0) : color(0, 200, 0));
      ellipse(b[0] + 10, b[1] - 10, 12);
      fill(i % 2 === 0 ? color(0, 200, 0) : color(255, 200, 0));
      ellipse(b[0] - 15, b[1], 12);
      fill(color(255, 160, 60));
      ellipse(b[0] + 20, b[1] + 5, 12);
    } else {
      fill(60);
      ellipse(b[0] + 10, b[1] - 10, 12);
      ellipse(b[0] - 15, b[1], 12);
      ellipse(b[0] + 20, b[1] + 5, 12);
    }
  });
}

function drawWalkwayLights(x, y) {
  let wx1 = x - 220;
  let wx2 = x + 220;
  let wy = y + 150;

  for (let i = 0; i < 12; i++) {
    let px = map(i, 0, 11, wx1, wx2);
    fill(lightsOn ? color(255, 230, 180) : color(60));
    // use CORNER rect for walkway posts
    rect(px - 8, wy, 16, 30, 5);
  }
}

// ---------------- TREE ----------------
function drawTree() {
  let tx = 170;
  let ty = 380;

  fill(20, 120, 40);
  // triangles for tree -- use CORNER coordinates by computing points
  triangle(tx - 60, ty, tx, ty - 180, tx + 60, ty);
  triangle(tx - 80, ty + 30, tx, ty - 140, tx + 80, ty + 30);
  triangle(tx - 100, ty + 80, tx, ty - 100, tx + 100, ty + 80);

  fill(100, 60, 40);
  rect(tx - 20, ty + 80, 40, 40);

  drawTreeLights(tx, ty);
}

function drawTreeLights(tx, ty) {
  // fixed positions for stable look
  let positions = [
    [tx, ty - 130], [tx - 28, ty - 100], [tx + 35, ty - 95],
    [tx - 50, ty - 60], [tx + 50, ty - 45], [tx, ty - 30],
    [tx - 18, ty - 40], [tx + 20, ty - 110], [tx - 40, ty - 80],
    [tx + 60, ty - 70], [tx - 60, ty - 20], [tx + 10, ty - 10]
  ];

  for (let i = 0; i < positions.length; i++) {
    let p = positions[i];
    if (lightsOn) {
      // alternate red/green/gold for trees
      if (i % 3 === 0) fill(255, 40, 40);
      else if (i % 3 === 1) fill(0, 200, 0);
      else fill(240, 200, 60);
    } else fill(60);
    ellipse(p[0], p[1], 12);
  }

  // star on top
  push();
  translate(tx, ty - 150);
  if (lightsOn) fill(255, 240, 100);
  else fill(100);
  star(0, 0, 6, 14, 5);
  pop();
}

// ---------------- SANTA ----------------
function drawSanta() {
  let sx = 820, sy = 420;

  fill(220, 30, 40);
  rect(sx - 35, sy - 50, 70, 100, 12); // use CORNER with coordinates adjusted

  fill(0);
  rect(sx - 35, sy - 30, 70, 15);
  fill(255, 200, 50);
  rect(sx - 12.5, sy - 30, 25, 15);

  fill(255, 220, 180);
  ellipse(sx, sy - 80, 50);

  fill(220, 30, 40);
  triangle(sx - 20, sy - 145, sx + 20, sy - 145, sx, sy - 190);

  fill(255);
  ellipse(sx, sy - 180, 20);
  ellipse(sx, sy - 145, 60, 30);

  // sack
  fill(110, 60, 10);
  ellipse(sx - 50, sy - 100, 40, 90);
}

// ---------------- LIGHT GLOW ----------------
function drawLightGlow() {
  fill(260, 230, 140, 45);
  ellipse(500, 160, 430, 220);
}

// ---------------- BIG POP TEXT ----------------
function drawBigPopText() {
  push();
  textStyle(BOLD);
  textSize(54);
  // ensure smooth spacing and positions
  const baseX = 20;
  const baseY = height - 50;

  // red glow behind "MERRY"
  for (let i = 6; i >= 1; i--) {
    fill(255, 0, 0, 25);
    text("MERRY", baseX + i * 2, baseY + i * 2);
  }
  // green glow behind "CHRISTMAS"
  for (let i = 6; i >= 1; i--) {
    fill(0, 200, 0, 25);
    text("CHRISTMAS!", baseX + 220 - i * 2, baseY - i * 2);
  }

  // main letters (split colors)
  fill(255, 0, 0);
  text("MERRY", baseX, baseY);

  fill(0, 200, 0);
  text("CHRISTMAS!", baseX + 220, baseY);

  // smaller instruction under the big text
  textSize(20);
  fill(255);
  text("CLICK to toggle lights", baseX, baseY + 36);
  pop();
}

// ---------------- HELPERS ----------------
function star(x, y, r1, r2, n) {
  let angle = 360 / n;
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    vertex(x + cos(a) * r2, y + sin(a) * r2);
    vertex(x + cos(a + angle / 3) * r1, y + sin(a + angle / 2) * r1);
  }
  endShape(CLOSE);
}