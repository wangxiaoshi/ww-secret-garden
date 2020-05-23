//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    daysTogether: '',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  clickTest: function() {
    wx.navigateTo({
      url: '../todo-list/todo-list',
    })
  },
  onLoad: function () {
    var today = new Date();
    var together = new Date(Date.UTC(2020, 3, 15, 14, 41, 0, 0));
    console.log('today' + today);
    console.log('together' + together);
    this.setData({
      daysTogether: this.calcDiffOfDays(together, today),
    });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 这里传参的日期格式为：xxxx/xx/xx xx:xx
  calcDiffOfDays: function(start, end) {
    let days = end.getTime() - start.getTime();
    let day = parseInt(days / (1000 * 60 * 60 * 24));
    return day;
  },
})
