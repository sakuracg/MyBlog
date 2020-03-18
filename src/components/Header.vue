<template>
  <div>
    <div class="nav-header">
      <nav class="is-pc">
        <ul>
          <li class="nav-link-item">
            <div class="box">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconshouye"></use>
              </svg>
              <router-link :to="{ name: 'Home' }">首页</router-link>
            </div>
          </li>
          <li class="nav-link-item">
            <div class="box">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconfenlei"></use>
              </svg>
              <a href="javascript:;">分类</a>
            </div>
            <ul class="sub-link clearfix">
              <li
                class="sub-link-item"
                v-for="(cate, index) in articalCateList"
                :key="index"
              >
                <router-link
                  :to="{ name: 'ArticalType', params: { cateId: cate.id } }"
                >
                  {{ cate.name }}
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-link-item">
            <div class="box">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconshiyanqiju-"></use>
              </svg>
              <a href="javascript:;">实验室</a>
              <ul class="sub-link clearfix">
                <li class="sub-link-item">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconzhuti_tiaosepan_o"></use>
                  </svg>
                  <a href="javascript:;">切换主题</a>
                  <ul class="s-sub-link">
                    <!-- 是否开启背景图轮播 -->
                    <li></li>
                    <li class="s-sub-link-item" @click="changeSubject(1)">
                      <a href="javascript:;">海贼王</a>
                    </li>
                    <li class="s-sub-link-item" @click="changeSubject(2)">
                      <a href="javascript:;">春物</a>
                    </li>
                    <li class="s-sub-link-item" @click="changeSubject(3)">
                      <a href="javascript:;">路人女主</a>
                    </li>
                  </ul>
                </li>
                <li class="sub-link-item">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconbeijingbu"></use>
                  </svg>
                  <a href="javascript:;">动态背景</a>
                  <ul class="s-sub-link">
                    <li class="s-sub-link-item" @click="changeDynamicBG('0')">
                      <a href="javascript:;">关闭背景</a>
                    </li>
                    <li class="s-sub-link-item" @click="changeDynamicBG('1')">
                      <a href="javascript:;">动态粒子</a>
                    </li>
                    <li class="s-sub-link-item" @click="changeDynamicBG('2')">
                      <a href="javascript:;">上升水球</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-link-item">
            <div class="box">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconliuyan2"></use>
              </svg>
              <router-link :to="{ name: 'MessageBoard' }">留言板</router-link>
            </div>
          </li>
          <li class="nav-link-item">
            <div class="box">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconguanyuwomen"></use>
              </svg>
              <router-link :to="{ name: 'AboutMe' }">关于我</router-link>
            </div>
          </li>
        </ul>
      </nav>
      <!-- 手机端导航 -->
      <nav class="is-mobile">
        <div>
          <i @click="pMenu = !pMenu" class="el-icon-menu menu"></i>
        </div>
        <ul v-show="pMenu" class="m-show-nav">
          <li class="nav-link-item-m">
            <div class="box">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconshouye"></use>
              </svg>
              <router-link :to="{ name: 'Home' }">首页</router-link>
            </div>
          </li>
          <li class="nav-link-item-m">
            <div class="box">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconfenlei"></use>
              </svg>
              <a href="javascript:;">分类</a>
            </div>
            <ul class="sub-link clearfix">
              <li
                class="sub-link-item"
                v-for="(cate, index) in articalCateList"
                :key="index"
              >
                <router-link
                  :to="{ name: 'ArticalType', params: { cateId: cate.id } }"
                >
                  {{ cate.name }}
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-link-item-m">
            <div class="box">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconshiyanqiju-"></use>
              </svg>
              <a href="javascript:;">实验室</a>
            </div>
          </li>
          <li class="nav-link-item-m">
            <div class="box">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconliuyan2"></use>
              </svg>
              <router-link :to="{ name: 'MessageBoard' }">留言板</router-link>
            </div>
          </li>
          <li class="nav-link-item-m">
            <div class="box">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconguanyuwomen"></use>
              </svg>
              <router-link :to="{ name: 'AboutMe' }">关于我</router-link>
            </div>
          </li>
        </ul>
      </nav>
      <!-- 搜索模块 -->
      <div index="" class="pcsearchbox">
        <i class="el-icon-search iconfont iconsousuo"></i>
        <div class="pcsearchinput" :class="inputStr ? 'hasSearched' : ''">
          <el-input
            placeholder="搜索"
            suffix-icon="el-icon-search"
            v-model="inputStr"
            @change="searchChangeFun"
            @keyup.enter.native="searchEnterFun"
            clearable
          >
          </el-input>
        </div>
      </div>
      <!-- 登录 -->
      <div class="user-info">
        <div v-show="!haslogin" class="nologin" @click="loginFun">
          <router-link
            :to="{ name: 'Login', params: { type: 1 } }"
            class="a-label"
            >登录&nbsp;</router-link
          >|
          <router-link
            :to="{ name: 'Login', params: { type: 0 } }"
            class="a-label"
            >&nbsp;注册</router-link
          >
        </div>
        <div v-show="haslogin" class="haslogin">
          <el-avatar
            class="avatar-img"
            :src="userInfo.image"
          ></el-avatar>
          <ul class="haslogin-info">
            <li>
              <router-link :to="{ name: 'UserInfo' }">个人中心</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Like', params: { type: 'like' } }"
                >喜欢列表</router-link
              >
            </li>
            <li>
              <router-link
                :to="{
                  name: 'Collect',
                  params: { type: 'collect' }
                }"
                >收藏列表</router-link
              >
            </li>
            <li>
              <a href="javascript:void(0);" @click="userlogout">退出登录</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 背景图片 -->
    <div ref="headerBg" class="header-bg">
      <div class="time">
        <div class="origin-point"></div>
        <div class="hand hour"></div>
        <div class="hand minute"></div>
      </div>
      <div class="h-information1"></div>
    </div>

    <!-- 右侧上滑小图片 -->
    <div
      v-if="this.$store.state.user_start == 1"
      :class="gotoTop ? 'toTop' : 'toTop goTop'"
      @click="toTopfun"
    >
      <img src="~static/images/scroll.png" alt="" />
    </div>
    <div
      v-else
      :class="gotoTop ? 'toTophui' : 'toTophui goTophui'"
      @click="toTopfun"
    >
      <img src="~static/images/scroll.png" alt="" />
    </div>
  </div>
