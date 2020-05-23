
<template>

    <el-container class="home-container">

        <!-- 头部区域 -->
        <!-- 导航栏 -->
        <el-header height="">
            <!-- Header content -->
            <!-- 头部布局 -->
            <div>
                <img src="../assets/img/head.jpeg" alt="head">
                <span>后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">logout</el-button>
        </el-header>
        
        <!-- y页面主体 -->
        <el-container>

            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px' ">

                <!-- 折叠 -->
                <div class="tirg-button" @click="toggerTirg">|||</div>

                <!-- Aside content -->
                <!-- 侧边菜单栏 -->
                <el-menu background-color="#333"
                    text-color="#fff"
                    active-text-color="#409eff"
                    unique-opene
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    router
                    :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id+ '' " v-for="(item,n) in menuList" :key="item.id">
                        <!-- 一级菜单模板 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <!-- el-icon-user -->
                            <!-- iconObj[n] -->
                        <i :class="iconObj[n]"></i>
                        <!-- 描述 -->
                        <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index=" '/' + sub.path" 
                        v-for="sub in item.children" 
                        :key="sub.id"
                        @click="saveNavStatus('/' + sub.path)">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{sub.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                   
                </el-menu>
            </el-aside>

            <!-- 右侧内容 -->
            <!-- mian boody -->
            <!-- 嵌套 -->
            <el-main height="">
                <!-- Main content -->
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>
<script>
export default {
    data() {
        return {
            menuList: [
                {
                    authName: '用户管理',
                    children: [
                        {authName: '用户列表',id:224 , order: 1,path: "userList"},
                        
                        {authName: '信息',id:225 , order: 1 , path: "userInfo"}
                    ],
                    id: 125,
                    order: 1,
                    path: "user"
                },{
                    authName: '权限管理',   
                    children: [
                        {authName: '角色列表',id:227 , order: 1 , path: "roteList"} ,
                        {authName: '权限列表',id:228 , order: 1 , path: "authList"},
                        {authName: '信息',id:229 , order: 1 , path: "roteList"}
                    ],
                    id: 126,
                    order: 1,
                    path: "user"
                },{
                    authName: '商品管理',
                    children: [
                        {authName: '商品列表',id:230 , order: 1 , path: "shopList"},
                        {authName: '分类参数',id:231 , order: 1 , path: "shopMenu"},
                        {authName: '商品分类',id:232 , order: 1 , path: "shopClass"}
                    ],
                    id: 127,
                    order: 1,
                    path: "user"
                },{
                    authName: '订单管理',
                    children: [{authName: '订单管理',id:233 , order: 1 ,path: "order"}],
                    id: 128,
                    order: 1,
                    path: "order"
                },{
                    authName: '数据统计',
                    children: [{authName: '数据统计',id:234 , order: 1 , path: "dataCount"} ],
                    id: 129,
                    order: 1,
                    path: "dataCount"
                }
                ],
                // 菜单图标
                iconObj: {
                    '0':'el-icon-user',
                    '1':'el-icon-s-release',
                    '2':'el-icon-goods',
                    '3':'el-icon-s-order',
                    '4':'el-icon-s-operation',
                },
                // 侧边栏隐藏
                isCollapse: false,
                //保存激活连接
                activePath: ''
        }
    },
    created() {
        // 请求菜单数据
        // 测试注释
        // this.getMenuList()
        this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods:{

        // 退出 清空token 页面跳转
        logout(){
            window.sessionStorage.clear()

            //跳转
            this.$router.push('/login');
        },

        async getMenuList() {
        // 请求 数据
        const {data: res} = await this.$http.get('menus')
        console.log(res)

        // error 
        if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.menuList = res.data

        console.log(res)
        },
        //菜单 切换折叠
        toggerTirg(){
            this.isCollapse = !this.isCollapse;
        },
        // 储存激活状态
        saveNavStatus(activePath){
            window.sessionStorage.setItem('activePath' , activePath)
            // 点击时 改变 状态active
            this.activePath = activePath
        }
    }
    
}
</script>


<style>

    .home-container{
        height: 100%;
    }

    /* 导航栏背景颜色 */
    .el-header{
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #eaedf1;
        font-size: 20px;
        
         
    }
    .el-header > div {
            display: flex;
            align-items: center;
    }
    .el-header > div > span{
        margin-left: 15px;
    }
    .el-header > div > img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .el-aside{
        background-color: #333;
    }

    .el-main{
        background-color: #eaedf1;
    }
    .el-menu{
        border-right: 0;
    }
    .tirg-button{
        background-color: #4a5664;
        font-size: 10px;
        line-height: 24px;
        color: #eaedf1;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;

    }

</style>