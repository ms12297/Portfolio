var first = document.getElementById("overlayFirst");
var sec = document.getElementById("overlaySecond");
var trigger = false;

var mff = document.getElementById("30mff");
var cmx = document.getElementById("comix");
var snd = document.getElementById("sndLike");
var vd = document.getElementById("videOH");

var intro = document.getElementById("intro");
var texmff = document.getElementById("mff");
var texcmx = document.getElementById("comic");
var texsnd = document.getElementById("snd");
var texvd = document.getElementById("vid");

var mobileChangeMediaQuery = window.matchMedia('(max-width:768px)');


var refresh = 0;

function handleMobileChange(e)
{
  if(e.matches)
  {
    //this means we are in mobile size!
    console.log("mobile size");
  }
  else{
    console.log("big size");
  }
}

//listen for change
mobileChangeMediaQuery.addListener(handleMobileChange);
//init at beginning
handleMobileChange(mobileChangeMediaQuery);




//p5 SKETCHES

var canvas;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//MY CODE

let SrcChange = false;



let chars = []; //array to hold objects
let charsTitle = [];
let myString = "BOOM!"; //text to be displayed
let titleStr = "ZAEEM'S PORTFOLIO";
let colourToggle; //to toggle between background colours
let trig = false;
let change = false;
let isTitle = false;

let circles = [];

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style("z-index", "-1");
  textAlign(CENTER);
  textFont("Courier");
  textStyle(BOLDITALIC);
  
  //populating arrays with objects
  for (let i = 0; i < myString.length; i++) {
    chars.push(new Mover(random(width), random(height), myString.charAt(i), i + 1));
  }

  for (let i = 0; i < titleStr.length; i++) {
    charsTitle.push(new Mover(random(width), random(height), titleStr.charAt(i), i + 1));
  }

  for (let i = 0; i < 80; i++) {
    circles.push(new Circ(random(width), random(height), random (10, 50),random(255), random(255), random(255)));
  }
  noFill();
}

function draw() {
  
  if (!trig && change) {
    isTitle = true;
    if (!trigger) {
      sec.style.display = "block";
      intro.style.display = "block";
    }

    background(255);
    for (let i = 0; i < circles.length; i++) {
      circles[i].run();
    }

    fill(200, 0, 0);
    for (let i = 0; i < charsTitle.length; i++) {
      charsTitle[i].run(); //calling run() function for every object
    }


    if ( //if hovering over title
    mouseX > width/4.5 &&
    mouseX < width - width/5.5 &&
    mouseY > height/13 &&
    mouseY < height*(2/12)
    ) {
        document.body.style.cursor = "pointer";
    }
    else {
        document.body.style.cursor = "auto";
    }

  }

  else {
    document.body.style.cursor = "pointer";
    if (colourToggle) {
      background(255, 80, 0); //red
      trig = true;
      change = true;

    }
    else {
      background(255, 215, 0); //yellow
      trig = false;
    }
    
    for (let i = 0; i < chars.length; i++) {
      chars[i].run(); //calling run() function for every object
    }
    fill (225, 100 , 0);
  }
}

// when the mouse is pressed assign a random x & y speed
function mousePressed() {

  if (!trig && change) {
    
    if ( //if clicking over title
    mouseIsPressed &&
    mouseX > width/4.5 &&
    mouseX < width - width/5.5 &&
    mouseY > height/13 &&
    mouseY < height*(2/12)
    ) {
      for (let i = 0; i < charsTitle.length; i++) {
        charsTitle[i].xSpeed = random(-15, 15);
        charsTitle[i].ySpeed = random(-15, 15);
      }
    }
    else {
      for (let i = 0; i < circles.length; i++) {
        circles[i].xSpeed = random(-10, 10);
        circles[i].ySpeed = random(-10, 10);
      }
    }
  }
  else {
    colourToggle = true;
    for (let i = 0; i < chars.length; i++) {
      chars[i].xSpeed = random(-15, 15);
      chars[i].ySpeed = random(-15, 15);
    }
  }
}

class Mover {
  constructor(_x, _y, _s, i) {
    this.x=_x;
    this.y=_y;
    this.xSpeed = random(-10, 10);
    this.ySpeed = random(-10, 10)
    this.myChar = _s;
    this.pos = i; //position of char in string
  }

