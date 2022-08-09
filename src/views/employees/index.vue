<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :showBefore="true">
        <template slot="before">
          <span>共16条记录</span>
        </template>
        <template slot="after">
          <el-button size="small" type="primary" @click="$router.push('./import?type=user')">excel导入</el-button>
          <el-button size="small" type="primary" @click="exportData">excel导出</el-button>
          <el-button size="small" type="primary" @click="showDialog=true">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table border :data="list">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="姓名" sortable prop="username"></el-table-column>
        <el-table-column label="头像">
          <template slot-scope="{row}">
            <img 
            :src='row.staffPhoto'
            v-imgerror="require('@/assets/common/bigUserHeader.png')"
            alt=""
            style="width:100px;
            height:100px;
            padding:10px;
            border-radius: 50%;"
            @click='showQrCode(row.staffPhoto)'
            />
          </template>
          
        </el-table-column>
        <el-table-column label="工号" sortable prop="workNumber"></el-table-column>
        <el-table-column label="聘用形式" sortable prop="formOfEmployment"
        :formatter="formatEmployee"></el-table-column>
        <el-table-column label="部门" sortable prop="departmentName">
         
        </el-table-column>
        <el-table-column label="入职时间" sortable prop="timeOfEntry">
          <template slot-scope="{ row }">
              {{row.timeOfEntry | formData}}
          </template>
        </el-table-column>
        <el-table-column label="账号状态" sortable prop="enableState" ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small" @click="editRoles(row.id)">角色</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
          layout="prev, pager, next"
          :page-size="page.size"
          :current-page="page.page"
          :total="page.total"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
      <add-employee :show-dialog.sync="showDialog"
      ></add-employee>
      <el-dialog title="二维码" :visible="showCodeDialog">
            <el-row type="flex" justify="center">
               <canvas ref="myCanvas" />
            </el-row>
           </el-dialog>
      <assign-roles :userId="userId" :show-role-dialog.sync="showRoleDialog" ref="assignRole"></assign-roles>
    </div>
  </div>
</template>

<script>
import QrCode from 'qrcode'
import {getEmployeeList} from '@/api/employee'
import EmployeeEnum from '@/api/constant/employees'
import addEmployee from './components/add-employee.vue'
import UploadExcel from '@/components/uploadExcel/index.vue';
import {formDate} from '@/filters/index'
import AssignRoles from './components/assign-roles.vue'
    export default {
     components:{ addEmployee, UploadExcel, AssignRoles },
    data() {
      return {
      showDialog:false,
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0,
      },
      showCodeDialog:false,
      showRoleDialog:false,
      userId:'',
     
    };
  },
      created(){
        this.getEmployeeList();
      },

    methods: {
      editRoles(id){
        this.userId = id;
        this.$refs.assignRole.getUserDetailById(id)
        this.showRoleDialog = true;
      },
      showQrCode(url) {
      // url存在的情况下 才弹出层
      if (url) {
        this.showCodeDialog = true // 数据更新了 但是我的弹层会立刻出现吗 ？页面的渲染是异步的！！！！
        // 有一个方法可以在上一次数据更新完毕，页面渲染完毕之后
        this.$nextTick(() => {
          // 此时可以确认已经有ref对象了
          QrCode.toCanvas(this.$refs.myCanvas, url) // 将地址转化成二维码
          // 如果转化的二维码后面信息 是一个地址的话 就会跳转到该地址 如果不是地址就会显示内容
        })
      } else {
        this.$message.warning('该用户还未上传头像')
      }
    },
      // 处理聘用形式
      formatEmployee(row, column, cellValue, index){
       const obj= EmployeeEnum.hireType.find((item)=>{
        item.id===cellValue;
       })
       return obj ? obj.value : "未知"

      },
       changePage(newpage){
                // newpage当前点击的页面
                this.page.page = newpage;
                // 重新渲染数据
                this.getEmployeeList()
            },
      async getEmployeeList() {
        let {total,rows} = await getEmployeeList(this.page);
        this.page.total = total;
        this.list = rows;
        console.log(this.list)
        
      },
      exportData(){
        // 对数据进行格式化
        const headers={
          姓名: "username",
         手机号: "mobile",
         入职日期: "timeOfEntry",
         聘用形式: "formOfEmployment",
         转正日期: "correctionTime",
         工号: "workNumber",
         部门: "departmentName",
        };
        // console.log(import('@/vendor/Export2Excel'))
        // 按需加载
        import('@/vendor/Export2Excel').then(async(excel)=>{
          // console.log(excel,'excel');
          const {rows}=await getEmployeeList({page:1,size:this.page.total})
          const data = this.formatJson(headers, rows)
          excel.export_json_to_excel({
            header:Object.keys(headers),
            data,
            filename:'员工工资',
            autoWidth:true, //是否自适应
            bookType:'xlsx',
          })
        })
      },
       formatJson(headers,rows){
        return rows.map((item)=>{
          return Object.keys(headers).map((key)=>{
            if(headers[key]==='timeOfEntry'||headers[key]==='correctionTime'){
              return formDate(item[headers[key]])
            }else if(headers[key]==='formOfEmployment'){
               var en = EmployeeEnum.hireType.find(
                (obj)=>obj.id===item[headers[key]]
               )
               return en ? en.value : '未知'
            }
            return item[headers[key]];
          })
        })
       }
    },
    }

</script>

<style scoped>

</style>