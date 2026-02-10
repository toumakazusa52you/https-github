import { useState, useEffect, useCallback } from 'react';
import { mockCloudFunction } from '@/lib/api';

export interface LedgerRecord {
  id: string;
  amount: number;
  type: string;
  name: string;
  time: Date;
  note: string;
  userProvidedTime: boolean;
}

const RECORD_TYPE = {
  INCOME: '收入',
  EXPENSE: '支出'
};

const STORAGE_KEY = 'cny_ledger_data';
const INITIAL_AMOUNT_KEY = 'red_packet_initial_amount';

const useLedgerStore = () => {
  const [records, setRecords] = useState<LedgerRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialAmount, setInitialAmount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 优先从本地存储加载数据
        const savedData = localStorage.getItem(STORAGE_KEY);
        const savedInitialAmount = localStorage.getItem(INITIAL_AMOUNT_KEY);
        
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          const recordsWithDate = parsedData.map((record: any) => ({
            ...record,
            time: new Date(record.time),
            userProvidedTime: record.userProvidedTime || false
          }));
          setRecords(recordsWithDate);
          console.log('从本地存储加载数据:', recordsWithDate);
        }

        if (savedInitialAmount) {
          setInitialAmount(Number(savedInitialAmount));
          console.log('从本地存储加载初始金额:', savedInitialAmount);
        }
        
        // 尝试从云函数加载数据（异步，不阻塞）
        try {
          const result = await mockCloudFunction('ledger', {
            action: 'getRecords'
          });
          
          if (result.success && result.data.records.length > 0) {
            // 只有当云函数返回的数据不为空时，才更新本地数据
            const recordsWithDate = result.data.records.map((record: any) => ({
              ...record,
              id: record._id || record.id,
              time: new Date(record.time),
              userProvidedTime: record.userProvidedTime || false
            }));
            setRecords(recordsWithDate);
            setInitialAmount(result.data.initialAmount || 0);
            
            // 同时保存到本地存储作为备份
            saveToStorage(recordsWithDate);
            localStorage.setItem(INITIAL_AMOUNT_KEY, String(result.data.initialAmount || 0));
            console.log('从云函数加载数据:', recordsWithDate);
          }
        } catch (cloudError) {
          console.warn('云函数加载失败，使用本地数据:', cloudError);
        }
      } catch (error) {
        console.error('加载数据失败:', error);
        // 加载失败，清空状态
        setRecords([]);
        setInitialAmount(0);
      } finally {
        setIsLoading(false);
        console.log('数据加载完成');
      }
    };

    loadData();
  }, []);

  const saveToStorage = useCallback((newRecords: LedgerRecord[]) => {
    try {
      const serializableRecords = newRecords.map(record => ({
        ...record,
        time: record.time.toISOString()
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializableRecords));
    } catch (error) {
      console.error('保存数据失败:', error);
    }
  }, []);

  const addRecord = useCallback(async (recordData: {
    amount: number;
    type: string;
    name: string;
    note?: string;
    time?: Date;
  }) => {
    try {
      console.log('开始添加记录:', recordData);
      
      // 验证数据
      if (!recordData.name || !recordData.amount) {
        console.error('添加记录失败: 缺少必要字段');
        throw new Error('缺少必要字段');
      }
      
      // 准备记录数据
      const recordToAdd = {
        amount: Number(recordData.amount),
        type: recordData.type,
        name: recordData.name.trim(),
        note: recordData.note || '',
        time: recordData.time || new Date(),
        userProvidedTime: !!recordData.time
      };
      
      console.log('准备添加的记录:', recordToAdd);
      
      // 先本地添加，确保用户体验
      const newRecord: LedgerRecord = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        ...recordToAdd
      };
      
      const newRecords = [...records, newRecord];
      console.log('新记录列表:', newRecords);
      
      // 更新状态
      setRecords(newRecords);
      console.log('状态更新完成');
      
      // 保存到本地存储
      saveToStorage(newRecords);
      console.log('本地存储完成');
      
      // 尝试调用云函数添加记录（异步，不阻塞）
      try {
        await mockCloudFunction('ledger', {
          action: 'addRecord',
          data: {
            ...recordToAdd,
            time: recordToAdd.time.toISOString()
          }
        });
        console.log('云函数添加成功');
      } catch (cloudError) {
        console.warn('云函数添加失败，使用本地记录:', cloudError);
      }
      
      console.log('添加记录完成:', newRecord);
      return newRecord;
    } catch (error) {
      console.error('添加记录失败:', error);
      throw error;
    }
  }, [records, saveToStorage]);

  const deleteRecord = useCallback(async (recordId: string) => {
    try {
      // 调用云函数删除记录
      const result = await mockCloudFunction('ledger', {
        action: 'deleteRecord',
        data: { id: recordId }
      });

      if (result.success) {
        const newRecords = records.filter(record => record.id !== recordId);
        setRecords(newRecords);
        saveToStorage(newRecords);
      } else {
        // 云函数删除失败，本地删除
        const newRecords = records.filter(record => record.id !== recordId);
        setRecords(newRecords);
        saveToStorage(newRecords);
      }
    } catch (error) {
      console.error('删除记录失败:', error);
      // 出错时本地删除
      const newRecords = records.filter(record => record.id !== recordId);
      setRecords(newRecords);
      saveToStorage(newRecords);
    }
  }, [records, saveToStorage]);

  const getSummary = useCallback(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    records.forEach(record => {
      if (record.type === RECORD_TYPE.INCOME) {
        totalIncome += record.amount;
      } else if (record.type === RECORD_TYPE.EXPENSE) {
        totalExpense += record.amount;
      }
    });

    return {
      totalIncome,
      totalExpense,
      balance: initialAmount + totalIncome - totalExpense,
      netBalance: totalIncome - totalExpense,
      count: records.length
    };
  }, [records, initialAmount]);

  const getRecordsByName = useCallback((name: string) => {
    return records
      .filter(record => record.name === name)
      .sort((a, b) => b.time.getTime() - a.time.getTime());
  }, [records]);

  const getMonthlySummary = useCallback(() => {
    const monthlyData: Record<string, {
      month: string;
      income: number;
      expense: number;
      records: LedgerRecord[];
    }> = {};

    records.forEach(record => {
      const monthKey = `${record.time.getFullYear()}-${record.time.getMonth() + 1}`;

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthKey,
          income: 0,
          expense: 0,
          records: []
        };
      }

      if (record.type === RECORD_TYPE.INCOME) {
        monthlyData[monthKey].income += record.amount;
      } else {
        monthlyData[monthKey].expense += record.amount;
      }

      monthlyData[monthKey].records.push(record);
    });

    return Object.values(monthlyData)
      .sort((a, b) => b.month.localeCompare(a.month));
  }, [records]);

  const clearAllRecords = useCallback(() => {
    setRecords([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const setInitialAmountValue = useCallback(async (amount: number | string) => {
    const newAmount = Number(amount);
    try {
      // 调用云函数设置初始金额
      const result = await mockCloudFunction('ledger', {
        action: 'setInitialAmount',
        data: { amount: newAmount }
      });

      if (result.success) {
        setInitialAmount(result.data.initialAmount || newAmount);
        localStorage.setItem(INITIAL_AMOUNT_KEY, String(result.data.initialAmount || newAmount));
      } else {
        // 云函数设置失败，本地设置
        setInitialAmount(newAmount);
        localStorage.setItem(INITIAL_AMOUNT_KEY, newAmount.toString());
      }
    } catch (error) {
      console.error('设置初始金额失败:', error);
      // 出错时本地设置
      setInitialAmount(newAmount);
      localStorage.setItem(INITIAL_AMOUNT_KEY, newAmount.toString());
    }
  }, []);

  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(records, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `红包账本_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [records]);

  const importData = useCallback((jsonData: string) => {
    try {
      const importedRecords = JSON.parse(jsonData);

      if (!Array.isArray(importedRecords)) {
        throw new Error('数据格式错误');
      }

      const formattedRecords = importedRecords.map(record => ({
        ...record,
        time: new Date(record.time),
        amount: Number(record.amount),
        userProvidedTime: record.userProvidedTime || false
      }));

      setRecords(formattedRecords);
      saveToStorage(formattedRecords);
      return true;
    } catch (error) {
      console.error('导入数据失败:', error);
      return false;
    }
  }, [saveToStorage]);

  return {
    records,
    RECORD_TYPE,
    isLoading,
    initialAmount,
    addRecord,
    deleteRecord,
    getSummary,
    getRecordsByName,
    getMonthlySummary,
    clearAllRecords,
    exportData,
    importData,
    setInitialAmount: setInitialAmountValue
  };
};

export default useLedgerStore;