  update() {
    
    let newVar = true;
    if (sq(this.xSpeed) > 0.01 && sq(this.ySpeed) > 0.01) { //if the x and y speeds fall below |0.1| 
      newVar = false; 
    }
    
    if (newVar) { //to center the text and apply some noise
      colourToggle = false; //change background colour accordingly

      //where the first letter should be displayed
      let startX;
      let noiseValue;
      let scaledNoise;
      let midX;
      let midY;

      if (isTitle) {
        startX = width/2 - (textWidth(titleStr)/2); 
        //setting noise
        noiseValue = noise(frameCount * 0.01, this.pos * 0.1);
        scaledNoise = (noiseValue - 0.5) * 40;

        midY = height * 0.15;
      }
      else {
        startX = width/2 - (textWidth(myString)/2);
        //setting noise
        noiseValue = noise(frameCount * 0.01, this.pos * 0.1);
        scaledNoise = (noiseValue - 0.5) *  100;

        midY = height * 0.5;
      }
             
      //defining the position for every char in the center based on position within word
      midX = startX + textWidth(this.myChar)*this.pos;
      
      //updating values
      this.x += (midX - this.x)*0.3;
      this.y += (midY - this.y)*0.3 + scaledNoise/2;
    }
    
    else {
      if (isTitle) {
        fill(200, 0, 0);
      }
      else {
        fill(255, 215, 0);
      }
      
      //updating values if user keeps pressinng mouse button
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      this.xSpeed *= 0.98;
      this.ySpeed *= 0.98;
    }
  }

  display() { //to display chars

    if (isTitle) {
      textSize(windowWidth / 18);
      if (windowWidth/18 <= 45) {
        textSize(45);
      }
      text(this.myChar, this.x, this.y); //this.y - windowHeight/4 to shift up
    }
    else {
      textSize(windowWidth / 10);
      if (windowWidth/10 <= 60) {
        textSize(60);
      }
      text(this.myChar, this.x, this.y);
    }    
  }

  checkEdges() { //to account for chars going out of bounds
    if (this.y > height) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = height;
    }
    if (this.x > width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
  }
  
  run(){ //calling all position tracking functions in sequence, used in draw()
    this.update();
    this.display();
    this.checkEdges();
  }
}



class Circ {
  constructor(_x, _y, _s, r, g, b) {
    this.x=_x;
    this.y=_y;
    this.xSpeed = random(-10, 10);
    this.ySpeed = random(-10, 10)
    this.size = _s;
    this.r1 = r;
    this.g1 = g;
    this.b1 = b;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.xSpeed *= 0.98;
    this.ySpeed *= 0.98;
  }

  display() {
    noStroke();
    fill (this.r1, this.g1, this.b1, 130);
    circle(this.x, this.y, this.size);
  }

  checkEdges() {
    if (this.y > height+this.size/2) {
      this.y = -this.size/2;
    }
    if (this.y < -this.size/2) {
      this.y = height+this.size/2;
    }
    if (this.x > width+this.size/2) {
      this.x = -this.size/2;
    }
    if (this.x < -this.size/2) {
      this.x = width+this.size/2;
    }
  }
  
  run(){
    this.update();
    this.display();
    this.checkEdges();
  }
}


var cross = document.getElementById("cross");

cross.addEventListener("click", function(){
  sec.style.display = "none";
  trigger = true;
  first.style.display = "block";
});


mff.addEventListener("click", function(){
  first.style.display = "none";
  sec.style.display = "block";
  texmff.style.display = "block";

  intro.style.display = "none";
  texcmx.style.display = "none";
  texsnd.style.display = "none";
  texvd.style.display = "none";
});

cmx.addEventListener("click", function(){
  first.style.display = "none";
  sec.style.display = "block";
  texcmx.style.display = "block";

  intro.style.display = "none";
  texmff.style.display = "none";
  texsnd.style.display = "none";
  texvd.style.display = "none";
});

snd.addEventListener("click", function(){
  first.style.display = "none";
  sec.style.display = "block";
  texsnd.style.display = "block";

  intro.style.display = "none";
  texcmx.style.display = "none";
  texmff.style.display = "none";
  texvd.style.display = "none";
});

vd.addEventListener("click", function(){
  first.style.display = "none";
  sec.style.display = "block";
  texvd.style.display = "block";

  intro.style.display = "none";
  texcmx.style.display = "none";
  texsnd.style.display = "none";
  texmff.style.display = "none";
});



// var mff = document.getElementById("30mff");
// var cmx = document.getElementById("comix");
// var snd = document.getElementById("sndLike");
// var vd = document.getElementById("videOH");

// var intro = document.getElementById("intro");
// var texmff = document.getElementById("30mff");
// var texcmx = document.getElementById("videOH");
// var texsnd = document.getElementById("videOH");
// var texvd = document.getElementById("videOH");