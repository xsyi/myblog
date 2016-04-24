/**
 * Created by shan on 4/24/16.
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var config = require('../config');
mongoose.connect(config.dbUrl);
exports.User = mongoose.model('user',new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
}));

exports.Article = mongoose.model('article',new mongoose.Schema({
    //是一个对象ID类型，引用用户模型
    user:{type:ObjectId,ref:'user'},
    title:String,
    content:String,
    createAt:{type:Date,default:Date.now()}
}))