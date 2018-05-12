var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var repelx;
var repely;
var dirx = (Math.random()*2) * 2 - 1;
var diry = (Math.random()*2) * 2 - 1;

var background = new Image();
background.src = 'https://investorplace.com/wp-content/uploads/2017/05/Mothers-Day-Images-7-300x225.png';

function repel(event) {
   repelx = event.clientX;
   repely = event.clientY;
}



function Ball() {
  this.r = Math.floor((Math.random()*50)) + 10;
  this.x = Math.floor(Math.random()*(canvas.width-2*this.r)+this.r);
  this.y = Math.floor(Math.random()*(canvas.height-2*this.r)+this.r);
  // +1, or  -1
  this.dx = (Math.random()*2) * 2 - 1;
  this.dy = (Math.random()*2) * 2 - 1;
  this.color = randomColor();
  var that = this;
  function randomColor() {
    var val1 = Math.floor(Math.random()*255);
    var val2 = Math.floor(Math.random()*255);
    var val3 = Math.floor(Math.random()*255);
    var val4 = 0.5
    var color = `rgba(${val1}, ${val2}, ${val3}, ${val4})`
    return color;
  }
  /*function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i=0; i<6; i++) {
      color += letters[Math.floor(Math.random()*16)];
    }
    return color;
  };*/
  this.evadeX = function(){
      //console.log('x');
    that.dx *= 15;
    that.dy *= 15;
  };
  this.evadeY = function(){
    //  console.log('y');
    that.dx /= 15;
    that.dy /= 15;
  };

  }

numbBalls = 2000;
var balls = new Array(numbBalls);
for (i=0; i<numbBalls; i++){
  balls[i] = new Ball;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 350, 262.5)
  //ctx.globalAlpha = 0.5;
  ctx.strokeStyle = 'black';

  for (i=0; i<numbBalls; i++){
    var ball = balls[i];
    ctx.fillStyle = ball.color;
    ctx.beginPath();


    if ((ball.x+ball.r*2.5>repelx && ball.x-ball.r*2.5<repelx) && (ball.y+ball.r*2.5>repely && ball.y-ball.r*2.5<repely)){
       setTimeout(function(){repelx = -500, repely =-500}, 1);
        console.log(ball.x, ball.y);
       setTimeout(ball.evadeX, 0);
       setTimeout(ball.evadeY, 500);
      }

    //Test wall collision
  /*  if(ball.x<=ball.r ||
     ball.x >= (canvas.width-ball.r))
{
    ball.dx *= -1;
  }
  if(ball.y<=ball.r ||
     ball.y >= (canvas.height-ball.r))
  {
    ball.dy *= -1;
  }*/


  //move ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  //draw it
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2, false);
  ctx.stroke();
  ctx.fill();
  }
}




setInterval(draw, 60);
