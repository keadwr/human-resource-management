import request from '@/utils/request'

// 获取员工简单列表
export function getEmployeeSimple () {
  // 返回一个axios对象
  return request({
    url: '/sys/user/simple',
 })
}
// 获取员工综合列表
export function getEmployeeList (params) {
    // 返回一个axios对象
    return request({
      url: '/sys/user',
      params
   })
  }
// 删除员工接口

// 封装增加接口
export function addEmployee (data) {
  // 返回一个axios对象
  return request({
    url: '/sys/user',
    data,
    method:'post'
 })
}

// 导入员工数据,data是一个数组类型
export function importEmployee (data) {
  // 返回一个axios对象
  return request({
    url: '/sys/user/batch',
    data,
    method:'post'
 })
}

// 保存员工信息
export function saveUserDetailById (data) {
  // 返回一个axios对象
  return request({
    url: `/sys/user/${data.id}`,
    data,
    method:'put'
 })
}


// 读取用户详情的基础信息
export function getPersonalDetail (id) {
  // 返回一个axios对象
  return request({
    url: `/employees/${id}/personalInfo`,
 })
}

// 更新用户详情的基础信息
export function updatePersonal (data) {
  // 返回一个axios对象
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    data,
    method:"put"
 })
}

// 读取岗位信息的基础信息
export function getJobDetail (id) {
  // 返回一个axios对象
  return request({
    url: `/employees/${id}/jobs`,
 })
}

// 更新岗位信息的基础信息
export function updateJob (data) {
  // 返回一个axios对象
  return request({
    url: `/employees/${data.userId}/jobs`,
    data,
    method:"put"
 })
}
// 给角色分配权限
export function assignRoles (data) {
  // 返回一个axios对象
  return request({
    url: `/sys/user/assignRoles`,
    data,
    method:"put"
 })
}