<template>
    <el-dialog title="分配角色" :visible="showRoleDialog">
    <el-checkbox-group v-model="roleIds" >
    <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
      {{item.name}}
    </el-checkbox>
   
  </el-checkbox-group>
  <el-row type="flex" justify="center" slot="footer">
    <el-button type="primary" size="small" @click="btnOk">确定</el-button>
    <el-button size="small" @click="btnCancel">取消</el-button>
  </el-row>
    </el-dialog>
</template>

<script>

import {getRoleList} from "@/api/setting"
import {getUserDetailById} from '@/api/user'
import {assignRoles} from '@/api/employee'
export default {
        props:{
            showRoleDialog:{
                type:Boolean,
                default:false,
            },
            // 传递当前被单击用户的id
            userId:{
                type:String,
                default:null
            },
        },
        data() {
            return {
                list:[],    //存放获取到的角色信息
                roleIds:[],  //存放角色中已经被选择的选框
            }
        },
        created(){
            this.getRoleList();
        },
       methods: {
        async btnOk(){
             await assignRoles({ id: this.userId, roleIds: this.roleIds });
             this.$emit("update:showRoleDialog", false);
        },
        btnCancel(){
            this.roleIds=[],
            this.$emit("update:showRoleDialog", false);
        },
        async getRoleList(){
           const {rows} = await getRoleList({page:1,pagesize:20})
           this.list = rows
        },
        async getUserDetailById(id){
          const {roleIds} = await getUserDetailById(id);
          this.roleIds = roleIds
        }
    }
}
</script>

<style scoped>

</style>