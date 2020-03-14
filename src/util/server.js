// 链接服务端代码
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import {
  Base64
} from 'js-base64'

axios.defaults.baseURL = '/api/'
axios.defaults.headers.common['Authorization'] = _encode()
// Vue.prototype.$http = axios
// 格式化时间
const InitDate = (oldDate, full) => {
  oldDate = moment(oldDate).format('YYYY-MM-DD')
  let odate = new Date(oldDate)
  let year = odate.getFullYear()
  let month = odate.getMonth() < 9 ? '0' + (odate.getMonth() + 1) : odate.getMonth() + 1
  let date = odate.getDate() < 10 ? '0' + odate.getDate() : odate.getDate()
  if (full === 'all') {
    // console.log(oldDate.split('-')[0])
    let t = oldDate
    return t.split('-')[0] + '年' + t.split('-')[1] + '月' + t.split('-')[2] + '日'
  } else if (full == 'year') {
    return year
  } else if (full == 'month') {
    return odate.getMonth() + 1
  } else if (full == 'date') {
    return date
  } else if (full == 'newDate') {
    return year + '年' + month + '月' + date + '日'
  }
}

const FormatDate = (date, type) => {
  if (type) {
    date = moment(date).format('YYYY-MM-DD HH:mm:ss')
  } else {
    date = moment(date).format('YYYY-MM-DD')
  }
  return date
}

// 登录
const UserLogin = async (userInfo, callback) => {
  let url = 'token/login'
  const res = await axios.post(url, userInfo)
  callback && callback(res)
}

// 验证token
const VeriftToken = async (callback) => {
  const url = 'token/verify'
  const { data: res } = await axios.post(url, {
    'token': localStorage.getItem('token')
  })
  // Authorization: this._encode()
  callback && callback(res)
}

// 注册
const Register = async (registerInfo, callback) => {
  let url = 'user/register'
  const { data: res } = await axios.post(url, registerInfo)
  console.log(res)
  callback && callback(res)
}

// 修改密码
const AlterInfo = async (alterInfo, callback) => {
  let url = 'user/alterpass'
  const { data: res } = await axios.post(url, alterInfo)
  console.log(res)
  callback && callback(res)
}

// 发送邮件
const TransmitEmail = async (email, callback) => {
  let url = 'user/email'
  const { data: res } = await axios.post(url, {
    email
  })
  console.log(res)
  callback && callback(res)
}

// 判断用户名唯一
const judgeUniqueUsername = async (username, callback) => {
  let url = 'user/judgeUsername'
  const { data: res } = await axios.post(url, {
    username
  })
  callback && callback(res)
}

// 得到用户信息  为了防止泄露数据  用token验证登录 获取信息
const GetUserInfo = async (callback) => {
  let url = 'user/getUserInfo'
  const { data: res } = await axios.post(url)
  callback && callback(res)
}

// 保存用户信息
const SaveUserInfo = async (userInfo, callback) => {
  let url = 'user/update'
  const { data: res } = await axios.post(url, userInfo)
  callback && callback(res)
}

// 更改用户头像
const SaveUserImg = async (imageori, imageCurr, callback) => {
  let url = 'user/update/img'
  console.log(imageori)
  console.log(imageCurr)
  const { data: res } = await axios.post(url, {
    image: imageCurr,
    oimage: imageori
  })
  callback && callback(res)
}

function _encode () {
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : ''
  const base64 = Base64.encode(token + ':')
  // Authorization:Basic base64
  return 'Basic ' + base64
}

// 处理文章列表请求  数多处理参  
const GetArticalAll = async (atId, atSecId, keywords, pageId, pageSize, callback) => {
  let url = 'blog/list'
  const { data: res } = await axios.get(url, {
    params: {
      cateId: atId,
      cateSecId: atSecId,
      keywords,
      pageId,
      pageSize
    }
  })
  callback && callback(res)
}

