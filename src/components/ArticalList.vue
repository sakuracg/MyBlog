<template>
  <div class="artical">
    <div
      v-if="
        (this.$route.name == 'ArticalType' ||
          this.$route.name == 'ArticalTypeSec') &&
          this.$route.params.cateId < 10
      "
      class="artical-type sss"
    >
      <div class="ui label">
        <router-link
          :to="{ name: 'ArticalType', params: { cateId: articalTypeId } }"
        >
          {{ articalTypeName }}
        </router-link>
      </div>
      <ul v-if="articalSecTypeList" class="shareclassTwo">
        <li v-for="(citem, index) in articalSecTypeList" :key="index">
          <router-link
            :to="{
              name: 'ArticalTypeSec',
              params: { cateId: articalTypeId, cateSecId: citem.cateId }
            }"
            :class="citem.cateId === articalTypeSecId ? 'active' : ''"
          >
            {{ citem.cateName }}
          </router-link>
        </li>
      </ul>
    </div>
    <article
      class="article-list tcommonBox"
      v-for="blog in blogList"
      :key="'artical' + blog.id"
    >
      <span class="s-round-date">
        <span
          class="month"
          v-html="showInitDate(blog.updated_at, 'month') + '月'"
        ></span>
        <span class="day" v-html="showInitDate(blog.updated_at, 'date')"></span>
      </span>
      <header>
        <h1>
          <router-link
            :to="{ name: 'Artical', params: { aid: blog.id } }"
            target="_blank"
          >
            {{ blog.title }}
          </router-link>
        </h1>
        <h2>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconshijian"></use></svg
          >更新于
          <span style="margin-right: 4px;" v-html="showFormatDate(blog.updated_at)"></span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconliulan1"></use></svg
          >{{ blog.browseNums }} 浏览
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icondianzan"></use></svg
          >{{ blog.favorNums }} 点赞
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconshoucang"></use></svg
          >{{ blog.collectNums }} 收藏
        </h2>
        <!-- 文章类型 -->
        <div class="ui label">
          <router-link
            :to="{ name: 'ArticalType', params: { cateId: blog.cateId } }"
          >
            {{ blog.cateName }}
          </router-link>
        </div>
      </header>
      <!-- 文章内容 -->
      <section class="article-content">
        <p>
          {{ blog.content }}
        </p>
        <p>
          <img :src="blog.image" alt="图片" class="maxW" />
        </p>
      </section>
      <!-- 文章细节 -->
      <div class="view-detail">
        <router-link
          class="tcolors-bg"
          :to="{ name: 'Artical', params: { aid: blog.id } }"
          target="_blank"
          >阅读全文>></router-link
        >
      </div>
    </article>
    <h1 v-show="hasMore" class="tcolors-bg more" @click="addMoreFun">
      查看更多
    </h1>
    <h1 v-show="!hasMore" class="tcolors-bg more">没有更多</h1>
  </div>
</template>

