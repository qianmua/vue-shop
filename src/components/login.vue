
<template>
  <div class="login_top">
      <!--login -->
      <div class="login_box">
          <!-- head -->
          <div class="child_box">
              <img src="../assets/logo.png" alt="logo" >
          </div>
          <!-- form -->
          <!-- 添加表单验证规则 -->
          <el-form :model="login_form" :rules="loginRules" ref="formLogin" class="login_form" label-width="0px">
              <!-- 用户名 -->
              <el-form-item prop="userName">
                  <el-input v-model="login_form.userName"  prefix-icon="el-icon-user"></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item prop="password">
                  <el-input v-model="login_form.password" type="password"  prefix-icon="el-icon-unlock"></el-input>
              </el-form-item>
              <!-- login -->
              <el-form-item class="btns">
                  <el-button type="primary" @click="login()">login</el-button>
                  <el-button type="info" @click="resetForm()">重置</el-button>
              </el-form-item>
          </el-form>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            login_form:{
                userName: 'admin',
                password: '123456'
            },
            // 验证规则
            loginRules:{
                // 校验userName
                userName:[
                //   属性 校验规则
                {required: true , message: '请输入用户名称', tirgger: 'blur'}, //非空
                {min : 3 , max: 18 , message : '用户名长度是3 ~ 18位' , tirgger : 'blur'} // style
                ],
                // password
                password:[
                {required: true , message: '请输入用户密码', tirgger: 'blur'}, //非空
                {min : 6 , max: 18 , message : '密码长度是6 ~ 18位' , tirgger : 'blur'} // style
                ],  
            },
        }
    },
    methods:{
        // 重置
        resetForm(){
            this.$refs.formLogin.resetFields();
        },
        //login 
        login(){
            //验证
            //异步请求
            this.$refs.formLogin.validate(async valid => {
                console.log(valid)
                if(!valid) return ;
                //异步解析
                // const {data:res} = await this.$http.get('success');
                // console.log(res);

                // if( res == 200){
                if( 1 == 1){
                    console.log("SUCCESS");
                    //消息提醒
                    this.$message.success("SUCCESS");

                    //get token 储存到sessionStroage
                    // 方便携带参数
                    var token = "13456789";
                    window.sessionStorage.setItem("token" , token);

                    //路由跳转
                    //编程式访问地址
                    this.$router.push({path:'/home'});
                }else{

                    // FAIL
                    console.log("FAIL");
                    this.$message.error("FAIL");
                }
            });
        }
    },
    
}
</script>

<style>

    /* root style */
    .login_top{
        background-color: #2b4b2b;
        height: 100%;

    }

    .login_box{
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 10px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50% , -50%);
        
    }
    .child_box{
            width: 130px;
            height: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            left: 50%;
            transform: translate(-50% , -50%);
            background-color: #dde;
        }
    img{
            width: 100%;
            height: 100%;
            background-color: #eee;
            border-radius: 50%;
        }
    .btns{
        display: flex;
        justify-content: flex-end;
        
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
    }

</style>