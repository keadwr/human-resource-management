<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <tree-tools :tree-node="company" :isRoot="true"></tree-tools>
        <el-tree 
        :data="departs" 
        :props="defaultProps"
        :default-expand-all	="true">
        <!-- departs是一个数组，使用插槽循环遍历数组 slot-scope=“对象” 用来接收传递给插槽的数据 -->
        <tree-tools 
        slot-scope="{data}" 
        @delDepts="getDepartments" 
        :tree-node="data"
        @addDepts="addDepts"
        @editDepts="editDepts"></tree-tools>
        
        </el-tree>
      </el-card>
      <add-dept 
       @addDepts="getDepartments"
      :show-dialog.sync="showDialog"
      :tree-node="node"
      ref="addDept"
      ></add-dept>
      <!-- showDialog对应add-dept组件的prop中的showDialog -->
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
// 实现按需导入
import {getDepartments} from '@/api/departments'
import {tranListToTreeData} from '@/utils/index'
import addDept from './components/add-dept.vue'
    export default {
        components: { treeTools ,addDept},
        data() {
          return {
            company:{
              name:"丁鹿学堂组织架构", 
              manager:'负责人',
              id:'',
            },
            defaultProps:{
              label:"name",
            },
            departs: [],
            showDialog:false,
            node:null, //记录当前节点
          }
        },
        created(){
          this.getDepartments()
        },
        methods: {
           async getDepartments() {
             let result = await getDepartments();
            console.log(result)
             this.departs = tranListToTreeData(result.depts,"");
          },
          // 实现弹框显示和记录当前那个结点被点击
          addDepts(node){
             this.showDialog=true;
             this.node=node;
          },
          // 弹框自动消失
          // getdialog(value){
          //   this.showDialog = value;
          // }
          // 编辑部门
          editDepts(node){ //node当前部门结点
            // 弹窗显示
            this.showDialog = true;
            
            this.node = node;
           this.$refs.addDept.getDepartDetail(node.id);
          //  调用子组件的方法
          }
        },
    }
</script>

<style scoped>

</style>