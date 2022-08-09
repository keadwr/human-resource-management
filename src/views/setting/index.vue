<template>
    <div class="dashboard-container">
        <div class="app-container">
            <el-card>
                <el-tabs>
                 <el-tab-pane label="角色管理" name="first">
                    <!-- 角色管理 -->
                    <el-row style="height:60px">
                        <el-button icon="el-icon-plus" type="primary"
                        @click="showDialog=true">新增角色</el-button>
                    </el-row>
                        <!-- 表格 -->
        <el-table border :data="list">
              <el-table-column type="index" label="序号" width="120">
              </el-table-column>
              <el-table-column label="名称" prop="name" width="240">
              </el-table-column>
              <el-table-column label="描述" prop="description">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="{row}">
                  <el-button type="success" @click="assignPerm(row.id)">分配权限</el-button>
                  <el-button type="primary" 
                  @click="editRole(row.id)">编辑</el-button>
                  <el-button 
                  type="danger"
                  @click="deleteRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
                        <!-- 分页组件 -->
                        <el-row 
                        justify="center"
                        type="flex"
                        align="middle"
                        style="height:60">
                        <el-pagination 
                         layout="prev, pager, next"
                      :current-page="page.page"
                     :page-size="page.pagesize"
                     :total="page.total"
                     @current-change="changePage"> </el-pagination>
                        </el-row>
                 </el-tab-pane>
                 <el-tab-pane label="公司信息" name="second">配置管理</el-tab-pane>

              </el-tabs>
            </el-card>
<!-- 弹窗组件 -->
<el-dialog :title="title" :visible.sync="showDialog">
  <el-form :model="roleForm" ref="roleForm" :rules="rules">
    <el-form-item label="角色名称" >
      <el-input v-model="roleForm.name" prop="name"></el-input>
    </el-form-item>
   <el-form-item label="角色描述" >
      <el-input v-model="roleForm.description" ></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button >取 消</el-button>
    <el-button type="primary" @click="btnOk">确 定</el-button>
  </div>
</el-dialog>
<!-- 分配权限弹窗 -->
<el-dialog :visible="showPermDialog" title="分配权限">
  <el-tree
  :data="permData"
  node-key="id"
  :props="defaultProps"
  :show-checkbox="true"
  :check-strictly="true"
  :default-expand-all="true"
  :default-checked-keys="selectCheck"
   ref="permTree"
  >
  </el-tree>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnPermOK">确定</el-button>
          <el-button size="small" @click="btnPermCancel">取消</el-button>
        </el-col>
      </el-row>
</el-dialog>
        </div>
    </div>
</template>

<script>
import {
getRoleList,
deleteRole,
updateRole,
getRoleDetail,
addRole, 
assignPerm} from '@/api/setting'
import {tranListToTreeData} from '@/utils/index'
import {getPermissionList} from '@/api/permission'
    export default {
        data() {
            return {
                list:[],  //角色列表数据
                page:{
                    page:1,   //当前页码
                    pagesize:5,  //每页条数
                    total:0,       //总数量
                },
                // 编辑弹层数据
                showDialog:false,  //控制弹窗显示
                roleForm:{},   //接收表单数据
                rules:{
                    name:[{required:true,message:'角色名称不能为空',trigger:'blur'}]
                },
               showPermDialog:false,
               permData:[],
               roleId:null,// 用来记录当前分配权限的id
               defaultProps:{ label:'name',},// 定义显示字段的名称 和 子属性的字段名称
              selectCheck:[]// 用来记录当前的权限点的标识 
            }
        },
        created(){
               this.getRoleList();
        },
        computed:{
              title(){
             return this.roleForm.id ? "编辑角色" : "新增角色"
            },
        },
        methods: {
           async editRole(id){
                this.roleForm = await getRoleDetail(id);
                console.log(this.roleForm)
                this.showDialog = true;
            },
       // 点击编辑下的确定按钮
           async btnOk() {
             try {
                await this.$refs.roleForm.validate();
               // 只有验证通过的情况下，才会执行await下方的内容
                 if (this.roleForm.id) {
          // 编辑
                  await updateRole(this.roleForm);
                } else {
          // 新增
                 await addRole(this.roleForm);
                  }
        // 重新获取数据
        this.getRoleList();
        this.$message.success("操作成功");
        this.showDialog = false;
        this.roleForm = {};
      } catch (error) {
        console.log(error);
      }
            },
          
           async deleteRole(id){
                try{
                     await this.$confirm("确定要删除吗？")
                     await deleteRole(id);
                     this.getRoleList();
                     this.$message.success('删除角色成功')
                }catch(error){
                    console.log(error);
                }
               

            },
            changePage(newpage){
                // newpage当前点击的页面
                this.page.page = newpage;
                // 重新渲染数据
                this.getRoleList()
            },
            async getRoleList() {
            const { total, rows } = await getRoleList(this.page);
            console.log(rows)
            this.page.total = total;
            this.list = rows;
            console.log(this.list,'list')
            },
            async assignPerm(id){
            //  树形数据
                this.permData = tranListToTreeData(await getPermissionList(),'0' )
                this.roleId=id;
                this.showPermDialog=true;
                const {permIds} =await getRoleDetail(id);
                this.selectCheck = permIds;
            },
           async btnPermOK(){
              await assignPerm({
                id:this.roleId,
                permIds:this.$refs.permTree.getCheckedKeys(),
                
              });
              this.$message.success("操作成功")
              this.showPermDialog = false;
            },
            btnPermCancel(){
               this.selectCheck=[]
               this.showPermDialog = false;
            }
        },
    }
</script>

<style scoped>

</style>