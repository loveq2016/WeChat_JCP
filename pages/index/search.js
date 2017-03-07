// pages/index/search.js
var util=require('../../utils/util')
var app=getApp();
Page({
  data:{
    hotArray:[],
    isSearch:true,
    isLoad:false,
    teacherArray:[],
    videoArray:[],
    teacherHotList:[],
    videoHotList:[],
    historyList:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.getHotInfo();
    this.getHistory();
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
  //键盘回车事件
  onFinish:function(e){
    var value=e.detail.value;
    this.getSearchInfo(value);
    this.setRecoder(value);
    wx.showToast({
      title:"正在搜索...",
      icon:"loading",
      duration:10000
      
    })
    this.setData({
      isSearch:false
    })
  },
  //搜索
  getSearchInfo:function(value){
    var that=this;
    wx.request({
      url: app.globalData.getTeacher,
      data: {
        'Key':app.globalData.key,
        'Action':'SearchKey',
        'PageSize':5,
        'SearchKey':value
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
         "Content-Type": "application/x-www-form-urlencoded"  
      }, // 设置请求的 header
      success: function(res){
        // success
        wx.hideToast();
        var teachers=res.data[0].TeacherList;
        var videos=res.data[1].VideoList;
        that.setData({
          teacherArray:teachers,
          videoArray:videos,
          isLoad:true
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
  //视频点击事件
  video_click:function(e){
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../video/player?id='+id,
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
  //讲师点击事件
  toDetail:function(e){
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'teacherDetail?id='+id,
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
  //获取热门记录
  getHotInfo: function(){
    var that=this;
    wx.request({
      url: app.globalData.getTeacher,
      data: {
        'Action':'HotSearch',
        "Key":app.globalData.key
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
         "Content-Type": "application/x-www-form-urlencoded"  
      }, // 设置请求的 header
      success: function(res){
        // success
        var l1=res.data[0].TeacherList.length;
        var l2=res.data[1].VideoList.length;
        if(l1>0){
              res.data[0].TeacherList[0].color='#E7412F'
              if(l1>1){
                res.data[0].TeacherList[1].color='#FE7202'
              }
              if(l1>2){
                res.data[0].TeacherList[2].color='#FFBA06'
              }
        }else{
             if(l2>0){
                 res.data[0].VideoList[0].color='#E7412F'
             }
             if(l2>1){
                res.data[0].VideoList[1].color='#FE7202'
              }
              if(l1>2){
                res.data[0].VideoList[2].color='#FFBA06'
              }
        }



        that.setData({
          teacherHotList:res.data[0].TeacherList,
          videoHotList:res.data[1].VideoList
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
  //获取历史记录
  getHistory:function(){
    var that=this;
   var history= wx.getStorage({
      key: 'history',
      success: function(res){
        // success
        var history=res.data.reverse();
        that.setData({
          historyList:history
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
  //热门搜索
  search_teacher:function(e){
    var value=e.currentTarget.dataset.name;
    this.getSearchInfo(value);
     wx.showToast({
      title:"正在搜索...",
      icon:"loading",
      duration:10000
      
    })
    this.setData({
      isSearch:false
    })
  },
  //存储历史记录
  setRecoder:function(value){
    var  hisA=[];
    var newVal={value};
    hisA.push(newVal);
    wx.getStorage({
      key: 'history',
      success: function(res){
        var his=res.data;
        if(his instanceof  Array){
          his.push(newVal);
          wx.setStorage({
          key: 'history',
          data: his,
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
        }
      },
      fail: function(e) {
        // fail
        wx.setStorage({
          key: 'history',
          data: hisA,
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
      complete: function() {
        // complete
      }
    })
  },
  clickHis:function(e){
    var name=e.currentTarget.dataset.name;
    this.getSearchInfo(name);
     wx.showToast({
      title:"正在搜索...",
      icon:"loading",
      duration:10000
      
    })
    this.setData({
      isSearch:false
    })
  }
})