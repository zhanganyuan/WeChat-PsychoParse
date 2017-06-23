Page({
  data: {
  },
  requestData: function (that) {
    wx.request({
      url: 'https://zay.red/psychoparse/',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        id: null
      },
      success: function (res) {
        var posts_content = res.data;
        that.setData({ "posts_content": posts_content });
        wx.setStorageSync("posts_content", posts_content);
        var posts_index = {};
        for (var i = 0; i < posts_content.length;i++){
          posts_index[posts_content[i].postId] = i;
        }
        wx.setStorageSync("posts_index", posts_index);
      }
    })
  },
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },
  onLoad: function (options) {
    var that = this;
    var posts_content = wx.getStorageSync("posts_content");
    if (posts_content) {
      that.setData({ "posts_content": posts_content });
    } else {
      that.requestData(that);
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.requestData(this);
  },
  onSwiperTap: function (event) {
    var postId = event.target.dataset.postId;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
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