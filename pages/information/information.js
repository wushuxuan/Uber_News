var app = getApp()
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zidongbofang:false
  },
/**音乐暂停触发事件 */

  /**video外层的video绑定playing事件 */
  playing:function(e){
    var that = this
    console.log("id:"+e.currentTarget.dataset.id)
    console.log("目标video:"+e.target.id)
    that.setData({
      videoid :e.target.id
    })
    this.videoContext = wx.createVideoContext('videoid')
    wx.request({
      url: app.globalData.getArctic,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        key: app.globalData.key,
        secret_key: app.globalData.secret_key,
        id: e.currentTarget.dataset.id,
      },
      success: function (res) {
        console.log(res.data.info.onlineurl)
        that.setData({
          onlineurl:res.data.info.onlineurl,
          id: e.currentTarget.dataset.id,
          zidongbofang:true
        })
        this.videoContext.play()
      }
      
    })
  },
    /**video里的cover-vier绑定playicon事件 */
  playicon:function(e){
    var that = this
    console.log(e.currentTarget.dataset.id)
    wx.request({
      url: app.globalData.getArctic,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        key: app.globalData.key,
        secret_key: app.globalData.secret_key,
        id: e.currentTarget.dataset.id,
      },
      success: function (res) {
        console.log(res.data.info.onlineurl)
        that.setData({
          onlineurl: res.data.info.onlineurl,
          id: e.currentTarget.dataset.id,
          zidongbofang: true,
          iconshow: true,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        console.log(res.system)
        var xitong = res.system.split(' ')[0]
        console.log(xitong)
        if (xitong == 'iOS') {
          that.setData({
            iconshow: false,
          })
        } else {
          that.setData({
            android: 'display:none;',
          })
        }
      },
    })
    wx.request({
      url: app.globalData.getArcticlist,
      method:'POST',
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        key: app.globalData.key,
        secret_key: app.globalData.secret_key,
      },
      success: function (res) {
          console.log(res.data.info)
          that.setData({
            newsList: res.data.info
          })
      }
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
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        console.log(res.system)
        var xitong = res.system.split(' ')[0]
        console.log(xitong)
        if (xitong == 'iOS') {
          that.setData({
            iconshow: false,
          })
        } else {
          that.setData({
            android: 'display:none;',
          })
        }
      },
    })
    wx.request({
      url: app.globalData.getArcticlist,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        key: app.globalData.key,
        secret_key: app.globalData.secret_key,
      },
      success: function (res) {
        wx.stopPullDownRefresh()
        console.log(res.data.info)
        that.setData({
          newsList: res.data.info
        })
      }
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