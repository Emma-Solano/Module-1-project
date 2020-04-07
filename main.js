//variables
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
let images = {
    phage: "Images/phage.png",
    virus: "Images/virus.png",
    plasma: "Images/plasma.png",
    laser: "Images/laser.png"
}

let startedGameTime

let firedLasers = []

//clases

class Player {
    constructor(){
this.phageXPosition = 700
this.phageYPosition =  680
this.phageHeight = 100
this.phageWidth = 60
this.phage = new Image()
this.phage.src = images.phage
this.phage.onload = ()=> {
    this.phageDraw()
}
    }
    phageDraw(){
        ctx.drawImage(this.phage, this.phageXPosition, this.phageYPosition, this.phageWidth, this.phageHeight)
    }
    phageMoveRigth(){
        if (this. phageXPosition < canvas.width - 100)
        this.phageXPosition += 45
    }

    phageMoveLeft(){
        if (this. phageXPosition > 45)
        this.phageXPosition -= 45
    }
}

class Laser {
    constructor (){
        this.laserXPosition = phage1.phageXPosition +20
        this.laserYPosition =  phage1.phageYPosition - 30
        this.laserHeight = 45
        this.laserWidth = 20
        this.laser = new Image()
        this.laser.src = images.laser
        this.laser.onload = ()=>{
            this.fire()
        }
    }
    fire(){
        this.laserYPosition -= 20
        ctx.drawImage(this.laser,this.laserXPosition, this.laserYPosition, this.laserWidth, this.laserHeight)
    }
}

//instancias

let phage1 = new Player()

//main functions
function startGame() { 
if (startedGameTime) return
startedGameTime = setInterval(refresh, 1000 / 60)
}

function refresh(){
    ctx.clearRect(0, 0, 1400 ,800)
    phage1.phageDraw()
    drawLasers()
}

//auxiliar functions

function laserFire (){
firedLasers.push(new Laser())
    }

function drawLasers (){
    firedLasers.forEach((laser) => laser.fire())
}

//event listeners

window.onload = function() {
    document.getElementById("start-button").onclick = function() {
      startGame()
    }};

    document.addEventListener('keydown', ({keyCode} ) => {
        switch (keyCode){
            case 65: 
            phage1.phageMoveLeft()
        break;
        case 68:
            phage1.phageMoveRigth()
            break;
            case  32:
                laserFire()
                break;
        }
        }
    );
