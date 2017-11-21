// pages/article/article.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  dian:false,
  showcommentaries:false,
  Montmorillonitelayer:false,
  stopoverflow:false,
  comments:[
    {
      url:'../../images/jifen/integral.png',
      name:'wushuxuan',
      number:'2',
      contents:'点赞！',
      checked:false
    }, {
      url: '../../images/jifen/record.png',
      name: 'wushuxuan',
      number: '2',
      contents: '点赞！',
      checked: false
    }, {
      url: '../../images/jifen/integral.png',
      name: 'wushuxuan',
      number: '2',
      contents: '点赞！',
      checked: false
    },
  ]
  },
  /*点赞功能*/
  dianji:function(e){
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var comments = this.data.comments
    var that = this
    comments[index].checked = !comments[index].checked
    that.setData({
      comments: comments
      })
    console.log(comments[index].checked)
  },
/**添加评论 */
  commentaries:function(){
    var that = this
    that.setData({
      show: !this.data.show,
      showcommentaries: !this.data.showcommentaries
    })
  },
  /**点赞 */
  zan:function(){
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
  formSubmit:function(e){
    console.log(e.detail.value)
    var that = this
    that.setData({
      show: !this.data.show,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id: options.id
    })
    wx.request({
      url: 'https://help.diuber.com/help/getconsulting/getArctic',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        key: app.globalData.key,
        secret_key: app.globalData.secret_key,
        id :options.id
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
    wx.request({
      url: 'https://help.diuber.com/help/getconsulting/getArctic',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        key: app.globalData.key,
        secret_key: app.globalData.secret_key,
        id: options.id
      },
      success: function (res) {
        wx.stopPullDownRefresh()
        console.log(res.data.info)
        that.setData({
          list: res.data.info
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
  onShareAppMessage: function (options) {
    return {
      title: this.data.title,
      path: '/pages/article/article?userid=' + app.globalData.userInfos + '&id=' + this.data.id,
    }
  }
})