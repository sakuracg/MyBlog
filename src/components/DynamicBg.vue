<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import { Circle, Bubbly } from '../util/dynamicBg'
export default {
  name: 'DynamicBg',
  mounted () {
    if (localStorage.getItem('dynamicBg')) {
      this.$store.state.dynamicBg = localStorage.getItem('dynamicBg')
    }
    this.changeDynamic()
  },
  data () {
    return {
    }
  },
  watch: {
    '$store.state.dynamicBg': 'changeDynamic'
  },
  methods: {
    changeDynamic () {
      switch (this.$store.state.dynamicBg) {
        case '0':
          this.dynamicBg0()
          break
        case '1':
          this.dynamicBg1()
          break
        case '2':
          this.dynamicBg2()
          break
        default:
          break
      }
    },
    dynamicBg0 () {
      // 先暂停      
      window.cancelAnimationFrame(this.$store.state.dyWaterVal)
      const canvas = document.querySelector('#canvas')
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
    },

    dynamicBg1 () {
      this.dynamicBg0()
      const that = this
      const canvas = document.querySelector('#canvas')
      const ctx = canvas.getContext('2d')
      const w = canvas.width = canvas.offsetWidth
      const h = canvas.height = canvas.offsetHeight
      window.requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame
      let circles = []      
      
      var currentCircle = new Circle(0, 0, 'rgba(204, 204, 204, 0.4)')

      function init (num) {
        for (var i = 0; i < num; i++) {
          circles.push(new Circle(Math.random() * w, Math.random() * h))
        }
        draw()
      }

      function draw () {
        ctx.clearRect(0, 0, w, h)
        for (let i = 0, len = circles.length; i < len; i++) {
          circles[i].move(w, h)
          circles[i].drawCircle(ctx)
          for (let j = i + 1; j < len; j++) {
            circles[i].drawLine(ctx, circles[j])
          }
        }
        if (currentCircle.getX()) {
          currentCircle.drawCircle(ctx)
          for (let k = 0, len = circles.length; k < len; k++) {
            currentCircle.drawLine(ctx, circles[k])
          }
        }
        that.$store.state.dyWaterVal = requestAnimationFrame(draw)
      }
      window.onload = init(60)

      window.onmousemove = function (e) {
        e = e || window.event
        currentCircle.setX(e.clientX)
        currentCircle.setY(e.clientY)
      }
      window.onmouseout = function () {
        currentCircle.setX(null)
        currentCircle.setY(null)
      }
    },

    dynamicBg2 () {
      this.dynamicBg0()
      Bubbly({
        canvas: document.querySelector('#canvas')
      })
    }
  }
}
</script>

<style lang="less" scoped>
canvas {
  display: block;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
