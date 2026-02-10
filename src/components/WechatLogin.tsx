import React, { useEffect } from 'react';

interface WechatLoginProps {
  onLoginSuccess?: (userInfo: any) => void;
  onLoginError?: (error: any) => void;
}

const WechatLogin: React.FC<WechatLoginProps> = ({ onLoginSuccess, onLoginError }) => {
  useEffect(() => {
    // 加载微信登录JS
    const script = document.createElement('script');
    script.src = 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      new WxLogin({
        id: 'wechat-login',
        appid: 'wxa7c9c5a2a2d9a1b2', // 替换为你的微信开放平台AppID
        scope: 'snsapi_login',
        redirect_uri: encodeURIComponent('http://localhost:8081/login/callback'), // 替换为你的回调地址
        state: 'STATE',
        style: 'black',
        href: ''
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div id="wechat-login" className="mb-4"></div>
      <p className="text-sm text-gray-600">请使用微信扫码登录</p>
    </div>
  );
};

export default WechatLogin;