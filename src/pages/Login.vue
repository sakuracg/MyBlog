<template>
  <div>
    <div class="bg"></div>
    <!-- 动态背景 -->    
    <wxz-dy></wxz-dy>
    <div class="container">
      <h1 class="loginTitle">
        <span>主银，要进入异世界了么？</span>
      </h1>
      <div v-if="showForm">
        <!-- 登录注册 -->
        <div v-if="login == 1" class="login-box">
          <div class="lr-title">
            <h1>登录</h1>
            <p>
              新用户
              <router-link
                :to="{ name: 'Login', params: { type: 0 } }"
                class="tcolors"
              >
                注册
              </router-link>
            </p>
          </div>
          <el-form
            label-width="0px"
            :model="loginFormInfo"
            ref="loginFormRef"
            :rules="loginFormRules"
            class="login-form"
          >
            <el-form-item label="" prop="username">
              <el-input
                v-model="loginFormInfo.username"
                placeholder="用户名"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                type="password"
                v-model="loginFormInfo.password"
                placeholder="密码"
                clearable
              ></el-input>
            </el-form-item>
          </el-form>
          <h3>
            <router-link
              :to="{ name: 'Login', params: { type: 2 } }"
              class="tcolors"
            >
              忘记密码？
            </router-link>
          </h3>
          <div ref="loginRef" class="lr-btn tcolors-bg" @keyup.enter="gotoHome" @click="gotoHome">
            登录
          </div>
        </div>
        <div v-else-if="login == 2" class="login-box">
          <div class="lr-title">
            <h1>修改密码</h1>
            <p>
              <router-link
                :to="{ name: 'Login', params: { type: 1 } }"
                class="tcolors"
              >
                登录
              </router-link>
            </p>
          </div>
          <el-form
            label-width="0px"
            :model="registerFormInfo"
            ref="alterFormRef"
            :rules="registerFormRules"
          >
            <el-form-item prop="email">
              <el-input
                v-model="registerFormInfo.email"
                placeholder="邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="registerFormInfo.password"
                placeholder="新密码: 6-12位英文、数字、下划线"
              ></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
              <el-input
                type="password"
                v-model="registerFormInfo.confirmPassword"
                placeholder="请确认新密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                class="code"
                v-model="registerFormInfo.code"
                placeholder="激活码"
              ></el-input>
              <el-button v-if="send" @click="sendEmail">点我传送</el-button>
              <el-button v-else disabled>{{ countDown }}</el-button>
            </el-form-item>
          </el-form>
          <div
            class="lr-btn tcolors-bg"
            @click="alterUserInfo"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="提交中"
          >
            确认修改
          </div>
        </div>
        <div v-else class="register-box">
          <div class="lr-title">
            <h1>注册</h1>
            <p>
              已有账号
              <!-- <a href="#/Login?login=1" class="tcolors">登录</a> -->
              <router-link
                :to="{ name: 'Login', params: { type: 1 } }"
                class="tcolors"
              >
                登录
              </router-link>
            </p>
          </div>
          <el-form
            label-width="0px"
            :model="registerFormInfo"
            ref="registerFormRef"
            :rules="registerFormRules"
          >
            <el-form-item prop="username">
              <el-input
                v-model="registerFormInfo.username"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                v-model="registerFormInfo.email"
                placeholder="邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="registerFormInfo.password"
                placeholder="密码: 6-12位英文、数字、下划线"
              ></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
              <el-input
                type="password"
                v-model="registerFormInfo.confirmPassword"
                placeholder="确认密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                class="code"
                v-model="registerFormInfo.code"
                placeholder="激活码"
              ></el-input>
              <el-button v-if="send" @click="sendEmail">点我传送</el-button>
              <el-button v-else disabled>{{ countDown }}</el-button>
            </el-form-item>
          </el-form>
          <div
            class="lr-btn tcolors-bg"
            @click="newRegister"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="提交中"
          >
            注册
          </div>
        </div>
      </div>
      <div v-else class="register-success">
        <img src="../../static/images/registerSucc.gif" alt="" />
        <div class="con" @click="enterLogin">
          <i class="el-icon-thumb downward"></i>
          <a href="javascript:;" class="panel tcolors-bg"
            >勇者啊，点我，开始冒险吧，否则{{
              countDown2
            }}秒后强制传送喔(▼ヘ▼#)</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DynamicBg from '../components/DynamicBg'
import { UserLogin, Register, TransmitEmail, AlterInfo } from '../util/server'
export default {
  name: 'Login',
  components: {    
    'wxz-dy': DynamicBg
  },
  data () {
    // 自定义验证规则    
    let validateEmail = (rule, value, callback) => {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (reg.test(value)) {
        return callback()
      }
      return callback(new Error('您输入的邮箱不合法'))
    }
    let validatePassword = (rule, value, callback) => {
      if (value !== this.registerFormInfo.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      login: this.$route.params.type,
      fullscreenLoading: false, // 注册加载效果
      send: true, // 发送验证码
      countDown: 120, // 倒计时
      verifyCode: '', // 验证验证码是否正确
      showForm: true, // 展示登录验证
      countDown2: 3,
      loginFormInfo: {
        username: '',
        password: '',
        type: 101
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名或邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度不能低于6位', trigger: 'blur' }
        ]
      },
      //   注册信息
      registerFormInfo: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        code: ''
      },
      registerFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度不能低于6位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写验证码', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    '$route': 'changeRoute'
  },
  created () {
    // console.log(this.$route)
    let _self = this
    document.onkeydown = function (e) {
      if (_self.$refs.loginRef) {
        let key = window.event.keyCode
        if (key === 13 || key === 100) {
          _self.$refs.loginRef.click()
        }
      }
    }
  },
  methods: {
    changeRoute () {
      this.login = this.$route.params.type === undefined ? 1 : parseInt(this.$route.params.type)
      //   重置表单
      this.$nextTick(() => {
        if (this.login == 1 && this.$refs.loginFormRef) {
          this.$refs.loginFormRef.resetFields()
        } else if (this.login == 2 && this.$refs.alterFormRef) {
          this.$refs.alterFormRef.resetFields()
        } else if (this.$refs.registerFormRef) {
          this.$refs.registerFormRef.resetFields()
        }
      })
    },
    //   登录完成则跳转到首页
    gotoHome () {
      let that = this
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        // 登录前获取 type  先不做呢因为都是普通用户
        UserLogin(that.loginFormInfo, (res) => {          
          if (res.data.errorCode) {
            that.$message.warning(res.data.msg)
          } else {
            // that.$message.success('身份验证完成，即将传送')
            const data = res.data
            localStorage.setItem('token', data.token)
            localStorage.setItem('userInfo', JSON.stringify(data.user))
            that.$store.state.haslogin = true
            const url = localStorage.getItem('logUrl')
            if (url) {
              that.$router.push({ path: url })
            } else {
              that.$router.push({ path: '/' })
            }
          }
        })
      })
    },
    // 注册事件
    newRegister () {
      this.$refs.registerFormRef.validate(valid => {
        if (!valid) return
        const that = this
        // 注册码是否失效 失效则不能注册
        if (that.send) {
          that.$message.warning('勇者大大,验证码失效，请重新获取呐')
          return
        }
        // 判断验证码是否正确 正确才可以注册
        if (that.verifyCode !== that.registerFormInfo.code) {
          that.$message.warning('勇者大大,验证码不正确，请重新输入呐')
          return
        }
        Register(this.registerFormInfo, res => {
          if (res.errorCode === 10400) {
            res.msg.forEach(msg => {
              setTimeout(() => {
                that.$message.error(msg)
              }, 300)
            })
          } else if (res.errorCode === 0) {
            that.fullscreenLoading = true
            let timer = setTimeout(() => {
              that.fullscreenLoading = false
              that.showForm = false
              //   强制传送
              let time = setInterval(() => {
                that.countDown2--
                if (that.countDown2 === 0) {
                  clearInterval(time)
                  that.$router.push({ name: 'Login', params: { type: 1 } })
                }
              }, 1000)
              clearTimeout(timer)
            }, 3000)
          }
        })
      })
    },
    alterUserInfo () {
      const that = this
      this.$refs.alterFormRef.validate(valid => {
        if (!valid) return
        const that = this
        // 注册码是否失效 失效则不能注册
        if (that.send) {
          that.$message.warning('勇者大大,验证码失效，请重新获取呐')
          return
        }
        // 判断验证码是否正确 正确才可以注册
        if (that.verifyCode !== that.registerFormInfo.code) {
          that.$message.warning('勇者大大,验证码不正确，请重新输入呐')
          return
        }

        AlterInfo(this.registerFormInfo, res => {
          if (res.errorCode === 10400) {
            res.msg.forEach(msg => {
              setTimeout(() => {
                that.$message.error(msg)
              }, 300)
            })
          } else if (res.errorCode === 0) {
            that.fullscreenLoading = true
            let timer = setTimeout(() => {
              that.fullscreenLoading = false
              that.showForm = false
              //   强制传送
              let time = setInterval(() => {
                that.countDown2--
                if (that.countDown2 === 0) {
                  clearInterval(time)
                  that.$router.push({ name: 'Login', params: { type: 1 } })
                }
              }, 1000)
              clearTimeout(timer)
            }, 3000)
          }
        })
      })
    },
    // 发送邮件
    sendEmail () {
      const that = this
      if (that.registerFormInfo.email !== '') {
        // 判断验证码是否匹配
        TransmitEmail(that.registerFormInfo.email, (res) => {
          that.verifyCode = res.code
          //   console
          //   五分钟失效
          let timer = setTimeout(() => {
            that.send = false
            clearTimeout(timer)
            timer = null
          }, 5 * 60 * 1000)
        })
      } else {
        that.$message.error('请输入邮箱')
        return
      }
      that.send = !that.send
      let timer = setInterval(() => {
        that.countDown--
        if (that.countDown === 0) {
          that.countDown = 300
          that.send = !that.send
          clearInterval(timer)
        }
      }, 1000)
    },
    enterLogin () {
      this.showForm = true
      this.login = 1
    }
  }
}
</script>

