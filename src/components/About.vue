<template>
  <div class="tcommonBox">
    <header>
      <h1>
        <router-link :to="{ name: 'AboutMe' }">关于我</router-link>
      </h1>
    </header>
    <section>
      <p>欢迎来到异世界，勇者们，好了，不知道说啥了，总之进行冒险吧！</p>
      <p>
        博客版本1.0中，1.1更新实验室主题以及换肤功能
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="less" scoped>
.tcommonBox {
  h1 {
    margin: 40px 0;
    text-align: center;
    a {
      height: 24px;
      line-height: 24px;
      font-size: 22px;
      font-weight: 550;
      color: lightblue;
    }
  }
  section {
    p {
      margin-bottom: 10px;
      font-size: 16px;
      line-height: 1.5;
    }
  }
}
</style>