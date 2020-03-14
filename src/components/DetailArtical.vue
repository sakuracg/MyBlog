<template>
  <div>
    <article class="article-box tcommonBox">
      <span class="s-round-date">
        <span
          class="month"
          v-html="showInitDate(detailInfo.updated_at, 'month') + '月'"
        ></span>
        <span
          class="day"
          v-html="showInitDate(detailInfo.updated_at, 'date')"
        ></span>
      </span>
      <header>
        <h1>
          <router-link
            :to="{ name: 'Artical', params: { aid: detailInfo.id } }"
            target="_blank"
          >
            {{ detailInfo.title }}
          </router-link>
        </h1>
        <h2>
          <i class="iconfont iconshijian"></i>更新于
          {{ showFormatDate(detailInfo.updated_at) }}
          <i class="iconfont iconliulan"></i>{{ detailInfo.browseNums }} 浏览
          <i class="iconfont iconliuyanxiaoxi"></i>
          {{ detailInfo.messageNums }} 留言
          <i class="iconfont iconzan"></i>
          {{ detailInfo.favorNums }} 点赞
          <i class="iconfont iconshoucang"></i>
          {{ detailInfo.collectNums }} 收藏
        </h2>
        <!-- 文章类型 -->
        <div class="ui label">
          <router-link
            :to="{ name: 'ArticalType', params: { cateId: detailInfo.cateId } }"
          >
            {{ detailInfo.cateName }}
          </router-link>
        </div>
      </header>
      <section class="article-content">
        <mavon-editor
          v-model="artical"
          :subfield="false"
          :boxShadow="false"
          defaultOpen="preview"
          :toolbarsFlag="false"          
        />
      </section>
      <div class="like-col-box">
        <div
          :class="likeArt ? 'like-box yes' : 'like-box'"
          @click="likeCollectHandle(1)"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconzan"></use></svg
          >喜欢 | {{ likeCount }}
        </div>
        <div
          :class="collectArt ? 'collect-box yes' : 'collect-box'"
          @click="likeCollectHandle(0)"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconshoucang"></use></svg
          >收藏 | {{ collectCount }}
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import { InitDate, FormatDate, GetArticalDeatil, GetArtical, updateArtLikeColl, artLike, artCollect } from '../util/server'
import { mavonEditor } from "mavon-editor"
import "mavon-editor/dist/css/index.css"
import "mavon-editor/dist/highlightjs/styles/github.min.css"
import { isMoment } from 'moment'
export default {
  name: 'DetailArtical',
  components: {
    mavonEditor,
  },
  data () {
    return {
      aid: '', // 文章id
      detailInfo: '',   // 文章详情      
      mdUrl: '',
      artical: '',
      likeArt: false,
      collectArt: false,
      likeCount: 400, // 点赞数量
      collectCount: 40, // 收藏数量      
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeChange'
  },
  created () {
    this.routeChange()
  },
  methods: {
    showInitDate (oldDate, full) {
      return InitDate(oldDate, full)
    },
    showFormatDate (date) {
      return FormatDate(date)
    },
    routeChange () {
      const that = this
      that.aid = this.$route.params.aid === undefined ? 1 : parseInt(that.$route.params.aid)
      GetArticalDeatil(that.aid, (res) => {
        if (res.errCode === 10404) {
          return that.$message.error('返回文章信息失败')
        }
        // console.log(res.data)
        that.likeCount = res.data.favorNums
        that.collectCount = res.data.collectNums
        that.mdUrl = res.data.artical
        that.detailInfo = res.data
        that.articalShow()

        // console.log(res.data.artical)
        // 如果用户登录，则获取
        if (localStorage.getItem('userInfo')) {
          that.isLike()
        }
      })
    },
    // 点赞 收藏处理
    likeCollectHandle (type) {
      const that = this
      let tip = ''
      if (localStorage.getItem('userInfo')) {
        if (type) {
          if (!that.likeArt) {
            that.likeCount += 1;
            that.likeArt = true;
            tip = '已点赞';
          } else {
            that.likeCount -= 1;
            that.likeArt = false;
            tip = '已取消点赞'
          }

        } else {
          if (!that.collectArt) {
            that.collectCount += 1;
            that.collectArt = true;
            tip = '已收藏';
          } else {
            that.collectCount -= 1;
            that.collectArt = false;
            tip = '已取消收藏';
          }
        }
        updateArtLikeColl(that.aid, type, that.likeArt, that.collectArt, res => {
          if (res.errorCode === 0) {
            that.$message.success(tip)
          }
        })
      } else {
        that.$confirm('勇者请先登录，才可进行冒险喔！', '友情提示', {
          confirmButtonText: '确定',
          cancelButtonText: '关闭',
          type: 'warning'
        }).then(() => {
          localStorage.setItem('logUrl', that.$route.fullPath)
          that.$router.push({ name: 'Login', params: { type: 1 } })
        }).catch(action => {
        })
      }
    },
    // 本篇文章用户是否点赞
    isLike () {
      artLike(this.aid, res => {
        this.likeArt = res.like_status
      })
      artCollect(this.aid, res => {
        this.collectArt = res.collect_status
      })
    },
    // 文章显示
    articalShow () {
      // let converter = new showdowm.Converter()
      if (this.mdUrl !== '') {
        GetArtical(this.mdUrl, res => {
          let text = res.data
          this.artical = text
          // console.log(this.artical)       
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-box {
  padding-bottom: 100px;
}
/* 文章头部 */
.article-box header h1 {
  margin: 10px 0 20px 0;
  line-height: 30px;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
}
.article-box header h2 {
  line-height: 24px;
  text-align: center;
  color: #555;
  font-size: 14px;
}
.article-box header h2 i {
  margin: 0 2px 0 4px;
}
.article-box .article-content {  
  /deep/ .markdown-body pre code {
    font-size: 100%;
  }
}
// 点赞 收藏
.article-box .like-col-box {
  position: absolute;
  bottom: 40px;
  right: 0;
  .like-box,
  .collect-box {
    display: inline-block;
    margin-right: 20px;
    padding: 0 12px;
    height: 35px;
    line-height: 35px;
    color: #fff;
    background: lightblue;
    border-radius: 14px;
    cursor: pointer;
    &:hover {
      background: #c668d3;
    }
    &.yes {
      background: #c668d3;
    }
  }
}
</style>