// 查询文章详情
const GetArticalDeatil = async (aid, callback) => {
  let url = 'blog/' + aid + '/detail'
  const { data: res } = await axios.get(url)
  callback && callback(res)
}

const GetArtical = async (mdUrl, callback) => {
  let url = 'blog/artical'
  const { data: res } = await axios.get(url, {
    params: {
      mdUrl
    }
  })
  callback && callback(res)
}

// 查询文章分类列表
const ArticalCateList = (callback) => {
  if (sessionStorage.getItem('articalCateList')) {
    let data = JSON.parse(sessionStorage.getItem('articalCateList'));
    callback && callback(data)
  } else {
    let url = 'blog/articalCateList';
    axios.get(url).then(result => {
      sessionStorage.setItem('articalCateList', JSON.stringify(result.data.data));
      callback && callback(result.data.data)
    })
  }
}

// 查询浏览最多的十条博客
const ShowBrowseMaxBlog = async (callback) => {
  let url = 'blog/browse/maxlist'
  const { data: res } = await axios.get(url)
  callback && callback(res.data)
}
const updateArtLikeColl = async (aid, type, likeArt, collectArt, callback) => {
  let url = 'blog/'
  // 1 为点赞
  if (type) {
    if (likeArt) {
      url += 'like'
    } else {
      url += 'dislike'
    }
  } else {
    if (collectArt) {
      url += 'collect'
    } else {
      url += 'disCollect'
    }
  }
  const { data: res } = await axios.post(url, {
    blogId: aid
  })
  callback && callback(res)
}
// 用户是否喜欢
const artLike = async (aid, callback) => {
  let url = 'blog/user/islike'
  const { data: res } = await axios.post(url, {
    blogId: aid
  })
  callback && callback(res)
}

// 用户是否收藏
const artCollect = async (aid, callback) => {
  let url = 'blog/user/isCollect'
  const { data: res } = await axios.post(url, {
    blogId: aid
  })
  callback && callback(res)
}

// 得到用户所有的喜欢
const getAllArtLike = async (callback) => {
  let url = 'blog/user/allLike'
  const { data: res } = await axios.post(url)
  callback && callback(res)
}

// 得到用户所有的收藏
const getAllArtCollect = async (callback) => {
  let url = 'blog/user/allCollect'
  const { data: res } = await axios.post(url)
  callback && callback(res)
}

// 用户发送留言
const sendArticalComment = async (content, aid, ruserId, puserId, callback) => {
  let url = 'blog/user/sendComment'
  const { data: res } = await axios.post(url, {
    content,
    aid,
    ruserId,
    puserId
  })
  callback && callback(res)
}

// 得到所有评论数据
const getBlogAllComments = async (aid, pageId, pageSize, callback) => {
  let url = 'blog/comments'
  const { data: res } = await axios.get(url, {
    params: {
      aid,
      pageId,
      pageSize
    }
  })
  callback && callback(res)
}
export {
  InitDate,  // 格式化时间函数
  GetArticalAll,  // 得到博客列表
  GetArticalDeatil,  // 得到id为？的文章详情
  GetArtical,     // 得到具体文章  
  ShowBrowseMaxBlog,  // 显示博客浏览次数最大的十篇
  ArticalCateList,  // 查询文章分类列表
  UserLogin, // 用户登录
  Register,       // 注册
  AlterInfo,    // 修改密码
  FormatDate,     // 格式化日期
  TransmitEmail,   // 发送邮件
  VeriftToken,    // 验证token
  GetUserInfo,     //  得到用户信息
  SaveUserInfo,   // 保存用户信息
  SaveUserImg,    // 保存用户图片
  judgeUniqueUsername,   // 判断用户名是否唯一
  updateArtLikeColl,   // 更新收藏和点赞
  artCollect,  // 用户是否喜欢
  artLike,    // 用户是否收藏
  getAllArtLike,  // 得到用户所有的喜欢
  getAllArtCollect, // 得到用户所有的收藏
  sendArticalComment,  // 发送留言
  getBlogAllComments,  // 得到博客所有的留言
}