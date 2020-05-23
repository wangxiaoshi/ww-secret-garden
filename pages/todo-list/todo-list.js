// pages/todo-list/todo-list.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todoList: []
  },

  checkboxChange: function (e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var that = this
    var checkboxItems = this.data.todoList, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].isFinished = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if(checkboxItems[i]._id == values[j]){
          checkboxItems[i].isFinished = true;
          that.setToDone(checkboxItems[i])
          break;
        }
      }
    }
    wx.setStorageSync({key: 'todoList', data: checkboxItems})
    // this.setData({
    //   todoList: checkboxItems
    // })
  },

  /**
   * 将一个事项设为 完成，更新云数据库
   * @param {*} todo 需要设为完成的todo事项
   */
  setToDone: function (todo) {
    const db = wx.cloud.database()
    const todos = db.collection('todos')
    var that = this
    todos.doc(todo._id).update({
      data: {
        isFinished: true
      },
      success: function(res) {
        console.log(res)
      }
    })
  },

  /**
   * 从云端获取当前所有Todos
   */
  getTodos: function () {
    var that = this
    const db = wx.cloud.database()
    const todos = db.collection('todos')
    
    todos.get().then(function(res) {
      var tmpList = res.data
      tmpList.forEach(element => {
        element.create_time = util.formatTimeWithoutSecond(element.create_time)
        wx.cloud.downloadFile({
          fileID: element.photo, // 文件 ID
        }).then(function (res) {
          element.photo = res.tempFilePath
        })
      });
      that.setData({
        todoList: tmpList
      })
    })  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.callFunction({
    //   name: 'findAllTodos',
    //   data: {

    //   }
    // }).then((res) => {
    //   console.log(res);
    // })
    this.getTodos()
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
    this.getTodos()
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