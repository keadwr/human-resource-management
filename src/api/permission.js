import request from '@/utils/request'

// 获取权限
export function getPermissionList (params) {
  // 返回一个axios对象
  return request({
    url: '/sys/permission',
    params
 })
}

// 新增权限
export function addPermission (data) {
    // 返回一个axios对象
    return request({
      url: '/sys/permission',
      method:'post',
      data
   })
  }

// 更新权限
export function updatePermission (data) {
    // 返回一个axios对象
    return request({
      url: `/sys/permission/${data.id}`,
      method:'put',
      data
   })
  }

// 获取权限详情
export function getPermissionDetail (id) {
    // 返回一个axios对象
    return request({
      url: `/sys/permission/${id}`,

   })
  }

  // 删除权限
export function delPermission(id) {
    return request({
      url: `/sys/permission/${id}`,
      method: 'delete'
    })
  }