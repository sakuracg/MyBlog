<template>
  <div>
    <!-- 公共头 -->
    <wxz-header></wxz-header>

    <el-container class="container">
      <el-row :gutter="30">
        <!-- 右边个人信息消失 移动到最下面时 有动画  不尴尬 -->
        <el-col
          :xs="24"
          :sm="24"
          :md="16"
          style="transition:all .5s ease-out;margin-bottom:30px;"
        >
          <wxz-articallist></wxz-articallist>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8">
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
import ArticalList from '../components/ArticalList'
import RightAside from '../components/RightAside'
import Footer from '../components/Footer'
export default {
  name: 'Home',
  components: {
    'wxz-header': Header,
    'wxz-articallist': ArticalList,
    'wxz-rightlist': RightAside,
    'wxz-footer': Footer
  }
}
</script>

<style lang="less" scoped>
.container {
    max-width: 80%;
    margin: 0 auto;
}
</style>

