import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 实现多语言切换
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // 全局 css

import App from './App'
import store from './store'  //引入vuex
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control


// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

import * as directives from '@/directives'

// 遍历所有的导出的指令对象，完成自定义指令的全局注册

Object.keys(directives).forEach(key => {
  console.log(key, "key")
  // 全局注册自定义指令
  Vue.directive(key,directives[key])
})
// keys(directives)

// 全局注册pageTools
import pageTools from '@/components/PageTools/pageTools.vue'
Vue.component('PageTools',pageTools)

// 全局注册过滤器
import * as filters from '@/filters'
Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key])
})

// 注册自定义组件
import Components from '@/components/index.js'
Vue.use(Components)

// 打印
import Print from 'vue-print-nb'
Vue.use(Print)