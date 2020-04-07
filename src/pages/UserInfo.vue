<template>
  <div>
    <wxz-header></wxz-header>

    <!-- 动态背景 -->
    <wxz-dy></wxz-dy>

    <div class="container">
      <div v-show="!isEdit" class="tcommonBox">
        <header>
          <h1>
            <span class="title"> 个人中心</span>
          </h1>
          <el-button class="edit" @click="isEdit = !isEdit">
            <i class="el-icon-edit-outline"></i>
            修改资料
          </el-button>
        </header>
        <section>
          <ul class="userinfo-box">
            <li>
              <span class="left-title">勇者头像</span>
              <div class="hero-avatar1">
                <img :src="userInfoObj.image" />
              </div>
            </li>
            <li>
              <span class="left-title">勇者名称</span>
              <span>{{ userInfoObj.username }}</span>
            </li>
            <li>
              <span class="left-title">电子邮件</span>
              <span>{{ userInfoObj.email }}</span>
            </li>
            <li>
              <span class="left-title">勇者类别</span>
              <span>{{ heroTypeSelected }}</span>
            </li>
            <li>
              <span class="left-title">勇者性别</span>
              <span>{{ userInfoObj.sex }}</span>
            </li>
            <li>
              <span class="left-title">勇者帮派</span>
              <span>{{ userTabSelected }}</span>
            </li>
          </ul>
        </section>
      </div>
      <div v-show="isEdit" class="tcommonBox">
        <header>
          <h1>
            <span class="title">编辑资料</span>
          </h1>
        </header>
        <section>
          <ul class="userinfo-box">
            <li class="avator">
              <span class="left-title">勇者头像</span>
              <div class="hero-avatar">
                <img :src="userInfoObj.image" />
              </div>
              <el-upload
                class="avatar-uploader"
                action="/api/upload/images"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <button class="changeAvatar">
                  <span>更改头像</span>
                </button>
              </el-upload>
            </li>
            <li>
              <span class="left-title">勇者名称</span>
              <el-input
                class="userinfo-name"
                v-model="userInfoObj.username"
                placeholder="勇者名称"
                spellcheck="false"
                @blur="removeEvent"
              ></el-input>
            </li>
            <li>
              <span class="left-title">电子邮件</span>
              <span>{{ userInfoObj.email }}</span>
            </li>
            <li class="radio-group">
              <span class="left-title">勇者类别</span>
              <span>{{ heroTypeSelected }}</span>
              <template>
                <el-radio-group v-model="heroTypeSelected">
                  <el-radio-button
                    v-for="(item, index) in heroType"
                    :key="index"
                    :label="item.name"
                    >{{ item.name }}</el-radio-button
                  >
                </el-radio-group>
                <el-select v-model="heroTypeSelected" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in heroType"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </template>
            </li>
            <li class="radio-group">
              <span class="left-title">勇者性别</span>
              <span>{{ userInfoObj.sex }}</span>
              <el-radio-group v-model="userInfoObj.sex">
                <el-radio-button class="radio" label="男">男</el-radio-button>
                <el-radio-button label="女">女</el-radio-button>
                <el-radio-button label="保密">保密</el-radio-button>
              </el-radio-group>
              <el-select v-model="userInfoObj.sex" placeholder="请选择">
                <el-option
                  v-for="(item, index) in sexTab"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </li>
            <li class="radio-group">
              <span class="left-title">勇者帮派</span>
              <span>{{ userTabSelected }}</span>
              <template>
                <el-radio-group v-model="userTabSelected">
                  <el-radio-button
                    v-for="(item, index) in userTabs"
                    :key="index"
                    :label="item.name"
                    >{{ item.name }}</el-radio-button
                  >
                </el-radio-group>
                <el-select v-model="userTabSelected" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in userTabs"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </template>
            </li>
          </ul>
          <div class="save-infobtn">
            <a
              class="tcolors-bg"
              href="javascript:void(0);"
              @click="returnisEdit"
              >返 回</a
            >
            <a
              class="tcolors-bg"
              href="javascript:void(0);"
              @click="saveInfoFun"
              >保 存</a
            >
          </div>
        </section>
      </div>
    </div>
    <wxz-footer></wxz-footer>
  </div>
