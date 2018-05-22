var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var async = require("async");
var fs = require("fs");
var formidable = require("formidable");          //文件上传
var Good = require("../models/good.js");
var User = require("../models/user.js");
var Classify = require("../models/classify");
var Order = require("../models/order");

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/miShop');

mongoose.connection.on("connected",()=>{
    console.log("-------------数据库连接成功------------");
});

mongoose.connection.on("error",()=>{
    console.log("-------------数据库连接失败------------");
});

mongoose.connection.on("disconnected",()=>{
    console.log("-------------数据库断开连接------------");
});

//主页
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//获取用户列表
router.get("/getUserList", (req, res, next) => {
    User.find({},(err, data)=>{
        if(err){
            res.send({
                status:"1",
                msg:err.message
            })
        }else{
            res.send({
                status:"0",
                msg:"",
                result:data
            })
        }
    })
});

//获取商品列表
router.get("/getGoodList", (req, res, next) => {
    Good.find({},(err, data)=>{
        if(err){
            res.send({
                status:"1",
                msg:err.message
            })
        }else{
            res.send({
                status:"0",
                msg:"",
                result:data
            })
        }
    })
});

//保存商品
router.post("/saveGood", (req, res, next) => {
    let goodId = mongoose.Types.ObjectId(req.body.id);
    let obj = req.body.obj;
    Good.update({"_id":goodId},obj,function (err, data) {
        if(err){
            res.send({
                status:"1",
                msg:err.message
            })
        }else{
            res.send({
                status:"0",
                msg:""
            })
        }
    })
})

//删除商品
router.post("/delGood", (req, res, next) => {
    let goodId = mongoose.Types.ObjectId(req.body.id);
    Good.remove({"_id":goodId},function (err, data) {
        if(err){
            res.send({
                status:"1",
                msg:err.message
            })
        }else{
            res.send({
                status:"0",
                msg:""
            })
        }
    })
})

//新增商品
router.post("/createGood", (req, res, next) => {
    let newGood = req.body.newGood;
    console.log(newGood);
    /*let newGood = {
        "name": req.body.name,
        "price":req.body.price,
        "oldPrice":req.body.price,
        "description":req.body.description,
        "image":req.body.image,
        "classify_id":req.body.classify_id,
        "number":req.body.number,
    };*/
    Good.create(newGood, (err, data)=>{
        if(err){
            res.send({
                status:"1",
                msg:err.message
            })
        }else{
            res.send({
                status:"0",
                msg:"增添成功"
            })
        }
    })
})

//上传图片
router.post("/uploadImg", (req, res, next) => {
    //创建上传表单
    let form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置上传目录
    form.uploadDir = 'server/public/images/';
    //保留后缀
    form.keepExtensions = true;
    //文件大小
    form.maxFileSize = 2*1024*1024;
    //上传文件的入口文件
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send({
                msg:11111111
            })
            return;
        }
        var extName = '';  //后缀名
        switch (files.file.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if(extName.length == 0) {
            res.send({
                status:"1",
                msg:"只支持png和jpg格式图片"
            })
            return;
        }else{
            //重新修改文件名字，使用随机数作为图片名字
            var avatarName = (new Date()).getTime() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            //得到上传后的图片相对路径
            console.log(newPath);
            fs.renameSync(files.file.path, newPath);  //重命名
            res.send({
                status:"0",
                msg:"上传成功",
                result:newPath
            })
        }
    })
})

//获取商品分类
router.get("/getClassify", (req, res, next) => {
    Classify.find({},(err,data)=>{
        if(err){
            res.send({
                status:"1",
                msg:err.message
            })
        }else{
            if(data){
                res.send({
                    status:"0",
                    msg:"",
                    result:data[0].all
                })
            }
        }
    })
})

//删除商品分类
router.post("/delClassify", (req, res, next) => {
    let classifyId = req.body.id;
    Classify.update({"all._id":classifyId},{$pull:{"all":{"_id":classifyId}}},function (err, data) {
        if(err){
            res.send({
                status:"1",
                msg:err.message
            })
        }else{
            res.send({
                status:"0",
                msg:""
            })
        }
    })
})

//保存商品分类
router.post("/saveClassify", (req, res, next) => {
    let classifyId = req.body.id;
    let classifyName = req.body.classifyName;
    Classify.update({"all._id":classifyId},{"all.$.name":classifyName},function (err, data) {
        if(err){
            res.send({
                status:"1",
                msg:err.message
            })
        }else{
            res.send({
                status:"0",
                msg:""
            })
        }
    })
})

//新增商品分类
router.post("/createClassify", (req, res, next) => {
    let classifyName = req.body.classifyName;
    Classify.find({},(err,classifyDoc)=>{
        if(err){
            res.send({
                status:"1",
                msg:err.message
            })
        }else{
            classifyDoc[0].all.push({"name":classifyName});
            classifyDoc[0].save();
            res.send({
                status:"0",
                msg:"添加成功"
            });
        }
    })
})

//获取订单列表
router.get("/getOrderList", (req, res, next) => {
    Order.find({},(err, data) => {
        if(err){
            res.send({
                status:"1",
                msg:err.message
            })
        }else{
            res.send({
                status:"0",
                msg:"",
                result:data
            })
        }
    })
})

//删除订单
router.post("/delOrder", (req, res, next) => {
    let orderId = mongoose.Types.ObjectId(req.body.id);
    Order.remove({"_id":orderId},function (err, data) {
        if(err){
            res.send({
                status:"1",
                msg:err.message
            })
        }else{
            res.send({
                status:"0",
                msg:""
            })
        }
    })
})

//保存商品分类
router.post("/saveOrder", (req, res, next) => {
    let orderId = mongoose.Types.ObjectId(req.body.id);
    let status = req.body.status;
    Order.update({"_id":orderId},{"status":status},function (err, data) {
        if(err){
            res.send({
                status:"1",
                msg:err.message
            })
        }else{
            res.send({
                status:"0",
                msg:""
            })
        }
    })
})

module.exports = router;
