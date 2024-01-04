
//CANVAS
const cvsHeight = 600;

const cvsWidth = 600;


//SHUTTLE
const shuttleWidth = 50;

const shuttleHeight = 50;

const shuttleSpeed = 25;

let shuttleX = (cvsWidth - shuttleWidth) / 2;

//PROJECTILE
const projectileSpeed = 50;

const projectileWidth = 5;

const projectileHeight = 10;

const projectileX = shuttleX + (shuttleWidth / 2) - (projectileWidth / 2);

const projectileY = cvsHeight - shuttleHeight - projectileHeight;


function draw() {
    cvs = document.querySelector('#cvs');
    const c = cvs.getContext('2d');
    
    c.clearRect(0, 0, cvsWidth, cvsHeight);



    c.fillStyle = '#F00';
    c.fillRect(shuttleX, cvsHeight - shuttleHeight, shuttleWidth, shuttleHeight)

    c.fillStyle = '#FFF';
    c.fillRect(projectileX, projectileY, projectileWidth, projectileHeight)
     

}

function keyDownEventListener(event) {
    // console.log(event);
    if (event.key == 'ArrowRight' && shuttleX + shuttleWidth < cvsWidth) {
        shuttleX += shuttleSpeed;
    }
    if (event.key == 'ArrowLeft' && shuttleX > 0) {
        shuttleX -= shuttleSpeed;
    }
    if (event.key == 'Space') {
        //TODO
    }
}


const interval = setInterval(draw, 5);
window.addEventListener('keydown', keyDownEventListener)
