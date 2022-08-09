
import {login,getUserInfo,getUserDetailById} from '@/api/user'
import { resetRouter } from '@/router'
import {getToken,setToken,removeToken,setTimeStamp} from '@/utils/auth'
// 相当于把getDefaultState返回的对象给了state
// 所以state中的数据在getDefaultState中定义
const getDefaultState = () => {
  return {
   token:getToken(),   //token状态共享，从缓存中读取
  //  初始化用户资料
   userInfo:{}    //值不能为空
  }
}

const state = getDefaultState()

const mutations = {
  // 设置token
  setToken(state,token){
    state.token = token;
    setToken(token)
  },
  // 删除token
  removeToken(state){
    state.token = null;
    removeToken()
  },
  // 用户资料
  setUserInfo (state, userinfo) {
    // 使用浅拷贝  数据更新 才会触发组件更新
    state.userInfo = {...userinfo}
  },
  removeUserInfo (state) {
    state.userInfo = {}
  }
}

const actions = {
  // 设置token
  //定义login的action调用登录请求，接收参数data(mobile,password)
  async login ({commit},data){
    const result = await login(data)
    // 不能输出
    // axios默认给数据加了一层data?
    // console.log(result)
    // 错误处理在request请求中进行了，直接返回的是data
    // if(result.data.success){
    // 登录接口调用成功意味着用户名和密码正确
    //   commit('setToken',result.data.data)   //data为用户token
    // }
    // 所以直接传递result就可以了
    commit('setToken',result)
    // 写入时间戳
     setTimeStamp()
  },
  // // 封装获取用户资料的actions
  async getUserInfo(context) {
    const result = await getUserInfo()
    console.log(result,1)
    // 获取用户的详情 用户的详情数据
    const baseInfo = await getUserDetailById(result.userId)
    console.log(baseInfo,2)
    context.commit('setUserInfo', { ...result, ...baseInfo }) // 提交到mutations
    return result // 这里为什么要return呢 这里是给我们后期做权限的时候 留下的伏笔
  },
  
  // 退出功能
  loginout({commit}){
    commit('removeToken')
    commit('removeUserInfo')
    resetRouter()
    commit('resetRouter/setRoutes',[],{root:true})
    // user子模块调用permissions子模块的方法
    // 将commit 的第三个参数 设置成 {root:true} 标识当前的commit不是子模块了  而是父模块
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

