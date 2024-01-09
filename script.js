class BulletController{
    bullets = [];
    timerTillNextBullet = 0;
    constructor(canvas) {
         this.canvas = canvas;
    }

    shoot(x, y, speed, delay) {
        if(this.timerTillNextBullet <= 0) {
            if(this.bullets.length <= 3) {
                this.bullets.push(new Bullet(x, y, speed));
                
            }
            
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

    collideWith(sprite) {
        return this.bullets.some(bullet=>{
            if(bullet.collideWith(sprite)) {
                this.bullets.splice(this.bullets.indexOf(bullet), 1);
                return true;
            }
            return false;
        })
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
        
        // ctx.fillStyle = this.color; 
        this.y -= this.speed;
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        // ctx.drawImage(img1, shuttleX, shuttleY, shuttleWidth, shuttleHeight);
        ctx.drawImage(img3, this.x, this.y, this.width, this.height)
    }

    collideWith(sprite) {
        if(this.x < sprite.x + sprite.width &&
           this.x + this.width > sprite.x &&
           this.y <sprite.y + sprite.height &&
           this.y + this.height > sprite.y) {
            //ELTŰN
            return true;
           }
           return false;
    }
}

class EnemyController{
    enemies = [];
    timerTillNextEnemy = 0;
    constructor(canvas) {
         this.canvas = canvas;
    }

    spawn() {
        if(this.timerTillNextEnemy <= 0) {
            this.enemies.push(new Enemy(cvs));
            console.log(this.enemies.length);
            this.timerTillNextEnemy = 120;
        }

        this.timerTillNextEnemy--;
    }

    draw(ctx) {
        // console.log(this.bullets.length)
        this.enemies.forEach((enemy) => {

            if(this.checkEnemyOffScreen(enemy)) {
                
                alert("VESZTETTÉL!");
            }

            if(bulletController.collideWith(enemy)) {
                this.enemies.splice(this.enemies.indexOf(enemy), 1)
            }
            else {
                enemy.draw(ctx)
            }

            });
    }

    checkEnemyOffScreen(enemy) {
        return enemy.y >= cvsHeight + enemy.height;
    }
}

class Enemy{
    constructor(canvas) {
        this.height = 50;
        this.width = 50;
        this.x = Math.floor(Math.random() * ((cvsWidth-70) - 70) + 70);
        
        console.log(this.x);
        this.y = -this.height;
        this.canvas = canvas;
        this.color = "yellow";
        
        
        
    }

    draw(ctx) {

        ctx.fillStyle = this.color;
        this.y += 2;
        ctx.fillRect(this.x, this.y, this.width, this.height); 
        
    }
}

//CANVAS



const cvs = document.querySelector('#cvs');

const ctx = cvs.getContext('2d');

const img1 = document.getElementById("mozog");
const img2 = document.getElementById("lő");
const img3 = document.getElementById("cesarp");

const cvsHeight = 600;

const cvsWidth = 600;




//SHUTTLE
const shuttleWidth = 100;

const shuttleHeight = 100;

// const shuttleSpeed = 25;

let shuttleX = (cvsWidth - shuttleWidth) / 2;

let shuttleY = cvsHeight - shuttleHeight;

//PROJECTILE
const projectileSpeed = 7;

const projectileDelay = 50;

const projectileWidth = 25;

const projectileHeight = 25;

const projectileColor = "red";

const projectileX = shuttleX + (shuttleWidth / 2) - (projectileWidth / 2);

const projectileY = shuttleY - projectileHeight;

let shootPressed = false;

let velXLeft = 0;

let velXRight = 0;

//BULLET CONTROLLER
const bulletController = new BulletController(cvs);

//ENEMY CONTROLLER
// const enemy = new Enemy(cvs);
const enemyController = new EnemyController(cvs);

function draw() {
    
    
    ctx.clearRect(0, 0, cvsWidth, cvsHeight);
    // ctx.drawImage(img1, 250, 500, 100, 100);

    
    
    
    
    // ctx.fillStyle = "blue";
    // ctx.fillRect(shuttleX, shuttleY, shuttleWidth, shuttleHeight)

    shuttleX += velXLeft;
    
    shuttleX += velXRight;

    
    if (shootPressed) {
        ctx.drawImage(img2, shuttleX, shuttleY, shuttleWidth, shuttleHeight);
    }
    else {
        ctx.drawImage(img1, shuttleX, shuttleY, shuttleWidth, shuttleHeight);
    }
    
    if (shuttleX + shuttleWidth >= cvsWidth) {
        shuttleX = cvsWidth - shuttleWidth - 1;
    }
    if(shuttleX <= 0) {
        shuttleX = 1;
    }
    ctx.fillStyle = projectileColor;
    
    
    // enemy.draw(ctx);
    
    enemyController.draw(ctx);
    enemyController.spawn();
    //  let enemy1 = new Enemy(100, 100).draw(ctx);

    //  let enemy2 = new Enemy(400, 100).draw(ctx);

    

    shoot();
    bulletController.draw(ctx);
}

function shoot() {
    if(shootPressed) {
        
        // console.log("LŐ!");
        bulletController.shoot((shuttleX + (shuttleWidth / 2) - (projectileWidth / 2)) - 2, shuttleY + 55, projectileSpeed, projectileDelay);
        
    }
}




keydown = (e) => {

    
    

    

    if (e.code == 'ArrowRight') {
        // shuttleX += shuttleSpeed;
        velXRight = 3;
        
        
    }
    
    if (e.code == 'ArrowLeft') {
        // shuttleX -= shuttleSpeed;
        velXLeft = -3;
        
    }
    
    if(e.code == "Space") {
        shootPressed = true;
    }
}

keyup = (e) => {
    if(e.code == "Space") {
        shootPressed = false;
    }
    if (e.code == 'ArrowRight' ) {
        // shuttleX += shuttleSpeed;
        velXRight = 0;
 
        
    }
    if (e.code == 'ArrowLeft') {
        // shuttleX -= shuttleSpeed;
        velXLeft = 0;
      
    }
}



const interval = setInterval(draw, 5);


document.addEventListener("keydown", keydown)
window.addEventListener('keyup', keyup)
