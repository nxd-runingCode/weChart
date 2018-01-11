/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名

// var host = 'http://172.16.41.215:8080';
var host = 'http://192.168.0.106:8080';
// var host = 'http://localhost:8080';
// var host = 'https://www.nyhwc.com';

var appSecret = '70385232d9fc4c5e1b3c3c4df582cf96';

var appId = 'wx5aa01f4fa28d1886';


var config = {
 
    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/login/doLogin`,

        // 登录地址，用于建立会话
        indexFindAllUrl: `${host}/index/findAll`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 测试服务地址
        testUrl: `${host}/test/find/`,

        // 上传图片接口

        // uploadUrl: `${host}/weapp/upload`
       // uploadUrl: '${host}/publish/upload'
        uploadUrl: `${host}/publish/upload`

    }
};


module.exports = config;