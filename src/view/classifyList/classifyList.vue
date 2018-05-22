<template>
    <div class="classifyList">
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
            </el-header>

            <el-main>
                <el-table :data="classifyList" height="700" >
                    <el-table-column prop="_id" label="ID" width="200">
                    </el-table-column>
                    <el-table-column label="商品名称" width="180">
                        <template scope="scope">
                            <span v-if="!scope.row.editFlag">{{ scope.row.name }}</span>
                            <span v-if="scope.row.editFlag" class="cell-edit-input">
                                <el-input v-model="scope.row.name"></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                v-if="!scope.row.editFlag"
                                @click.native.prevent="editRow(scope.$index, classifyList)"
                                type="text"
                                size="small">
                                编辑
                            </el-button>
                            <el-button
                                v-if="!scope.row.editFlag"
                                @click.native.prevent="deleteRow(scope.$index, classifyList)"
                                type="text"
                                size="small">
                                移除
                            </el-button>
                            <el-button
                                v-if="scope.row.editFlag"
                                @click.native.prevent="saveRow(scope.$index, classifyList)"
                                type="text"
                                size="small">
                                保存
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default{
        data() {
            return {
                classifyList:[],
                editFlag:false
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                let that = this;
                this.$http.get("/api/getClassify").then((response)=>{
                    let res = response.data;
                    if(res.status === "0"){
                        that.classifyList = res.result;
                        console.log("success");
                    }
                });
            },
            deleteRow(index, rows) {                      //删除某一行数据
                let that = this;
                this.$confirm('确定要删除此条数据吗？', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$http.post("/api/delClassify",{
                        id:rows[index]._id
                    }).then((response)=>{
                        let res = response.data;
                        if(res.status === "0"){
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            rows.splice(index, 1);
                        }
                    });
                })
            },
            editRow(index, rows){                         //编辑某一行数据
                alert(index);
                this.$set(rows[index],"editFlag",true);
            },
            saveRow(index, rows){                         //保存某一行数据
                rows[index].editFlag = false;
                console.log(rows[index]._id);
                this.$http.post("/api/saveClassify",{
                    id: rows[index]._id,
                    classifyName : rows[index].name
                });
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .classifyList{
        width:calc(100% - 220px);
        padding-left:20px;
        .el-container{
            .el-header{
                padding-left:0;
            }
            .el-main{
                padding-left:0;
                padding-right:0;
                .el-table-column{
                    flex:1;
                }
            }
        }
    }
</style>
