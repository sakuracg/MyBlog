<template>
  <div>
    <!-- 公共头 -->
    <wxz-header></wxz-header>

    <div class="container">
      <div class="tcommonBox">
        <div class="door-main">
          <div class="door-frame">
            <div class="door door-left">
              <div class="light light-left" hidden></div>
              <!-- 门后 -->
              <div class="door-face-0"></div>
              <!-- 门顶 -->
              <div class="door-face-2"></div>
              <!-- 门面 -->
              <div class="door-face-1"></div>
              <!-- 门侧 -->
              <div class="door-face-3"></div>
            </div>
            <div class="door door-right">
              <div class="light light-right" hidden></div>
              <!-- 门后 -->
              <div class="door-face-0"></div>
              <!-- 门顶 -->
              <div class="door-face-2"></div>
              <!-- 门面 -->
              <div class="door-face-1"></div>
              <!-- 门侧 -->
              <div class="door-face-3"></div>
            </div>
            <!-- 进入按钮 -->
            <div
              id="doorBtnIn"
              ref="opendoor"
              class="door-btn"
              @click="openDoor"
            >
              开<span></span>门
            </div>
          </div>
        </div>

        <template>
          <swiper
            :options="swiperOption"
            ref="mySwiper"
            class="swiper-container"
          >
            <!-- slides -->
            <swiper-slide
              class="swiper-slide"
              v-for="(board, ind) in messages"
              :key="ind"
            >
              <div
                class="swiper-bg"
                :style="{
                  backgroundImage:
                    'url(' +
                    require('../assets/images/message/message' +
                      (ind + 1) +
                      '.jpg') +
                    ')'
                }"
                ref="boardBg"
              >
                <div class="message-box" ref="board">
                  <button
                    :class="'message-animate' + message.animate"
                    v-for="(message, index) in board"
                    :key="'message' + index"
                  >
                    <span>{{ message.content }}</span
                    ><span> + {{ message.num }}</span>
                  </button>
                </div>
              </div>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev arrow-l" slot="button-prev"></div>
            <div class="swiper-button-next arrow-r" slot="button-next"></div>
          </swiper>
          <div class="swiper-input-text">
            <span class="message-send tcolors-bg" @click="deleteMessage"
              >撤回~</span
            >
            <el-input
              type="text"
              placeholder="不得超过六个字喔~"
              v-model="messageText"
              maxlength="6"
            >
            </el-input>
            <span class="message-send tcolors-bg" @click="sendMessage"
              >发送~</span
            >
          </div>
        </template>

        <div hidden>
          <audio id="audioOpen" src="../assets/audio/men.wav" preload></audio>
        </div>
      </div>
    </div>

    <!-- 公共尾 -->
    <wxz-footer></wxz-footer>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { TagCloud } from '../util/tagcloud.js'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AddSendMessage, ShowAllMessage, DelMessage } from '../util/server'
