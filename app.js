//app.js
var md5Util=require('utils/md5');
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    key:md5Util.hex_md5('jucaipen^@'),
    //获取讲师信息
   getTeacher:"https://weixin.jucaipen.com/AndroidInterface/GetTeacherInfo.ashx",
    //直播URL
    livePath:'https://weixin.jucaipen.com/AndroidInterface/GetChatInfo.ashx?Action=ChatInfo',
    //讲师详细信息
    teacherDetail:"https://weixin.jucaipen.com/AndroidInterface/GetTeacherInfo.ashx",
    //获取观点
    getIdea:"https://weixin.jucaipen.com/AndroidInterface/GetTeacherLogInfo.ashx",
    //获取观点详情
    getIdeaDetail:"https://weixin.jucaipen.com/AndroidInterface/GetTeacherLogInfo.ashx",
    //获取直播信息
    getLive:"https://weixin.jucaipen.com/AndroidInterface/GetChatInfo.ashx",
    //获取视频列表
    getVideoList:"https://weixin.jucaipen.com/AndroidInterface/GetVideoInfo.ashx"
  }
})