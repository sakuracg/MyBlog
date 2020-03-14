<template>
  <div>
    <div class="lc-tab">
      <a
        href="javascript:;"
        :class="currentStyle === 0 ? 'sort-item active' : 'sort-item'"
        @click="showCateBlogs(0)"
        >全部</a
      >
      <a
        href="javascript:;"
        :class="currentStyle === 1 ? 'sort-item active' : 'sort-item'"
        @click="showCateBlogs(1)"
        >神奇技术</a
      >
      <a
        href="javascript:;"
        :class="currentStyle === 2 ? 'sort-item active' : 'sort-item'"
        @click="showCateBlogs(2)"
        >我的小说</a
      >
      <a
        href="javascript:;"
        :class="currentStyle === 3 ? 'sort-item active' : 'sort-item'"
        @click="showCateBlogs(3)"
        >动漫杂谈</a
      >
    </div>
    <div class="all-blog-main">
      <div class="allblog-content">
        <div
          class="blog-item"
          v-for="(blog, index) in currentLike"
          :key="'blog' + index"
        >
          <div class="img-box">
            <router-link
              :to="{ name: 'Artical', params: { aid: blog.id } }"
              target="_blank"
            >
              <img :src="blog.image" alt="图片不存在" />
            </router-link>
          </div>
          <div class="info-box">
            <div class="title">
              <span>{{ blog.cateName }}</span>
              <router-link
                :to="{ name: 'Artical', params: { aid: blog.id } }"
                class="hd"
                target="_blank"
                >{{ blog.title }}</router-link
              >
            </div>
            <div class="blog-content">
              {{ blog.content }}
            </div>
            <!-- 处理取消点赞 -->
            <div class="op">
              <el-button round>
                取消点赞
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllArtLike } from '../util/server'
export default {
  name: 'Like',
  data () {
    return {
      getAllLike: [],
      getTechLike: [],
      getNovelLike: [],
      getAnimeLike: [],
      currentLike: [],   // 当前展示的喜欢 
      currentStyle: 0,  // 展示当前的博客类型的样式     
    }
  },
  created () {
    this.getAllLikeBlog()
  },
  methods: {
    getAllLikeBlog () {
      getAllArtLike(res => {
        this.getAllLike = this.currentLike = res.blogLikes
        // 按照类型给博客分类进数组
        this.classifyBlogs(this.getAllLike)
      })
    },
    showCateBlogs (type) {
      if (type === 0) {
        this.currentStyle = 0
        this.currentLike = this.getAllLike
      } else if (type === 1) {
        this.currentStyle = 1
        this.currentLike = this.getTechLike
      } else if (type === 2) {
        this.currentStyle = 2
        this.currentLike = this.getNovelLike
      } else if (type === 3) {
        this.currentStyle = 3
        this.currentLike = this.getAnimeLike
      }
    },
    classifyBlogs (blogs) {
      for (let blog of blogs) {
        if (blog.pcateId === 1) {
          this.getTechLike.push(blog)
        } else if (blog.pcateId === 2) {
          this.getNovelLike.push(blog)
        } else if (blog.pcateId === 3) {
          this.getAnimeLike.push(blog)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.lc-tab {
  padding-top: 14px;
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #d9dde1;
  color: #545c63;
  font-size: 16px;
  .sort-item {
    display: inline-block;
    margin-right: 64px;
    &.active {
      color: lightblue;
      border-bottom: 2px solid lightblue;
    }
  }
}
.all-blog-main {
  margin-top: 28px;
  padding-bottom: 28px;
  .allblog-content {
    width: 100%;
    box-sizing: border-box;
  }
  .blog-item {
    position: relative;
    display: flex;
    flex-direction: row;
    margin-top: 28px;
    &:first-child {
      margin-top: 0;
    }
    .img-box {
      margin-right: 28px;
      width: 200px;
      img {
        width: 100%;
        vertical-align: bottom;
      }
    }
    .info-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      padding-bottom: 28px;
      border-bottom: 1px solid #d9dde1;
      .title {
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
          margin-right: 12px;
          padding: 2px 4px;
          line-height: 20px;
          border-radius: 2px;
          background: #f5f7fa;
          font-size: 12px;
          font-weight: 400;
          color: #9199a1;
        }
        .hd {
          flex: 1;
          max-width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 18px;
          font-weight: 650;
          line-height: 32px;
          color: #07111b;
        }
      }
      .blog-content {
        max-width: 300px;
        margin-bottom: 12px;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #4d555d;
        font-size: 14px;
        line-height: 24px;
      }
      .op {
        text-align: right;
        .el-button {
          margin-right: 12px;
        }
      }
    }
  }
}

@media screen and (max-height: 768px) {
  .lc-tab {
    height: 32px;
    line-height: 32px;
    border-bottom: 1px solid #d9dde1;
    color: #545c63;
    font-size: 16px;
    .sort-item {
      display: inline-block;
      margin-right: 40px;
    }
  }

  .all-blog-main {
    .allblog-content {
      width: 100%;
      box-sizing: border-box;
    }
    .blog-item {
      position: relative;
      display: flex;
      flex-direction: row;
      margin-top: 28px;
      &:first-child {
        margin-top: 0;
      }
      .img-box {
        margin-right: 28px;
        width: 128px;
        img {
          width: 100%;
          vertical-align: bottom;
        }
      }
      .info-box {
        padding-bottom: 0;
        .title {
          .hd {
            max-width: 100px;
          }
        }
        .blog-content {
          max-width: 180px;
        }
        .op {
          position: absolute;
          right: 35px;
          top: 0;
          height: 24px;
          width: 48px;
          text-align: right;
          /deep/ .el-button {
            padding: 5px 12px;
            margin-right: 12px;
          }
        }
      }
    }
  }
}
</style>