// 注册全局的导入excel组件

import UploadExcel from './uploadExcel'
import imageUpload from './imageUpload'

export default {
  install (Vue) {
    Vue.component('UploadExcel',UploadExcel),
    Vue.component('imageUpload',imageUpload)
  }
}
