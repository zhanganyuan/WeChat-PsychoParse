var postsData = require("../../../data/posts-data.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },
  onCollectionTap: function (event) {
    var page = this;
    var postsCollected = wx.getStorageSync('posts_collected');
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
      wx.playBackgroundAudio(postsData.postList[postId].music);
      this.setData({ isPlayingMusic: true })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    var postId = options.id;
    var postData = postsData.postList[postId];
    page.setData({
      "currentPostId": postId,
      "postData": postData
    });
    var postsCollected = wx.getStorageSync("posts_collected") || [];
    if (postsCollected) {
      page.setData({ "collected": postsCollected[postId] });
    } else {
      wx.setStorageSync('posts_collected', { postId: false });
    };
    wx.onBackgroundAudioPlay(function () {
      page.setData({
        isPlayingMusic: true
      })
    });
    wx.onBackgroundAudioPause(function() {
      page.setData({
        isPlayingMusic: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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