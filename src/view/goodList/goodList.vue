<template>
    <div class="goodList">
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
                <el-table :data="goodList" height="700" >
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
                    <el-table-column label="现价" width="80" sortable>
                        <template scope="scope">
                            <span v-if="!scope.row.editFlag">{{ scope.row.price }}</span>
                            <span v-if="scope.row.editFlag" class="cell-edit-input">
                                <el-input v-model="scope.row.price"></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="原价" width="80">
                        <template scope="scope">
                            <span v-if="!scope.row.editFlag">{{ scope.row.oldPrice }}</span>
                            <span v-if="scope.row.editFlag" class="cell-edit-input">
                                <el-input v-model="scope.row.oldPrice"></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="库存">
                        <template scope="scope">
                            <span v-if="!scope.row.editFlag">{{ scope.row.number }}</span>
                            <span v-if="scope.row.editFlag" class="cell-edit-input">
                                <el-input v-model="scope.row.number"></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="分类">
                        <template scope="scope">
                            <span v-if="!scope.row.editFlag">{{ scope.row.classify_id }}</span>
                            <span v-if="scope.row.editFlag" class="cell-edit-input">
                                <el-input v-model="scope.row.classify_id"></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                v-if="!scope.row.editFlag"
                                @click.native.prevent="editRow(scope.$index, goodList)"
                                type="text"
                                size="small">
                                编辑
                            </el-button>
                            <el-button
                                v-if="!scope.row.editFlag"
                                @click.native.prevent="deleteRow(scope.$index, goodList)"
                                type="text"
                                size="small">
                                移除
                            </el-button>
                            <el-button
                                v-if="scope.row.editFlag"
                                @click.native.prevent="saveRow(scope.$index, goodList)"
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
                goodList:[],
                editFlag:false
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                let that = this;
                this.$http.get("/api/getGoodList").then((response)=>{
                    let res = response.data;
                    if(res.status === "0"){
                        that.goodList = res.result;
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
                    that.$http.post("/api/delGood",{
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
                this.$http.post("/api/saveGood",{
                    id: rows[index]._id,
                    obj : rows[index]
                });
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .goodList{
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
