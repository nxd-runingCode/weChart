/**
 * @fileOverview 微信小程序的入口文件
 */

var common = require('./common/common');

var constants = require('./common/constants');

var config = require('./config');

App({
    /**
     * 小程序初始化时执行，我们初始化客户端的登录地址，以支持所有的会话操作
     */
    
    onLaunch(referrerInfo) {
      
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      // wx.getSetting({
      //   success(res) {
      //     if (!res.authSetting['scope.address']) {
      //       wx.authorize({
      //         scope: 'scope.address',
      //         success() {
      //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
      //           wx.startRecord()
      //         }
      //       })
      //     }
      //   }
      // })
        // qcloud.setLoginUrl(config.service.loginUrl);
        // this.doLogin();
      common.login();
      console.log("constants.userId" + constants.userId);
      // common.request('GET', {}, config.service.testUrl +'monkey',function (wxLoginError, wxLoginResult) {
      //   console.log("=====================");
      //   if (wxLoginError) {
      //     console.log(wxLoginError);
      //     return;
      //   }
      //   console.log(wxLoginResult);
        
      // });
    },
    
});