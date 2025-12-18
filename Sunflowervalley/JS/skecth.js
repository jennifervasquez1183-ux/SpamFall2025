

let angle = 0;

function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
}

function draw() {
  background(255, 247, 225); 
  angle = sin(frameCount * 0.03) * 0.25;

  translate(width / 2, height / 2 - 50); 
  rotate(angle);
  drawToteBag();
}


function drawToteBag() {
  fill(255, 182, 193); 
  stroke(200, 120, 150);
  strokeWeight(2);
  rect(0, 0, 200, 240, 16); 

 
  noFill();
  stroke(200, 120, 150);
  strokeWeight(6);


  beginShape();
  curveVertex(-50, -60);
  curveVertex(-50, -60);
  curveVertex(-90, 20);
  curveVertex(-40, 60);
  curveVertex(-40, 60);
  endShape();

  
  beginShape();
  curveVertex(50, -60);
  curveVertex(50, -60);
  curveVertex(90, 20);
  curveVertex(40, 60);
  curveVertex(40, 60);
  endShape();

 
  noStroke();
  fill(255, 205, 50);
  for (let i = 0; i < 12; i++) {
    ellipse(cos(i * 30) * 25, sin(i * 30) * 25, 20, 20);
  }

  fill(120, 80, 40);
  ellipse(0, 0, 30);
}
