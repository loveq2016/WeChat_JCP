// pages/index/teacherDetail.js
var util=require("../../utils/util");
var app=getApp()
var page=1;
var isLoad=true;
var teacherId;
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data:{
    color1:"",
    color2:"#BE8D61",
    isJJ:false,
    isGd:true,
    teacherD:{},
    ideaArray:[],
    body:{},
    wxParseData:"",
    time:"",
    tId:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    //1、获取讲师详细信息
    isLoad=true;
    page=1;
    teacherId=options.id;
    this.setData({
      tId:options.id
    })
    this.getTeacherDetail(options.id);
    //获取观点列表
    this.getIdeaList(options.id,1);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //简介切换
  click_jj: function(){
    this.setData({
      color1:"#BE8D61",
      color2:"black",
      isJJ:true,
      isGd:false
    })
  },
  //观点切换
  click_gd: function(){
    this.setData({
       color1:"black",
      color2:"#BE8D61",
      isJJ:false,
      isGd:true
    })
  },
  //点击观点列表
  idea_click: function(e){
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'ideaDetail?id='+id,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  //获取讲师详细信息
  getTeacherDetail: function(tId){
    var that=this;
    wx.request({
      url: app.globalData.teacherDetail,
      data: {
        "Action":"TeacherInfo",
        "Key":app.globalData.key,
        "Tid":tId
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
         "Content-Type": "application/x-www-form-urlencoded"  
      }, // 设置请求的 header
      success: function(res){
        // success
        that.setData({
           teacherD:res.data,
           time:util.subStr(res.data.JoinDate),
           wxParseData:WxParse("html",res.data.Jianjie)
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
//获取观点列表
  getIdeaList: function(tId,index){
    var tha=this;
    wx.request({
      url: app.globalData.getIdea,
      data: {
        "Action":"LogListByTeacher",
        "Key":app.globalData.key,
        "Tid":tId,
        "PageSize":10,
        "PageIndex":index
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
         "Content-Type": "application/x-www-form-urlencoded"  
       }, // 设置请求的 header
      success: function(res){
        // success
         if(res.data.length<=0){
           isLoad=false;
         }
        tha.setData({
           ideaArray:tha.data.ideaArray.concat(res.data)           
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onReachBottom:function(){
     if(this.data.isGd&&isLoad){
       this.getIdeaList(this.data.tId,++page);
     }
  },
   onShareAppMessage:function(){
  return {
    title:'聚财盆',
    desc:'提供股票入门基础知识培训，大盘实时在线直播，股票实战课堂，尽在上海聚财盆财经。',
    path:'/pages/index/teacherDetail?id='+teacherId
  }
}

})