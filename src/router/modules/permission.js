import Layout from '@/layout'

export default {
    path:'/permission',
    name:'permissions',
    component:Layout,
    children:[
        {
            path:'',
            component:()=>import('@/views/permission'),
            meta:{
                // 左侧导航显示title
                title:'权限管理',
                icon:'lock'
            }

        }
    ]
}