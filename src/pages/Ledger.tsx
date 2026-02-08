import { Link } from 'react-router-dom';
import { useState } from 'react';
import useLedgerStore from '@/hooks/useLedgerStore';
import { CloudDecoration } from '@/components/decorations/CloudDecoration';
import { useSoundEffects } from '@/hooks/useSoundEffects';

// 数字格式化函数，将大额数字转换为带单位的格式
const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + '千';
  }
  return num.toString();
};

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
  const sound = useSoundEffects();

  const handleAdd = () => {
    if (!name || !amount) return;

    sound.playCoin();
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
    <div className="min-h-screen bg-background text-foreground p-8 relative overflow-hidden">
      {/* 新春装饰 */}
      <CloudDecoration />
      
      {/* 顶部装饰线条 */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* 底部装饰 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      
      <div className="relative z-10">
        {/* 返回链接 */}
        <Link to="/" className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-primary transition-colors group">
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>
        
        {/* 标题区域 */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-10 h-0.5 bg-gradient-to-r from-transparent to-secondary" />
            <span className="text-secondary text-sm tracking-widest">财源广进</span>
            <div className="w-10 h-0.5 bg-gradient-to-l from-transparent to-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif">红包账本</h1>
          <p className="text-muted-foreground mt-2">记录新春红包收支</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8 p-4 bg-card rounded-xl border border-border animate-fade-in">
            <h2 className="text-xl font-bold mb-4 font-serif text-foreground">初始金额</h2>
            <input
              type="number"
              value={initialAmount}
              onChange={handleInitialAmountChange}
              className="border border-border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
              placeholder="输入初始金额"
            />
          </div>

          <div className="mb-8 p-6 bg-card rounded-xl border border-primary/20 cloud-pattern animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-primary font-serif">统计摘要</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 bg-accent/30 rounded-lg">
                <p className="text-sm text-muted-foreground">初始金额</p>
                <p className="text-xl font-bold">¥{formatNumber(Number(initialAmount))}</p>
              </div>
              <div className="p-3 bg-accent/30 rounded-lg">
                <p className="text-sm text-muted-foreground">总收入</p>
                <p className="text-xl font-bold text-green-600">¥{formatNumber(summary.totalIncome)}</p>
              </div>
              <div className="p-3 bg-accent/30 rounded-lg">
                <p className="text-sm text-muted-foreground">总支出</p>
                <p className="text-xl font-bold text-red-600">¥{formatNumber(summary.totalExpense)}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">结余（含初始）</p>
                <p className="text-xl font-bold text-primary">¥{formatNumber(summary.balance)}</p>
              </div>
              <div className="p-3 bg-accent/30 rounded-lg">
                <p className="text-sm text-muted-foreground">盈亏</p>
                <p className="text-xl font-bold">¥{formatNumber(summary.netBalance)}</p>
              </div>
              <div className="p-3 bg-accent/30 rounded-lg">
                <p className="text-sm text-muted-foreground">记录数</p>
                <p className="text-xl font-bold">{summary.count}</p>
              </div>
            </div>
          </div>

          <div className="mb-8 p-6 bg-card rounded-xl border border-border bat-pattern animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 font-serif text-foreground">添加记录</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                placeholder="输入姓名"
              />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                onKeyPress={(e) => {
                  if (!/[0-9.]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="border border-border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                placeholder="输入金额"
                inputMode="decimal"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border border-border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
              >
                <option value={RECORD_TYPE.INCOME}>收入</option>
                <option value={RECORD_TYPE.EXPENSE}>支出</option>
              </select>
              <input
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border border-border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
              />
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="border border-border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background md:col-span-2"
                placeholder="输入备注（可选）"
              />
              <button
                onClick={handleAdd}
                className="bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium md:col-span-2 hover:shadow-lg"
              >
                添加记录
              </button>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 wave-pattern animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 font-serif text-foreground">记录列表</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-border bg-accent/30">
                    <th className="text-left p-3 font-serif min-w-[100px]">姓名</th>
                    <th className="text-left p-3 font-serif min-w-[100px]">金额</th>
                    <th className="text-left p-3 font-serif min-w-[80px]">类型</th>
                    <th className="text-left p-3 font-serif min-w-[180px]">时间</th>
                    <th className="text-left p-3 font-serif min-w-[150px]">备注</th>
                    <th className="text-left p-3 font-serif min-w-[80px]">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map(record => (
                    <tr key={record.id} className="border-b border-border hover:bg-accent/20 transition-colors">
                      <td className="p-3 truncate max-w-[120px]">{record.name}</td>
                      <td className={`p-3 font-medium ${record.type === RECORD_TYPE.INCOME ? 'text-green-600' : 'text-red-600'} truncate max-w-[100px]`}>
                        ¥{formatNumber(record.amount)}
                      </td>
                      <td className="p-3 truncate max-w-[80px]">{record.type}</td>
                      <td className="p-3 truncate max-w-[150px] flex items-center gap-2">
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {record.userProvidedTime ? record.time.toLocaleString() : '-'}
                      </td>
                      <td className="p-3 truncate max-w-[150px]">{record.note || '-'}</td>
                        <td className="p-3">
                          <button
                            onClick={() => {
                              sound.playDelete();
                              deleteRecord(record.id);
                            }}
                            className="bg-destructive text-destructive-foreground px-3 py-1 rounded-lg text-sm hover:bg-destructive/90 transition-colors"
                          >
                            删除
                          </button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {records.length === 0 && <p className="text-muted-foreground mt-4 text-center">暂无记录</p>}
          </div>
        </div>

        {/* 底部区域 */}
        <div className="mt-8 pb-4 animate-fade-in">
          {/* 右下角署名 */}
          <div className="flex justify-end">
            <p className="text-muted-foreground text-xs">
              By 子非余
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ledger;
