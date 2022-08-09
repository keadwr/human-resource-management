<template>
<!-- 表单组件 -->
    <el-dialog :title="showTitle" :visible.sync="showDialog">
      <el-form label-width="120px" :model="formData" :rules="rules" ref="deptForm">
        <el-form-item label="部门名称" prop="name">
         <el-input 
         style="width:80%" 
         placeholder="1-50个字符"
         v-model="formData.name"></el-input>
        </el-form-item>
         <el-form-item label="部门编号" prop="code">
         <el-input 
         style="width:80%" 
         placeholder="1-50个字符"
         v-model="formData.code"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" >
          <el-select  
          style="width: 80%"
          v-model="formData.manager"
          placeholder="请选择"
          @focus="getEmployeeSimple">
          <el-option 
           v-for="item in peoples"
            :key="item.id"
            :value="item.username"
            :label="item.username"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="部门介绍" prop="introduce">
         <el-input 
         style="width:80%" 
         placeholder="300个字符" 
         type="textarea"
         v-model="formData.introduce"></el-input>
        </el-form-item>
     </el-form>
   <!-- 按钮 -->
    <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
        <el-button 
        type="primary" 
        size="small"
        @click="submitForm('deptForm')">确定</el-button>
        <el-button  size="small" @click="resetForm('deptForm')">取消</el-button>
        </el-col>
    </el-row>
    </el-dialog>
</template>
<script>
import {getDepartments,
getEmployeeSimple,
addDepartments,
getDepartDetail,
updateDepartments} from '@/api/departments'


export default {
    
    data() {
        const checkNameRepet = async (rules,value,callback)=>{
        // value部门名称
           const {depts} = await getDepartments();
            //    找所有的子部门
            let isRepeat = false
            if(this.formData.id){
                // 编辑，查找除了上海事业部之外的同级部门，
                 isRepeat=depts
                .filter((item)=>item.id!==this.formData.id && item.pid===this.treeNode.id)
                .some((item)=>item.name===value)

            }else{
                // 新增模式
                 isRepeat=depts
                .filter((item)=> item.pid===this.treeNode.id)
                .some((item)=>item.name===value)
            }
          
        //    比较
       isRepeat ? callback(new Error(`同级部门下已经存在${value}部门了`)) : callback()
    }
    const checkCodeRepet = async (rules,value,callback)=>{
        // value部门编号
           const {depts} = await getDepartments();
            // value不可以是空值
            let isRepet = false
            if(this.formData.id){
                 isRepet = depts.some((item) =>item.id!==this.formData.id &&item.code === value && value);
            }else{
                 isRepet = depts.some((item) => item.code === value && value);
            }
            //    比较
       isRepet ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }
        return {
           formData:{
              code:'',
              manager:'',
              name:'',
              introduce:'',
           },
           peoples:[],  //部门负责人
           rules:{
            name:[
                {required:true,message:'部门名称不能为空',trigger:'blur'},
                {min:1 , max:50, message:'部门名称为1-50个字符',trigger:'blur'},
                {trigger:'blur',validator:checkNameRepet,}
            ],
            code:[
                {required:true,message:'部门编号不能为空',trigger:'blur'},
                {min:1 , max:50, message:'部门编号为1-50个字符',trigger:'blur'},
                {trigger:'blur',validator:checkCodeRepet}
            ],
            introduce:[
                {required:true,message:'部门描述不能为空',trigger:'blur'},
                {min:1 , max:300, message:'部门描述为1-300个字符',trigger:'blur'}
            ]
           }
        }
    },
    props:{
        showDialog:{
            type:Boolean,
            default:false,
        },
        treeNode:{
            type:Object,
            default:null,
        }
    },
    methods: {
        async getEmployeeSimple() {
            this.peoples = await getEmployeeSimple();  
        },
        async getDepartDetail(id){
            this.formData = await getDepartDetail(id);
            console.log(this.formData,'this.formData')
        },
        // 新增按钮方法
        submitForm(formName) {
        this.$refs[formName].validate(async (isOk) => {
          if (isOk) {
            if(this.formData.id){
                // 编辑模式
                await updateDepartments(this.formData)
            }else{
                // 新增模式
                await addDepartments({...this.formData,pid:this.treeNode.id})
            }
        //  通知父组件重新拉去数据
            this.$emit('addDepts')
            this.$emit('update:showDialog' , false)
            this.formData={
              code:'',
              manager:'',
              name:'',
              introduce:'',
           }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    //   取消按钮，重置表单
        resetForm(formName){
            // 强制加上重置数据
            this.formData={
              code:'',
              manager:'',
              name:'',
              introduce:'',
           },
            this.$refs[formName].resetFields();//重置校验字段
            this.$emit('update:showDialog',false)
        }
    },
    computed:{
        showTitle(){
            return this.formData.id ? '编辑部门' : '新增部门'

        }
    }
}

</script>
