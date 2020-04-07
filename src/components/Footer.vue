<template>
  <div class="footBack">
    <div v-if="isMobile" class="footer-img">
      <img v-lazy="'http://60.205.247.74:8089/others/footer.png'" alt="" />
    </div>
    <div
      v-else
      class="footer-img mobile"      
    ></div>
    <div class="fcontainer">
      <p>
        博客已萌萌哒运行<span>{{ runtimes }}</span
        ><span class="timeJump">(●'◡'●)ﾉ♥</span>
      </p>
      <p>
        © 2019 <a href="#">Sakura</a>. 由
        <a href="https://cn.vuejs.org/" target="_blank">Vue</a> 强力驱动.
      </p>
      <p>
        <span>Made with</span>
        <img class="fheart" v-lazy="'http://60.205.247.74:8089/others/avatar.jpg'" />
        <span>by Sakuracg.</span>
      </p>
    </div>
  </div>
</template>

<script>
import { _isMobile } from '../util/globle'
export default {
  name: 'Footer',
  data () {
    return {
      runtimes: '',
      isMobile: true
    }
  },
  created () {
    this.runTime()
    this.isMobile = !(/Android|webOS|iPhone|iPod|BlackBerry/i).test(navigator.userAgent)
    // console.log((/Android|webOS|iPhone|iPod|BlackBerry/i).test(navigator.userAgent))
  },
  methods: {
    runTime () {
      let that = this
      let oldTime = new Date('2020/01/01 00:00:00')
      setInterval(function () {
        let nowTime = new Date()
        let secondCount = nowTime - oldTime
        let days = parseInt(secondCount / 1000 / 60 / 60 / 24)
        let hours = parseInt(secondCount / 1000 / 60 / 60 % 24)
        let minutes = parseInt(secondCount / 1000 / 60 % 60)
        let seconds = parseInt(secondCount / 1000 % 60)
        that.runtimes = days + '天' + hours + '时' + minutes + '分' + seconds + '秒'
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.footBack {
  color: #888;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
  width: 100%;
  min-height: 50px;
  margin-top: -25px;
}
.footBack .fcontainer {
  width: 100%;
  background: #232323;
  padding: 15px 10px 10px 10px;
  box-sizing: border-box;
}
.footBack .footer-img {
  height: 430px;
  z-index: 1;
  position: relative;
  bottom: -80px;
  width: 100%;
  // pointer-events: none;
  img {
    width: 100%;
    height: 430px;
  }
}
.footBack .mobile {
  background: url("~static/images/footer.png") no-repeat 50%;
}

/*心脏呼吸*/
.footBack .fheart {
  width: 25px;
  height: 25px;
  margin-top: -10px;
  top: 5px;
  position: relative;
  /*padding-top:0px;*/
  vertical-align: baseline;
  -webkit-animation: heartScale 1.33s ease-in-out infinite;
  animation: heartScale 1.33s ease-in-out infinite;
}
@keyframes heartScale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
/*时间跳动*/
.timeJump {
  animation: my-face 5s infinite ease-in-out;
  -webkit-animation: my-face 5s infinite ease-in-out;
  display: inline-block;
  margin: 0 5px;
}

@keyframes my-face {
  2% {
    -webkit-transform: translate(0, 1.5px) rotate(1.5deg);
    -moz-transform: translate(0, 1.5px) rotate(1.5deg);
    -ms-transform: translate(0, 1.5px) rotate(1.5deg);
    -o-transform: translate(0, 1.5px) rotate(1.5deg);
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  4% {
    -webkit-transform: translate(0, -1.5px) rotate(-0.5deg);
    -moz-transform: translate(0, -1.5px) rotate(-0.5deg);
    -ms-transform: translate(0, -1.5px) rotate(-0.5deg);
    -o-transform: translate(0, -1.5px) rotate(-0.5deg);
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  6% {
    -webkit-transform: translate(0, 1.5px) rotate(-1.5deg);
    -moz-transform: translate(0, 1.5px) rotate(-1.5deg);
    -ms-transform: translate(0, 1.5px) rotate(-1.5deg);
    -o-transform: translate(0, 1.5px) rotate(-1.5deg);
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  8% {
    -webkit-transform: translate(0, -1.5px) rotate(-1.5deg);
    -moz-transform: translate(0, -1.5px) rotate(-1.5deg);
    -ms-transform: translate(0, -1.5px) rotate(-1.5deg);
    -o-transform: translate(0, -1.5px) rotate(-1.5deg);
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  10% {
    -webkit-transform: translate(0, 2.5px) rotate(1.5deg);
    -moz-transform: translate(0, 2.5px) rotate(1.5deg);
    -ms-transform: translate(0, 2.5px) rotate(1.5deg);
    -o-transform: translate(0, 2.5px) rotate(1.5deg);
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  12% {
    -webkit-transform: translate(0, -0.5px) rotate(1.5deg);
    -moz-transform: translate(0, -0.5px) rotate(1.5deg);
    -ms-transform: translate(0, -0.5px) rotate(1.5deg);
    -o-transform: translate(0, -0.5px) rotate(1.5deg);
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  14% {
    -webkit-transform: translate(0, -1.5px) rotate(1.5deg);
    -moz-transform: translate(0, -1.5px) rotate(1.5deg);
    -ms-transform: translate(0, -1.5px) rotate(1.5deg);
    -o-transform: translate(0, -1.5px) rotate(1.5deg);
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  16% {
    -webkit-transform: translate(0, -0.5px) rotate(-1.5deg);
    -moz-transform: translate(0, -0.5px) rotate(-1.5deg);
    -ms-transform: translate(0, -0.5px) rotate(-1.5deg);
    -o-transform: translate(0, -0.5px) rotate(-1.5deg);
    transform: translate(0, -0.5px) rotate(-1.5deg);
  }
  18% {
    -webkit-transform: translate(0, 0.5px) rotate(-1.5deg);
    -moz-transform: translate(0, 0.5px) rotate(-1.5deg);
    -ms-transform: translate(0, 0.5px) rotate(-1.5deg);
    -o-transform: translate(0, 0.5px) rotate(-1.5deg);
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  20% {
    -webkit-transform: translate(0, -1.5px) rotate(2.5deg);
    -moz-transform: translate(0, -1.5px) rotate(2.5deg);
    -ms-transform: translate(0, -1.5px) rotate(2.5deg);
    -o-transform: translate(0, -1.5px) rotate(2.5deg);
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  22% {
    -webkit-transform: translate(0, 0.5px) rotate(-1.5deg);
    -moz-transform: translate(0, 0.5px) rotate(-1.5deg);
    -ms-transform: translate(0, 0.5px) rotate(-1.5deg);
    -o-transform: translate(0, 0.5px) rotate(-1.5deg);
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  24% {
    -webkit-transform: translate(0, 1.5px) rotate(1.5deg);
    -moz-transform: translate(0, 1.5px) rotate(1.5deg);
    -ms-transform: translate(0, 1.5px) rotate(1.5deg);
    -o-transform: translate(0, 1.5px) rotate(1.5deg);
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  26% {
    -webkit-transform: translate(0, 0.5px) rotate(0.5deg);
    -moz-transform: translate(0, 0.5px) rotate(0.5deg);
    -ms-transform: translate(0, 0.5px) rotate(0.5deg);
    -o-transform: translate(0, 0.5px) rotate(0.5deg);
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  28% {
    -webkit-transform: translate(0, 0.5px) rotate(1.5deg);
    -moz-transform: translate(0, 0.5px) rotate(1.5deg);
    -ms-transform: translate(0, 0.5px) rotate(1.5deg);
    -o-transform: translate(0, 0.5px) rotate(1.5deg);
    transform: translate(0, 0.5px) rotate(1.5deg);
  }
  30% {
    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);
    -moz-transform: translate(0, -0.5px) rotate(2.5deg);
    -ms-transform: translate(0, -0.5px) rotate(2.5deg);
    -o-transform: translate(0, -0.5px) rotate(2.5deg);
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  32% {
    -webkit-transform: translate(0, 1.5px) rotate(-0.5deg);
    -moz-transform: translate(0, 1.5px) rotate(-0.5deg);
    -ms-transform: translate(0, 1.5px) rotate(-0.5deg);
    -o-transform: translate(0, 1.5px) rotate(-0.5deg);
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  34% {
    -webkit-transform: translate(0, 1.5px) rotate(-0.5deg);
    -moz-transform: translate(0, 1.5px) rotate(-0.5deg);
    -ms-transform: translate(0, 1.5px) rotate(-0.5deg);
    -o-transform: translate(0, 1.5px) rotate(-0.5deg);
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  36% {
    -webkit-transform: translate(0, -1.5px) rotate(2.5deg);
    -moz-transform: translate(0, -1.5px) rotate(2.5deg);
    -ms-transform: translate(0, -1.5px) rotate(2.5deg);
    -o-transform: translate(0, -1.5px) rotate(2.5deg);
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  38% {
    -webkit-transform: translate(0, 1.5px) rotate(-1.5deg);
    -moz-transform: translate(0, 1.5px) rotate(-1.5deg);
    -ms-transform: translate(0, 1.5px) rotate(-1.5deg);
    -o-transform: translate(0, 1.5px) rotate(-1.5deg);
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  40% {
    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);
    -moz-transform: translate(0, -0.5px) rotate(2.5deg);
    -ms-transform: translate(0, -0.5px) rotate(2.5deg);
    -o-transform: translate(0, -0.5px) rotate(2.5deg);
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  42% {
    -webkit-transform: translate(0, 2.5px) rotate(-1.5deg);
    -moz-transform: translate(0, 2.5px) rotate(-1.5deg);
    -ms-transform: translate(0, 2.5px) rotate(-1.5deg);
    -o-transform: translate(0, 2.5px) rotate(-1.5deg);
    transform: translate(0, 2.5px) rotate(-1.5deg);
  }
  44% {
    -webkit-transform: translate(0, 1.5px) rotate(0.5deg);
    -moz-transform: translate(0, 1.5px) rotate(0.5deg);
    -ms-transform: translate(0, 1.5px) rotate(0.5deg);
    -o-transform: translate(0, 1.5px) rotate(0.5deg);
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  46% {
    -webkit-transform: translate(0, -1.5px) rotate(2.5deg);
    -moz-transform: translate(0, -1.5px) rotate(2.5deg);
    -ms-transform: translate(0, -1.5px) rotate(2.5deg);
    -o-transform: translate(0, -1.5px) rotate(2.5deg);
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  48% {
    -webkit-transform: translate(0, -0.5px) rotate(0.5deg);
    -moz-transform: translate(0, -0.5px) rotate(0.5deg);
    -ms-transform: translate(0, -0.5px) rotate(0.5deg);
    -o-transform: translate(0, -0.5px) rotate(0.5deg);
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  50% {
    -webkit-transform: translate(0, 0.5px) rotate(0.5deg);
    -moz-transform: translate(0, 0.5px) rotate(0.5deg);
    -ms-transform: translate(0, 0.5px) rotate(0.5deg);
    -o-transform: translate(0, 0.5px) rotate(0.5deg);
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  52% {
    -webkit-transform: translate(0, 2.5px) rotate(2.5deg);
    -moz-transform: translate(0, 2.5px) rotate(2.5deg);
    -ms-transform: translate(0, 2.5px) rotate(2.5deg);
    -o-transform: translate(0, 2.5px) rotate(2.5deg);
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  54% {
    -webkit-transform: translate(0, -1.5px) rotate(1.5deg);
    -moz-transform: translate(0, -1.5px) rotate(1.5deg);
    -ms-transform: translate(0, -1.5px) rotate(1.5deg);
    -o-transform: translate(0, -1.5px) rotate(1.5deg);
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  56% {
    -webkit-transform: translate(0, 2.5px) rotate(2.5deg);
    -moz-transform: translate(0, 2.5px) rotate(2.5deg);
    -ms-transform: translate(0, 2.5px) rotate(2.5deg);
    -o-transform: translate(0, 2.5px) rotate(2.5deg);
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  58% {
    -webkit-transform: translate(0, 0.5px) rotate(2.5deg);
    -moz-transform: translate(0, 0.5px) rotate(2.5deg);
    -ms-transform: translate(0, 0.5px) rotate(2.5deg);
    -o-transform: translate(0, 0.5px) rotate(2.5deg);
    transform: translate(0, 0.5px) rotate(2.5deg);
  }
  60% {
    -webkit-transform: translate(0, 2.5px) rotate(2.5deg);
    -moz-transform: translate(0, 2.5px) rotate(2.5deg);
    -ms-transform: translate(0, 2.5px) rotate(2.5deg);
    -o-transform: translate(0, 2.5px) rotate(2.5deg);
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  62% {
    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);
    -moz-transform: translate(0, -0.5px) rotate(2.5deg);
    -ms-transform: translate(0, -0.5px) rotate(2.5deg);
    -o-transform: translate(0, -0.5px) rotate(2.5deg);
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  64% {
    -webkit-transform: translate(0, -0.5px) rotate(1.5deg);
    -moz-transform: translate(0, -0.5px) rotate(1.5deg);
    -ms-transform: translate(0, -0.5px) rotate(1.5deg);
    -o-transform: translate(0, -0.5px) rotate(1.5deg);
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  66% {
    -webkit-transform: translate(0, 1.5px) rotate(-0.5deg);
    -moz-transform: translate(0, 1.5px) rotate(-0.5deg);
    -ms-transform: translate(0, 1.5px) rotate(-0.5deg);
    -o-transform: translate(0, 1.5px) rotate(-0.5deg);
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  68% {
    -webkit-transform: translate(0, -1.5px) rotate(-0.5deg);
    -moz-transform: translate(0, -1.5px) rotate(-0.5deg);
    -ms-transform: translate(0, -1.5px) rotate(-0.5deg);
    -o-transform: translate(0, -1.5px) rotate(-0.5deg);
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  70% {
    -webkit-transform: translate(0, 1.5px) rotate(0.5deg);
    -moz-transform: translate(0, 1.5px) rotate(0.5deg);
    -ms-transform: translate(0, 1.5px) rotate(0.5deg);
    -o-transform: translate(0, 1.5px) rotate(0.5deg);
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  72% {
    -webkit-transform: translate(0, 2.5px) rotate(1.5deg);
    -moz-transform: translate(0, 2.5px) rotate(1.5deg);
    -ms-transform: translate(0, 2.5px) rotate(1.5deg);
    -o-transform: translate(0, 2.5px) rotate(1.5deg);
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  74% {
    -webkit-transform: translate(0, -0.5px) rotate(0.5deg);
    -moz-transform: translate(0, -0.5px) rotate(0.5deg);
    -ms-transform: translate(0, -0.5px) rotate(0.5deg);
    -o-transform: translate(0, -0.5px) rotate(0.5deg);
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  76% {
    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);
    -moz-transform: translate(0, -0.5px) rotate(2.5deg);
    -ms-transform: translate(0, -0.5px) rotate(2.5deg);
    -o-transform: translate(0, -0.5px) rotate(2.5deg);
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  78% {
    -webkit-transform: translate(0, -0.5px) rotate(1.5deg);
    -moz-transform: translate(0, -0.5px) rotate(1.5deg);
    -ms-transform: translate(0, -0.5px) rotate(1.5deg);
    -o-transform: translate(0, -0.5px) rotate(1.5deg);
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  80% {
    -webkit-transform: translate(0, 1.5px) rotate(1.5deg);
    -moz-transform: translate(0, 1.5px) rotate(1.5deg);
    -ms-transform: translate(0, 1.5px) rotate(1.5deg);
    -o-transform: translate(0, 1.5px) rotate(1.5deg);
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  82% {
    -webkit-transform: translate(0, -0.5px) rotate(0.5deg);
    -moz-transform: translate(0, -0.5px) rotate(0.5deg);
    -ms-transform: translate(0, -0.5px) rotate(0.5deg);
    -o-transform: translate(0, -0.5px) rotate(0.5deg);
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  84% {
    -webkit-transform: translate(0, 1.5px) rotate(2.5deg);
    -moz-transform: translate(0, 1.5px) rotate(2.5deg);
    -ms-transform: translate(0, 1.5px) rotate(2.5deg);
    -o-transform: translate(0, 1.5px) rotate(2.5deg);
    transform: translate(0, 1.5px) rotate(2.5deg);
  }
  86% {
    -webkit-transform: translate(0, -1.5px) rotate(-1.5deg);
    -moz-transform: translate(0, -1.5px) rotate(-1.5deg);
    -ms-transform: translate(0, -1.5px) rotate(-1.5deg);
    -o-transform: translate(0, -1.5px) rotate(-1.5deg);
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  88% {
    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);
    -moz-transform: translate(0, -0.5px) rotate(2.5deg);
    -ms-transform: translate(0, -0.5px) rotate(2.5deg);
    -o-transform: translate(0, -0.5px) rotate(2.5deg);
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  90% {
    -webkit-transform: translate(0, 2.5px) rotate(-0.5deg);
    -moz-transform: translate(0, 2.5px) rotate(-0.5deg);
    -ms-transform: translate(0, 2.5px) rotate(-0.5deg);
    -o-transform: translate(0, 2.5px) rotate(-0.5deg);
    transform: translate(0, 2.5px) rotate(-0.5deg);
  }
  92% {
    -webkit-transform: translate(0, 0.5px) rotate(-0.5deg);
    -moz-transform: translate(0, 0.5px) rotate(-0.5deg);
    -ms-transform: translate(0, 0.5px) rotate(-0.5deg);
    -o-transform: translate(0, 0.5px) rotate(-0.5deg);
    transform: translate(0, 0.5px) rotate(-0.5deg);
  }
  94% {
    -webkit-transform: translate(0, 2.5px) rotate(0.5deg);
    -moz-transform: translate(0, 2.5px) rotate(0.5deg);
    -ms-transform: translate(0, 2.5px) rotate(0.5deg);
    -o-transform: translate(0, 2.5px) rotate(0.5deg);
    transform: translate(0, 2.5px) rotate(0.5deg);
  }
  96% {
    -webkit-transform: translate(0, -0.5px) rotate(1.5deg);
    -moz-transform: translate(0, -0.5px) rotate(1.5deg);
    -ms-transform: translate(0, -0.5px) rotate(1.5deg);
    -o-transform: translate(0, -0.5px) rotate(1.5deg);
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  98% {
    -webkit-transform: translate(0, -1.5px) rotate(-0.5deg);
    -moz-transform: translate(0, -1.5px) rotate(-0.5deg);
    -ms-transform: translate(0, -1.5px) rotate(-0.5deg);
    -o-transform: translate(0, -1.5px) rotate(-0.5deg);
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  0%,
  100% {
    -webkit-transform: translate(0, 0) rotate(0);
    -moz-transform: translate(0, 0) rotate(0);
    -ms-transform: translate(0, 0) rotate(0);
    -o-transform: translate(0, 0) rotate(0);
    transform: translate(0, 0) rotate(0);
  }
}
</style>
