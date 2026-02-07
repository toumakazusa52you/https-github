import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CloudDecoration } from '@/components/decorations/CloudDecoration';

const fortuneData = [
  { type: "上上签", title: "天赐良缘", content: "喜鹊登枝报佳音，天赐良缘福满门。家和万事皆如意，喜气盈庭庆新春。" },
  { type: "上上签", title: "金玉满堂", content: "金玉满堂福寿长，财源广进达三江。吉星高照平安宅，瑞气盈门富贵昌。" },
  { type: "上上签", title: "龙腾四海", content: "龙腾四海展宏图，凤舞九天庆有余。吉日良时添福寿，春风得意乐安居。" },
  { type: "大吉", title: "吉祥如意", content: "吉祥如意福星照，瑞气临门好运交。心想事成多喜乐，家庭和睦乐逍遥。" },
  { type: "上上签", title: "福寿双全", content: "福如东海长流水，寿比南山不老松。双喜临门多吉庆，全家欢乐乐融融。" },
  { type: "大吉", title: "财源广进", content: "财源广进似春潮，生意兴隆步步高。吉人自有天相佑，福禄双全乐陶陶。" },
  { type: "上上签", title: "鸿运当头", content: "鸿运当头照四方，吉星高照福满堂。前程似锦多顺利，步步高升事业强。" },
  { type: "大吉", title: "喜气盈门", content: "喜气盈门福满庭，吉星高照好运迎。春风得意人欢笑，四季平安万事兴。" },
  { type: "上上签", title: "五福临门", content: "五福临门喜气扬，吉星高照福安康。家庭和睦多欢乐，事业顺利永吉祥。" },
  { type: "大吉", title: "万事亨通", content: "万事亨通如意来，吉星高照福门开。春风得意人欢笑，步步登高上瑶台。" }
];

function Fortune() {
  const [fortune, setFortune] = useState(fortuneData[0]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const drawFortune = () => {
    setIsDrawing(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * fortuneData.length);
      setFortune(fortuneData[randomIndex]);
      setIsDrawing(false);
      setHasDrawn(true);
    }, 800);
  };

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
            <span className="text-secondary text-sm tracking-widest">新春纳福</span>
            <div className="w-10 h-0.5 bg-gradient-to-l from-transparent to-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif">新年抽签</h1>
          <p className="text-muted-foreground mt-2">诚心祈愿，求取新年好运</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className={`mb-8 p-8 rounded-xl border border-border bg-gradient-to-br from-card via-card to-accent/20 cloud-pattern animate-fade-in ${isDrawing ? 'animate-shake' : ''}`} style={{ animationDelay: '100ms' }}>
            {hasDrawn ? (
              <div className="text-center">
                <div className="inline-block mb-4">
                  <span className={`text-3xl font-bold font-serif ${fortune.type === '上上签' ? 'text-primary' : 'text-secondary'}`}>
                    【{fortune.type}】
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 font-serif text-foreground">{fortune.title}</h3>
                <div className="bg-accent/30 p-6 rounded-lg border border-border">
                  <p className="text-lg whitespace-pre-line leading-relaxed text-foreground">{fortune.content}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <p className="text-lg text-muted-foreground">点击下方按钮开始求签</p>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <button
              onClick={drawFortune}
              disabled={isDrawing || hasDrawn}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-lg hover:shadow-lg"
            >
              {hasDrawn ? "已求签" : (isDrawing ? "抽签中..." : "🙏 求签")}
            </button>
            
            {hasDrawn && (
              <button
                onClick={() => {
                  setHasDrawn(false);
                }}
                className="px-8 py-4 bg-card text-foreground border border-border rounded-xl hover:bg-accent transition-all duration-200 font-medium text-lg"
              >
                重新求签
              </button>
            )}
          </div>

          {/* 说明文字 */}
        <div className="mt-12 text-center text-muted-foreground text-sm animate-fade-in" style={{ animationDelay: '300ms' }}>
          <p>🧧 诚心祈愿，必有福报 🧧</p>
        </div>

        {/* 右下角署名 */}
        <div className="absolute bottom-4 right-4 text-right animate-fade-in" style={{ animationDelay: '800ms' }}>
          <p className="text-muted-foreground text-xs">
            By 子非余
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Fortune;
