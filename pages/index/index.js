var app = getApp()
Page({
  data: {
    motto: '开启小程序之旅',
    userInfo: {}
  },
  bindViewTap: function () {
  },
  onTapMotto: function () {
    wx.switchTab({
      url: '/pages/posts/posts'
    })
  },
  onLoad: function () {
    var that = this
    
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: 'https://zay.red/onLogin',
    //         data: {
    //           code: res.code
    //         }
    //       })
    //     } else {
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //     }
    //   }
    // });
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
