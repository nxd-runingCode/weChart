// pages/index/index.js
var common = require('../../common/common');

var config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageindex:1,
    callbackcount:4,
    scrollHeight: 0,//得到手机屏幕高度 
    lastLoadTime: 0,//得到上一次加载的时间  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏 
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏 
    totalPage: 0,//得到总的页数  
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

  //下拉刷新
  upper: function (e) {
    this.setData({list:[],pageindex:1});
    this.loadList(); // 注意要加 this。
  },

  loadList: function () {
    var that = this;
    var pageindex = that.data.pageindex;
    var callbackcount = that.data.callbackcount;
    common.request('POST', {pageNum: pageindex, pageSize: callbackcount}, config.service.indexFindAllUrl, function (requestError, requestResult) {
      // console.log("=====================");
      if (requestError) {
        console.log(requestError);
        return;
      }
      // console.log("requestResult",requestResult);
      //that.setData({
      //  list: requestResult.list
      //});
      var List = requestResult.list;
      that.setData({ totalPage: requestResult.pages });
      console.log("总页数" + requestResult.pages)
      if (List.length == 0 || List.length < that.data.callbackcount || (that.data.totalPage == that.data.pageindex && List.length % that.data.callbackcount == 0)) {
        that.setData({ searchLoadingComplete: true });
      }
      if (that.data.searchLoading == false) {
        that.setData({ list: List });
      } else {
        var shanList = that.data.list.concat(List);
        that.setData({ list: shanList });
      }  
      wx.stopPullDownRefresh();
     
    });

  },

  searchScrollLower: function (e) {
    var that = this;
    var currentTime = e.timeStamp;//得到当前加载的时间  
    console.log("当前时间" + currentTime)
    var lastTime = this.data.lastLoadTime;//得到上一次加载的时间
    console.log("上次加载时间" + lastTime)  
    if (currentTime - lastTime < 300) {
      console.log("时间间隔太短，不能算下拉加载");
      return;
    }
    var newPage = this.data.pageindex + 1;
    console.log("当前页" + newPage)
    console.log(that.data.totalPage)
    if (that.data.totalPage >= newPage) {
      this.setData({
        pageindex: newPage,
        lastLoadTime: e.timeStamp,
        searchLoading: true
      });
      this.loadList();
    }  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var height = res.windowHeight - 54;
        that.setData({ scrollHeight: height });
        console.log("当前高度" + height);
      }
    })  
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
  //onReachBottom: function () {
  
  //},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})