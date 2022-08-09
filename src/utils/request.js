import axios from 'axios'
import Message from 'element-ui'
import store from '@/store'
import {getTimeStamp} from '@/utils/auth'
import router from '@/router'
const TimeOut = 3600
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout:5000, //定义超时
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //  如果token存在
  if (store.getters.token) {
    // 如果为true
      if(IsTokenTimeOut()){
      store.dispatch('user/loginout')
      router.push('/login')
      return Promise.reject(new Error("token超时了"))
    }
    // 如果token存在  把token设置到请求头上
    config.headers['Authorization']=`Bearer ${store.getters.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) { //响应成功
  // response响应的数据
  // 对响应数据做点什么
  const {success,message,data} = response.data
  if(success){
    return data;
  }else{
    Message.error(message) //调用elementui,将每一个请求的错误提示输出
    return Promise.reject(new Error(message));//让当前的执行跳出，直接执行catch
    // axios就是promise
    // 对错误信息做共性处理
  }
  
}, function (error) { //响应失败
  // 对响应错误做点什么
  Message.error(error.message)  //错误的提示
  return Promise.reject(error);
});


function IsTokenTimeOut(){
  var currentTime = Date.now()
  var timeStamp = getTimeStamp()
  return (currentTime-timeStamp)/1000 > TimeOut
}
export default service