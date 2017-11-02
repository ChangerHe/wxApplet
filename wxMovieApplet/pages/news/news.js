const lists = require('../../posts-data.js')

// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true, // 是否显示面板指示点
    autoplay: true, // 是否自动切换
    interval: 5000, // 自动切换时间间隔
    duration: 1000// 滑动动画时长
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面加载后, 将数据读取出来
    this.setData({
      lists: lists.postList
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