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

    this.position.x +=  this.velocity.x
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

//fixes keydown bug
const keys = {
  w: {pressed: false},
  a: {pressed: false},
  s: {pressed: false},
  d: {pressed: false},
}

let lastKey

function animate(){
  window.requestAnimationFrame(animate)
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvasX, canvasY)
  player.update()
  enemy.update()

  if(keys.w.pressed){
    player.velocity.y =- 10
  } else if (keys.a.pressed && lastKey === "a") {
    player.velocity.x = -1
  } else if (keys.s.pressed) {
    //dosomthing
  } else if (keys.d.pressed && lastKey === "d") {
    player.velocity.x = 1
  }
}

animate()

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'w':
      keys.w.pressed = true
    break
    case 'a':
      keys.a.pressed = true
      lastKey= 'a'
    break
    case 's':
      keys.s.pressed = true
    break
    case 'd': 
      keys.d.pressed = true
      lastKey= 'd'
    break
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
  }
})