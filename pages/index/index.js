Page({

  /**
   * 页面的初始数据
   */
  data: {
   toindex:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(this.data.toindex)
    if (this.data.toindex==true){
      wx.navigateToMiniProgram({
        appId: 'wx62feb25936195752',
        path: 'pages/index/index',
        extraData: {
          foo: 'bar'
        },
        envVersion: 'release',
        success(res) {
          console.log(res)
          that.setData({
            toindex:false
          })
        }
      })
    }else{
        wx.switchTab({
          url: '../information/information',
        })
        that.setData({
          toindex: true
        })
    }
    console.log(this.data.toindex)
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
    var that = this
    console.log(this.data.toindex)
    if (this.data.toindex == true) {
      wx.navigateToMiniProgram({
        appId: 'wx62feb25936195752',
        path: 'pages/index/index',
        extraData: {
          foo: 'bar'
        },
        envVersion: 'release',
        success(res) {
          console.log(res)
          that.setData({
            toindex: false
          })
        }
      })
    } else {
      wx.switchTab({
        url: '../information/information',
      })
      that.setData({
        toindex: true
      })
    }
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