</template>

<script>
import _Mobile from '../util/globle'
import { Clock } from '../util/tool'
import { ArticalCateList, VeriftToken } from '../util/server'
export default {
  name: 'Header',
  data () {
    return {
      valueRef: 'yes',
      //   文章分类列表
      articalCateList: [],
      //   黑科技分类列表
      projectCateList: [],
      //   搜索
      inputStr: '',
      haslogin: false,
      userInfo: '',
      gotoTop: false,
      going: false, // 是否向上滑动
      isMobile: false,
      pMenu: false,
    }
  },
  watch: {
    '$route': 'routeChange'
  },
  created () {
    this.isMobile = _Mobile()
    // console.log('isMob@ile: ', this.isMobile)
    //   更换头部图片
    this.$nextTick(() => {
      let num = Math.floor(Math.random() * 15 + 2)
      //   console.log(this.$refs.headerBg)      
      // this.$refs.headerBg.style.backgroundImage = "url(" + require("static/images/" + num + ".jpg") + ")"
      //   console.log(this.$refs.headerBg.style.backgroundImage)
      // this.$refs.userImageRef.src = userInfo.image
    })

    // 判断登录是否过期    bug  不能直接退出    
    VeriftToken(res => {
      console.log(res.is_valid)
      if (!res.is_valid) {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('token')
        this.haslogin = this.$store.state.haslogin = false
      } else {
        this.haslogin = this.$store.state.haslogin = true
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        // console.log(this.userInfo)          
      }
    })

    this.routeChange()

    // 判断上滑  
    const that = this
    window.onscroll = function () {
      var t = document.documentElement.scrollTop || document.body.scrollTop
      if (!that.going) {
        if (t > 600) {
          that.gotoTop = true
        } else {
          that.gotoTop = false
        }
      }
    }
  },
  mounted () {
    // 执行时钟函数
    Clock()
  },
  methods: {
    routeChange () {
      // 刷新登录界面的路由      
      //   console.log(from)
      if (this.$store.state.refresh) {
        console.log(22)
        window.location.reload()
        this.$store.state.refresh = false
      }
      let that = this
      ArticalCateList(data => {
        that.articalCateList = data
        // console.log(data)        
      })
    },
    // 搜索模块
    searchChangeFun () {
      if (this.inputStr === '') {
        this.$store.state.keywords = ''
        this.$router.push({ path: '/' })
      }
    },
    searchEnterFun () {
      if (this.inputStr) {
        this.$store.state.keywords = this.inputStr
        this.$router.push({ path: '/ArticalType', query: { keywords: this.inputStr } })
      }
    },
    // 登录模块
    loginFun () {
      // 保存登录前的路由，一旦登录完成就跳转到原界面
      localStorage.setItem('logUrl', this.$route.fullPath)
    },
    // 用户登出
    userlogout () {
      this.$confirm('是否退出', '确认信息', {
        confirmButtonText: '确认登出',
        cancelButtonText: '继续升级',
        type: 'warning'
      }).then(() => {
        this.$store.state.haslogin = false
        localStorage.removeItem('userInfo')
        localStorage.removeItem('token')
        this.$router.push({ path: '/' }).catch(data => { })
        // window.location.reload()
        this.$message({
          type: 'info',
          message: '勇者大人，下次再见'
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: '欢迎回来，勇者大人'
        })
      })
    },

    // 返回顶部
    toTopfun () {
      const that = this
      this.gotoTop = false
      this.going = true
      let timer = setInterval(() => {
        let top = document.documentElement.scrollTop || document.body.scrollTop
        let step = Math.floor(-top / 10)
        document.documentElement.scrollTop = document.body.scrollTop = top + step
        if (top === 0) {
          that.going = false
          clearInterval(timer)
          timer = null
        }
      }, 15)
    },
    // 修改主题
    changeSubject (num) {
      document.querySelector('#app').className = 'theme' + num;
      localStorage.setItem('theme', document.querySelector('#app').className)
    },
    // 动态背景
    changeDynamicBG (num) {
      this.$store.state.dynamicBg = num
      // console.log(this.$store.state.dynamicBg)
      localStorage.setItem('dynamicBg', num)
    }
  }
}
</script>

