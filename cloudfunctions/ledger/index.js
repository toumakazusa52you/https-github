const cloud = require('wx-server-sdk')

cloud.init({ 
  env: cloud.DYNAMIC_CURRENT_ENV 
})

const db = cloud.database()
const ledgerCollection = db.collection('ledgers')

exports.main = async (event, context) => {
  try {
    const openid = cloud.getWXContext().OPENID
    const { action, data } = event
    
    switch (action) {
      case 'getRecords':
        // 获取用户的账本记录
        const recordsResult = await ledgerCollection
          .where({ _openid: openid })
          .orderBy('time', 'desc')
          .get()
        
        return {
          success: true,
          data: {
            records: recordsResult.data,
            initialAmount: recordsResult.data.length > 0 ? recordsResult.data[0].initialAmount || 0 : 0
          }
        }
        
      case 'addRecord':
        // 添加新记录
        const addResult = await ledgerCollection.add({
          data: {
            _openid: openid,
            amount: data.amount,
            type: data.type,
            name: data.name,
            note: data.note || '',
            time: data.time ? new Date(data.time) : new Date(),
            userProvidedTime: !!data.time,
            createTime: db.serverDate()
          }
        })
        
        return {
          success: true,
          data: {
            _id: addResult._id,
            _openid: openid,
            ...data,
            time: data.time ? new Date(data.time) : new Date(),
            userProvidedTime: !!data.time,
            createTime: new Date()
          }
        }
        
      case 'deleteRecord':
        // 删除记录
        await ledgerCollection.doc(data.id).remove()
        
        return {
          success: true,
          data: { id: data.id }
        }
        
      case 'setInitialAmount':
        // 设置初始金额
        // 检查是否已有记录
        const existingRecord = await ledgerCollection
          .where({ _openid: openid })
          .get()
        
        if (existingRecord.data.length > 0) {
          // 更新第一条记录的初始金额
          await ledgerCollection.doc(existingRecord.data[0]._id).update({
            data: { initialAmount: data.amount }
          })
        } else {
          // 创建一条空记录来存储初始金额
          await ledgerCollection.add({
            data: {
              _openid: openid,
              amount: 0,
              type: '收入',
              name: '初始金额',
              note: '初始金额设置',
              time: new Date(),
              userProvidedTime: false,
              initialAmount: data.amount,
              createTime: db.serverDate()
            }
          })
        }
        
        return {
          success: true,
          data: { initialAmount: data.amount }
        }
        
      case 'clearAll':
        // 清空所有记录
        await ledgerCollection.where({ _openid: openid }).remove()
        
        return {
          success: true,
          data: { message: '所有记录已清空' }
        }
        
      default:
        return {
          success: false,
          error: '未知操作'
        }
    }
  } catch (error) {
    console.error('账本操作失败:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
