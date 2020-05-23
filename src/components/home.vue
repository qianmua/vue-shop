
<template>
    <div>
        Home 首页


        <el-button type="info" @click="logout">logout</el-button>
        
    </div>
</template>
<script>
export default {
    

    methods:{

        // 退出 清空token 页面跳转
        logout(){
            window.sessionStorage.clear()

            //跳转
            this.$router.push('/login');
        }
    }
}
</script>


<style>

</style>