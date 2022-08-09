<template>
    <el-row 
          justify="space-between" 
          type="flex" 
         
          align="middle"
          style="height:40px;width:100%">
             <el-col>{{treeNode.name}}</el-col>
             <el-col :span="4">
                <el-row type="flex" justify="end">
                    <el-col>{{treeNode.manager}}</el-col>
                    <!-- 设置下拉菜单 -->
                    <el-col>
                        <el-dropdown  @command="operateDepts">
                         <span> 操作<i class="el-icon-arrow-down"></i> </span>
                         <el-dropdown-menu slot="dropdown">
                           <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                           <el-dropdown-item v-if="!isRoot" command="edit">编辑子部门</el-dropdown-item>
                           <el-dropdown-item v-if="!isRoot" command="del">删除子部门</el-dropdown-item>
                         </el-dropdown-menu>
                       </el-dropdown>
                    </el-col>
                </el-row>
             </el-col>
          </el-row>
</template>

<script>
import {delDepartments} from '@/api/departments'
    export default {
        props:{
            treeNode:{
                type:Object,//对象类型
                required:true, //必须传
            },
            isRoot:{
                type:Boolean,
                default:false,
            }
        },
        methods: {
            operateDepts(type) {
                // vue是单向数据流，子传父
                console.log(type,'type')
                if(type==='add'){
                    // 添加
                    // 传递当前点击的部门
                   this.$emit("addDepts", this.treeNode);

                }else if(type==='edit'){
                    // 编辑，传递当前点击的部门
                     this.$emit("editDepts", this.treeNode);

                }else{
                    // 删除,删除成功后要通知父组件进行页面更新
                   this.$confirm('确定要删除吗') 
                    .then(() => {  //点击确定，进入then
                     return delDepartments(this.treeNode.id)
                   })
                   .then(()=>{
                    // 等待接口删除成功，后端数据变化了，前端数据再改变
                    this.$emit("delDepts"); //通知父组件更新
                    this.$message.success("删除部门成功")
                   })
                   .catch(() => { //点击取消，进入catch
                              
                   });
         
                }
                
            }
        },
    }
</script>

<style scoped>

</style>