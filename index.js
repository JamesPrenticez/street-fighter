const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const canvasX = canvas.width = 800
const canvasY = canvas.height = 600
const gravity = 0.2

class Sprite {
  constructor({width, height, position, velocity}){
    this.width = width
    this.height = height
    this.position = position 
    this.velocity = velocity
  }

  draw(){
    ctx.fillStyle = "red"
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update(){
    this.draw()

    this.position.y +=  this.velocity.y
    
    if(this.position.y + this.height + this.velocity.y >= canvasY){
      this.velocity.y = 0
    } else {
      this.velocity.y += gravity
    }
  }
}

const player = new Sprite({
  width: 50,
  height: 100,
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  }
})

const enemy = new Sprite({
  width: 50,
  height: 100,
  position: {
    x: canvasX - 50,
    y: 10
  },
  velocity: {
    x: 0,
    y: 0
  }
})

function animate(){
  window.requestAnimationFrame(animate)
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvasX, canvasY)
  player.update()
  enemy.update()
}

animate()