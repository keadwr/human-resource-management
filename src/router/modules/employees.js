import Layout from '@/layout'

export default {
    path:'/employees',
    name:'employees',
    component:Layout,
    children:[
        {
            path:'',
            component:()=>import('@/views/employees'),
            meta:{
                // 左侧导航显示title
                title:'员工管理',
                icon:'people'
            }
        },
        {
            path:'detail/:id',
            component:()=>import('@/views/employees/detail'),
            hidden:true, //不在左侧菜单显示
            meta:{
                title:"员工详情"
            }
        },
        {
            path:'print/:id',
            component:()=>import('@/views/employees/print'),
            hidden:true, //不在左侧菜单显示
            meta:{
                title:"员工打印",
                icon:'people',
            }

        }
    ]
}