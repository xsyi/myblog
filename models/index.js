/**
 * Created by shan on 4/24/16.
 */
var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.dbUrl);
exports.User = mongoose.model('user',new mongoose.Schema({
    username:String,
    password:String,
    email:String
}));