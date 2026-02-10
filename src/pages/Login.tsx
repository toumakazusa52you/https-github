import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WechatLogin from '../components/WechatLogin';
import { mockCloudFunction } from '../lib/api';

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 模拟登录（实际项目中需要通过微信回调获取code，然后调用后端API）
  const handleMockLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 调用登录云函数
      const result = await mockCloudFunction('login', { userInfo: {} });
      
      if (result.success) {
        // 保存用户信息到localStorage
        localStorage.setItem('userInfo', JSON.stringify(result.data));
        localStorage.setItem('isLoggedIn', 'true');
        
        // 跳转到主页
        navigate('/');
      } else {
        setError('登录失败，请重试');
      }
    } catch (err) {
      setError('登录过程中出现错误');
      console.error('登录错误:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-8">
        {/* 标题 */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">欢迎回来</h1>
          <p className="text-gray-600">登录后体验完整功能</p>
        </div>

        {/* 错误信息 */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* 微信登录 */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 text-center">使用微信登录</h3>
          <WechatLogin />
        </div>

        {/* 分割线 */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">或</span>
          </div>
        </div>

        {/* 测试登录按钮（用于开发测试） */}
        <button
          onClick={handleMockLogin}
          disabled={isLoading}
          className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '登录中...' : '测试登录'}
        </button>

        {/* 说明文字 */}
        <p className="text-xs text-gray-500 text-center">
          测试登录将使用模拟数据，仅用于开发测试
        </p>
      </div>
    </div>
  );
};

export default Login;