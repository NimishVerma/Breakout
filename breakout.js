var canvas = document.getElementById('space');
var ctx = canvas.getContext('2d');

var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 1;
var dy = -1;
var barHeight = 10;
var barWidth = 75;
var barX = (canvas.width-barWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRow = 4;
var brickColumn = 7;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickTopMargin = 30;
var brickLeftMargin = 30;
var score = 0;
var bricksArr = [];
for(c=0; c<brickColumn; c++) {
    bricksArr[c] = [];
    for(r=0; r<brickRow; r++) {
        bricksArr[c][r] = { x: 0, y: 0, fl : 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(o) {
    if(o.keyCode == 39) {
        rightPressed = true;
    }
    else if(o.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(o) {
    if(o.keyCode == 39) {
        rightPressed = false;
    }
    else if(o.keyCode == 37) {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#FF00DD";
    ctx.fill();
    ctx.closePath();
}
function drawBar() {
    ctx.beginPath();
    ctx.rect(barX, canvas.height-barHeight, barWidth, barHeight);
    ctx.fillStyle = "#0000DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {

    for(c=0; c<brickColumn; c++) {
        for(r=0; r<brickRow; r++) {
        	if (bricksArr[c][r].fl == 1){
            var brickAbs = (c*(brickWidth+brickPadding))+brickLeftMargin;
            var brickOrd = (r*(brickHeight+brickPadding))+brickTopMargin;
            bricksArr[c][r].x = brickAbs;
            bricksArr[c][r].y = brickOrd;
            ctx.beginPath();
            ctx.rect(brickAbs, brickOrd, brickWidth, brickHeight);
            ctx.fillStyle = "green";
            ctx.fill();		
            ctx.closePath();
            
        }
    }
}
}
function collision()
{	for(c=0; c<brickColumn; c++) 
	{
        for(r=0; r<brickRow; r++) 
    	{
        	var b = bricksArr[c][r]
        	if (b.fl == 1 ){
            if (b.x < x && b.x + brickWidth > x && b.y < y && b.y + brickHeight > y )
            {
            	b.fl = 0;
            	dy = -dy ;
            	score ++;
            	if (score == brickColumn*brickRow){
            		alert("Game won!");
            	}
            	
            }
        	}
		}
	}
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText("Score: "+score, 5, 17);
    drawBall();
    drawBricks();
    drawBar();
    collision();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    else if( y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
    if(x > barX && x < barX + barWidth) {
        dy = -dy;
    }
    else {
        alert("Game over !!!!");
        location.reload(true);

    	}
    }
    
    if(rightPressed && barX < canvas.width-barWidth) {
        barX += 3;
    }
    else if(leftPressed && barX > 0) {
        barX -= 3;
    }
    
    x += dx;
    y += dy;
}

setInterval(draw, 0);