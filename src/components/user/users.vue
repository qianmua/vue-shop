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
                    <!--  双向绑定 搜索 -->
                    <!-- 支持模糊查询 -->
                    <!-- 包含清空 -->
                    <el-input 
                    placeholder="请输入内容" 
                    class="input-with-select" 
                    v-model="queryInfo.query" 
                    clearable 
                    @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
            </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
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
                                inactive-color="#ff4949"
                                @change="userStatusChange(scope.row)">
                            </el-switch>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="190px">
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
                            size="mini"
                            @click="editUser(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="top">
                            <el-button 
                            type="danger" 
                            icon="el-icon-delete" 
                            size="mini"
                            @click="deleteUser(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip content="修改" placement="top">
                            <el-button 
                            type="warning" 
                            icon="el-icon-setting" 
                            size="mini"
                            @click="changeUser(scope.row.id)"></el-button>
                        </el-tooltip>
                    </template>

                </el-table-column>

            </el-table>

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

        <!-- 模态框 -->
        <!--  添加用户 -->
        <el-dialog
            title="添加用户"
            :visible.sync="addDialogVisible"
            width="50%"
            @close="closeDialog">
            <!-- body -->

            <el-form 
            :model="addUserFrom" 
            :rules="addUserRote" 
            ref="addUserRef"
            label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addUserFrom.username"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="addUserFrom.password"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addUserFrom.email"></el-input>
                </el-form-item>

                <el-form-item label="手机" prop="tel">
                    <el-input v-model="addUserFrom.tel"></el-input>
                </el-form-item>
            </el-form>
            <!--  对话空底部 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 修改用户 -->
        <el-dialog
            title="修改用户"
            :visible.sync="editUserVisible"
            width="50%">
            <!-- body -->
            <el-form 
            :model="editUserFrom"
            :rules="editUserRote"
            ref="editUserRef"
            label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editUserFrom.username" disabled ></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editUserFrom.email"></el-input>
                </el-form-item>

                <el-form-item label="手机" prop="tel">
                    <el-input v-model="editUserFrom.tel"></el-input>
                </el-form-item>
            </el-form>
            <!-- footer -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editUserVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 角色分配 -->
        <el-dialog
            title="角色分配"
            :visible.sync="setUserRoteVisible"
            width="50%"
            @close="closeDialogRote">
            <!-- body -->
            <div>
                <p>当前用户:{{roteListInfo.username}}</p>
                <p>当前角色:{{roteListInfo.rotename}}</p>
                <p>分配新角色:
                    <el-select v-model="selectRoteId" placeholder="请选择">
                        <el-option
                            v-for="item in roteListAll"
                            :key="item.id"
                            :label="item.rolename"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </p>
            </div>
           
            <!-- footer -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="setUserRoteVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeUserRoteTure">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
