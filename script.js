class BulletController{
    bullets = [];
    timerTillNextBullet = 0;
    constructor(canvas) {
         this.canvas = canvas;
    }

    shoot(x, y, speed, delay) {
        if(this.timerTillNextBullet <= 0) {
            this.bullets.push(new Bullet(x, y, speed));
            this.timerTillNextBullet = delay;
        }

        this.timerTillNextBullet--;
    }

    draw(ctx) {
        // console.log(this.bullets.length)
        this.bullets.forEach((bullet) => {
                if(this.checkProjectileOffScreen(bullet)) {
                    const index = this.bullets.indexOf(bullet)
                    this.bullets.splice(index, 1)
                }
            bullet.draw(ctx)});
    }

    checkProjectileOffScreen(bullet) {
        return bullet.y <= -bullet.height;
    }
}

class Bullet{
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = projectileWidth;
        this.height = projectileHeight; 
        this.color = projectileColor;
    }

    draw(ctx) {
        
        ctx.fillStyle = this.color; 
        this.y -= this.speed;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

class Enemy{
    constructor(canvas) {
        this.height = 50;
        this.width = 50;
        this.x = Math.floor(Math.random() * ((cvsWidth- this.width) - 0) );
        console.log(this.x);
        this.y = -this.height;
        this.canvas = canvas;
        this.color = "yellow";
        
        
        
    }

    draw(ctx) {

        ctx.fillStyle = this.color;
        this.y += 1;
        ctx.fillRect(this.x, this.y, this.width, this.height); 
        
    }
}

//CANVAS



const cvs = document.querySelector('#cvs');

const ctx = cvs.getContext('2d');

const img1 = document.getElementById("mozog");
const img2 = document.getElementById("lő");

const cvsHeight = 600;

const cvsWidth = 600;


//BULLET CONTROLLER
const bulletController = new BulletController(cvs);

//SHUTTLE
const shuttleWidth = 50;

const shuttleHeight = 50;

const shuttleSpeed = 25;

let shuttleX = (cvsWidth - shuttleWidth) / 2;

let shuttleY = cvsHeight - shuttleHeight;

//PROJECTILE
const projectileSpeed = 7;

const projectileDelay = 5;

const projectileWidth = 5;

const projectileHeight = 10;

const projectileColor = "red";

const projectileX = shuttleX + (shuttleWidth / 2) - (projectileWidth / 2);

const projectileY = shuttleY - projectileHeight;

let shootPressed = false;

const enemy = new Enemy(100, 100, cvs);

function draw() {
    
    
    ctx.clearRect(0, 0, cvsWidth, cvsHeight);
    ctx.drawImage(img1, 250, 500, 100, 100);

    
    
    

    ctx.fillStyle = "blue";
    ctx.fillRect(shuttleX, shuttleY, shuttleWidth, shuttleHeight)
    ctx.fillStyle = projectileColor;
    bulletController.draw(ctx);
    shoot();
    enemy.draw(ctx);

    //  let enemy1 = new Enemy(100, 100).draw(ctx);

    //  let enemy2 = new Enemy(400, 100).draw(ctx);
    
}

function shoot() {
    if(shootPressed) {
        // console.log("LŐ!");
        bulletController.shoot(shuttleX + (shuttleWidth / 2) - (projectileWidth / 2), shuttleY, projectileSpeed, projectileDelay);
        ctx.drawImage(img2, 250, 500, 100, 100);
    }
}




keydown = (e) => {
    if (e.code == 'ArrowRight' && shuttleX + shuttleWidth < cvsWidth) {
        shuttleX += shuttleSpeed;
        
    }
    if (e.code == 'ArrowLeft' && shuttleX > 0) {
        shuttleX -= shuttleSpeed;
    }
    if(e.code == "Space") {
        shootPressed = true;
    }
}

keyup = (e) => {
    if(e.code == "Space") {
        shootPressed = false;
    }
}



const interval = setInterval(draw, 5);


document.addEventListener("keydown", keydown)
window.addEventListener('keyup', keyup)
