// pages/mine/mine.js
var common = require('../../common/common');

var constants = require('../../common/constants');

var config = require('../../config');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户编号
    userId: '',
    //昵称
    nickName: '',
    //头像
    avatarUrl: ''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var that = this;
    this.setData({
      userId: constants.USER_ID,
      nickName: constants.NICK_NAME,
      avatarUrl: constants.AVATAR_URL
    })

    
    
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
  
  },

  /**
   * 登陆
   */
  doLogin: function () {
    wx.openSetting({
      success(res) {
        console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          common.login('mine');
        }
      }
    })
    
  }
})