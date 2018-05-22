let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let orderSchema = new Schema({
    "goods":[{
        "name":String,
        "count":Number,
        "image":String
    }],
    "totalPrice":Number,
    "address":Object,
    "userId":String,
    "create_at":String,
    "status":{
        type:Number,
        default:0
    }
},{versionKey:false})  //取消数据库中__v的版本字段

module.exports = mongoose.model('Order',orderSchema);


