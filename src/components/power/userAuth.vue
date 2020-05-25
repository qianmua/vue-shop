<template>
    <div>
        <!-- 面包屑 导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>


        <!-- 卡片视图 -->
        <el-card class="box-card">

            <el-col :span="4" class="col-btns">
                <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
            </el-col>

            <el-table :data="userRoteList" border stripe>
                <!-- 展开列 -->
                <!--  权限展示 -->
                <el-table-column type='expand'>

                    <template slot-scope="scope">
                        <el-row :class="['bottom-rl-row', index === 0 ? 'top-line' : '' , 'vcenter']" v-for="(item, index) in scope.row.children" :key="index">
                            
                            <el-col :span="5">
                                <el-tag closable >{{item.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 渲染 二级 三级权限 -->
                            <el-col :span="19">
                                <!-- 渲染二级全线 -->
                                <el-row :class="[index2 !== 0 ? 'top-line' : '','vcenter']"  v-for="(item2, index2) in item.children" :key="index2">
                                    <el-col :span="6">
                                        <el-tag closable type="success">{{item2.authName}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <!-- 三级 -->
                                    <el-col :span="18">
                                        <el-tag closable @close="removeById(scope.row ,item2.id )" type="warning" v-for="(item3, index3) in item2.children" :key="index3">{{item3.authName}}</el-tag>
                                        
                                    </el-col>
                                    
                                </el-row>
                            </el-col>
                        </el-row>

                    </template>
                </el-table-column>
                <!-- 索引列 -->
                <el-table-column type='index'></el-table-column>
                <el-table-column label='角色名称' prop='roleName'></el-table-column>
                <el-table-column label='角色描述' prop='meta'></el-table-column>
                <el-table-column label='操作' width="300px">
                    <!-- 插槽 -->
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                        <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRote(scope.row)">分配权限</el-button>
                        
                    </template>

                </el-table-column>
            </el-table>
        </el-card>

        <!-- 权限分配 close 防止 bug -->
        <el-dialog
            title="权限分配"
            :visible.sync="setRoteRightVisible"
            width="50%"
            @close="closeDialog">
            <!-- body -->

            <!-- 属性控件 -->
            <!-- 绑定数据 字段 复选框 展开所有 唯一绑定 ref 高亮  -->
            <!-- default-checked-keys	默认选中 -->
            <el-tree
                :data="userRoteList"
                :props="roteTreeProps"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="roteTreeRef"
                highlight-current
                :default-checked-keys="defKeys">
            </el-tree>
            <!--  对话框底部 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRoteRightVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeRoteTrue">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    data() {
        return {
            // 显示 对话框 权限分配
            setRoteRightVisible: false,
            // 所有权限
            roteListAll: [],
            // 树形控件 绑定 属性事件
            roteTreeProps: {
                label: 'authName',
                children: 'children'
            },
            // 默认选中的 id 
            defKeys:[101,102,103],
            //角色列表
            userRoteList : [
                {roleName : '主管一' , meta: 'goods' ,authName:'test', children: [
                    {id:'101',authName:'用户列表',path:'' , children:[
                        {id:'103',authName:'用户列表',path:''} ,
                        {id:'103',authName:'用户列表',path:'' , children:[
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                        ]} ,
                        {id:'103',authName:'用户列表',path:''} ,
                        {id:'103',authName:'用户列表',path:''} ,
                        {id:'103',authName:'用户列表',path:''} ,
                    ]},
                    {id: '102',authName:'商品列表',path:'' , children: [
                        {id:'103',authName:'用户列表',path:'' , children:[
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                        ]} ,
                        {id:'104',authName:'用户列表',path:'' , children:[
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                        ]} 
                    ]},
                    {id:'105',authName:'用户列表',path:'' ,children: [
                        {id:'103',authName:'用户列表',path:'' , children:[
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                        ]} ,
                        {id:'107',authName:'用户列表',path:''} ,
                        {id:'108',authName:'用户列表',path:''} ,
                        {id:'109',authName:'用户列表',path:'' , children:[
                            {id:'103',authName:'用户列表',path:'' } ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                        ]}
                    ]},
                    {id:'106',authName:'用户列表',path:'' , children:[
                        {id:'103',authName:'用户列表',path:''} ,
                        {id:'103',authName:'用户列表',path:'' , children:[
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                        ] }
                    ]},
                ]},

                    // user 2
                {roleName : '主管二' , meta: 'goods' , children: [
                    {id:'101',authName:'用户列表',path:''},
                    {id: '102',authName:'商品列表',path:'' , children: [
                        {id:'103',authName:'用户列表',path:''} ,
                        {id:'104',authName:'用户列表',path:'' , children:[
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            ]} 
                        ]},
                    {id:'105',authName:'用户列表',path:'' ,children: [
                        {id:'103',authName:'用户列表',path:''} ,
                        {id:'107',authName:'用户列表',path:''} ,
                        {id:'108',authName:'用户列表',path:''} ,
                        {id:'109',authName:'用户列表',path:'' , children:[
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            ]} 
                        ]},
                    {id:'106',authName:'用户列表',path:'' , }
                ]},
                {roleName : '主管三' , meta: 'goods' , children: [
                    {id:'101',authName:'用户列表',path:''},
                    {id: '102',authName:'商品列表',path:'' , children: [
                        {id:'103',authName:'用户列表',path:''} ,
                        {id:'104',authName:'用户列表',path:''} 
                        ]},
                    {id:'105',authName:'用户列表',path:'' ,children: [
                        {id:'103',authName:'用户列表',path:''} ,
                        {id:'107',authName:'用户列表',path:''} ,
                        {id:'108',authName:'用户列表',path:'' , children:[
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            ]} ,
                        {id:'109',authName:'用户列表',path:'' , children:[
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            {id:'103',authName:'用户列表',path:''} ,
                            ]} 
                        ]},
                    {id:'106',authName:'用户列表',path:'' ,}
                ]},
            ],
            }
    },
    methods:{
        //权限删除
        async removeById(rote , id){
            const res = await this.$confirm('取消掉该用户此权限' , '提示' , {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)

            if( res  !== 'confirm')
                return this.$message.info('取消删除')

            console.log('remove')

            // 不用重新加载页面
        },
        //展示 权限修改列表
        showSetRote(role){
            //得到所有 权限
            this.getLevelKeyId( role , this.defKeys );
            
            this.setRoteRightVisible = true;
            // 请求所有 权限 数据 


        },
        // 得到 权限ID
        // 保存到 arr
        getLevelKeyId(node,arr){
            
            if( !node.children){
                return arr.push(node.id)
            }

            node.children.forEach( item =>  this.getLevelKeyId(item , arr));
        },
        // 修改确认
        changeRoteTrue(){

        },
        // 重置 函数
        closeDialog(){
            this.defKeys = []
        }

    }
}
</script>


<style >
    .col-btns{
        margin-bottom: 15px;
    }
    .el-tag{
        margin: 5px;
    }

    .top-line{
        border-top: 1px solid #eee;
    }
    .bottom-rl-row{
        border-bottom: 1px solid #eee;
    }
    .vcenter{
        display: flex;
        align-items: center;
    }
    
</style>