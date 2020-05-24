<template>
    <div>
        角色列表
        <!-- 面包屑 导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>


        <!-- 卡片视图 -->
        <el-card class="box-card">

            <el-col :span="4">
                <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
            </el-col>

            <el-table :data="userRoteList" border stripe>
                <el-table-column type='index'></el-table-column>
                <el-table-column label='角色名称' prop='authName'></el-table-column>
                <el-table-column label='角色描述' prop='meta'></el-table-column>
                <el-table-column label='操作' >
                    <!-- 插槽 -->
                    <template slot-scope="scope">
                            <el-tag v-if="scope.row.level == '1'">一级</el-tag>
                            <el-tag type="success" v-if="scope.row.level == '2'">二级</el-tag>
                            <el-tag type="warning" v-if="scope.row.level == '3'">三级</el-tag>
                    </template>

                </el-table-column>
            </el-table>
        </el-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            //角色列表
            userRoteList : [
                {authName : '商品管理' , path: 'goods' , level: 1},
                {authName : '订单管理' , path: 'pwo' , level: 2},
                {authName : '权限管理' , path: 'auth' , level: 3},
                {authName : '商品列表' , path: 'shop' , level: 3},
                {authName : '添加商品' , path: 'shop' , level: 2},
                {authName : '订单列表' , path: 'pop' , level: 1},
                {authName : '添加订单' , path: 'prov' , level: 1},
                {authName : '用户列表' , path: 'user' , level: 1},
                {authName : '商品管理' , path: 'goods' , level: 1},
                {authName : '商品管理' , path: 'goods' , level: 1},
                {authName : '商品管理' , path: 'goods' , level: 1},
                {authName : '商品管理' , path: 'goods' , level: 1},
                {authName : '商品管理' , path: 'goods' , level: 1},
                {authName : '商品管理' , path: 'goods' , level: 1},
                {authName : '商品管理' , path: 'goods' , level: 1},
                {authName : '商品管理' , path: 'goods' , level: 1},
                {authName : '商品管理' , path: 'goods' , level: 1},
                {authName : '商品管理' , path: 'goods' , level: 1},
            ]
        }
    },
}
</script>


<style >
    .el-col{
        margin-bottom: 15px;
    }
    
</style>