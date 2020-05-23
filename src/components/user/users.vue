<template>
    <div>
        <!-- 面包屑 导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card class="box-card">
            <!-- 搜索 -->
            <!-- 间隙 -->
            <el-row :gutter=15> 
                <!-- 列宽 -->
                <el-col :span="7">
                    <el-input placeholder="请输入内容" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
            </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>

            <!-- 用户列表 -->
            <!-- 绑定数据 -->
            <!-- 表格线条 ， 隔行变色 -->
            <el-table
                :data="tableData"
                style="width: 100%"
                stripe
                border>
                <!-- 绑定数据 prop -->
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="name" label="姓名" ></el-table-column>
                <el-table-column prop="email" label="邮箱" ></el-table-column>
                <el-table-column prop="tel" label="电话" ></el-table-column>
                <el-table-column prop="address" label="地址" ></el-table-column>
                <!-- <el-table-column prop="address" label="地址" width="180"></el-table-column> -->
                <el-table-column prop="rote" label="角色" ></el-table-column>
                <el-table-column label="状态" >
                    <!-- 作用域插槽 -->
                    <!-- scope 接受了当前行的数据 -->
                    <template slot-scope="scope">
                        <!-- 当前行的数据 -->
                        <!-- {{scope.row.status}} -->

                        <!-- 数据关联 -->
                        <el-tooltip content="操作状态" placement="top">
                            <!-- 数据绑定 -->
                            <!-- true or fasle -->
                            <!-- OR -->
                            <!-- active-value="100" -->
                            <!-- inactive-value="0" -->
                            <el-switch
                                v-model="scope.row.status"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                            </el-switch>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="190px">
                    <!-- 插槽 -->
                    <!-- slot-scope="scope" -->
                    <template >
                        <!-- option -->

                        <!-- 提示状态 -->
                        <!-- 颜色 文本 位置 可触摸 -->
                        <el-tooltip content="编辑" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="top">
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        </el-tooltip>
                        <el-tooltip content="修改" placement="top">
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
                    </template>

                </el-table-column>

            </el-table>

            <!-- 渲染分页区域 -->
            <!-- layout 组件功能 条数，页数，页, 指定跳转 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[5, 10, 20, 50]"
                :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //列表请求参数
            queryInfo: {
                query: '',
                pageNum: 1,
                pageSize: 2
            },
            //用户信息
            userList: [],
            //总数据
            total: 111 ,
            //模拟json
            tableData: [{
                date: '2020-05-02',
                name: '小橘子',
                address: '休想知道我家在哪里',
                email: '2674521520@qq.com',
                rote: 'root',
                tel: '999',
                status: true,
                option: 'null',

                }, {
                    date: '2020-05-02',
                    name: '小橘子',
                    address: '休想知道我家在哪里',
                    email: '2674521520@qq.com',
                    rote: 'root',
                    tel: '999',
                    status: false,
                    option: 'null',
            
                }, {
                    date: '2020-05-02',
                    name: '小橘子',
                    address: '休想知道我家在哪里',
                    email: '2674521520@qq.com',
                    rote: 'root',
                    tel: '999',
                    status: true,
                    option: 'null',
            
                }, {
                    date: '2020-05-02',
                    name: '小橘子',
                    address: '休想知道我家在哪里',
                    email: '2674521520@qq.com',
                    rote: 'root',
                    tel: '999',
                    status: false,
                    option: 'null',
                }]
        }
    },
    created(){
        // 初始化渲染 调用
        this.getUserList()
    },
    methods: {
        // 请求得到用户
        async getUserList(){
            const {data: res} = await this.$http.get('user' , {params: this.queryInfo})
            if ( res.meta.status != 200 ) return this.$message.error('error');

            this.userList = res.data.users
            this.total = res.data.total

            console.log(res)
        },
        // 监听 页面数据大小
        handleSizeChange(newSize){
            console.log(newSize)
            //数据绑定
            this.queryInfo.pageSize = newSize
            // 刷新数据
            getUserList()
        },
        //监听页码改变
        handleCurrentChange(newPage){
            console.log(newPage)
            this.queryInfo.pageNum = newPage
            getUserList()
        }
    },
    
    
}
</script>

<style>
    
</style>