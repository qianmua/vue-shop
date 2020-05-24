<template >
    <div>
         <!-- 面包屑 导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card class="box-card">
            <el-table :data="rightsList" border stripe>
                <el-table-column type='index'></el-table-column>
                <el-table-column label='权限名称' prop='authName'></el-table-column>
                <el-table-column label='路径' prop='path'></el-table-column>
                <el-table-column label='权限等级' >
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
            //权限列表
            rightsList : [
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
    created() {
        getRightList()
    },
    methods: {
        
        async getRightList(){
            const {data: res} = await this.$http.get('right/list')
            if( res.meta.status != 200) return this.$message.error('fail')

            this.rightsList = res.data
        }
    },
}
</script>

<style>
    
</style>