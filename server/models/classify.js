/**
 * Created by Administrator on 2018/4/26.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let classifySchema = new Schema({
    "all":[
        {
            "name": String,
        }
    ]
},{versionKey:false})  //取消数据库中__v的版本字段

module.exports = mongoose.model('Classify',classifySchema,"classifys");


