import Store from '../store/index'

function Circle (x, y, color) {
  this.x = x
  this.y = y
  this.r = Math.random() * 10
  this._mx = 1 - (Math.random() * 2)
  this._my = 1 - (Math.random() * 2)

  this.drawCircle = drawCircle
  this.move = move
  this.drawLine = drawLine

  function drawCircle (ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 360)
    ctx.fillStyle = color || 'rgba(204, 204, 204, 0.3)'
    ctx.fill()
  }

  function move (w, h) {
    this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx)
    this._my = (this.y < h && this.y > 0) ? this._my : (-this._my)
    this.x += this._mx / 2
    this.y += this._my / 2
  }

  function drawLine (ctx, _circle) {
    var dx = this.x - _circle.x
    var dy = this.y - _circle.y
    var d = Math.sqrt(dx * dx + dy * dy)
    if (d < 150) {
      ctx.beginPath()
      ctx.moveTo(this.x, this.y)
      ctx.lineTo(_circle.x, _circle.y)
      ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)'
      ctx.stroke()
    }
  }
}
Circle.prototype.setX = function (x) {
  this.x = x
}
Circle.prototype.setY = function (y) {
  this.y = y
}
Circle.prototype.getX = function () {
  return this.x
}

const Bubbly = function (config) {
  let val = ''
  const c = config || {}
  const r = () => Math.random()
  const canvas = c.canvas
  let width = canvas.width
  let height = canvas.height
  const context = canvas.getContext('2d')
  context.shadowColor = c.shadowColor || '#fff'
  context.shadowBlur = c.blur || 4
  const gradient = context.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, c.colorStart || '#2AE')
  gradient.addColorStop(1, c.colorStop || '#fff')
  const nrBubbles = c.bubbles || Math.floor((width + height) * 0.02)
  const bubbles = []
  for (let i = 0; i < nrBubbles; i++) {
    bubbles.push({
      f: (c.bubbleFunc || (() => `hsla(0, 0%, 100%, ${r() * 0.1})`)).call(), // fillStyle
      x: r() * width, // x-position
      y: r() * height, // y-position
      r: (c.radiusFunc || (() => 4 + r() * width / 25)).call(), // radius
      a: (c.angleFunc || (() => r() * Math.PI * 2)).call(), // angle
      v: (c.velocityFunc || (() => 0.1 + r() * 0.5)).call() // velocity
    })
  }
  
  function draw () {
    Store.state.dyWaterVal = requestAnimationFrame(draw)
    // console.log(Store.state.dyWaterVal)
    context.globalCompositeOperation = 'source-over'
    context.fillStyle = gradient
    context.fillRect(0, 0, width, height)
    context.globalCompositeOperation = c.compose || 'lighter'
    bubbles.forEach(bubble => {
      context.beginPath()
      context.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2)
      context.fillStyle = bubble.f
      context.fill()
      // update positions for next draw
      bubble.x += Math.cos(bubble.a) * bubble.v
      bubble.y += Math.sin(bubble.a) * bubble.v
      if (bubble.x - bubble.r > width) {
        bubble.x = -bubble.r
      }
      if (bubble.x + bubble.r < 0) {
        bubble.x = width + bubble.r
      }
      if (bubble.y - bubble.r > height) {
        bubble.y = -bubble.r
      }
      if (bubble.y + bubble.r < 0) {
        bubble.y = height + bubble.r
      }
    }) 
  }
  draw()
  return 0
}

export {
  Circle,
  Bubbly
}