<style lang="less">
.bg {
  width: 27.32rem;
  height: 12.68rem;
}
@media screen and (max-height: 768px) {
  .bg {
    height: 100%;
    width: 100%;
  }
}
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .loginTitle {
    margin-bottom: 30px;
    text-align: center;
    text-shadow: 1px 1px 1px rgba(18, 188, 245, 0.767);
    font-size: 22px;
    color: lightblue;
  }
  .login-box,
  .register-box {
    box-sizing: content-box;
    padding: 40px;
    width: 300px;
    background: #fff;
  }
  .lr-title {
    margin-bottom: 10px;
    height: 32px;
    line-height: 32px;
    h1 {
      float: left;
      font-size: 22px;
      font-weight: 550;
      color: #666;
    }
    p {
      float: right;
      font-size: 12px;
      color: #999;
      .tcolors {
        padding-left: 5px;
        color: deepskyblue;
      }
    }
  }
  .el-form-item {
    margin-bottom: 18px;
    .code {
      width: 60%;
      margin-right: 20px;
    }
  }
  .el-input__inner {
    height: 38px;
    line-height: 38px;
  }
  .lr-btn {
    padding: 8px;
    border-radius: 5px;
    text-align: center;
    color: #fff;
  }
  h3 {
    text-align: right;
    margin-bottom: 10px;
    a {
      color: #999;
    }
  }

  .register-success {
    img {
      position: absolute;
      left: -250px;
      margin-right: 40px;
      max-width: 200px;
      max-height: 200px;
    }
    .con {
      float: right;
    }
    .downward {
      display: block;
      margin-bottom: 20px;
      text-align: center;
      font-size: 45px;
      animation: down 1s linear infinite;
      -webkit-animation: down 1s linear infinite;
    }
    .panel {
      padding: 15px;
      height: 28px;
      line-height: 28px;
      color: #fff;
      border-radius: 5px;
      box-shadow: 0 1px 1px lightblue;
    }
  }
}
@media screen and (max-width: 900px) {
  .register-success img {
    display: none;
  }
}
@keyframes down {
  0% {
    transform: translateY(0) rotate(-180deg);
    -webkit-transform: translateY(0) rotate(-180deg);
  }
  50% {
    transform: translateY(-10px) rotate(-180deg);
    -webkit-transform: translateY(-10px) rotate(-180deg);
  }
  100% {
    transform: translateY(0) rotate(-180deg);
    -webkit-transform: translateY(0) rotate(-180deg);
  }
}
@-webkit-keyframes down {
  0% {
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
    -webkit-transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
}
</style>
