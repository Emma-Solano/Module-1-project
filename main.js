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
let currentWave = 2
let firedLasers = []
let enemiesArray =[]

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
    constructor(virusXPosition, random){
        this.randomSpeed = random
        this.virusXPosition = virusXPosition
        this.virusYPosition = 20
        this.virusHeight = 100
        this.virusWidth = 100
        this.virus = new Image()
        this.virus.src = images.virus
        this.virus.onload = ()=>{
            this.virusDraw()
        }
    }
    virusDraw(){
        this.virusYPosition += this.randomSpeed
        ctx.drawImage(this.virus, this.virusXPosition, this.virusYPosition,this.virusWidth, this.virusHeight )
    }
}

class Plasma {
    constructor(){
        
    }
}

//instancias

let phage1 = new Player()

//main functions
function startGame() { 
if (startedGame) return
startedGame = setInterval(refresh, 1000 / 60)
}

function refresh(){
    ctx.clearRect(0, 0, 1400 ,800)
    gameTime++
    phage1.phageDraw()
    drawEnemies()
    drawLasers ()
    generateEnemies()
}

function generateEnemies(){
    if(currentWave === 1){
        maxSpeedVirus = .4
        minSpeedVirus= .3
        gameSpeed = 400
    }else if (currentWave === 2){
        maxSpeedVirus = .6
        minSpeedVirus= .4
        gameSpeed = 350
    }else if (currentWave === 3){
        maxSpeedVirus = .8
        minSpeedVirus= .5
        gameSpeed = 300
    }else if (currentWave === 4){
        maxSpeedVirus = 1
        minSpeedVirus= .6
        gameSpeed = 250
    }else if (currentWave === 5){
        maxSpeedVirus = 1.1
        minSpeedVirus= .7
        gameSpeed = 200
    }
    if (gameTime % gameSpeed === 0){
        let randomSpeed = Math.random() * (maxSpeedVirus - minSpeedVirus) + minSpeedVirus
        let randomPosition = Math.random() * (1300 - 100) + 100
        enemiesArray.push(new enemy(randomPosition, randomSpeed))
        console.log(gameTime)
    }
    }
    
    function drawEnemies(){
        enemiesArray.forEach((enemy)=> enemy.virusDraw())
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
      generateEnemies()
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
        });

     document.addEventListener('keyup', ({keyCode} ) => {
         if (keyCode === 32){
                laserFire()
        }
        });