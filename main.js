//variables
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
let images = {
    phage: "Images/phage.png",
    virus: "Images/virus.png",
    plasma: "Images/plasma.png",
    laser: "Images/laser.png"
}

let startedGame
let gameTime = 0
let currentWave = 1
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

class enemy {
    constructor(virusXPosition, randomSpeed){
        this.virusXPosition = virusXPosition
        this.virusYPosition = 20
        this.virusHeight = 120
        this.virusWidth = 120
        this.virus = new Image()
        this.virus.src = images.virus
        this.virus.onload = ()=>{
            this.virusDraw()
        }
    }
    virusDraw(randomSpeed){
        this.virusYPosition = this.virusYposition + randomSpeed
        ctx.drawImage(this.virus, this.virusXPosition, this.virusYPosition,this.virusWidth, this.virusHeight )
    }
}

//instancias

let phage1 = new Player()
let virus1 = new enemy(60, .5)
let virus2 = new enemy(200, .7)
let virus3 = new enemy(340, .4)
let virus4 = new enemy(480, .1)
let virus5 = new enemy(620, .6)
let virus6 = new enemy(760, .9)
let virus7 = new enemy(920, .3)
let virus8 = new enemy(1060, .6)
let virus9 = new enemy(1220, .5)

//main functions
function startGame() { 
if (startedGame) return
startedGame = setInterval(refresh, 1000 / 60)
}

function refresh(){
    ctx.clearRect(0, 0, 1400 ,800)
    gameTime++
    phage1.phageDraw()
    virus1.virusDraw()
    virus2.virusDraw()
    virus3.virusDraw()
    virus4.virusDraw()
    virus5.virusDraw()
    virus6.virusDraw()
    virus7.virusDraw()
    virus8.virusDraw()
    virus9.virusDraw()
    drawLasers()
}

function generateEnemies(){
    if(currentWave === 1){
        maxSpeedVirus = .3
        minSpeedVirus= .2
    }else if (currentWave === 2){
        maxSpeedVirus = .5
        minSpeedVirus= .3
    }else if (currentWave === 3){
        maxSpeedVirus = .7
        minSpeedVirus= .4
    }else if (currentWave === 4){
        maxSpeedVirus = .9
        minSpeedVirus= .5
    }else if (currentWave === 5){
        maxSpeedVirus = 1.1
        minSpeedVirus= .6
    }
    let randomSpeed = Math.random() * (maxSpeedVirus - minSpeedVirus) + minSpeed


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
        }
        }
    );

     document.addEventListener('keyup', ({keyCode} ) => {
         if (keyCode === 32){
                laserFire()
        }
        }
    );
    
