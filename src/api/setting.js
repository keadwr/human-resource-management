import request from '@/utils/request'
// 获取角色列表
export function getRoleList(params) {
  return request({
    url:'/sys/role',
    params
  })
}

// 删除接口
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method:'delete'
  })
}
// 新增角色
export function addRole (data) {
  // 返回一个axios对象
  return request({
    url: `/sys/role`,
    method: 'post',
    data
 })
}
// 修改角色
export function updateRole (data) {
  // 返回一个axios对象
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
 })
}

// 获取角色详细信息
export function getRoleDetail (id) {
  // 返回一个axios对象
  return request({
    url: `/sys/role/${id}`
 })
}

// 给角色分配权限
export function assignPerm (data) {
  // 返回一个axios对象
  return request({
    url: `/sys/role/assignPrem`,
    data,
    method:'put'
 })
}