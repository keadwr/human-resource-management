<template>
  <upload-excel :on-success="success" />
</template>

<script>

import {importEmployee} from '@/api/employee'
    export default {
        data() {
            return {
                // 传递参数,是为了服务更多的文档
                type:this.$router.query.type, 
            }
        },
        methods: {
            // 获取导入的excel数据
        async success({header,results}) {
            // 将excel中的中文和英文一一对应，做匹配
            if(this.type==="user"){
                const userRelations={
                入职时间:'timeOfEntry',
                手机号:"mobile",
                姓名:"username",
                转正日期:'correctionTime',
                工号:'workNumber',
            };
            const arr=[];   //存放userInfo对象
            // 遍历所有的数组，需要将每一条数据里面的中文都换成英文
            results.forEach((item)=>{
                const userInfo={};//每一个用户信息
                // Object.keys(item)指的是把item放到一个数组中然后再遍历
                Object.keys(item).forEach((key)=>{
                    if(userRelations[key]==='timeOfEntry'||userRelations[key]==='correctionTime'){
                         userInfo[userRelations[key]]=new Date(
                            this.forDate(item[key],'/')
                         )
                    }
                    userInfo[userRelations[key]]=item[key];
                    // userInfo[userRelations[key]]得到 ：入职时间。。。对应的英文名
                    // item[key]？
                    // keys(item)?
                });
                arr.push(userInfo);
                console.log(arr,'arr');
            });
            await importEmployee(arr);
            this.$router.back();  //返回
        }
            }
            
        },

        // 转化excel的日期格式
        formDate(numb,format){
            const time = new Date((numb-1)*24*3600000+1);
            time.setYear(time.getFullYear()-70);
            const year =time.getFullYear()+"";
            const month = time.getMonth()+1+'';
            const date = time.getDate()-1+'';
            if(format && format.length === 1){
                return year +format + month + format + date;
            }
            return (
                year+
                ( month<10 ? "0" + month : month )+
                ( date<10 ? "0" + date : date)
            )
        }
    }
</script>

<style scoped>

</style>