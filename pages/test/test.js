
Page({
    data: {  
    },
    onLoad: function () {
        var that = this;
      
    },
    yao:function(){
        wx.onAccelerometerChange(function(res){
           console.log(res);
        })
    }
   
});
