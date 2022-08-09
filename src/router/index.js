import Vue from 'vue'
import Router from 'vue-router'
// 将左侧导航中的路由导入
import approvalsRouter from './modules/approvals'
import attendancesRouter from './modules/attendances'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'
Vue.use(Router)

/* Layout */
// 一级路由
import Layout from '@/layout'

export const asyncRoutes =[
  approvalsRouter,
  attendancesRouter,
  departmentsRouter,
  employeesRouter,
  permissionRouter,
  salarysRouter,
  settingRouter,
  socialRouter,
]
export const constantRoutes = [
  // 静态路由，并且都有hidden属性
  { //登录路由
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
{
  path:'/import',
  component:Layout,
  hidden:true,
  children:[
    {
    path:'',
    component:()=>import('@/views/import')
  }]
    
  
},
  // 404 页面必须存在
  { path: '*', redirect: '/404', hidden: true }
]
// 读取options
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // routes:[...constantRoutes,...asyncRoutes] //临时合并所有路由
  routes:[...constantRoutes]//解除合并
})

const router = createRouter()

// 重置路由的方法
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
