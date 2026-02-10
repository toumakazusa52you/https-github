import cloudbase from '@cloudbase/js-sdk';

// 初始化云开发
const app = cloudbase.init({
  env: 'cloud1-6gz7e6i1c2c035e9', // 云开发环境ID
  // 如果需要登录，可以配置其他参数
});

// 导出云开发实例
export default app;