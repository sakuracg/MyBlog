<template>
  <div>
    <!-- 公共头 -->
    <wxz-header></wxz-header>

    <div class="container">
      <div class="tcommonBox"></div>  
    </div>             

    <!-- 公共尾 -->
    <wxz-footer></wxz-footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  name: 'MessageBoard',
  components: {
    'wxz-header': Header,
    'wxz-footer': Footer
  }
}
</script>

<style lang="less" scoped>
.tcommonBox {
  min-height: 100px;
}
</style>