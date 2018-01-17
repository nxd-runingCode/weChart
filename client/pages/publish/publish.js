// pages/publish/publish.js
var common = require('../../common/common');
var constants = require('../../common/constants');

// 引入配置
var config = require('../../config');

// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
});

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadUrl: config.service.uploadUrl,
    publishcontent: config.service.publishcontent,
    imgUrl: [],
    focus:"aaaa",
    input_content:"",
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
    console.log('onLoad')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')
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
    console.log('isLogin')
    common.isLogin();
    console.log('onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('onShareAppMessage')
  },
   doUpload:function() {
     console.log('doUpload')
    var that = this

    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var filePath = res.tempFilePaths
        console.log('filePath',filePath)
        that.setData({
          imgUrl: filePath
        })
        
      },
      fail: function (e) {
        console.error(e)
      }
    })
  },
   previewImage:function() {
     console.log('previewImage')
     wx.previewImage({
       // current:filePath,
       // urls:[filePath]
       current: this.data.imgUrl,
       urls: [this.data.imgUrl],
       success: function (res) {
         console.log('预览图片')
       }
     })
   },
   uploadImage: function (i, len, e, imageUrls){
    var that = this;
    var header = {};
    console.log('constants.USER_ID===========>',constants.USER_ID)
    header[constants.WX_HEADER_USER_ID] = constants.USER_ID;
    console.log('header=====>',header);
    console.log('yxc=======>',that.data.uploadUrl)
    wx.uploadFile({
       url: that.data.uploadUrl,
       header: header,
       //      filePath: filePath,
       filePath: this.data.imgUrl[i],
       name: 'file',
      /* formData: {
         'user': 'test'
       },*/
  
       success: function (res) {
         showSuccess('上传图片成功')
         res = JSON.parse(res.data)
         console.log('res.imageUrl=========>',res.imageUrl)
         imageUrls = imageUrls+','+res.imageUrl;
       },

       fail: function (e) {
         console.error(e)
       },
       complete:function(){
         i++;
         if (i == len) {
           that.setData({
             imgUrl: ''
           })
           console.log('imageUrls============>',imageUrls)
           that.submitdata(e, imageUrls);         
         }
         else {  
           that.uploadImage(i, len, e, imageUrls);
         }

       }
     })
   },
   publish:function(e){
     console.log('publish')
     var that = this;
     var filePath =  this.data.imgUrl
     var imageUrls = '';
     var i = 0;
     var len = filePath.length;
     console.log('this.data.imgUrl', filePath)
     console.log('that.data.imgUrl.lenth',len)
    if(len != 0){
      this.uploadImage(i, len, e, imageUrls);
    }else{
      that.submitdata(e);
     
    }
       },
   //表单提交
   submitdata: function (e, imageUrls){
     var that = this;
     console.log('表单提交')
     var formData = e.detail.value;
     formData.imageUrl = imageUrls;
     console.log('formdata=======>', formData)
     common.request('POST', formData, that.data.publishcontent, 
        function(requestError, requestResult) {
       // console.log("requestResult",requestResult);
       console.log('执行到这里');
       that.formReset();
       console.log('requestResult============>',requestResult)
       if (requestError) {
         console.log(requestError);
         return ;
       }
       //   console.log(res.data)
       //   that.modalTap();
     });
   },
   formSubmit: function (e) {
     var that = this;
     that.publish(e);

     
   },
   formReset: function () {
     var that = this;
     console.log('form发生了reset事件')
     that.setData({
       input_content:""
     })
     console.log('表单置空')
     
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