</template>

<script>
import DynamicBg from '../components/DynamicBg'
import header from '../components/Header'
import footer from '../components/Footer'
import { GetUserInfo, SaveUserInfo, SaveUserImg, judgeUniqueUsername, FormatDate } from '../util/server'
import _Mobile from '../util/globle'
export default {
  name: 'UserInfo',
  components: {
    'wxz-header': header,
    'wxz-footer': footer,
    'wxz-dy': DynamicBg
  },
  data () {
    return {
      isEdit: false,
      username: '', // 当前的用户名
      isSaveUpload: true, // 是否可以提交信息
      userInfo: '', // 这玩意可以修改
      userInfoObj: '', // 还得重新获取      
      userTabs: [
        { type: 1, name: '霞之丘派' },
        { type: 2, name: '雪乃党' },
        { type: 3, name: '学姐党' },
        { type: 4, name: '樱花派' },
        { type: 5, name: '技术党' },
        { type: 6, name: '小萌新' },
        { type: 7, name: '埃罗芒阿老师党' }
      ],
      userTabSelected: '',
      heroType: [
        { type: 101, name: '初期勇者' },
        { type: 102, name: '勇者长征' },
        { type: 103, name: '勇者觉醒' }
      ],
      heroTypeSelected: '',
      sexTab: [
        { name: '男' },
        { name: '女' },
        { name: '保密' }
      ]
    }
  },
  methods: {
    //   上传头像成功
    handleAvatarSuccess (res, file) {
      const that = this
      let data = res.data
      if (data.errorCode === 0) {
        that.userInfoObj.image = data.host + data.dir + '/' + data.filename
        // 只更新图片                      
        SaveUserImg(that.userInfo.image, that.userInfoObj.image, res => {          
          that.userInfoObj.image = res.data.image
          localStorage.setItem('userInfo', JSON.stringify(that.userInfoObj))          
          that.userInfo = JSON.parse(localStorage.getItem('userInfo'))
          that.$message.success('修改勇者照片成功')
        })
      }
    },
    // 上传头像之前
    beforeAvatarUpload (file) {
      const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isIMAGE) {
        this.$message.error('上传头像图片只能是  JPG、GIF、BMP、PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isIMAGE && isLt2M
    },
    // 用户名输入框离开事件
    removeEvent () {
      const that = this
      if (this.username !== this.userInfoObj.username) {
        judgeUniqueUsername(this.userInfoObj.username, res => {
          // 如果用户存在
          if (res.data) {
            that.isSaveUpload = false
            that.$message.error('勇者，称号名称已经被人占有了！')
          } else {
            that.isSaveUpload = true
          }
        })
      }
    },
    // 保存信息
    saveInfoFun () {
      const that = this
      if (!that.userInfoObj.username) {
        that.$message.error('勇者，你忘记填称号了！')
        return
      }
      if (!that.isSaveUpload) {
        that.$message.error('勇者，称号名称已经被人占有了！')
        return
      }
      // 根据类别获取type
      that.getHeroTab()
      that.userInfoObj.updated_at = FormatDate(Date.now())
      SaveUserInfo(that.userInfoObj, res => {
        if (res.data) {
          this.userInfoObj = res.data
          this.userInfoObj.updated_at = FormatDate(this.userInfoObj.updated_at)
          localStorage.setItem('userInfo', JSON.stringify(this.userInfoObj))
          that.userInfo = localStorage.getItem('userInfo')
          this.$message.success('修改勇者信息成功')
        }
      })
    },
    returnisEdit () {
      this.isEdit = !this.isEdit
      if (_Mobile()) {
        window.scrollTo(0, 0)
      } else {
        window.scrollTo(0, 670)
      }
    },
    routeChange () {
      const that = this
      if (localStorage.getItem('userInfo')) {
        that.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        GetUserInfo(res => {
          that.userInfoObj = res.data
          // 展示信息
          that.showHeroTab()
        })
      } else {
        // 退出登录
        that.$store.state.haslogin = false
        localStorage.removeItem('token')
        that.$router.push({ path: '/' }).catch(data => { })
      }
    },
    // 展示勇者表情
    showHeroTab () {
      const that = this
      this.userTabs.forEach((item, index) => {
        if (item.type === that.userInfoObj.userTab) {
          that.userTabSelected = item.name
        }
      })
      this.heroType.forEach((item, index) => {
        if (item.type === that.userInfoObj.type) {
          that.heroTypeSelected = item.name
        }
      })
    },
    // 得到新的标签
    getHeroTab () {
      const that = this
      this.userTabs.forEach((item, index) => {
        if (item.name === that.userTabSelected) {
          that.userInfoObj.userTab = item.type
        }
      })
      this.heroType.forEach((item, index) => {
        if (item.name === that.heroTypeSelected) {
          that.userInfoObj.type = item.type
        }
      })
    }
  },
  watch: {
    '$route': 'routeChange'
  },
  created () {
    this.routeChange()
    this.username = this.userInfo.username    
  }

}
</script>

<style lang="less" scoped>
.container {
  max-width: 50%;
  margin: 0 auto;
}
.tcommonBox {
  header {
    position: relative;
    margin: 20px auto;
    h1 {
      text-align: center;
      .title {
        font-size: 24px;
        font-weight: 750;
      }
    }
    .edit {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(100%, -40%);
      padding: 8px;
      font-size: 13px;
    }
  }
}

// 用户信息
.userinfo-box {
  .left-title {
    display: inline-block;
    width: 100px;
    padding: 10px 0;
  }
  li {
    position: relative;
    padding: 20px;
    border-bottom: 1px solid #ddd;
    &:last-child {
      border-bottom: 0;
    }
    span:nth-child(2) {
      // color: rgb(101, 200, 233);
    }
    .hero-avatar1 {
      img {
        position: absolute;
        left: 120px;
        top: 0;
        width: 76px;
        height: 76px;
        border-radius: 50%;
      }
    }
  }
}

// 编辑用户信息
.userinfo-box {
  .avator {
    padding: 0;
    height: 168px;
    span {
      padding-left: 20px;
      line-height: 168px;
    }
  }
  .hero-avatar {
    position: absolute;
    top: 13px;
    left: 175px;
    width: 138px;
    height: 138px;
    border-radius: 50%;
    border: 1px solid #ddd;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 76px;
      height: 76px;
      border-radius: 50%;
    }
  }
  .avatar-uploader {
    position: absolute;
    top: 50%;
    left: 150px;
    transform: translateY(-50%);
    .changeAvatar {
      padding: 0;
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: #00a1d6;
      cursor: pointer;
      span {
        width: 2em;
        font-size: 14px;
        line-height: 18px;
        color: #fff;
        position: absolute;
        left: 18px;
        transform: translate(-50%, -50%);
      }
    }
  }
  li {
    .userinfo-name {
      position: absolute;
      left: 120px;
      width: 220px;
      height: 30px;
      text-decoration: none;
    }
    @media screen and (max-width: 768px) {
      .userinfo-name {
        width: 220px;
      }
    }
  }

  .radio-group {
    .el-radio-group {
      position: absolute;
      width: 350px;
      left: 200px;
      top: 25px;
    }
    .el-select {
      display: none;
    }
    @media screen and(max-width: 1072px) {
      .el-radio-group {
        position: absolute;
        width: 280px;
        left: 200px;
        top: 25px;
      }
    }
    @media screen and(max-width: 768px) {
      .el-radio-group {
        display: none;
      }
      .el-select {
        margin-left: 16px;
        display: inline-block;
        /deep/ .el-input {
          width: 106px;
          display: inline-block;
        }
        /deep/ .el-input__inner {
          height: 36px;
          line-height: 36px;
        }
      }
    }

    .el-radio-button {
      margin: 0 20px 10px 0;
      /deep/ .el-radio-button__inner {
        padding: 5px 8px;
        border-radius: 4px;
        background: #f4f4f4;
      }
    }
    /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      background: lightblue !important;
      border-color: lightblue !important;
      color: #fff;
      box-shadow: none;
    }
  }
}

// 保存返回按钮
.save-infobtn {
  margin: 60px 0 20px 0;
  text-align: center;
  a {
    padding: 8px 12px;
    border-radius: 5px;
    color: #fff;
    &:first-child {
      margin-right: 160px;
    }
  }
}
</style>
