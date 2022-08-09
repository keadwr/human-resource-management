// 控制页面登录权限
// 路由守卫，在登录前判断路由登录了才可以跳转
import router from '@/router'
import store from '@/store'

// 引入进度条插件
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 定义白名单 ，不需要登录就可以跳转到首页的页面
 const whiteList = ['/login','/404']
router.beforeEach(async function (to, from, next){
  // console.log(beforeEach);
   Nprogress.start() 
    // 首先判断是否有token
  if(store.getters.token){
    
          // 其次判断是否在登录页面
     if(to.path==='/login'){
            next('/')
        }else{
            // 如果没有值
            // 调用用户信息的actions方法
            if (!store.state.user.userInfo.userId) {
                //  接收用户信息
                  const { roles } = await store.dispatch('user/getUserInfo')
                  // 根据用户资料获取数据，  帅选用户的可用的路由
                  // routes  动态权限路由
                  const routes = await store.dispatch('permissions/filterRoutes', roles.menus)
                  console.log( router.addRoutes(routes))
                  // 动态路由 添加 到路由规则中，默认的路由规则 只有静态路由  没有动态路由
                  router.addRoutes([...routes,{ path: '*', redirect: '/404', hidden: true }])
                  // 添加完动态路由之后
                  next(to.path)   //跳到对应的地址  相当于多做了一次跳转 为什么？
                  // 进门了  但是进门之后 我要去的地方的璐还没有铺好，直接走  掉坑里，多做一次跳转，再从门外往里进一次
                  // 跳转之前  把路铺好，再次进来的时候  路就铺好了
                }else{
                    next()
                }
          
        }
    // 然后判断是否在白名单中
    }else{
        // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置
        // 如果要检索的字符串值没有出现，则该方法返回 -1
        if(whiteList.indexOf(to.path) > -1){ //白名单中存在
            next()
        }else{
            next('/login')
        }
    }
    // 手动关闭一次进度条，为了严谨性
    Nprogress.done()
})
// 全局后置钩子
router.afterEach(function (to, from){
    // console.log(afterEach);
    Nprogress.done() //关闭进度条
})

