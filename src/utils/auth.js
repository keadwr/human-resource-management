
import Cookies from "js-cookie"
 const TimeKey = 'hrsass-timestamp'
// token存储到本地
// 设置一个独一无二的key
const TokenKey = 'hrsass-token'
// 读取token
export function getToken() {
  return localStorage.getItem(TokenKey)
}
// 存储token
export function setToken(token) {
  return localStorage.setItem(TokenKey,token)
}
// 删除token
export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

// 定义获取时间戳
export function getTimeStamp(){
  return Cookies.get(TimeKey)
}

// 存储时间戳
export function setTimeStamp(){
 return Cookies.set(TimeKey,Date.now())
}
