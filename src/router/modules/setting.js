import Layout from '@/layout'

export default {
    path:'/setting',
    name:'settings',
    component:Layout,
    children:[
        {
            path:'',
            component:()=>import('@/views/setting'),
            meta:{
                // 左侧导航显示title
                title:'公司设置',
                icon:'setting'

            }

        }
    ]
}