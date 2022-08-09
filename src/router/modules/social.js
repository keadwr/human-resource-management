import Layout from '@/layout'

export default {
    path:'/social',
    name:'social',
    component:Layout,
    children:[
        {
            path:'',
            component:()=>import('@/views/social'),
            meta:{
                // 左侧导航显示title
                title:'社保',
                icon:'table'
            }

        }
    ]
}