export default {
    data() {
        // 自定义验证规则
        var checkEmail = (r ,v , c) => {
            // 验证邮箱
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

            if(regEmail.test( v)){
                // 合法
                return c()
            } 
            c( new Error('邮箱不合法'))
        }

        var checkTel = (r ,v , c) => {

            //验证手机
            const regTel = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if( regTel.test()){
                return c()
            }
            return c(new Error('手机号不合法'))
        }


        // return
        return {
            //列表请求参数
            queryInfo: {
                query: '', // 搜索 关键字
                pageNum: 1,
                pageSize: 2
            },
            //添加数据表单
            addUserFrom: {
                username: '',
                password: '',
                email : '',
                tel : '',
                },
            //验证规则对象
            addUserRote: {
                username: [
                    {required: true , message: '请输入用户名' , trigger: 'blur'},
                    {min: 3 , max: 18 , message: '长度在3 - 18 ' , trigger : 'blur' }
                ],
                password: [
                    {required: true , message: '请输入密码' , trigger: 'blur'},
                    {min: 6 , max: 18 , message: '长度在6 - 18 ' , trigger : 'blur' }
                ],
                email: [
                    {required: true , message: '请输入邮箱' , trigger: 'blur'},
                    {min: 6 , max: 18 , message: '长度在6 - 18 ' , trigger : 'blur' },
                    {validator: checkEmail , trigger: 'blur'}
                ],
                tel: [
                    {required: true , message: '请输入手机' , trigger: 'blur'},
                    {min: 11 , max: 11 , message: '长度在11 ' , trigger : 'blur' },
                    {validator: checkTel , trigger: 'blur'}
                ],

            },
            // 控制 添加事件对话空关闭
            addDialogVisible : false,
            //控制 用户修改事件对话框
            editUserVisible :false,
            // 查询得到的用户信息
            editUserFrom: {},
            // 控制角色分配
            setUserRoteVisible: false,
            // 角色 列表
            roteListInfo: { username:'aaa' , rotename: 'bbbb'},
            // 所有角色信息列表
            roteListAll: [
                {id:101 , rolename: '管理一'},
                {id:102 , rolename: '管理er'},
                {id:103 , rolename: '管理san'},
                {id:104 , rolename: '管理si'},
            ],
            // 已 选中的 值
            selectRoteId: '',
            // 修改 表单验证
            editUserRote: {
                email: [
                    {required: true , message: '请输入邮箱' , trigger: 'blur'},
                    {min: 6 , max: 18 , message: '长度在6 - 18 ' , trigger : 'blur' },
                    {validator: checkEmail , trigger: 'blur'}
                ],
                tel: [
                    {required: true , message: '请输入手机' , trigger: 'blur'},
                    {min: 11 , max: 11 , message: '长度在11 ' , trigger : 'blur' },
                    {validator: checkTel , trigger: 'blur'}
                ],
            },
            //用户信息
            userList: [],
            //总数据
            total: 111 ,
            //模拟json
            tableData: [{
                id: 111,
                date: '2020-05-02',
                name: '小橘子',
                address: '休想知道我家在哪里',
                email: '2674521520@qq.com',
                rote: 'root',
                tel: '999',
                status: true,
                option: 'null',

                }, {
                    id: 112,
                    date: '2020-05-02',
                    name: '小橘子',
                    address: '休想知道我家在哪里',
                    email: '2674521520@qq.com',
                    rote: 'root',
                    tel: '999',
                    status: false,
                    option: 'null',
            
                }, {
                    id: 113,
                    date: '2020-05-02',
                    name: '小橘子',
                    address: '休想知道我家在哪里',
                    email: '2674521520@qq.com',
                    rote: 'root',
                    tel: '999',
                    status: true,
                    option: 'null',
            
                }, {
                    id: 114,
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
        },
        // 监听控制用户状态
        async userStatusChange(userStatus){
            console.log(userStatus)
            // 模板字符串
            const {data , res} = await this.$http.put(`user/${userStatus.id}/status/${userStatus.status}`)
            if( res.meta.status !== 200){
                userStatus.status = !userStatus.status
                return this.$message.error("change fail!")
            } 
            this.$message.success("SUCCESS")

        },
        //监听对话框关闭
        closeDialog(){
            // 重置
            this.$refs.addUserRef.resetFields()
        },
        //添加用户校验
         addUser(){
            //  async 和 await成对出现，这里是在匿名函数中
            this.$refs.addUserRef.validate(async valid => {
                console.log(valid)
                if(!valid) return
                // 添加
                const { data ,res } = await this.$http.post('users' , this.addUserFrom)
                if( res.meta.status !== 201) this.$message.error('fail')
                this.$message.success('success') 
                //隐藏对话框
                this.addDialogVisible = false
                // 重新的到用户数据
                this.getUserList()
            })
        },
        editUser(id){
            this.editUserVisible = true
        },
        async deleteUser(id) {
            // 挂载confirm 需要挂载
            const confirmRes = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            // 确认 回调
            })/*.then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            // no 回调
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })          
            })*/.catch( err => err);

            //confirmRes 确认删除 返回字符串 confirm
            // 取消 返回 cancel
            if (confirmRes !== 'confirm') return this.$message.info('已取消删除')

            this.$message.success('删除成功')

        },
        changeUser(id){
            this.setUserRoteVisible = true;
        },
        // 修改用户权限 角色
        changeUserRoteTure(){
            this.setUserRoteVisible = false
            this.$message.success("success")
        },
        // 关闭 角色 选择 对话框
        // 重置 value
        closeDialogRote(){
            this.selectRoteId = ''            
        },
    },
    
    
}
</script>

<style>
    
</style>