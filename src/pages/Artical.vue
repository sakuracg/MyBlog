<template>
  <div>
    <!-- 公共头 -->
    <wxz-header></wxz-header>

    <el-container class="container" id="detail">
      <el-row :gutter="30">
        <!-- 右边个人信息消失 移动到最下面时 有动画  不尴尬 -->
        <el-col
          :sm="24"
          :md="16"
          style="transition:all .5s ease-out;margin-bottom:30px;"
        >
          <wxz-detail></wxz-detail>
          <wxz-message></wxz-message>
        </el-col>
        <el-col :sm="24" :md="8">
          <wxz-rightlist></wxz-rightlist>
        </el-col>
      </el-row>
    </el-container>

    <!-- 公共尾 -->
    <wxz-footer></wxz-footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import DetailArtical from '../components/DetailArtical'
import RightAside from '../components/RightAside'
import Message from '../components/Message'
import Footer from '../components/Footer'

export default {
  name: 'Artical',
  components: {
    'wxz-header': Header,
    'wxz-detail': DetailArtical,
    'wxz-rightlist': RightAside,
    'wxz-message': Message,
    'wxz-footer': Footer
  },
  mounted () {
    let detail = document.querySelector('#detail')
    let top = detail.offsetTop - 70
    document.documentElement.scrollTop = top
    document.body.scrollTop = top
    window.pageYOffset = top
    // console.log(document.body.scrollTop)    
  }
}
</script>

<style lang="less" scoped>
.container {
  max-width: 80%;
  margin: 0 auto;
}
</style>