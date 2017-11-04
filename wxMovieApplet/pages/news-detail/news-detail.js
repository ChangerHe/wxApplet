const lists = require('../../posts-data.js')
const app = getApp()
// pages/news-detail/news-detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    collected: false,
    isPlayingMusic: false
  },

  // 绑定对应的收藏与否的图片样式
  changCollection() {
      // 点击则切换收藏的状态
      this.setData({
        collected : !this.data.collected
      })
      if (this.data.collected) {
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 1000
        })
      } else {
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 1000
        })
      }
      // wx.showModal({
      //   title: '是否收藏',
      //   content: "111111111111111111111111111111",
      //   success(res) {
      //     if(res.confirm) {
      //       wx.showToast({
      //         title: '收藏成功',
      //         icon: 'success',
      //         duration: 1000
      //       })
      //     }
      //   }
      // })

      // 同步的方式设置storage
      var list = this.data.list.postId.toString(10)
      wx.setStorageSync(list , {
        list: this.data.collected
      })
  },
  shareNews () {
    wx.showActionSheet({
      itemList: [
        '分享给微信好友',
        '分享到朋友圈',
        '分享到QQ',
        '分享到微博'
      ],
      itemColor: '#405f80'
    })
  },
  // 音乐播放的点击事件
  onMusictap() {
    // 当isPlayingMusic为true时. 代表正在播放, 再次点击则是取消, 反之亦然
    if (this.data.isPlayingMusic) {
      this.setData({
        isPlayingMusic: false
      })
      wx.pauseBackgroundAudio()
    } else {
      this.setData({
        isPlayingMusic: true
      })
      // 设置播放,则让全局的播放状态为true
      app.globalData.g_isPlayingMusic.status = true 
      // 将全局的当前播放页设置为当前页面
      app.globalData.g_isPlayingMusic.page = this.data.list.postId 
      // 设置播放的地址
      wx.playBackgroundAudio({
        dataUrl: this.data.list.music.url,
        title: this.data.list.music.title,
        coverImgUrl: this.data.list.music.coverImg
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 使用options.查询名 就可以获取到传递过来的查询字符串的值
    this.setData({
      list: lists.postList[options.id]
    })
    // 设置缓存(同步, 则后面加上Sync)
    // 获取页面的postId
    var pageStr = this.data.list.postId.toString(10)
    // 获取对应的storage
    var curCollect = wx.getStorageSync(pageStr)
    // 如果当前storage有值, 则渲染, 无值则返回false
    if (curCollect) {
      this.setData({
        collected: curCollect.list
      })
    } else {
      this.setData({
        collected: false
      })
    }
    // 获取对应的音乐的播放状态, 若在播放, 则对应的播放按钮则为播放状态
    var g_musicStatus = app.globalData.g_isPlayingMusic.status
    var g_musicPage = app.globalData.g_isPlayingMusic.page
    // 当全局播放的页数参数和当前页面的播放页数相同的时候, 才在当前页显示播放状态
    if (g_musicPage === this.data.list.postId) {
      this.setData({
        isPlayingMusic: g_musicStatus
      })
    }


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