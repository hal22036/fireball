//create canvas
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const fSize = 40; //fireball size
let score = 0;
let fireBalls = [];

//set canvas width
canvas.width = 700;
canvas.height = 700;

//insert volcano------------------------------------
const vimage = document.getElementById('volcano');

//make fireball---------------------------------------
const fImage = document.getElementById('fireball');
//create fireball function using this (object call)
function Fireball(_x,_y,_dx,_dy,_w,_h) {
    this.w= _w,
    this.h= _h,
    this.x=_x,
    this.y=_y,
    this.dx=_dx, //shift along the x-axis on the element position.
    this.dy=_dy ////shift along the y-axis on the element position.
};

// -------------------------xpos | ypos dx dy  w  /  h  
let fireball1 = new Fireball(20,   580, 1, 4, fSize,fSize); 
fireBalls[0] = fireball1;

//produce a new fireball every 8 seconds with a random projectory
function newBall() {    
    setInterval(() => {
        const x =20
        const y = 580
        const dx =Math.random() * 4
        const dy = Math.random() * 3
        fireBalls.push(new Fireball(x,y, dx,  dy, fSize,fSize));
    },8000)
};
    
newBall(); 


//place contents on the canvas
function drawCanvasContent () {
    for(let i=0; i<fireBalls.length; i++) {
        context.drawImage(fImage, fireBalls[i].x, fireBalls[i].y, fireBalls[i].w, fireBalls[i].h);
    };
    context.drawImage(vimage, 0,500,200,200);
    context.drawImage(image, redman.x, redman.y, redman.w, redman.h);
    
};

function fireballPos() {    
    // change fireball position
    for(let i=0; i<fireBalls.length; i++) { 
        fireBalls[i].x += fireBalls[i].dx;
        fireBalls[i].y += fireBalls[i].dy;
    
        // Detect side walls fireball
        if (fireBalls[i].x + fireBalls[i].h > canvas.width || fireBalls[i].x < 0) {
            fireBalls[i].dx *= -1;
        };

        // Detect top and bottom walls
        if (fireBalls[i].y + fireBalls[i].w > canvas.height || fireBalls[i].y < 0) {
            fireBalls[i].dy *= -1;
        };                
    };    
};
//make redman------------------------------------------------------------------------------------
const image = document.getElementById('redman');
const redman = {
    w:80,
    h:80,
    x:canvas.width/2,
    y:720,
    speed:5,
    dx:0,
    dy:0
};
function newPos() {
    redman.x += redman.dx;//appends x location when moved
    redman.y += redman.dy;//appends y location when moved
    detectWalls()
};

//detect side walls
function detectWalls() {
    //left wall
    if (redman.x < 0) {
        redman.x = 0;
    };
    //right wall
    if (redman.x + redman.w > canvas.width) {
        redman.x = canvas.width - redman.w;
    };
    //top wall
    if (redman.y < 0) {
        redman.y = 0;
    };
    //bottom wall
    if (redman.y + redman.h > canvas.height) {
        redman.y = canvas.height - redman.h;
    };
};

//add animation to move character left and right
function moveLeft() {
    redman.dx = -redman.speed;
};
function moveRight() {
    redman.dx = redman.speed;
};
function moveUp() {
    redman.dy = redman.speed;
};
function moveDown() {
    redman.dy = -redman.speed;
};
function keyDown(e) {
    if(e.key === 'ArrowLeft' || e.key === 'Left') {
        moveLeft();
    }else if(e.key === 'ArrowRight' || e.key === 'Right') {
        moveRight();
    }else if(e.key === 'ArrowDown' || e.key === 'Down') {
        moveUp();
    }else if(e.key === 'ArrowUp' || e.key === 'Up') {
        moveDown();
    };
};
function keyUp(e) {
    if (
        e.key == 'Right' ||
        e.key == 'ArrowRight' ||
        e.key == 'Left' ||
        e.key == 'ArrowLeft' ||
        e.key == 'Down' ||
        e.key == 'ArrowDown' ||
        e.key == 'Up' ||
        e.key == 'ArrowUp'
        ) {
            redman.dx=0;
            redman.dy=0;
        }
    };
    
//event listener for when the key is pressed down and released
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

//Collision Detection
function hit() {
    for(let i=0; i<fireBalls.length; i++) {
        const fireballXRight = fireBalls[i].x + fireBalls[i].w;
        const redmanXRight = redman.x + redman.w;
        const fireballYBottom = fireBalls[i].y + fireBalls[i].h;
        const redmanYBottom = redman.y + redman.h;

        const overlapX = (fireBalls[i].x <= redmanXRight && fireBalls[i].x >= redman.x) || 
        (fireballXRight <= redmanXRight && fireballXRight >= redman.x);
        const overlapY = (fireBalls[i].y <= redmanYBottom && fireBalls[i].y >= redman.y) || 
        (fireballYBottom <= redmanYBottom && fireballYBottom >= redman.y);
        const isColliding = overlapX && overlapY;
        if (isColliding) {             
            alert(`You've been hit by a fireball! Game Over! Your score is ${score}`);
        };               
    }; 
}; 
//create score with setInterval and apply score to score Display
const scoreDisplay = document.querySelector('.score');
function addScore() {
    setInterval(() => { //repetitivey increment the counter value
        score++;   
        scoreDisplay.innerHTML = score;           
    }, 1000); 
};

addScore();

function update() {
    context.clearRect(0,0,canvas.width, canvas.height);   
    newPos();
    drawCanvasContent(); 
    fireballPos();  
    hit();
    requestAnimationFrame(update);
};
update();
        


// --------------future code to work on-----------

// //start game
// function startGame() {
//     drawCanvasContent();
// }

// //event listener button to restart game
// function restart() {
//     document.querySelector('.restart.btn').addEventListener('click'), function() {
//     window.location.reload();
//     return false;
// };
// }