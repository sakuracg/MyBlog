<template>
  <div class="msg-box" ref="msgBoxRef">
    <div class="msg-respond" ref="respondRef">
      <h2>
        发表评论
        <el-button
          v-show="isRespond"
          class="tcolors-bg small"
          @click="removeRespond"
          >取消回复</el-button
        >
      </h2>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="留下脚步吧"
        v-model="textarea"
        resize="none"
        class="textarea"
        :autosize="{ minRows: 2, maxRows: 7 }"
        show-word-limit
        maxlength="300"
      >
      </el-input>
      <div class="send-info">
        <p class="tcolors-bg" @click="sendMessage">{{ sendTip }}</p>
      </div>
    </div>
    <div class="msg-comments" ref="commentsRef">
      <div class="msg-comments-tip">捕获 {{ total ? total : 0 }} 条</div>
      <div class="comments-list" v-if="commentList.length">
        <ul>
          <li
            class="comments-item"
            v-for="(item, index) in commentList"
            :key="'comment' + index"
          >
            <section>
              <img v-lazy="item.image" alt="图片不存在" class="inline-block" />
              <div class="item-content inline-block">
                <div class="username inline-block">{{ item.username }}</div>
                <div class="user-tab inline-block">
                  {{ tabName(item.type) }}
                </div>
                <div class="user-time">
                  {{ createTime(item.createTime) }}
                </div>
                <p class="user-content">
                  {{ item.content }}
                </p>
                <div
                  class="user-reply inline-block"
                  @click="
                    respondMsg(item.comment_one_id, item.comment_one_id, 1)
                  "
                >
                  回复
                </div>
                <span
                  v-show="item.child.length"
                  :ref="'showRespondInfo' + index"
                  class="showSecComments el-icon-arrow-right"
                  @click="showSecCommentsUnflod(index)"
                  >查看{{ item.child.length }}条回复</span
                >
              </div>
            </section>
            <ul
              :ref="'respondMsg' + index"
              v-show="false"
              class="comments-list2"
              style="padding-left:60px;"
            >
              <li
                class="comments-item"
                v-for="(citem, i) in item.child"
                :key="i"
              >
                <section>
                  <img
                    :src="citem.image"
                    alt="图片不存在"
                    class="inline-block"
                  />
                  <div class="item-content inline-block">
                    <div class="username inline-block">
                      {{ citem.username_from }} <span>回复</span>
                      {{ citem.username_to }}
                    </div>
                    <div class="user-tab inline-block">
                      {{ tabName(citem.type) }}
                    </div>
                    <div class="user-time">
                      {{ createTime(citem.createTime) }}
                    </div>
                    <p class="user-content">
                      {{ citem.content }}
                    </p>
                    <div
                      class="user-reply"
                      @click="
                        respondMsg(item.comment_one_id, citem.comment_tow_id, 2)
                      "
                    >
                      回复
                    </div>
                  </div>
                </section>
              </li>
              <span class="hideRespond" @click="hideSecCommentsUnflod(index)"
                >隐藏</span
              >
            </ul>
          </li>
        </ul>
        <h1 v-show="hasMore" class="tcolors-bg more" @click="addMoreFun">
          查看更多
        </h1>
        <h1 v-show="!hasMore" class="tcolors-bg more">没有更多</h1>
      </div>
      <div v-else class="no-comments">
        还没有任何冒险家评论喔~~~
      </div>
    </div>
  </div>
</template>

