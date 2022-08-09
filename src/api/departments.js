import request from '@/utils/request'
// 封装登录接口
export function getDepartments() {
  return request({
    url:'/company/department',
   
  })
}

// 封装删除接口
export function delDepartments(id){
  return request({
    url:`/company/department/${id}`,
    method:"delete"

  })
}

// 封装添加接口
export function addDepartments(data){
  return request({
    url:`/company/department`,
    method:"post",
    data,
  })
}

// 封装编辑接口
export function updateDepartments(data){
  return request({
    url:`/company/department/${data.id}`,
    method:"put",
    data,
  })
}
// 封装负责人接口
export function getEmployeeSimple(){
  return request({
    url:`/sys/user/simple`,
   
  })
}

// 获取部门详细信息
export function getDepartDetail(id){
  return request({
    url:`/company/department/${id}`,
   
  })
}