var app = getApp();

Page({
  data: {
    isPlayingMusic: false
    // collected
    // currentPostId
    // isPlayingMusic
    // postData
  },
  requestDataById(that) {
    wx.request({
      url: 'https://zay.red/psychoparse/' + postId,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        id: postId
      },
      success: function (res) {
        that.setData({
          "currentPostId": postId,
          "postData": res.data[0]
        })
      }
    })
  },
  onCollectionTap: function (event) {
    var page = this;
    var postsCollected = wx.getStorageSync('posts_collected') || [];
    var postId = page.data.currentPostId;
    var postCollected = !postsCollected[postId];
    postsCollected[postId] = postCollected;
    page.setData({ collected: postCollected });
    wx.setStorageSync('posts_collected', postsCollected);
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
    })
  },
  onShareTap: function (event) {
    var itemList = [
      "分享到微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        if (!res.cancel) {
          wx.showToast({
            title: itemList[res.tapIndex],
          })
        }
      }
    })
  },
  onMusicTap: function (event) {
    var postId = this.data.currentPostId;
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({ isPlayingMusic: false })
    } else {
      wx.playBackgroundAudio(this.data.postData.music);
      this.setData({ isPlayingMusic: true })
    }
  },

  setMusicMonitor: function () {
    var page = this;
    wx.onBackgroundAudioPlay(function () {
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = page.data.currentPostId;
      page.setData({
        isPlayingMusic: true
      })
    });
    wx.onBackgroundAudioPause(function () {
      app.globalData.g_isPlayingMusic = true;
      page.setData({
        isPlayingMusic: false
      })
    });
  },
  onLoad: function (options) {
    var page = this;
    var postId = options.id;
    var posts_index = wx.getStorageSync("posts_index");
    var index = posts_index[postId];
    if(index){
      this.setData({
        "postData": wx.getStorageSync("posts_content")[index],
        "currentPostId": postId
      })
    }else{
      this.requestDataById(this);
    }

    var postsCollected = wx.getStorageSync("posts_collected") || [];
    if (postsCollected) {
      page.setData({ "collected": postsCollected[postId] });
    } else {
      wx.setStorageSync('posts_collected', { postId: false });
    };
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})