import Layout from '@/layout'

export default {
    path:'/attendances',
    name:'attendances',
    component:Layout,
    children:[
        {
            path:'',
            component:()=>import('@/views/attendances'),
            meta:{
                // 左侧导航显示title
                title:'考勤',
                icon:'skill'
            }

        }
    ]
}