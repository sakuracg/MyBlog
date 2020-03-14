<template>
  <div>
    <!-- 公共头 -->
    <wxz-header></wxz-header>
    <div class="container">
      <el-row :gutter="30">
        <el-col
          :sm="24"
          :md="16"
          style="transition:all .5s ease-out;margin-bottom:30px;"
        >
          <wxz-about></wxz-about>
          <!-- <wbc-message></wbc-message> -->
        </el-col>
        <el-col :sm="24" :md="8">
          <wxz-rightlist></wxz-rightlist>
        </el-col>
      </el-row>
    </div>
    <!-- 公共尾 -->
    <wxz-footer></wxz-footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import RightAside from '../components/RightAside'
import About from '../components/About'
export default {
  name: 'AboutMe',
  components: {
    'wxz-header': Header,
    'wxz-footer': Footer,
    'wxz-rightlist': RightAside,
    'wxz-about': About,
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 80%;
  margin: 0 auto;
}
</style>