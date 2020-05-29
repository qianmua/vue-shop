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
                     <el-button type="primary" @click="showCatDialog">添加分类</el-button>
                </el-col>
            </el-row>

            <!-- data -->
            <!-- 表格 -->
            <!-- 商品 数据 表格 -->

            <el-table
                :data="goodsList2"
                style="width: 100%"
                stripe
                border>
                <!-- 绑定数据 prop -->
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="catName" label="分类名称" ></el-table-column>
                <el-table-column prop="isOverdue" label="是否有效" >
                    <template slot-scope="scope">
                        <i class="el-icon-success" v-if="scope.row.isOverdue === false"
                        style="color: lightgreen;"></i>
                        <i class="el-icon-error" style="color: red;" v-else></i>
                    </template>
                </el-table-column>
                <!-- 等级 -->
                <el-table-column prop="order" label="排序" >
                    <template slot-scope="scope">
                        <el-tag
                        v-if="scope.row.order === 0">一级</el-tag>
                        <el-tag type="success"
                        v-if="scope.row.order === 1">二级</el-tag>
                        <el-tag type="warning"
                        v-if="scope.row.order === 2">三级</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" >
                    <!-- 插槽 -->
                    <!-- slot-scope="scope" -->
                    <template slot-scope="scope">
                        <!-- option -->

                        <!-- 提示状态 -->
                        <!-- 颜色 文本 位置 可触摸 -->
                        <el-tooltip content="编辑" placement="top" :enterable="false">
                            <el-button 
                            type="primary" 
                            icon="el-icon-edit" 
                            @click="editUser(scope.row.id)">编辑</el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="top">
                            <el-button 
                            type="danger" 
                            icon="el-icon-delete" 
                            @click="deleteUser(scope.row.id)">删除</el-button>
                        </el-tooltip>
                       
                    </template>

                </el-table-column>

            </el-table>
            <!-- <tree-table :data="goodsList" :columns="columns"></tree-table> -->
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
        <!-- tel:  -->


        <!-- 模态框 -->
        <!-- 添加 组件 -->
        <el-dialog
            title="添加分类"
            :visible.sync="addCatDialogVisible"
            width="50%"
            >
            <!-- body -->

            <el-form 
            :model="addCatFromInput" 
            :rules="addCatRote" 
            ref="addCatRef"
            label-width="100px">
                <el-form-item label="分类名称:" prop="catName">
                    <el-input v-model="addCatFromInput.catName"></el-input>
                </el-form-item>

                <el-form-item label="父级分类:">

                    <!-- 级联选择器 options 数据 props 指定 选中 -->
                    <!-- props 数据对象 -->
                    <el-cascader
                        v-model="catChooseKeys"
                        :options="addCatFrom"
                        expandTrigger= "hover"
                        :props="catChooseProps"
                        @change="catChoosehandleChange" clearable>
                    </el-cascader>

                </el-form-item>

            </el-form>
            <!--  对话空底部 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addCatDialogVisible = false">取 消</el-button>
                <el-button type="primary" >确 定</el-button>
            </span>
        </el-dialog>



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
            goodsList: {
                catName : '',
                catPid : 0 ,
                catLevel : 0,
            },
            goodsList2: [
                {catName : 'test1' , isOverdue: false , order: 0 },
                {catName : 'test2', isOverdue: false , order: 1 },
                {catName : 'test3', isOverdue: false , order: 2 },
                {catName : 'test4', isOverdue: false , order: 0 },
                {catName : 'test5', isOverdue: false , order: 0 },
            ],
            //columns table 指定列
            columns: [
                { label: '分类名称' , prop: 'cat_name'}
            ] ,
            // 模态框
            addCatDialogVisible : false ,
            addCatFromInput: [
                {catName : ''} ,
            ],
            addCatFrom : [
                {catId: 11 , catName : '相框' , catPid : '1' ,catLevel: '0' , children: [
                    {catId: 122 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                    {catId: 123 , catName : '相框' , catPid : '1' ,catLevel: '2'},
                    {catId: 124 , catName : '相框' , catPid : '1' ,catLevel: '2'},
                    {catId: 125 , catName : '相框' , catPid : '1' ,catLevel: '2'},
                    {catId: 126 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                ]},
                {catId: 12 , catName : '相框' , catPid : '1' ,catLevel: '1', children: [
                    {catId: 127 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                    {catId: 128 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                    {catId: 129 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                    {catId: 130 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                    {catId: 131 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                ]},
                {catId: 113 , catName : '相框' , catPid : '1' ,catLevel: '2', children: [
                    {catId: 132 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                    {catId: 133 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                    {catId: 134 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                    {catId: 135 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                    {catId: 136 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                ]},
                {catId: 111 , catName : '相框' , catPid : '1' ,catLevel: '1', children: [
                    {catId: 137 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                    {catId: 138 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                    {catId: 139 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                    {catId: 140 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                    {catId: 141 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                ]},
                {catId: 118 , catName : '相框' , catPid : '1' ,catLevel: '1', children: [
                    {catId: 142 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                    {catId: 153 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                    {catId: 154 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                    {catId: 155 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                    {catId: 156 , catName : '相框' , catPid : '1' ,catLevel: '1'},
                ]},
            ] ,
            addCatRote :  {
                catName : [
                    {required: true , message: '请输入分类名称' , trigger: 'blur'},
                ]
            },
            catChooseProps: {
                value: 'catId',
                label: 'catName',
                children: 'children',
            },
            // 选中的 分类
            catChooseKeys : [],

        }
    },
    created() {
        // getGoodsList()
    },
    methods: {
        // 得到商品列表
        getGoodsList(){

        },
        showCatDialog(){
            this.addCatDialogVisible = !this.addCatDialogVisible
        },
        catChoosehandleChange(){
            console.log(this.catChooseKeys)
        }
        
    },
}
</script>


<style>
    
</style>