<script>
import { sendArticalComment, getBlogAllComments, FormatDate } from '../util/server'
export default {
  name: 'Message',
  data () {
    return {
      textarea: '',
      sendTip: '发送啦',
      aid: '', // 回复当前博客的ID
      commentId: '', // 当前评论的Id
      pCommentId: '', // 一级评论用户的ID
      pageId: 1, // 当前页 每页十条  检查是否累计加载还是 重新加载
      pageSize: 8,
      isRespond: false, // 是否显示取消回复 的文字
      commentList: [], // 评论列表数据
      rId: '', // 一级回复的user
      puserId: '', // 二级回复的ID
      total: '', // 评论总数
      hasMore: true,
      userTabs: [
        { type: 1, name: '霞之丘派' },
        { type: 2, name: '雪乃党' },
        { type: 3, name: '学姐党' },
        { type: 4, name: '樱花派' },
        { type: 5, name: '技术党' },
        { type: 6, name: '小萌新' },
        { type: 7, name: '埃罗芒阿老师党' }
      ]
    }
  },
  methods: {
    sendMessage () {
      const that = this
      // 发送一级留言   普通游客不能评论
      if (this.textarea) {
        sendArticalComment(that.textarea, that.aid, that.rId, that.puserId, res => {
          if (res.errorCode === 0) {
            that.textarea = ''
            that.showCommentList(true)
            that.removeRespond()
            that.$message.success('发送成功')
          }
        })
      } else {
        that.sendTip = '内容不能为空~'
        let timer = setTimeout(function () {
          that.sendTip = '发送'
          clearTimeout(timer)
        }, 3000)
      }
    },
    respondMsg (rid, pid, type) {
      const that = this
      if (localStorage.getItem('userInfo')) {
        if (type === 1) {
          this.rId = rid
          this.puserId = ''
        } else {
          this.puserId = pid
          this.rId = rid
        }
        let target = event.currentTarget
        target = target.parentNode
        that.isRespond = true
        target.appendChild(this.$refs.respondRef)
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
    showCommentList (more) {
      const that = this
      this.aid = this.$route.params.aid
      //   console.log(this.$route)
      //   是否重新加载数据
      this.pageId = more ? 1 : this.pageId + 1

      getBlogAllComments(this.aid, this.pageId, this.pageSize, res => {
        that.setData(res, more)
      })
    },
    setData (res, more) {
      // 没有查询到
      if (res.errorCode === 10400) {
        res.msg.forEach(item => {
          this.$message.warning(item)
        })
        this.commentList = []
      } else {
        let info = res.data        
        if (info.commentInfo.length > 0 && info.commentInfo.length < 8) {
          this.hasMore = false
        } else {
          this.hasMore = true
        }
        this.total = more ? info.total : this.total + info.total
        this.commentList = more ? info.commentInfo : this.commentList.concat(info.commentInfo)
      }
    },
    removeRespond () {
      this.isRespond = false
      this.$refs.msgBoxRef.insertBefore(this.$refs.respondRef, this.$refs.commentsRef)
    },
    addMoreFun () {
      this.showCommentList(false)
    },
    showSecCommentsUnflod (index) {
      let target = event.currentTarget
      target.style.display = 'none'
      // console.log(this.$refs['respondMsg' + index])
      this.$refs['respondMsg' + index][0].style.display = 'block'
    },
    hideSecCommentsUnflod (index) {
      this.$refs['showRespondInfo' + index][0].style.display = 'inline-block'
      this.$refs['respondMsg' + index][0].style.display = 'none'
    }
  },
  computed: {
    // 显示用户标签    
    tabName () {
      return function (type) {
        let name = ''
        this.userTabs.forEach((item, index) => {
          if (item.type === type) {
            name = item.name
          }
        })
        return name
      }
    },
    // 格式化时间
    createTime () {
      return function (time) {
        return FormatDate(time, 1)
      }
    }
  },
  created () {
    // 重新加载
    this.showCommentList(true)
  }
}
</script>

<style lang="less" scoped>
.msg-box {
  position: relative;
  padding: 15px;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 5px;
  .msg-respond {
    .small {
      padding: 5px 8px;
      font-size: 12px;
      color: #fff;
    }
    h2 {
      margin-bottom: 12px;
      font-size: 18px;
      font-weight: 650;
    }
    .textarea {
      margin-bottom: 30px;
      background: #f4f6f7;
      /deep/ .el-textarea__inner {
        min-height: 84px !important;
      }
    }
    .send-info {
      text-align: center;
      cursor: pointer;
      p {
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 16px;
        border-radius: 8px;
      }
    }
  }

  .msg-comments {
    margin-top: 40px;
    min-height: 100px;
    .msg-comments-tip {
      padding-left: 10px;
      height: 34px;
      line-height: 34px;
      // border-left: 2px solid lightblue;
      font-size: 18px;
      // color: lightblue;
    }
    > .comments-list {
      margin-top: 30px;
      padding: 0 8px;
      border-bottom: 1px solid lightblue;
    }
    .comments-item {
      position: relative;
      margin-bottom: 12px;
      padding-top: 22px;
      border-top: 1px solid lightblue;
      > .comments-list2 {
        position: relative;
      }
      img {
        overflow: hidden;
        margin-right: 16px;
        width: 48px;
        height: 48px;
        float: left;
        border-radius: 50%;
        vertical-align: top;
        transition: all 0.4s ease-in-out;
        object-fit: cover; /* img标签图片自适应 */
        &:hover {
          transform: rotate(360deg);
        }
      }
      .item-content {
        position: relative;
        vertical-align: top;
        // 兼容性  bug
        width: calc(100% - 80px);
        // max-width: 580px;
      }
      .username {
        font-size: 14px;
        color: #1a1f25;
        font-weight: 650;
        line-height: 24px;
        text-align: left;
      }
      .user-tab {
        margin-left: 12px;
        padding: 3px 6px;
        height: 14px;
        line-height: 14px;
        background: #dff0d8;
        color: #3c763d;
        border-radius: 5px;
        font-size: 12px;
        font-weight: 400;
      }
      .user-time {
        margin: 6px 0;
        color: #aaa;
        font-size: 12px;
      }
      .user-content {
        font-size: 16px;
        color: #34383d;
        text-align: left;
        line-height: 28px;
      }
      .user-reply {
        width: 24px; /* 两个字的宽度 */
        margin: 10px 0;
        padding: 5px 8px;
        // background: #dff0d8;
        // color: #3c763d;
        border-radius: 5px;
        color: #fff;
        background: #97dffd;
        font-size: 12px;
        cursor: pointer;
      }
      .showSecComments {
        margin-left: 12px;
        font-size: 12px;
        color: #34383d;
        cursor: pointer;
        &::before {
          float: right;
        }
      }
    }
  }
  .hideRespond {
    font-size: 13px;
    color: #fff;
    background: #97dffd;
    cursor: pointer;
    position: absolute;
    bottom: 4px;
    right: 35px;
    padding: 5px 8px;
    border-radius: 5px;
  }
  .no-comments {
    margin: 40px auto;
    min-height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 22px;
    color: #ccc;
  }
}
</style>
