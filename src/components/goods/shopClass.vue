<template >
    <div>
        <!-- 面包屑 导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>

        
        <!-- 卡片视图 -->
        <el-card class="box-card">

            <!-- button -->
            <!-- 添加分类 -->
            <el-row>
                <el-col >
                     <el-button type="primary">添加分类</el-button>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <!-- 商品 数据 表格 -->
            <tree-table :data="goodsList" :columns="columns"></tree-table>
            <!-- 渲染分页区域 -->
            <!-- layout 组件功能 条数，页数，页, 指定跳转 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNum"
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
            handleSizeChange: '',
            handleCurrentChange: '',
            queryInfo: {type: 3 ,pageNum: 1 , pageSize: 20},
            total: 358,
            // 商品列表
            goodsList: [
                {cat_name : 'test1'},
                {cat_name : 'test2'},
                {cat_name : 'test3'},
                {cat_name : 'test4'},
                {cat_name : 'test5'},
            ],
            //columns table 指定列
            columns: [
                { label: '分类名称' , prop: 'cat_name'}
            ] ,

        }
    },
    created() {
        getGoodsList()
    },
    methods: {
        // 得到商品列表
        getGoodsList(){

        }
    },
}
</script>


<style>
    
</style>