//index.js
//获取应用实例
var app = getApp()
var page=1;
var isLoad=true;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    teachersArray:[]
  },
  onLoad: function () {
    wx.showToast({
      title:"正在加载数据",
      icon:"loading",
      duration:10000
    })
    var that = this;
    //1、获取讲师信息
    this.getTeacherList(1);
  },

  //获取讲师信息
 getTeacherList:function(index){
   var that=this;
  wx.request({
    url: app.globalData.getTeacher,
    data: {
      "Action":"TeacherList",
      "key":app.globalData.key,
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
      console.log(res.data);
      that.setData({
        teachersArray:that.data.teachersArray.concat(res.data)
      })
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
      wx.hideToast();
    }
  })

},
  //进入搜索界面
  toSearch: function(){
    wx.navigateTo({
      url: 'search',
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
  //进入讲师详细信息
  toDetail: function(e){   
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
//下拉加载更多
onReachBottom:function(e){
  if(isLoad){
     this.getTeacherList(++page)
  }
},
onShareAppMessage:function(){
  return {
    title:'聚财盆',
    desc:'提供股票入门基础知识培训，大盘实时在线直播，股票实战课堂，尽在上海聚财盆财经。',
    path:'/pages/index/index'
  }
}
})
