import Layout from '@/layout'

export default {
    path:'/departments',
    name:'departments',
    component:Layout,
    children:[
        {
            path:'',
            component:()=>import('@/views/departments'),
            meta:{
                // 左侧导航显示title
                title:'组织架构',
                icon:'tree '
            }

        }
    ]
}