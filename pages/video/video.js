// pages/video/video.js
var app=getApp()
Page({
  data:{
     videoObj:{},
     typeList:[],
     videoArray:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    //1、获取直播信息
    this.getLiveInfo();
    this.getvideoList();
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
  //视频item点击事件
  video_click: function(e){
     var id=e.currentTarget.dataset.id;
     wx.navigateTo({
       url: 'player?id='+id,
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
  //更多点击事件
  clickMore: function(e){
    var ids=e.currentTarget.dataset.ids;
    wx.navigateTo({
      url: 'list?type='+ids,
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
  //获取直播间信息
  getLiveInfo: function(){
    var that=this;
     wx.request({
      url: app.globalData.getLive,
      data: {
        'key':app.globalData.key,
        "Action":"ChatInfo"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
         "Content-Type": "application/x-www-form-urlencoded"  
      }, // 设置请求的 header
      success: function(res){
        // success
        that.setData({
          videoObj:res.data
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
  //获取视频列表信息
  getvideoList: function(){
    var  that=this;
    wx.request({
      url: app.globalData.getVideoList,
      data: {
       "Action":"VideoListByClass",
       "Key":app.globalData.key,
       "PageSize":4
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       header: {
         "Content-Type": "application/x-www-form-urlencoded"  
       }, // 设置请求的 header
      success: function(res){
        // success
       console.log(res);
      that.setData({
        typeList:res.data,
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
    path:'/pages/video/video'
  }
}
})