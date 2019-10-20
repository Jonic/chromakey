import * as dat from 'dat.gui'

const lerp = (start, end, t) => start * (1 - t) + end * t

class Application {
  constructor() {
    this.colorKeys = '1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik,9ol.0p'.split('')
    this.endColor = [1, 64, 200]
    this.history = []
    this.shape = 'circle'
    this.size = 30
    this.spacing = 25
    this.startColor = [200, 64, 1]

    this.currentPosition = {
      x: 0,
      y: 0,
    }

    this.initCanvas()
    this.initKeyboardEvents()
    // this.initDatGui()
  }

  initCanvas() {
    this.canvas = document.querySelector('.c-canvas')
    this.context = this.canvas.getContext('2d')

    this.canvas.width = document.body.clientWidth
    this.canvas.height = document.body.clientHeight

    const devicePixelRatio = window.devicePixelRatio || 1
    const backingStoreRatio =
      this.context.webkitBackingStorePixelRatio ||
      this.context.backingStorePixelRatio ||
      1
    const ratio = devicePixelRatio / backingStoreRatio

    if (devicePixelRatio !== backingStoreRatio) {
      const oldWidth = this.canvas.width
      const oldHeight = this.canvas.height

      this.canvas.width = oldWidth * ratio
      this.canvas.height = oldHeight * ratio

      this.canvas.style.width = oldWidth + 'px'
      this.canvas.style.height = oldHeight + 'px'

      this.context.scale(ratio, ratio)
    }
  }

  initDatGui() {
    const gui = new dat.GUI()

    gui.add(this, 'size', 1, 100)
    gui.add(this, 'spacing', 1, 100)
    gui.add(this, 'shape', ['circle', 'triangle', 'hexagon', 'square'])
    gui.addColor(this, 'startColor')
    gui.addColor(this, 'endColor')

    gui.remember(this)
  }

  initKeyboardEvents() {
    window.addEventListener('keydown', event => {
      const { code, key } = event
      console.log(this.colorKeys.indexOf(key))

      if (this.colorKeys.indexOf(key) > -1) {
        return this.applyKey(key)
      }

      if (code === 'Enter') {
        this.currentPosition.x = 0
        this.currentPosition.y += this.spacing
        return
      }

      if (code === 'Space' || key === '+') {
        return this.applyKey('+')
      }

      if (code === 'Backspace') {
        return this.applyBackspace()
      }

      console.log(`${key} is invalid`)
    })
  }

  applyBackspace() {
    const poppedKey = this.history.pop()
    console.log(this.history.join(''))
  }

  applyKey(key) {
    this.history.push(key)
    console.log(this.history.join(''))

    if (key !== '+') {
      const arrayOffset = this.colorKeys.indexOf(key)
      const t = arrayOffset / this.colorKeys.length
      const color = [
        lerp(this.startColor[0], this.endColor[0], t),
        lerp(this.startColor[1], this.endColor[1], t),
        lerp(this.startColor[2], this.endColor[2], t),
      ]

      // console.table({
      //   arrayOffset,
      //   t,
      //   color,
      // })

      this.context.fillStyle = `rgba(${color.join(', ')}, 0.85)`
      this.context.beginPath()
      this.context.arc(
        this.currentPosition.x,
        this.currentPosition.y,
        this.size / 2,
        0,
        2 * Math.PI,
        true
      )
      this.context.closePath()
      this.context.fill()
    }

    this.currentPosition.x += this.spacing

    if (this.currentPosition.x > document.body.clientWidth) {
      this.currentPosition.x = 0
      this.currentPosition.y += this.spacing
    }
  }
}

export default Application
