import Layout from '@/layout'

export default {
    path:'/approvals',
    name:'approvals',
    component:Layout,
    children:[
        {
            path:'',
            component:()=>import('@/views/approvals'),
            meta:{
                // 左侧导航显示title
                title:'审批',
                icon:'tree-table'
            }

        }
    ]
}