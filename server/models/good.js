/**
 * Created by Administrator on 2018/4/26.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let goodSchema = new Schema({
    "name":String,
    "price":Number,
    "oldPrice":Number,
    "description":String,
    "rating":Number,
    "info":String,
    "ratings":Array,
    "icon":String,
    "image":String,
    "classify_id":String,
    "number":Number
},{versionKey:false})  //取消数据库中__v的版本字段

module.exports = mongoose.model('Good',goodSchema);


