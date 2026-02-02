import { Link } from 'react-router-dom';
import { useState } from 'react';
import useLedgerStore from '@/hooks/useLedgerStore';
import { CloudDecoration } from '@/components/decorations/CloudDecoration';

function Ledger() {
  const {
    records,
    isLoading,
    RECORD_TYPE,
    addRecord,
    getSummary,
    deleteRecord,
    initialAmount,
    setInitialAmount
  } = useLedgerStore();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState(RECORD_TYPE.INCOME);
  const [note, setNote] = useState('');
  const [time, setTime] = useState('');

  const handleAdd = () => {
    if (!name || !amount) return;

    addRecord({
      amount: Number(amount),
      type: type,
      name: name,
      note: note,
      ...(time && { time: new Date(time) })
    });

    setName('');
    setAmount('');
    setNote('');
    setTime('');
  };

  const handleInitialAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialAmount(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-black p-8">
        <p>加载中...</p>
      </div>
    );
  }

  const summary = getSummary();

  return (
    <div className="min-h-screen bg-white text-black p-8 relative overflow-hidden">
      {/* 新春装饰 */}
      <CloudDecoration />
      
      {/* 顶部装饰线条 */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      
      <div className="relative z-10">
        <Link to="/" className="inline-block mb-8 text-black underline hover:text-red-600 transition-colors">返回首页</Link>
        <h1 className="text-4xl font-bold mb-8">红包账本</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">初始金额</h2>
          <input
            type="number"
            value={initialAmount}
            onChange={handleInitialAmountChange}
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500/50"
            placeholder="输入初始金额"
          />
        </div>

        <div className="mb-8 p-4 bg-red-50 rounded-lg border border-red-200">
          <h2 className="text-2xl font-bold mb-4 text-red-700">统计摘要</h2>
          <p>初始金额: ¥{initialAmount}</p>
          <p className="text-green-600">总收入: ¥{summary.totalIncome}</p>
          <p className="text-red-600">总支出: ¥{summary.totalExpense}</p>
          <p className="font-bold">结余（含初始金额）: ¥{summary.balance}</p>
          <p>盈亏（不包含初始金额）: ¥{summary.netBalance}</p>
          <p>记录数: {summary.count}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">添加记录</h2>
          <div className="flex flex-col gap-4 max-w-md">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500/50"
              placeholder="输入姓名"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500/50"
              placeholder="输入金额"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <option value={RECORD_TYPE.INCOME}>收入</option>
              <option value={RECORD_TYPE.EXPENSE}>支出</option>
            </select>
            <input
              type="datetime-local"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500/50"
              placeholder="输入备注（可选）"
            />
            <button
              onClick={handleAdd}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              添加记录
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">记录列表</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-2">姓名</th>
                  <th className="text-left p-2">金额</th>
                  <th className="text-left p-2">类型</th>
                  <th className="text-left p-2">时间</th>
                  <th className="text-left p-2">备注</th>
                  <th className="text-left p-2">操作</th>
                </tr>
              </thead>
              <tbody>
                {records.map(record => (
                  <tr key={record.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{record.name}</td>
                    <td className={`p-2 ${record.type === RECORD_TYPE.INCOME ? 'text-green-600' : 'text-red-600'}`}>
                      ¥{record.amount}
                    </td>
                    <td className="p-2">{record.type}</td>
                    <td className="p-2">{record.userProvidedTime ? record.time.toLocaleString() : '-'}</td>
                    <td className="p-2">{record.note || '-'}</td>
                    <td className="p-2">
                      <button
                        onClick={() => deleteRecord(record.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {records.length === 0 && <p className="text-gray-500 mt-4">暂无记录</p>}
        </div>
      </div>
    </div>
  );
}

export default Ledger;
