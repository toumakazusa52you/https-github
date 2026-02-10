import axios from 'axios';

// 云函数调用封装
export const callCloudFunction = async (name: string, data: any) => {
  try {
    // 注意：在实际生产环境中，需要通过后端服务来获取access_token
    // 这里只是演示，实际使用时需要修改
    const response = await axios.post(
      `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=YOUR_ACCESS_TOKEN&env=cloud1-6gz7e6i1c2c035e9&name=${name}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('云函数调用失败:', error);
    throw error;
  }
};

// 本地模拟云函数调用（开发环境使用）
export const mockCloudFunction = async (name: string, data: any) => {
  // 模拟云函数返回
  switch (name) {
    case 'login':
      return {
        success: true,
        data: {
          _id: 'mock_user_id',
          _openid: 'mock_openid',
          nickname: '测试用户',
          avatar: 'https://via.placeholder.com/100',
          createTime: Date.now()
        }
      };
    case 'drawFortune':
      const fortuneOptions = [
        { id: 1, content: '桃花运爆表，今年会遇到对的人', type: 'luck' },
        { id: 2, content: '事业蒸蒸日上，升职加薪不是梦', type: 'luck' },
        { id: 3, content: '财运亨通，投资必赚', type: 'luck' },
        { id: 4, content: '健康如意，无病无灾', type: 'luck' },
        { id: 5, content: '贵人相助，万事顺利', type: 'luck' },
        { id: 6, content: '学业有成，考试必过', type: 'luck' },
        { id: 7, content: '家庭美满，幸福安康', type: 'luck' },
        { id: 8, content: '旅行顺利，收获满满', type: 'luck' },
        { id: 9, content: '心情愉悦，每天开心', type: 'luck' },
        { id: 10, content: '心想事成，梦想成真', type: 'luck' },
        { id: 11, content: '爱情需要多一点耐心', type: 'neutral' },
        { id: 12, content: '工作虽累但有回报', type: 'neutral' },
        { id: 13, content: '财运平稳，适合稳健投资', type: 'neutral' },
        { id: 14, content: '注意休息，保持健康', type: 'neutral' },
        { id: 15, content: '遇到困难要坚持', type: 'neutral' }
      ];
      const randomIndex = Math.floor(Math.random() * fortuneOptions.length);
      const selectedFortune = fortuneOptions[randomIndex];
      return {
        success: true,
        data: {
          _id: 'mock_fortune_id',
          _openid: 'mock_openid',
          content: selectedFortune.content,
          type: selectedFortune.type,
          createTime: Date.now()
        }
      };
    case 'sendEmail':
      return {
        success: true,
        data: {
          _id: 'mock_email_id',
          _openid: 'mock_openid',
          email: data.email,
          subject: data.subject || '一封匿名信',
          content: '请接收属于你的【一封匿名信】',
          messageId: 'mock_message_id',
          createTime: Date.now()
        }
      };
    case 'ledger':
      switch (data.action) {
        case 'getRecords':
          return {
            success: true,
            data: {
              records: [],
              initialAmount: 0
            }
          };
        case 'addRecord':
          return {
            success: true,
            data: {
              _id: 'mock_ledger_id',
              _openid: 'mock_openid',
              ...data.data,
              time: new Date(data.data.time || Date.now()),
              userProvidedTime: !!data.data.time,
              createTime: Date.now()
            }
          };
        case 'deleteRecord':
          return {
            success: true,
            data: { id: data.data.id }
          };
        case 'setInitialAmount':
          return {
            success: true,
            data: { initialAmount: data.data.amount }
          };
        case 'clearAll':
          return {
            success: true,
            data: { message: '所有记录已清空' }
          };
        default:
          return {
            success: false,
            error: '未知操作'
          };
      }
    default:
      return {
        success: false,
        error: 'Unknown function'
      };
  }
};