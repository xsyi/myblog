/**
 * Created by shan on 4/24/16.
 */
var express = require('express');
var models = require('../models');
var auth = require('../middleware/auth');
var multer = require('multer');
//指定存储目录和文件名
var storage = multer.diskStorage({
    //目标路径
    destination: function (req, file, cb) {
        cb(null, '../public/uploads')
    },
    //文件名
    filename: function (req, file, cb) {
        // fieldname originalname mimetype
        cb(null, Date.now()+'.'+(file.mimetype.slice(file.mimetype.indexOf('/')+1)))
    }
})

var upload = multer({ storage: storage })
//路由的实例
var router = express.Router();
//注册
router.get('/add',auth.checkLogin, function(req, res, next) {
    res.render('article/add', { title: '发表文章' });
});

router.post('/add',auth.checkLogin,upload.single('poster'),function(req,res,next){
    var article = req.body;
    // /uploads/1461489184504.png
    if(req.file)
        article.poster = '/uploads/'+req.file.filename;
    //把当前登陆的用户的ID赋给user
    article.user = req.session.user._id;
    models.Article.create(article,function(err,doc){
        if(err){
            req.flash('error','文章发表失败!');
        }else{
            req.flash('success','文章发表成功');
            res.redirect('/');
        }
    });
});
module.exports = router;
