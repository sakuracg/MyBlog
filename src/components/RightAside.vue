<template>
  <div class="right-box">
    <section>
      <div class="card-head">
        <img v-lazy="'http://60.205.247.74:8089/others/userinfo.jpg'" alt="" />
        <h1>
          <span>Sakuracg</span>
        </h1>
      </div>
      <div class="card-content">
        <p>异世界交流学会群</p>
        <div class="card-tip">
          <el-tooltip
            class="item"
            effect="dark"
            content="Github"
            placement="top"
            :enterable="false"
          >
            <a href="https://github.com/sakuracg" target="_blank"
              ><i class="iconfont iconGitHub"></i
            ></a>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="weibo"
            placement="top"
            :enterable="false"
          >
            <a href="javascript;;"><i class="iconfont iconweibo"></i></a>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="weixin"
            placement="top"
            :enterable="false"
          >
            <a href="javascript;;"><i class="iconfont iconweixin"></i></a>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="QQ"
            placement="top"
            :enterable="false"
          >
            <a href="javascript;;"><i class="iconfont iconQQ"></i></a>
          </el-tooltip>
        </div>
      </div>
    </section>

    <section class="message">
      <h2 class="ui label">留言板</h2>
      <ul>
        <li
          class="message-item"
          v-for="(item, index) of lastestMessage"
          :key="index"
        >          
          <div class="message-avatar">
            <img v-lazy="item.user.image" alt="~static/images/avator.jpg" />
          </div>
          <div class="message-content">
            <p class="content-author">{{ item.user.username }}</p>
            <p class="content-text">{{ item.content }}</p>
          </div>
        </li>
      </ul>
    </section>

    <section class="look">
      <!-- 浏览排行榜 -->
      <h2 class="ui label">——那，你喜欢哪一个？</h2>
      <ul>
        <li
          class="look-item"
          v-for="blog in blogBrowseList"
          :key="'actical' + blog.id"
        >
          <router-link
            :to="{ name: 'Artical', params: { aid: blog.id } }"
            target="_blank"
          >
            {{ blog.title }}
          </router-link>
          —— {{ blog.browse_nums }} 股气氛
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { ShowBrowseMaxBlog, ShowLastestMessage } from '../util/server'
export default {
  name: 'RightAside',
  data () {
    return {
      blogBrowseList: [],
      lastestMessage: []
    }
  },
  created () {
    //   查询浏览最多的十条记录
    ShowBrowseMaxBlog(data => {
      this.blogBrowseList = data
    })
    // 查询最新的留言板的留言
    ShowLastestMessage(data => {      
      this.lastestMessage = data
    })
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
/* 公共section */
.right-box {
  position: relative;
}

.right-box section {
  position: relative;
  margin-bottom: 25px;
  padding: 15px;
  background: #fff;
  border-radius: 5px;
  transition: all 0.2s linear;
}

.right-box section:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* 信息卡片头 */
.right-box .card-head {
  position: relative;
  text-align: center;
}

.right-box .card-head img {
  width: 100%;
  min-width: 100px;
  border-radius: 5px;
}

.right-box .card-head h1 {
  position: absolute;
  left: 50%;
  bottom: 5px;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.5px;
  text-shadow: 3px -2px 1px rgba(63, 42, 42, 0.5);
  opacity: 0.8;
}

/* 信息卡片主题 */
.right-box .card-content p {
  margin-top: 10px;
  font-size: 15px;
  text-align: center;
  font-weight: 700;
}

.right-box .card-content .card-tip {
  margin-top: 10px;
}

.right-box .card-tip {
  text-align: center;
}

.right-box .card-tip a {
  display: inline-block;
  margin: 0 10px 0 0;
  text-align: center;
}
.right-box .card-tip a i {
  margin: 0 4px 5px;
  display: inline-block;
  width: 42px;
  height: 42px;
  line-height: 42px;
  font-size: 28px;
  border-radius: 42px;
  color: rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  font-style: normal;
}
.right-box .card-tip a:hover i {
  color: #fff;
  background: rgba(124, 104, 104, 0.5);
}

/* 留言板样式 */
.message .message-item {
  font-size: 13px;
  line-height: 20px;
}

.message .message-item {
  margin: 5px 0;
  display: block;
  padding: 5px;
  transition: all 0.3s ease-out;
  border-bottom: 1px solid #ddd;
  color: #444;
}

.message .message-item:hover {
  background: rgba(230, 244, 250, 0.5);
  border-radius: 5px;
}

.message .message-item .message-avatar {
  float: left;
}

.message .message-item .message-avatar img {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  object-fit: cover;
}

.message .message-content {
  margin-left: 40px;
}

.message .message-content .content-author {
  font-weight: 640;
}

.message .message-content .content-text {
  font-size: 12px;
}

/* 浏览记录样式 */
.look .look-item {
  text-indent: 1em;
  font-size: 14px;
  line-height: 30px;
}

.look .look-item:not(:last-child) {
  border-bottom: 1px solid rgba(221, 221, 221, 0.664);
}

.look .look-item a {
  font-weight: 600;
}

.look .look-item a:hover {
  color: #c573c1;
}
</style>
