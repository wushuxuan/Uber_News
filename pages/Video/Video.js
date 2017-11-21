// pages/Video/Video.js
/*随机生成颜色*/
var app = getApp()
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({
  /**
 * 页面的初始数据
 */
  data: {
    zidongbofang:false,
    zan: false,
    /*hidden为0时，弹幕不显示，反之亦然*/
    hidden: 1,
    VideoList: [{
      src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
      image: '../../images/VideoImage'
    }]
  },
  submit: function (e) {
    console.log(e.detail.formId)
    wx.request({
      url: app.globalData.setFormidurl,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        key: app.globalData.key,
        secret_key: app.globalData.secret_key,
        user_id: app.globalData.userInfos,
        form_id: e.detail.formId,
      },
      success: function (res) {
        console.log(res)
      }
    })
  },
  plays:function(){
    var that = this
    that.setData({
      showplay:false
    })
  },
  pause: function () {
    var that = this
    that.setData({
      showplay: true
    })
  },
  stopplay:function(){
    wx.showModal({
      title: 'tishi',
      content: '播放完成',
    })
    var that = this
    that.setData({
      showplay: false
    })
  },
  playing: function (e) {
    var that = this
    console.log(e.currentTarget.dataset.id)
    wx.request({
      url: 'https://help.diuber.com/help/getconsulting/getArctic',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        key: app.globalData.key,
        secret_key: app.globalData.secret_key,
        id: e.currentTarget.dataset.id
      },
      success: function (res) {
        console.log(res)
        that.setData({
          ddd: e.currentTarget.dataset.index,
          onlineurl: res.data.info.onlineurl,
          zidongbofang: true,
        })
      }
    })
  },
  bofang: function (e) {
    var that = this
    console.log(e.currentTarget.dataset.id)
    wx.request({
      url: 'https://help.diuber.com/help/getconsulting/getArctic',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        key: app.globalData.key,
        secret_key: app.globalData.secret_key,
        id: e.currentTarget.dataset.id
      },
      success: function (res) {
        console.log(res)
        that.setData({
          ddd: e.currentTarget.dataset.index,
          onlineurl: res.data.info.onlineurl,
          zidongbofang: true,
        })
      }
    })
  },
  onLoad: function (options) {
    
    this.videoContext = wx.createVideoContext('myVideo')
    var that = this
    that.setData({
      id:options.id
    })
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        console.log(res.system)
        var xitong = res.system.split(' ')[0]
        console.log(xitong)

        if (xitong == 'iOS') {
          that.setData({
            showplay: true,
          })
        } else {
          that.setData({
            showplay: false,
          })
        }
      },
    })
    wx.request({
      url: 'https://help.diuber.com/help/getconsulting/getUrl',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        key: app.globalData.key,
        secret_key: app.globalData.secret_key,
        id: this.data.id
      },
      success: function (res) {
        console.log(res.data.info)
        wx.setNavigationBarTitle({
          title: res.data.info.title,
        }) 
        that.setData({
          list: res.data.info,
          title: res.data.info.title
        })
      }
    })
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    this.videoContext = wx.createVideoContext('myVideo')
    var that = this
    wx.request({
      url: 'https://help.diuber.com/help/getconsulting/getUrl',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        key: app.globalData.key,
        secret_key: app.globalData.secret_key,
        id: this.data.id
      },
      success: function (res) {
        wx.stopPullDownRefresh()
        console.log(res.data.info)
        that.setData({
          list: res.data.info
        })
      }
    })
    wx.request({
      url: app.globalData.shareBtControlurl,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        key: app.globalData.key,
        secret_key: app.globalData.secret_key,
      },
      success: function (share) {
        app.globalData.wshare = share.data.info.bt_open
        that.setData({ wshare: share.data.info.bt_open });
      },
    })
  },
  /*点赞功能*/
  zan: function () {
    var that = this
    wx.switchTab({
      url: '../index/index',
    })
  },
  toback: function () {
    var that = this
    wx.switchTab({
      url: '../information/information',
    })
  },
  onShareAppMessage: function () {
    console.log(app.globalData.userInfos)
    return {
      title: this.data.title,
      path: '/pages/Video/Video?userid=' + app.globalData.userInfos + '&id=' + this.data.id,
    }
  }
})