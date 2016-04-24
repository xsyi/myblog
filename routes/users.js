var express = require('express');
var models = require('../models');
var util = require('../util');
//路由的实例
var router = express.Router();
//注册
router.get('/reg', function(req, res, next) {
  res.render('user/reg', { title: '注册' });
});
//
router.post('/reg', function(req, res, next) {
  //保存对象有两种 model.create entity.save
  var user = req.body;
  if(user.password != user.repassword){
    res.redirect('back');
  }else{
    req.body.password = util.md5(req.body.password);
    models.User.create(req.body,function(err,doc){
      //console.log(doc);
      //res.redirect('/users/login');// 302 Location
      if(err){
        req.flash('error','用户注册失败!');
      }else{
        req.flash('success','用户注册成功!');
        res.redirect('/users/login');// 302 Location
      }
    });
  }

});
//只要写后半段就可以了，不同path的全部内容
//登陆
router.get('/login', function(req, res, next) {
  res.render('user/login', { title: '登陆' });
});

router.post('/login', function(req, res, next) {
  req.body.password = util.md5(req.body.password);
  models.User.findOne({username:req.body.username,password:req.body.password},function(err,doc){
    //if(err){
    //  res.redirect('back');
    //}else{
    //  if(doc){//如果有值表示找到了对应的用户，表示登录成功了
    //    res.redirect('/');
    //  }else{//找不到，登陆失败了
    //    res.redirect('back');
    //  }
    //}
    if(err){
      req.flash('error','用户登录失败!');
      res.redirect('back');
    }else{
      if(doc){//如果有值表示找到了对应的用户，表示登录成功了
        //如果登陆成功后把查询到的user用户赋给session的user属性
        req.session.user = doc;
        req.flash('success','用户登录成功!');
        res.redirect('/');
      }else{//找不到，登陆失败了
        req.flash('error','用户登录失败!');
        res.redirect('back');
      }
    }
  });
});

//退出
router.get('/logout', function(req, res, next) {
  req.session.user = null;
  req.flash('success','用户退出成功!');
  res.redirect('/');
  //res.render('index', { title: '退出' });
});

module.exports = router;
