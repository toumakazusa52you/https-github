import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CloudDecoration } from '@/components/decorations/CloudDecoration';
import { mockCloudFunction } from '@/lib/api';

const fortuneData = [
  { type: "上上签", title: "脱单有望", content: "桃花运爆棚，脱单有望！新的一年，爱情事业双丰收，单身狗要翻身啦！" },
  { type: "上上签", title: "暴富预定", content: "钱包鼓鼓！今年暴富预定，数钱数到手软，躺平也能赢！" },
  { type: "上上签", title: "升职加薪", content: "事业起飞，升职加薪！老板器重你，同事羡慕你，打工人的春天来啦！" },
  { type: "大吉", title: "欧气爆棚", content: "万事顺遂，烦恼拜拜！想啥来啥，许啥中啥，欧气爆棚的一年！" },
  { type: "上上签", title: "发际线稳", content: "身体健康，吃嘛嘛香！熬夜不秃头，脱发不焦虑，发际线稳如泰山！" },
  { type: "大吉", title: "财富自由", content: "副业搞起，睡后收入！搞钱小能手，理财小天才，早日实现财富自由！" },
  { type: "上上签", title: "欧皇就是你", content: "运气爆棚，锦鲤附体！抽奖必中，考试必过，游戏必赢，欧皇就是你！" },
  { type: "大吉", title: "烦恼清零", content: "快乐加倍，烦恼清零！每天笑嘻嘻，心情美滋滋，快乐常驻人间！" },
  { type: "上上签", title: "好运连连", content: "好运连连，喜事连连！好事成双，烦恼成对，今年就是你的主场！" },
  { type: "大吉", title: "愿望成真", content: "心想事成，所愿皆得！许下的愿望都实现，吹过的牛皮都成真，梦想照进现实！" }
];

function Fortune() {
  const [fortune, setFortune] = useState<any>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(() => {
    return localStorage.getItem('fortuneDrawn') === 'true';
  });

  const drawFortune = async () => {
    if (hasDrawn) return;
    
    setIsDrawing(true);

    try {
      // 调用抽签云函数
      const result = await mockCloudFunction('drawFortune', {});
      
      if (result.success) {
        setFortune(result.data);
        setHasDrawn(true);
        localStorage.setItem('fortuneDrawn', 'true');
        localStorage.setItem('fortuneData', JSON.stringify(result.data));
      }
    } catch (error) {
      console.error('抽签失败:', error);
    } finally {
      setIsDrawing(false);
    }
  };

  // 初始化时检查是否有保存的抽签结果
  if (hasDrawn && !fortune) {
    const savedFortune = localStorage.getItem('fortuneData');
    if (savedFortune) {
      setFortune(JSON.parse(savedFortune));
    }
  }

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
          <div className={`mb-8 p-8 rounded-xl border border-border bg-gradient-to-br from-card via-card to-accent/20 cloud-pattern animate-fade-in ${isDrawing ? 'animate-shake' : ''}`}>
            {hasDrawn && fortune ? (
              <div className="text-center">
                <div className="inline-block mb-4">
                  <span className={`text-3xl font-bold font-serif ${fortune.type === 'luck' ? 'text-primary' : 'text-secondary'}`}>
                    【{fortune.type === 'luck' ? '好运签' : '中性签'}】
                  </span>
                </div>
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

          <div className="flex justify-center gap-4 animate-fade-in">
            <button
              onClick={drawFortune}
              disabled={isDrawing || hasDrawn}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-lg hover:shadow-lg"
            >
              {hasDrawn ? "已求签" : (isDrawing ? "抽签中..." : "开始求签")}
            </button>
          </div>

          {/* 说明文字 */}
        <div className="mt-12 text-center text-muted-foreground text-sm animate-fade-in">
          <p>诚心祈愿，必有福报</p>
        </div>

        {/* 底部区域 */}
        <div className="mt-6 pb-4 animate-fade-in">
          {/* 右下角署名 */}
          <div className="flex justify-end">
            <p className="text-muted-foreground text-xs">
              By 子非余
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Fortune;
