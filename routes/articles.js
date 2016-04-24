/**
 * Created by shan on 4/24/16.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});


//注册
router.get('/post', function(req, res, next) {
    res.render('index', { title: '发表文章' });
});
module.exports = router;
