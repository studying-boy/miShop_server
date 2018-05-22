<template>
    <div class="newClassify">
        <el-form :model="classifyForm" :rules="rules" ref="classifyForm" label-width="100px" class="demo-classifyForm">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="classifyForm.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('classifyForm')">立即创建</el-button>
                <el-button @click="resetForm('classifyForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                classifyForm: {
                    name: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入分类名称', trigger: 'blur' }
                    ]
                },
            };
        },
        methods: {
            submitForm(classifyForm) {
                let that = this;
                this.$refs[classifyForm].validate((valid) => {
                    if (valid) {
                        for(let key in this.classifyForm){
                            console.log(key + " " + this.classifyForm[key]);
                        }
                        this.$http.post("/api/createClassify",{
                            classifyName : that.classifyForm.name
                        }).then((response)=>{
                            let res = response.data;
                            if(res.status === "0"){
                                that.$message({
                                    message: '增添成功',
                                    type: 'success'
                                });
                                that.$router.push("/index/classifyList");
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(classifyForm) {
                this.$refs[classifyForm].resetFields();
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .newClassify{
        margin-top: 50px;
        margin-left:20px;
    }
</style>