export default {
  name: 'MessageBoard',
  components: {
    'wxz-header': Header,
    'wxz-footer': Footer,
    swiper,
    swiperSlide
  },
  mounted () {
    this.$nextTick(() => {
    })

  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        // autoplay: {
        //   delay: 50000,
        //   disableOnInteraction: false,
        // },
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        effect: 'flip',
        loop: true,
      },
      messageText: '',
      messages: [],
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    openDoor () {
      let elDoorL = document.querySelector('.door-left')
      let elDoorR = document.querySelector('.door-right')
      let elLighL = document.querySelector('.light-left')
      let elLighR = document.querySelector('.light-right')
      let elDoorBox = document.querySelector('.door-main')

      let elAudio = document.querySelector('#audioOpen')
      let percentDoor = 0
      let fnOpenDoor = () => {
        percentDoor++
        if (percentDoor === 100) {
          elDoorBox.classList.add('active-board')
          return
        }

        // 门打开的动画
        elDoorL.style.transform = 'rotateY(' + (-90 * percentDoor) / 100 + 'deg)'
        elDoorR.style.transform = 'rotateY(' + (90 * percentDoor) / 100 + 'deg)'
        elLighL.removeAttribute('hidden')
        elLighR.removeAttribute('hidden')
        // 显示光线
        elLighL.style.opacity = 0.8 - (0.9 * percentDoor) / 100;
        elLighR.style.opacity = 0.8 - (0.9 * percentDoor) / 100;

        setTimeout(fnOpenDoor, 16)
      }

      this.$refs.opendoor.style.display = 'none'
      elAudio.play()
      fnOpenDoor()
      // 得到数据
      this.showTagMessage()
    },
    // 发送留言
    sendMessage () {
      const that = this
      if (that.messageText === '') {
        that.$message.error('留言密语还为空喔')
        return
      }
      if (localStorage.getItem('userInfo')) {
        AddSendMessage(that.messageText, res => {          
          if (res.errorCode === 200) {
            that.messageText = ''
            that.showTagMessage()
            that.$message.success(res.msg)
          } else {
            that.$message.error(res.msg)
          }
        })
      } else {
        that.$confirm('勇者请先登录，才可进行冒险喔！', '友情提示', {
          confirmButtonText: '确定',
          cancelButtonText: '关闭',
          type: 'warning'
        }).then(() => {
          localStorage.setItem('logUrl', that.$route.fullPath)
          that.$router.push({ name: 'Login', params: { type: 1 } })
        }).catch(action => {
        })
      }
    },
    // 撤回留言
    deleteMessage () {
      const that = this
      DelMessage(res => {
        if (res.errorCode === 200) {
          that.showTagMessage()
          that.$message.success(res.msg)
        } else {
          that.$message.error(res.msg)
        }
      })
    },
    // 显示留言
    showTagMessage () {
      const that = this
      ShowAllMessage(res => {
        var arr1 = []
        res.messages.forEach(item => {
          arr1.push(item.content)
        })
        //  数组去重
        var uniqeArr = that.uniqe(arr1)
        // 转成 [{},{}] 形式
        var arr3 = []
        for (let item in uniqeArr) {
          let objNew = {}
          objNew.content = item
          objNew.num = uniqeArr[item]
          objNew.animate = Math.floor(Math.random() * 8 + 1)
          arr3.push(objNew)
        }
        // 分页处理
        that.messages = that.arrTrans(8, arr3)
        // console.log(that.messages)

        // 加载动画
        that.$nextTick(() => {
          // 切换背景
          const boardBgs = that.$refs.boardBg
          // 面板内容加动画
          const boards = that.$refs.board
          // text
          
          for (let i = 0, len = boards.length; i < len; i++) {
            TagCloud(boards[i], boards[i].children)
            // 改变面板的位置
            if ((i + 1) % 2 === 0) {                          
              boards[i].style.left = "10%"
            } else {
              boards[i].style.left = "44%"
            }
          }
          // console.log(timer)  timer 是不变的                   
        })
      })
    },
    // 数组去重
    uniqe (arr) {
      return arr.reduce((prev, next) => {
        prev[next] = (prev[next] + 1) || 1;
        return prev;
      }, {})
    },
    // 分页处理
    arrTrans (num, arr) {
      let transArr = []
      arr.forEach((item, index) => {
        const page = Math.floor(index / num)
        if (!transArr[page]) {
          transArr[page] = []
        }
        transArr[page].push(item)
      })
      return transArr
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  max-width: 809px;
}
.tcommonBox {
  position: relative;
  width: 100%;
  height: 490px;
}
.door-main {
  position: relative;
  height: 490px;
  &.active-board {
    animation: flyIntoRoom 1s both;
  }
  div {
    position: absolute;
  }

  .door-frame {
    z-index: 11;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fbfad0;
    -webkit-perspective: 1200px;
    perspective: 1200px;
  }

  .door {
    top: 0;
    bottom: 0;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    transform: rotate(0deg);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .door-left {
    left: 0;
    right: 50%;
    transform-origin: left;
    border-left: 2px solid #fbfad0;
  }

  .door-right {
    left: 50%;
    right: 0;
    transform-origin: right;
  }

  .door-face-1,
  .door-face-0 {
    left: -3px;
    top: -3px;
    right: -3px;
    bottom: -3px;
    border: 3px solid lightgray;
  }

  .door-left .door-face-1,
  .door-left .door-face-0 {
    background: url("~@/assets/images/opendoorAnim.png") no-repeat 2% center;
    background-size: cover;
  }

  .door-right .door-face-1,
  .door-right .door-face-0 {
    background: url("~@/assets/images/opendoorAnim.png") no-repeat 88% center;
    background-size: cover;
  }

  .door-face-0 {
    transform: translateZ(-12px);
  }
  .door-face-1 {
    transform: translateZ(0);
  }

  .door-face-2 {
    height: 6px;
    left: -3px;
    right: -3px;
    top: 0;
    border: 3px solid #211820;
    border-radius: 2px;
    // background-color: lightskyblue;
    transform: translate3D(0, -7.5px, -6px) rotateX(90deg);
  }

  .door-face-3 {
    width: 6px;
    top: -3px;
    bottom: -3px;
    border: 3px solid #211820;
    border-radius: 2px;
    background: url("~@/assets/images/opendoorAnim.png") no-repeat 20% center;
    background-size: cover;
    transform: translate3D(7.5px, 0, -6px) rotateY(90deg);
  }

  .door-left .door-face-3 {
    right: 0;
  }

  .door-right .door-face-3 {
    left: 0;
  }

  .light {
    top: 0;
    bottom: 0;
    background: #f7e08f;
    width: 100%;
    transform: translateZ(-13px);
  }

  .light-left {
    left: 0;
  }
  .light-right {
    right: 0;
  }

  .door-btn {
    left: 50%;
    top: 60%;
    transform: translateX(-50%);
    padding: 5px 12px;
    border-radius: 8px;
    font-size: 22px;
    line-height: 32px;
    text-align: center;
    color: #fff;
    background: lightblue;
    cursor: pointer;
  }
  .door-btn span {
    padding-left: 8px;
  }
}

.swiper-container {
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  z-index: 1;
  /deep/ .swiper-pagination-bullet-active {
    background: rgb(98, 213, 252);
  }
  .swiper-slide {
    width: 100%;
    height: 100%;
  }
  .swiper-bg {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: right center;
    background-size: cover;
  }
  // 浏览盒子
  .message-box {
    position: relative;
    left: 10%;
    top: 80px;
    bottom: 140px;
    width: 375px;
    height: 270px;
    overflow: hidden;
    z-index: 5;
  }

  // 动画组
  button {
    display: block;
    box-sizing: border-box;
    background: none;
    position: absolute;
    top: 270px;
    border: 2px solid;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    line-height: 1;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    &:hover > span:first-child {
      color: #fff;
    }
  }
  .message-animate1 {
    color: #a972cb;
    &:hover,
    &:focus {
      border-color: #cb72aa;
      box-shadow: inset 0 0 0 30px #cb72aa;
    }
  }

  .message-animate2 {
    color: #ef6eae;
    &:hover,
    &:focus {
      -webkit-animation: pulse 1s;
      animation: pulse 1s;
      box-shadow: 0 0 0 30px rgba(255, 255, 255, 0);
    }
  }

  .message-animate3 {
    color: #ff7f82;
    &:hover,
    &:focus {
      box-shadow: inset -60px 0 0 0 #ffdc7f, inset 60px 0 0 0 #ffdc7f;
    }
  }

  .message-animate4 {
    color: #ffa260;
    &:hover,
    &:focus {
      box-shadow: 0 16px 16px -7px #e5ff60;
      -webkit-transform: translateY(-4px);
      transform: translateY(-4px);
    }
  }

  .message-animate5 {
    color: #e4cb58;
    &:hover,
    &:focus {
      box-shadow: inset 0 -50px 0 0 #94e458;
    }
  }

  .message-animate6 {
    color: #8fc866;
    &:hover,
    &:focus {
      box-shadow: inset 160px 0 0 0 #66c887;
    }
  }

  .message-animate7 {
    color: #19bc8b;
    box-shadow: 4px 4px 0 0 #1973bc, inset 4px 4px 0 0 #1973bc;
    &:hover,
    &:focus {
      box-shadow: 0 0 0 0 #1973bc, inset 96px 30px 0 0 #1973bc;
    }
  }

  .message-animate8 {
    color: #95adf5;
    &:hover,
    &:focus {
      box-shadow: 0 0 0 0 #86c1f2, inset 40px 20px 0 0 #86c1f2,
        inset -40px -20px 0 0 #86c1f2;
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 #ef8f6e;
    }
  }

  .arrow-l,
  .arrow-r {
    background: none;
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 14px;
      height: 14px;
    }
  }
  .arrow-l::after {
    border-left: 3px solid #ccc;
    border-bottom: 3px solid #ccc;
  }
  .arrow-r::after {
    border-top: 3px solid #ccc;
    border-right: 3px solid #ccc;
  }
}

.swiper-input-text {
  position: absolute;
  left: 50%;
  bottom: 60px;
  width: 444px;
  transform: translateX(-50%);
  z-index: 10;
  .el-input {
    width: 238px;
  }
  /deep/ .el-input__inner {
    background: url("../assets/images/message/messageBg.jpg") no-repeat right
      center;
    background-size: cover;
    &:focus {
      border: none;
    }
  }
  .message-send {
    display: inline-block;
    margin: 20px;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    color: #fff;
  }
}

@keyframes flyIntoRoom {
  from {
    transform: scale(1) translateZ(0);
    opacity: 1;
  }
  to {
    transform: scale(1) translateZ(100px);
    opacity: 0;
  }
}
</style>