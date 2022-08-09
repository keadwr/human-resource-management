import request from '@/utils/request'
// 封装登录接口
export function login(data) {
  return request({
    url:'/sys/login',
    method:'post',
    data,
  })
}
// 获取用户基本资料
export function getUserInfo (data) {
  // 返回一个axios对象
  return request({
    url: '/sys/profile',
    method: "post",
    data
 })
}
// 获取用户头像
export function getUserDetailById (id) {
  // 返回一个axios对象
  return request({
    url: `/sys/user/${id}`,
 })
}







