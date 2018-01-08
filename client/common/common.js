var qcloud = require('../vendor/wafer2-client-sdk/index');
var config = require('../config');
var constants = require('./constants');


/***
 * @class
 * 表示请求过程中发生的异常
 */
var RequestError = (function () {
  function RequestError(type, message) {
    Error.call(this, message);
    this.type = type;
    this.message = message;
  }

  RequestError.prototype = new Error();
  RequestError.prototype.constructor = RequestError;

  return RequestError;
})();


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


//登陆
var doLogin = function () {
  // 登录之前需要调用 qcloud.setLoginUrl() 设置登录地址，不过我们在 app.js 的入口里面已经调用过了，后面就不用再调用了
  qcloud.setLoginUrl(config.service.loginUrl);

  qcloud.login({

    success(result) {
      if (result) {
        showSuccess('登录成功');
        console.log('登录成功', result);
        constants.USER_ID = result.uuid;
        console.log("constants.userId", constants.USER_ID)
      }

    },

    fail(error) {
      showModel('登录失败', error.message);
      console.log('登录失败', error);
    }
  });
};

//请求服务器
var doRequest = function (method, data, url, callback) {
  var header = {};

  header[constants.WX_HEADER_USER_ID] = constants.USER_ID;
  console.log("USER_ID=" + constants.USER_ID);
  
  // 请求服务器，获得返回结果
  wx.request({
    url: url,
    header: header,
    method: method,
    data: data,
    success: function (result) {
      var data = result.data;
      console.log("result.data",data);
      // 成功地响应会话信息
      if (data) {
        // var res = data.data
        if (data.code === undefined) {
          
          callback(null, data);
        } else {
          var errorMessage = '请求失败：' + (data.message || '未知错误');
          var  serviceError = new RequestError(constants.ERR_REQUEST_SERVICE_ERROR, errorMessage);
          showModel('请求失败', serviceError.message);
          callback(serviceError, null);
        }

        // 没有正确响应会话信息
      } else {
        var noDataError = new RequestError(constants.ERR_REQUEST_NO_DATA, JSON.stringify(data));
        showModel('请求失败', noDataError.message);
        callback(noDataError, null);
      }
    },

    // 响应错误
    fail: function (requestError) {
      var error = new RequestError(constants.ERR_REQUEST_NO_NET, '请求失败，可能是网络错误或者服务器发生异常');
      showModel('请求失败', error.message);
      callback(error, null);
    },
  });
};


var exports = module.exports = {
  login: doLogin,
  request: doRequest,
};