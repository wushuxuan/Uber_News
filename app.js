//app.js
App({
  globalData: {
    userInfo: null,
    userInfos: null,
    session_key:null,
    key: 'diuber2017',
    secret_key: '09e8b1b88e615f0d9650886977af33e9',
    /**解密 */
    decryptData:'https://gc.diuber.com/diuber/wx_third_plat/decryptData',
    /*微信小程序通过code获取用户信息接口*/
    getZiXunOpenId:'https://gc.diuber.com/diuber/wx_mini_app/getZiXunOpenId',
    /*获取文章、视频列表*/
    getArcticlist:'https://help.diuber.com/help/getconsulting/getArcticlist',
    /*获取文章。视频信息(带视频地址)*/
    getArctic:'https://help.diuber.com/help/getconsulting/getArctic',
    /*获取文章。视频信息(不带视频地址)*/
    getUrl: 'https://help.diuber.com/help/getconsulting/getUrl',
  },
  onLaunch: function (options) {
    var _this = this
    if (options.query.userid) {
      var recommend_id = options.query.userid
    } else {
      var recommend_id = 0
    } 
    wx.login({
      success: function (res) {
        //console.log("获取用户的code:"+res.code)
        wx.request({
          url: _this.globalData.getZiXunOpenId,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            key: _this.globalData.key,
            secret_key: _this.globalData.secret_key,
            code:res.code
          },
          success:function(res){
           // console.log('获取openid:')
            //console.log(res)
            var openid = JSON.parse(res.data).openid
            _this.globalData.openid = JSON.parse(res.data).openid
            _this.globalData.session_key = JSON.parse(res.data).session_key
           // console.log("session_key:")
           // console.log(JSON.parse(res.data).session_key)
           // console.log(_this.globalData.session_key)

            wx.getUserInfo({
              success: function (res) {
                //console.log('用户信息：')
               // console.log(res)
                //console.log('需要解密的数据：' + res.encryptedData)
               // console.log('seesionid:' + _this.globalData.session_key)
                wx.request({
                  url: _this.globalData.decryptData,
                  method: 'POST',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  data: {
                    key: _this.globalData.key,
                    secret_key: _this.globalData.secret_key,
                    iv:res.iv,
                    encryptedData: res.encryptedData,
                    sessionID: _this.globalData.session_key
                  },
                  success: function (res) {
                   console.log('解密之后的数据：')
                    console.log(res.data.info)
                  }
                })
              }
            })
          }
        })

      }
      })

  }
  
})