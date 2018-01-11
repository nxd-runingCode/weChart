// pages/index/index.js
var common = require('../../common/common');

var config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  //下拉刷新
  onPullDownRefresh: function (e) {
    this.loadList(); // 注意要加 this。
  },

  loadList: function () {
    var that = this;

    common.request('POST', {}, config.service.indexFindAllUrl, function (requestError, requestResult) {
      // console.log("=====================");
      if (requestError) {
        console.log(requestError);
        return;
      }
      // console.log("requestResult",requestResult);
      that.setData({
        list: requestResult.list
      });
      wx.stopPullDownRefresh();
     
    });

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadList();
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