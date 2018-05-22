<template>
    <div class="newGood">
        <el-form :model="goodForm" :rules="rules" ref="goodForm" label-width="100px" class="demo-goodForm">
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="goodForm.name"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model="goodForm.price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="原价" prop="oldPrice">
                <el-input v-model="goodForm.oldPrice"  type="number"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="classify_id">
                <template>
                    <el-select  placeholder="请选择" filterable v-model="goodForm.classify_id">
                        <el-option
                            v-for="item in options"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </template>
            </el-form-item>
            <el-form-item label="库存" prop="number">
                <el-input v-model="goodForm.number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input type="textarea" v-model="goodForm.description"></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="image">
                <el-upload ref="uploada"
                    class="upload-demo"
                    action="/api/uploadImg"
                    :onError="uploadError"
                    :onSuccess="uploadSuccess"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <img :src="fileSrc" alt="">
            <el-form-item>
                <el-button type="primary" @click="submitForm('goodForm')">立即创建</el-button>
                <el-button @click="resetForm('goodForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                options:[],
                fileSrc:"",
                goodForm: {
                    name: '',
                    price: '',
                    oldPrice: '',
                    description: '',
                    image: [],
                    classify_id: '',
                    number: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入商品价格', trigger: 'blur' }
                    ],
                    classify_id: [
                        { required: true, message: '请选择商品分类', trigger: 'blur' }
                    ],
                    number: [
                        { required: true, message: '请输入商品库存数量', trigger: 'blur' }
                    ]
                },
            };
        },
        mounted(){
            this.init();
        },
        methods: {
            init(){
                this.$http.get("/api/getClassify").then((response)=>{
                    let res = response.data;
                    if(res.status === "0"){
                        this.options = res.result;
                    }
                });
            },                //获取分类数据
            submitForm(goodForm) {
                let that = this;
                this.$refs[goodForm].validate((valid) => {
                    if (valid) {
                        for(let key in this.goodForm){
                            console.log(key + " " + this.goodForm[key]);
                        }
                        this.$http.post("/api/createGood",{
                            newGood : that.goodForm
                        }).then((response)=>{
                            let res = response.data;
                            if(res.status === "0"){
                                that.$message({
                                    message: '增添成功',
                                    type: 'success'
                                });
                                that.$router.push("/index/goodList");
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(goodForm) {
                this.$refs[goodForm].resetFields();
            },
            // 上传成功后的回调
            uploadSuccess (response, file, fileList) {
                console.log(response);
                if(response.status === "0"){
                    this.goodForm.image = "/" + response.result;
                }
            },
            // 上传错误
            uploadError (response, file, fileList) {
                console.log('上传失败，请重试！')
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .newGood{
        margin-top: 50px;
        margin-left:20px;
    }
</style>
