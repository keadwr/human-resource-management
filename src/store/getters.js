const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  // 获取用户名
  // 若state中的userInfo值为null  读取userInfo的username就会报错
  // 不能给state里的userInfo的值设为null
  name: state => state.user.userInfo.username,
  staffPhoto:state=>state.user.userInfo.staffPhoto,
  routes:state=>state.permissions.routes //导出当前的路由
}
export default getters
