var express = require('express');
var markdown = require('markdown').markdown;
var models = require('../models');
//调用Router方法生成一个路由的实例
var router = express.Router();

/**
 * path 指定路径
 * listener 指定回调监听函数
 */
router.get('/', function(req, res, next) {
  //user 字符串 对象 user.avatar
  //先查找 然后把user字符串转成user对象
  models.Article.find({}).populate('user').exec(function(err,articles){
    articles.forEach(function(article){
      article.content = markdown.toHTML(article.content);
    });
    res.render('index', { articles: articles});
  });

});

module.exports = router;
