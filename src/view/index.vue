<template>
    <div class="index">
        <el-container>
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>商品</template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <router-link to="/index/goodList">
                                <el-menu-item index="1-1">商品列表</el-menu-item>
                            </router-link>
                            <router-link to="/index/createGood">
                                <el-menu-item index="1-2">新增商品</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-message"></i>分类</template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <router-link to="/index/classifyList">
                                <el-menu-item index="2-1">分类列表</el-menu-item>
                            </router-link>
                            <router-link to="/index/createClassify">
                                <el-menu-item index="2-2">增加分类</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-message"></i>订单</template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <router-link to="/index/orderList">
                                <el-menu-item index="3-1">订单列表</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <router-view></router-view>
        </el-container>
    </div>
</template>

<script>
    export default{
        data() {
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };
            return {
                tableData: Array(20).fill(item)
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    html{
        background: lightblue;
    }
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>