<script>
import { InitDate, GetArticalAll, FormatDate } from '../util/server'
export default {
  name: 'ArticalList',
  data () {
    return {
      blogList: [],
      //   用来显示图片的域名名称
      //   timeFormal: window.location.origin + window.location.pathname,
      //   文章类型id
      articalTypeId: 0, // 当前的文章类型ID
      articalTypeSecId: 0,  // 二级分类ID
      articalTypeName: '',
      articalSecTypeList: '',  // 当前文章二级分类的ID
      hasMore: true,
      pageId: 1,
      pageSize: 8,
      keywords: '',
      blogCate: [
        {
          cateId: 1,
          name: '神奇技术',
          cateChild: [
            { cateId: 11, cateName: '小程序', pid: 1 },
            { cateId: 12, cateName: '移动端', pid: 1 },
            { cateId: 13, cateName: 'PC端', pid: 1 },
            { cateId: 14, cateName: 'Node.js', pid: 1 }
          ]
        },
        { cateId: 2, name: '个人小说', cateChild: [{ cateId: 21, cateName: '我的小说', pid: 2 }] },
        {
          cateId: 3,
          name: '动漫杂谈',
          cateChild: [
            { cateId: 31, cateName: '美图分享', pid: 3 },
            { cateId: 32, cateName: '轻小说', pid: 3 },
            { cateId: 33, cateName: '番剧吐槽', pid: 3 }
          ]
        }
      ],
    }
  },
  watch: {
    '$route': 'routeChange'
  },
  created () {
    this.routeChange()
  },
  methods: {
    routeChange () {
      this.showSearchShowList(true)
    },
    //   显示时间格式
    showInitDate (oldDate, full) {
      return InitDate(oldDate, full)
    },
    showFormatDate (date) {
      return FormatDate(date)
    },
    //   路由有变化则执行该方法
    showSearchShowList (more) {
      //   console.log(this.$route)
      let that = this
      that.articalTypeId = (that.$route.params.cateId == undefined ? null : parseInt(that.$route.params.cateId))
      that.articalTypeSecId = (that.$route.params.cateSecId == undefined ? null : parseInt(that.$route.params.cateSecId))
      if (that.$route.query.keywords) {
        that.keywords = that.$store.state.keywords
      } else {
        that.keywords = ''
      }
      //   console.log(that.$route)
      this.getSecondaryIds()   // 获取二级分类      
      //获取传参的classId
      //   查看是否获取更多
      this.pageId = more ? 1 : this.pageId + 1
      GetArticalAll(that.articalTypeId, that.articalTypeSecId, that.keywords, that.pageId, that.pageSize, res => {
        if (res.errCode === 10404) {
          return that.$message.error('请求博客列表失败')
        }
        let info = res.data
        if (info.length > 0 && info.length < 8) {
          that.hasMore = false
        } else {
          that.hasMore = true
        }
        that.blogList = more ? info : that.blogList.concat(info)
      })
    },
    // 查询一级分类下的二级分类ID以及名字
    getSecondaryIds () {
      let that = this
      this.blogCate.forEach((item, index) => {
        if (that.articalTypeId === item.cateId) {
          that.articalTypeName = item.name
          if (item.cateChild && item.cateChild.length > 0) {
            that.articalSecTypeList = item.cateChild
          } else {
            that.articalSecTypeList = ''
          }
        }
      })
    },
    addMoreFun () {
      // 不重新加载
      this.showSearchShowList(false)
    }
  }
}
</script>

<style lang="less" scoped>
// 二级分类的样式
.active {
  background: deepskyblue !important;
}
.artical-type {
  margin-bottom: 50px;
  padding: 15px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
  .shareclassTwo {
    li {
      display: inline-block;
      a {
        display: inline-block;
        margin: 5px 7px;
        padding: 7px;
        color: #fff;
        border-radius: 4px;
        background: lightblue;
        transition: all 0.2s;
        &:hover {
          transform: translateY(-3px);
        }
      }
    }
  }
}

.article-list {
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

/* 文章头部 */
.article-list header h1 {
  margin: 10px 0 20px 0;
  line-height: 30px;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
}
.article-list header h2 {
  line-height: 24px;
  text-align: center;
  color: #555;
  font-size: 14px;
  .icon {
    margin: 0 4px 0 2px;
    fill: #444;
  }
}

.article-list header h2 i {
  margin: 0 2px 0 4px;
}

/* 文章主题 */
.article-list .article-content p {
  margin-top: 10px;
  line-height: 24px;
}

.article-list .article-content p:first-child {
  text-indent: 2em;
}

.article-list .article-content p:last-child {
  max-height: 300px;
  overflow: hidden;
  text-align: center;
}

.article-list .article-content p img {
  width: 100%;
}

.ui.label a {
  color: #fff;
}

@media screen and (max-width: 768px) {
  .article-list header h1 {
    margin: 10px 0;
  }
  .article-list header h2 {
    width: 90%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .article-list .article-content p:last-child {
    max-height: 168px;
  }
}
</style>
