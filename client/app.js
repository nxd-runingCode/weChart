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

    onShow(){
        
    },

    
    onLaunch(referrerInfo) {
      
      
      common.login('start');
      
    },
    

});