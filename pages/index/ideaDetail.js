// pages/index/ideaDetail.js
//var WxParse = require('../../wxParse/wxParse.js');
var util=require('../../utils/util');
var app=getApp()
var ideaId;
Page({
  data:{
    idea:{},
    wxParseData:"",
    time:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    ideaId=options.id;
    this.getDetail(ideaId);
    
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
  getDetail:function(lId){
    var that=this;
    wx.request({
      url: app.globalData.getIdeaDetail,
      data: {
        "Key":app.globalData.key,
        "Action":"LogDetail",
        "Lid":lId
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"  
      }, // 设置请求的 header
      success: function(res){
        // success
        that.setData({
          idea:res.data[0],
          time:util.replaceStr(res.data[0].InsertDate)
         // wxParseData:WxParse("html",res.data.Bodys)
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
   onShareAppMessage:function(){
  return {
    title:'聚财盆',
    desc:'提供股票入门基础知识培训，大盘实时在线直播，股票实战课堂，尽在上海聚财盆财经。',
    path:'/pages/index/ideaDetail?id='+ideaId
  }
}
})