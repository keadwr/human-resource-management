<template>
<!-- 登录账号设置 -->
    <el-card>
        <el-tabs>
             <el-tab-pane label="登录账号设置">
                <el-form
                :model="userInfo"
                ref="rulesRef"
                :rules="userRules"
                label-width="150px"
                style="margin-left:100px;margin-top:30px">
                    <el-form-item label="姓名">
                        <el-input style="width:400px" v-model="userInfo.username" prop="username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input style="width:400px" v-model="userInfo.password2" prop="password2"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveUser">更新</el-button>
                    </el-form-item>
                </el-form>
             </el-tab-pane>
             <el-tab-pane label="个人详情">
              <el-row type="flex" justify="end">
                <!-- 打印 -->
                <el-tooltip content="打印个人信息">
                  <router-link :to="`/employees/print/${userId}?type=personal`">打印</router-link>

                </el-tooltip>
              </el-row>
             <user-info></user-info>
             </el-tab-pane>
             <el-tab-pane label="岗位信息">
              <job-info></job-info>
             </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
import userInfo from '@/views/employees/components/user-Info.vue';
import jobInfo from './components/job-Info.vue';
import { getUserDetailById } from "@/api/user";
import {saveUserDetailById} from '@/api/employee'
export default {
  components: { userInfo,jobInfo },
  data() {
    return {
      userId: this.$route.params.id,
      userInfo: {
        username: "",
        password2: "",
      },
     userRules:{
        username:[
            {required:true,message:'用户名不能为空',trigger:'blur'},
        ],
        password2:[
            {required:true,message:'用户名不能为空',trigger:'blur'},
            {min:6,max:9,message:'密码长度为6-9位',trigger:'blur'}
        ]
    }
    
 }
  },
  created() {
    this.getUserDetailById();
  },
  methods: {
    async saveUser(){
        try{
            await this.$refs.rulesRef.validate()
            await saveUserDetailById({
                ...this.userInfo,password:this.userInfo.password2
            })
             this.$message.success("保存成功");
        }catch(error){
            console.log(error)
        }
        
    },
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId);
      console.log(this.userInfo);
    },
  },
};
</script>

<style scoped>

</style>