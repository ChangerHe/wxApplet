// pages/movies/movies.js
var app = getApp()
var utils = require('../../utils/util.js')

Page({
  data: {
    // 定义一个data数组用于存储需要的数据
    Top250: {},
    comingSoon: {},
    inTheater: {}
  },
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3"
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3"
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3"
    this.getMovieListData(inTheatersUrl, 'inTheater')
    this.getMovieListData(comingSoonUrl, 'comingSoon')
    this.getMovieListData(top250Url, 'Top250')
  },
  // 封装一个请求的函数
  getMovieListData(url, urlName) {
    // 因为下方会调用到这个this, 但是因为闭包问题导致that指向错误, 所以先缓存一下this对象
    var that = this
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        // 这是豆瓣电影的一个bug, 不能将内容设置为 application/json
        "Content-Type": "application/xml"
      },
      success(res) {
        // 请求成功, 则会走success, 不管返回的值是否合法和出错
        var data = that.processDoubanData(res.data)
        // 这是一个比较巧妙的做法, 相当于将本身setdata的对象直接拿出来, 然后再放进去
        var dataCon = {}
        dataCon[urlName] = {}
        dataCon[urlName].dataObj = data
        if (urlName === 'inTheater') {
          dataCon[urlName].key = '正在热映'
        } else if (urlName === 'Top250') {
          dataCon[urlName].key = 'Top250'
        } else {
          dataCon[urlName].key = '即将上映'
        }
        that.setData(dataCon)
      }
    })
  },
  // 处理豆瓣数据的函数
  processDoubanData(res) {
    var headTitle = res.title
    var movies = []
    for (var index in res.subjects) {
      var subject = res.subjects[index]
      var title = subject.title
      var rank = subject.rating.average
      var stars = utils.countingStars(subject.rating.stars)
      var img = subject.images.small
      var obj = {
        subject, 
        title, 
        rank, 
        img,
        stars
      }
      console.log(stars)
      movies[index] = obj
    }
    
    return movies
  },
  moreMovie() {
    wx.navigateTo({
      url: '/pages/more-movie/more-movie',
    })
  }
})