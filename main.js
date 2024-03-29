// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var timer = document.querySelector('h2');
var startDate = Date.now();

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}


// the constructor for balls
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }
  // draw the ball
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  // update the ball
  update(){
    if((this.x + this.size) >= width){
      this.velX = -(this.velX);
    }

    if((this.x - this.size) <= 0){
      this.velX = -(this.velX);
    }

    if((this.y + this.size) >= height){
      this.velY = -(this.velY);
    }

    if((this.y - this.size) <= 0){
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect(){
    for(var i = 0; i < 25; i++){
      if(this!==balls[i]){
        var dx = this.x-balls[i].x;
        var dy = this.y-balls[i].y;
        var dr = this.size + balls[i].size;
        var distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < dr){
          if(this.size > balls[i].size)
            balls[i].color = this.color;
          else
            this.color = balls[i].color;
        }
      }
    }
  }
}

// create 25 random balls
var balls = [];

while (balls.length < 25){
  var size = random(10,20);
  var ball = new Ball(
    random(0+size, width-size),
    random(0+size, height-size),
    random(-15,15),
    random(-15,15),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
    );
    balls.push(ball);
}

function loop() {
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
  var defColor = balls[0].color;
  var virusSpread = true;
  for(var i = 0; i < balls.length; i++){
    balls[i].update();
    balls[i].collisionDetect();
    balls[i].draw();
    if(balls[i].color != defColor){
      virusSpread = false;
    }
  }

  if(virusSpread){
    var endDate = Date.now();
    var timeDif = endDate-startDate;
    var timePassed = timeDif/1200;
    alert('Virus spread in ' + timePassed + 's.');
    return;
  }
  requestAnimationFrame(loop);
}

window.onresize = function(){
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}


loop();