<style lang="less" scoped>
/* 导航栏样式 */
.nav-header {
  width: 80%;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .icon {
    margin-right: 4px;
  }
  .nav-link-item {
    position: relative;
    margin-left: 20px;
    float: left;
    height: 41px;
    line-height: 41px;
    .box {
      color: #fff;
      i {
        margin-right: 5px;
      }
      a {
        // color: #fff;
        font-size: 14px;
      }
    }
    &:hover .sub-link {
      display: block;
    }
    .sub-link {
      position: absolute;
      left: -50%;
      margin-top: 5px;
      width: 100px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 0 0 4px 4px;
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
      text-align: center;
      display: none;
      .sub-link-item {
        line-height: 34px;
        &:hover .s-sub-link {
          display: block;
        }
        &:hover::before {
          margin-top: 8px;
          position: absolute;
          right: -20px;
          content: "";
          width: 0;
          height: 0;
          border-width: 10px;
          border-style: solid;
          border-color: transparent transparent transparent rgba(0, 0, 0, 0.4);
        }
      }
      &::before {
        position: absolute;
        top: -20px;
        content: "";
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color: transparent transparent rgba(0, 0, 0, 0.4) transparent;
      }
    }
    .s-sub-link {
      position: absolute;
      top: 0;
      left: 110px;
      width: 100px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 0 0 4px 4px;
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
      text-align: center;
      display: none;
      .s-sub-link-item {
        line-height: 34px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .is-mobile {
      position: absolute;
      top: 8px;
      left: 0;
      transition: all 0.1s;
    }
    .menu {
      font-size: 26px;
      color: #fff;
    }
    .m-show-nav {
      margin-top: 10px;
      background: rgba(0, 0, 0, 0.4);
    }
    .nav-link-item-m {
      position: relative;
      padding: 0 8px;
      color: #fff;
      font-size: 14px;
      .box {
        height: 30px;
        line-height: 30px;
        i {
          margin-right: 5px;
        }
        a {
          color: #fff;
        }
      }
      &:hover .sub-link {
        display: block;
      }
    }
    .sub-link {
      display: none;
      margin-left: 20px;
      a {
        height: 30px;
        line-height: 30px;
        color: #fff;
      }
    }
  }
}

// 搜索模块样式
.nav-header .pcsearchbox {
  position: absolute;
  top: 0;
  right: 0;
  max-width: 170px;
  height: 100%;
  cursor: pointer;
  i.iconsousuo {
    padding-left: 10px;
    font-size: 20px;
    line-height: 41px;
    color: #fff;
  }
  &:hover .pcsearchinput {
    opacity: 1;
    visibility: visible;
  }
  .pcsearchinput {
    position: absolute;
    top: 40px;
    right: 0;
    width: 170px;
    padding: 10px 20px;
    opacity: 0;
    visibility: hidden;
    background: rgba(40, 42, 44, 0.6);
    border-radius: 0 0 2px 2px;
    transition: all 0.3s ease-in-out;
    .el-input__suffix {
      right: 10px;
      top: -4px;
      font-size: 16px;
    }
  }
  @media screen and (max-width: 768px) {
    .pcsearchinput {
      width: 100px;
      padding: 0;
      background: none;
    }
  }
  .el-input__inner {
    height: 33px;
    border: 0;
  }
}

// 登录模块样式
.nav-header .user-info {
  position: absolute;
  top: 0;
  right: 36px;
  height: 100%;
  line-height: 40px;
  user-select: none;
  outline: none;
  .haslogin {
    position: relative;
    min-width: 80px;
    .avatar-img {
      margin-top: 8px;
      margin-left: 20px;
      width: 34px;
      height: 34px;
      line-height: 34px;
    }
    &:hover ul {
      opacity: 1;
      visibility: visible;
    }
    ul {
      padding: 5px 10px;
      position: absolute;
      top: 48px;
      right: 0;
      opacity: 0;
      visibility: hidden;
      background: rgba(40, 42, 44, 0.6);
      transition: all 0.3s ease-out;
      li:not(:last-child) {
        line-height: 38px;
        border-bottom: 1px solid #48456c;
      }
      a {
        color: #fff;
        &:hover {
          color: lightblue;
        }
      }
    }
  }
}

/* 背景图片 */
.header-bg {
  margin-bottom: 90px;
  position: relative;
  width: 100%;
  height: 650px;
  // background-image: url("@{headerBg}");
  background-position: center 50%;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 111;
  .time {
    position: absolute;
    top: 40px;
    left: 20px;
    width: 210px;
    height: 262px;
    background: url("../assets/images/time.png") no-repeat;
    background-position: -13px -10px;
    zoom: 0.6;
    .origin-point {
      position: absolute;
      top: 56%;
      left: 45%;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #b5ccd2;
    }
    .hand {
      position: absolute;
      transform: rotate(0deg);
      transform-origin: 50% 100%;
    }
    .minute {
      top: 35%;
      left: 45%;
      height: 110px;
      width: 38px;
      background: url("../assets/images/time.png") no-repeat;
      background-position: -240px -9px;
      zoom: 0.6;
    }
    .hour {
      top: 40%;
      left: 45%;
      height: 73px;
      width: 33px;
      background: url("../assets/images/time.png") no-repeat;
      background-position: -300px -9px;
      zoom: 0.7;
    }
  }
}
@media screen and (max-width: 768px) {
  .header-bg {
    height: 300px;
    margin-bottom: 20px;
  }
  .time {
    display: none;
  }
}
.h-information1 {
  text-align: center;
  width: 70%;
  margin: auto;
  position: relative;
  font-size: 16px;
  color: #fff;
}

.h-information {
  text-align: center;
  width: 70%;
  margin: auto;
  position: relative;
  top: 480px;
  padding: 40px 0;
  font-size: 16px;
  opacity: 0.98;
  background: rgba(230, 244, 249, 0.8);
  border-radius: 5px;
  z-index: 1;
  animation: b 1s ease-out;
  -webkit-animation: b 1s ease-out;
}

@-webkit-keyframes b {
  0% {
    -webkit-transform: translateY(90px);
    transform: translateY(90px);
  }
  80% {
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
  }
  90% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
  }
  to {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@keyframes b {
  0% {
    -webkit-transform: translateY(90px);
    transform: translateY(90px);
  }
  80% {
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
  }
  90% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
  }
  to {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

.h-information img {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  object-fit: cover;
}

.h-information img:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
}

.h-information h2 {
  margin-top: 20px;
  font-size: 18px;
  font-weight: 700;
  /*font-family: 'Sigmar One';*/
}
.h-information h2 a {
  background: linear-gradient(to right, #df2050, #48456d);
  -webkit-background-clip: text;
  color: transparent;
}

// 返回顶部
.toTop {
  position: fixed;
  right: 40px;
  top: -300px;
  z-index: 999;
  width: 70px;
  height: 900px;
  transition: all 0.5s 0.3s ease-in-out;
  cursor: pointer;
}
.goTop {
  top: -950px;
}
.toTop img,
.toTophui img {
  width: 100%;
  height: auto;
}
.toTophui {
  position: fixed;
  right: 10px;
  bottom: 80px;
  z-index: 99;
  width: 120px;
  height: 120px;
  transition: all 0.5s 0.3s ease-in-out;
  cursor: pointer;
  animation: toflow 2s ease-in-out infinite;
}
@keyframes toflow {
  0% {
    /*top:400px;*/
    transform: scale(0.95) translate(0, 10px);
  }
  50% {
    /*top:410px;*/
    transform: scale(1) translate(0, 0px);
  }
  100% {
    /*top:400px;*/
    transform: scale(0.95) translate(0, 10px);
  }
}
.goTophui {
  bottom: 120vh;
}
</style>
