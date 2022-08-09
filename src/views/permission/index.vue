<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small" @click="addPermission(1,'0')">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table border :data="list"  row-key="id">
        <el-table-column align="center" prop="name" label="名称" />
        <el-table-column align="center" prop="code" label="标识" />
        <el-table-column align="center" prop="description" label="描述" />
        <el-table-column align="center" label="操作">
          <template v-slot="{row}">
            <el-button type="text" @click="addPermission(2,row.id)">添加</el-button>
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- 弹层 -->
      <el-dialog :title="showTitle" :visible="showDialog" >
       <el-form label-width="70px" :rules="rules" :model="formData" ref="permForm">
          <el-form-item label="名称" prop="name">
            <el-input style="width:90%" v-model="formData.name"></el-input>
          </el-form-item>
           <el-form-item label="标识" prop="name" >
            <el-input style="width:90%" v-model="formData.code"></el-input>
          </el-form-item>
          <el-form-item label="描述"  prop="description">
            <el-input style="width:90%" v-model="formData.description"></el-input>
          </el-form-item>
          <el-form-item label="开启">
          <!-- 当值为1时 激活 当值为0时  不激活 -->
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
            style="width:90%"
          />
        </el-form-item>
          <el-row type="flex" justify="center">
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
          <el-button  size="small" @click="btnCancel">取消</el-button>
          </el-row>
          </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getPermissionList,addPermission,updatePermission,delPermission,getPermissionDetail} from '@/api/permission'
import {tranListToTreeData} from '@/utils/index'
export default {
  data() {
    return {
      list: [],
      showDialog:false,
      formData:{
        name:'',
        code:'',
        type:'',
        description:'',
        pid:'',
        enVisible:'0',
      },
      rules:{
        name:[
          {required:true, message:"权限名称不能为空",trigger:'blur'},
        ],
        type:[
          {required:true, message:"权限标识不能为空",trigger:'blur'}
        ]
      }
    }
  },
  computed:{
    showTitle(){
      return this.formData.id ? "编辑权限" :'新增权限'
    }
  },
  created(){
    this.getPermissionList()
  },
   methods: {
    // 获取
      async getPermissionList() {
        console.log(await getPermissionList())
          this.list = tranListToTreeData(await getPermissionList(),'0');     
      },
      // 新增
      addPermission(type,pid){
        // type是用来区分添加权限按钮（1）和添加（2）按钮
        this.formData.type = type;
        // Pid是记录当前添加的类型和父节点
        this.formData.pid = pid;
        this.showDialog = true;
      },
      // 编辑
      async editPermission(id){  //当前被点击的数据的id
      // 调用获取权限详细接口函数，将其渲染在表单中
        this.formData = await getPermissionDetail(id)
        console.log(this.formData,'1')
        this.showDialog = true
      },
      // 删除
      delPermission(id){
          this.$confirm("你确定要删除吗？").then(()=>{
            return delPermission(id);
          }).then(()=>{
            this.$message.success("删除成功");
            this.getPermissionList() ;//重新拉去数据
          })
      },
      // 确定按钮
      btnOk(){
        this.$refs.permForm.validate().then(()=>{
          if(this.formData.id){
               return updatePermission(this.formData);
          }
            return addPermission(this.formData)
        }).then(()=>{
          this.$message.success("操作成功");
          this.getPermissionList();
          this.showDialog = false;

        })

      },
      btnCancel(){
        this.formData={
        name:'',
        code:'',
        type:'',
        description:'',
        pid:'',
        enVisible:'0',
      };
       this.$refs.permForm.resetFields(); //移除校验
       this.showDialog = false;
      }

  },
}
</script>

<style scoped>

</style>