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
let currentWave = 4
let firedLasers = []
let enemiesArray =[]
let firedPlasma = []
let randomVirusFire
let trespasedVirus = 0
 

//clases

class Player {
    constructor(){
 this.playerLife = 5       
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
        this.phageXPosition += 80
    }

    phageMoveLeft(){
        if (this. phageXPosition > 80)
        this.phageXPosition -= 80
    }
    isTouching(plasma) {
        return (
          this.phageXPosition < plasma.plasmaXPosition + plasma.plasmaWidth &&
          this.phageXPosition + this.phageWidth > plasma.plasmaXPosition &&
          this.phageYPosition < plasma.plasmaYPosition + plasma.plasmaHeight &&
          this.phageYPosition + this.phageHeight > plasma.plasmaYPosition
        )
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
        this.laserYPosition -= 25
        ctx.drawImage(this.laser,this.laserXPosition, this.laserYPosition, this.laserWidth, this.laserHeight)
    }
}

class enemy {
    constructor(xPosition, random){
        this.virusLife = 10
        this.randomSpeed = random
        this.virusXPosition = xPosition
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
    isTouching(laser) {
        return (
          this.virusXPosition < laser.laserXPosition + laser.laserWidth &&
          this.virusXPosition + this.virusWidth > laser.laserXPosition &&
          this.virusYPosition < laser.laserYPosition + laser.laserHeight &&
          this.virusYPosition + this.virusHeight > laser.laserYPosition
        )
      }
}

class Plasma {
    constructor(virusXPosition, virusYPosition){
       this.plasmaXPosition = virusXPosition
       this.plasmaYPosition = virusYPosition
       this.plasmaWidth = 30
       this.plasmaHeight = 30
       this.plasma = new Image()
       this.plasma.src = images.plasma
       this.plasma.onload = ()=>{
       }
    }
    plasmaDraw(){
        this.plasmaYPosition += 8
        ctx.drawImage(this.plasma, this.plasmaXPosition,  this.plasmaYPosition, this.plasmaWidth, this.plasmaHeight)
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
    generateEnemies()
    drawEnemies()
    drawLasers ()
    generatePlasma(randomVirusFire)
    drawPlasma()
    randomPlasmaFire()
    filteredVirus()
    lasersAttack()
    plasmaAttack()
    gameOver()

}

function generateEnemies(){
    if(currentWave === 1){
        maxSpeedVirus = .4
        minSpeedVirus= .3
        gameSpeed = 350
    }else if (currentWave === 2){
        maxSpeedVirus = .6
        minSpeedVirus= .4
        gameSpeed = 300
    }else if (currentWave === 3){
        maxSpeedVirus = .8
        minSpeedVirus= .5
        gameSpeed = 250
    }else if (currentWave === 4){
        maxSpeedVirus = 1
        minSpeedVirus= .6
        gameSpeed = 200
    }else if (currentWave === 5){
        maxSpeedVirus = 1.1
        minSpeedVirus= .7
        gameSpeed = 150
    }
    if (gameTime % gameSpeed === 0){
        let randomSpeed = Math.random() * (maxSpeedVirus - minSpeedVirus) + minSpeedVirus
        let randomPosition = Math.random() * (1300 - 100) + 100
        enemiesArray.push(new enemy(randomPosition, randomSpeed))
    }
    }
    
    function drawEnemies(){
        enemiesArray.forEach((enemy)=> enemy.virusDraw())
    }

    function generatePlasma(randomVirusFire){
        if (gameTime % 200 === 0){
            firedPlasma.push(new Plasma(enemiesArray[randomVirusFire].virusXPosition + 35, enemiesArray[randomVirusFire].virusYPosition +80))
            firedPlasma.push(new Plasma(enemiesArray[randomVirusFire + 1].virusXPosition + 35, enemiesArray[randomVirusFire + 1].virusYPosition +80))
            firedPlasma.push(new Plasma(enemiesArray[randomVirusFire + 1].virusXPosition + 35, enemiesArray[randomVirusFire + 1 ].virusYPosition +80))
        }
    }

    function drawPlasma(){
        firedPlasma.forEach((plasmaBall)=>plasmaBall.plasmaDraw())
    }


//auxiliar functions

function laserFire (){
firedLasers.push(new Laser())
    }

function drawLasers (){
    firedLasers.forEach((laser) => laser.fire())
}

function randomPlasmaFire(){
    return randomVirusFire = Math.floor(Math.random() * ((enemiesArray.length) - 0)) + 0
}

function filteredVirus(){
    enemiesArray.forEach((virus, index)=> {
        if (virus.virusYPosition > canvas.height){
         trespasedVirus++   
        enemiesArray.shift(index, 1)
        }
    })
}

function lasersAttack(){
    firedLasers.forEach((laser, laserIndex) => {
        enemiesArray.forEach((virus, virusIndex) => {
            if(virus.isTouching(laser)){
                virus.virusLife--
                firedLasers.splice(laserIndex, 1)
            }if(virus.virusLife <= 0){
                enemiesArray.splice(virusIndex, 1)
            }
        })
})}

function plasmaAttack(){
    firedPlasma.forEach((plasma, plasmaIndex) => {
            if(phage1.isTouching(plasma)){
                phage1.playerLife--
             firedPlasma.splice(plasmaIndex, 1)
            }})}

            function gameOver(){
                if(phage1.playerLife <= 0 || trespasedVirus > 5){
                    clearInterval(startedGame)
                    ctx.font = "40px Arial"
                    ctx.fillText(` GAME OVER`, 100, 100)
                }
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