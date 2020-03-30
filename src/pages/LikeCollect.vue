<template>
  <div>
    <wxz-header></wxz-header>

    <!-- 动态背景 -->    
    <wxz-dy></wxz-dy>

    <div class="container tcommonBox">
      <div class="slider">
        <ul>
          <li @click="changeStyle1('like')">
            <router-link
              :to="{ name: 'Like', params: { type: 'like' } }"
              :class="currentStyle === 'like' ? 'active' : ''"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconzan"></use></svg
              >喜欢
            </router-link>
          </li>
          <li @click="changeStyle1('collect')">
            <router-link
              :to="{ name: 'Collect', params: { type: 'collect' } }"
              :class="currentStyle === 'collect' ? 'active' : ''"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconai-mark"></use></svg
              >收藏
            </router-link>
          </li>
        </ul>
      </div>
      <div class="u-container">
        <router-view />
      </div>
    </div>
    <wxz-footer></wxz-footer>
  </div>
</template>

<script>
import DynamicBg from '../components/DynamicBg'
import header from '../components/Header'
import footer from '../components/Footer'

export default {
  name: 'LikeCollect',
  components: {
    'wxz-header': header,
    'wxz-footer': footer,   
    'wxz-dy': DynamicBg
  },
  data () {
    return {
      currentStyle: ''
    }
  },
  created () {
    this.currentStyle = this.$route.params.type
  },
  watch: {
    '$route': 'changeRoute'
    // console.log(this.$route)
    // console.log(this.currentStyle)
  },
  methods: {
    changeRoute () {
      this.currentStyle = this.$route.params.type
    },
    changeStyle1 (type) {
      if (type === 'like') {
        this.currentStyle = 'like'
      } else {
        this.currentStyle = 'collect'
      }
      //   console.log(this.currentStyle)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  max-width: 80%;
  min-height: 168px;
  margin: 0 auto;
  position: relative;
  @media screen and (max-width: 768px) {
    .slider {
      display: none;
    }
    div.u-container {
      margin-left: 0;
    }
  }
  .slider {
    position: absolute;
    top: 0;
    left: 24px;
    width: 148px;
    background: #fff;
    li {
      width: 148px;
      height: 48px;
      margin: 0 auto 8px;
      &:first-child {
        margin-top: 64px;
      }
      a {
        position: relative;
        display: block;
        padding-left: 54px;
        height: 50px;
        line-height: 50px;
        text-align: left;
        font-size: 16px;
        &.active {
          color: #fff;
          // background: lightblue;
          border-radius: 8px 0 0 8px;
          svg {
            color: #fff;
          }
          &::after {
            display: block;
            content: "";
            position: absolute;
            bottom: 0;
            right: 0;
            width: 0;
            height: 0;
            border-top: 25px solid #fff;
            border-bottom: 25px solid #fff;
            // border-left: 15px solid lightblue;
          }
        }
        svg {
          display: block;
          position: absolute;
          left: 20px;
          top: 0;
          font-size: 20px;
          color: #93999f;
          height: 48px;
          line-height: 48px;
        }
      }
    }
  }
  .u-container {
    margin-left: 200px;
    min-height: 100px;
  }
}
</style>
