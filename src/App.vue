<template>
  <div id="app">
    <!-- 路由占位符 -->
    <keep-alive include="Header, RightAside">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  },
  mounted () {
    // 加载主题
    if (localStorage.getItem('theme')) {
      document.querySelector('#app').className = localStorage.getItem('theme');
    } else {
      document.querySelector('#app').className = 'theme1'
    }
  }
}
</script>

<style lang="less">
/* 左上角类型标签格式 */
.ui.label {
  margin: 5px 0 15px 2px;
  font-size: 15px;
  position: relative;
  left: -32px;
  border-radius: 0 4px 4px 0;
  padding: 7px 11.2px 7px 32px;
  display: inline-block;
  // color: @fontColor;
  // border-color: @iconBg;
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  // background-color: @iconBg;
}

.ui.label::after {
  position: absolute;
  content: "";
  top: 100%;
  left: 0;
  border-top: 0 solid transparent;
  border-right-width: 1em;
  // border-right-color: @iconHoverBg;
  border-right-style: solid;
  border-bottom: 1em solid transparent;
  border-left: 0 solid transparent;
  width: 0;
  height: 0;
}
.ui.label a {
  // color: @fontColor;
}

/* 左上角日期格式 */
.tcommonBox {
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  position: relative;
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 40px;
  font-size: 15px;
}
.tcommonBox .s-round-date {
  position: absolute;
  top: -20px;
  left: -35px;
  height: 60px;
  width: 70px;
  padding-top: 10px;
  border-radius: 100px;
  // color: @fontColor;
  background: #97dffd;
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.tcommonBox .s-round-date span {
  display: block;
  text-align: center;
}
.tcommonBox .s-round-date .day {
  margin-top: 4px;
  font-size: 30px;
  font-weight: 700;
}

/* 阅读全文格式 */
.tcolors-bg {
  // background: @iconBg;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

// .tcolors-bg:hover {
//   background: @iconHoverBg;
// }

// .a-label:hover {
//   color: @fontHoverColor;
// }

/* iconfont */
.icon {
  width: 16px;
  height: 16px;
  vertical-align: -0.15em;
  // fill: @fontColor;
  overflow: hidden;
}
</style>
