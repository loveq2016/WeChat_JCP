// pages/video/list.js
var app=getApp()
var isLoad=true;
var page=1;
var classId=0;
var teacherId=0;
var typeId=0;
Page({
  data:{
      videoArray:[],
     classArray:[],
     teacherArray:[],
     typeArray:[],
     color1:"#BB885A",
     color2:"#BB885A",
     color3:"#BB885A",
     classColors:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    classId=0;
    teacherId=0;
    typeId=0;
    this.getVideoClass();
    this.getVideoType();
    this.getTeacherList();
    this.getVideoList(1,classId,typeId,teacherId,true);
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
  //一级分类点击事件
  class_click: function(e){
    var index=e.currentTarget.dataset.index;
    var length=this.data.classArray.length;
    if(index!=-1){
        for(var i=0;i<length;i++){
      if(i==index){
        this.data.classArray[i].color='#BB885A';
      }else{
        this.data.classArray[i].color='#5D5D5D';
      }
      this.setData({
        color1:'#5D5D5D'
      })
    }
    }else{
       for(var i=0;i<length;i++){
        this.data.classArray[i].color='#5D5D5D';
       }
       this.setData({
        color1:'#BB885A'
      })
    }
     this.setData({
        classArray:this.data.classArray
      })

     classId=e.currentTarget.dataset.id;
     this.getVideoList(1,classId,typeId,teacherId,false);
  },
//二级分类点击事件
  type_click:function(e){
    var index=e.currentTarget.dataset.index;
    var length=this.data.typeArray.length;
    if(index!=-1){
        for(var i=0;i<length;i++){
      if(i==index){
        this.data.typeArray[i].color='#BB885A';
      }else{
        this.data.typeArray[i].color='#5D5D5D';
      }
      this.setData({
        color2:'#5D5D5D'
      })
    }
    }else{
       for(var i=0;i<length;i++){
        this.data.typeArray[i].color='#5D5D5D';
       }
       this.setData({
          color2:'#BB885A'
      })
    }
     this.setData({
        typeArray:this.data.typeArray
      })
     typeId=e.currentTarget.dataset.id;
     this.getVideoList(1,classId,typeId,teacherId,false);
  },
  //三级分类点击事件
  teacher_click:function(e){
      var index=e.currentTarget.dataset.index;
    var length=this.data.teacherArray.length;
    if(index!=-1){
        for(var i=0;i<length;i++){
      if(i==index){
        this.data.teacherArray[i].color='#BB885A';
      }else{
        this.data.teacherArray[i].color='#5D5D5D';
      }
      this.setData({
        color3:'#5D5D5D'
      })
    }
    }else{
       for(var i=0;i<length;i++){
        this.data.teacherArray[i].color='#5D5D5D';
       }
       this.setData({
          color3:'#BB885A'
      })
    }
     this.setData({
        teacherArray:this.data.teacherArray
      })
      teacherId=e.currentTarget.dataset.id;
     this.getVideoList(1,classId,typeId,teacherId,false);
  },
  //视频点击事件
  video_click : function(e){
    var id=e.currentTarget.dataset.id;
    wx.redirectTo({
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
  //获取视频一级分类
  getVideoClass: function(){
      var that=this;
     wx.request({
      url: app.globalData.getVideoList,
      data: {
        'key':app.globalData.key,
        "Action":"VideoClass"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
         "Content-Type": "application/x-www-form-urlencoded"  
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        that.setData({
          classArray:res.data
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
   //获取视频一级分类
  getVideoType: function(){
      var that=this;
     wx.request({
      url: app.globalData.getVideoList,
      data: {
        'key':app.globalData.key,
        "Action":"VideoType"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
         "Content-Type": "application/x-www-form-urlencoded"  
      }, // 设置请求的 header
      success: function(res){
        // success
        that.setData({
          typeArray:res.data
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
  //获取讲师列表
  getTeacherList: function(){
     var that=this;
     wx.request({
      url: app.globalData.getTeacher,
      data: {
        'key':app.globalData.key,
        "Action":"TeacherName"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
         "Content-Type": "application/x-www-form-urlencoded"  
      }, // 设置请求的 header
      success: function(res){
        // success
        that.setData({
          teacherArray:res.data
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
  //获取视频列表
  getVideoList:function(index,classId,typeId,teacherId,isAppend){
    var that=this;
     wx.request({
       url: app.globalData.getVideoList,
       data: {
         'Action':"VideoList",
         'Key':app.globalData.key,
         "PageSize":10,
         "PageIndex":index,
         'Cid':classId,
         "TypeId":typeId,
         'Tid':teacherId
       },
       method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       header: {
          "Content-Type": "application/x-www-form-urlencoded"  
        }, // 设置请求的 header
       success: function(res){
         // success
         console.log(res);
         if(res.data.length<=0){
            isLoad=false;
         }
         if(isAppend){
            that.setData({
            videoArray:that.data.videoArray.concat(res.data)
           })
         }else{
           that.setData({
             videoArray:res.data
           })
         }
       },
       fail: function() {
         // fail
       },
       complete: function() {
         // complete
       }
     })
  },
  onReachBottom: function(){
     if(isLoad){
       this.getVideoList(++page,classId,typeId,teacherId,true);
     }
  },
  onShareAppMessage:function(){
  return {
    title:'聚财盆',
    desc:'提供股票入门基础知识培训，大盘实时在线直播，股票实战课堂，尽在上海聚财盆财经。',
    path:'/pages/video/list'
  }
}
})