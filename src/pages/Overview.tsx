import { Link } from 'react-router-dom';
import { CloudDecoration } from '@/components/decorations/CloudDecoration';
import { Users, MessageSquare, Wallet, Sparkles } from 'lucide-react';

const cards = [
  {
    to: '/kinship',
    title: '亲戚计算器',
    desc: '计算亲戚关系',
    icon: Users,
    pattern: 'cloud-pattern',
    delay: '0ms',
  },
  {
    to: '/dialog',
    title: '话术生成',
    desc: '生成应对亲朋话术',
    icon: MessageSquare,
    pattern: 'bat-pattern',
    delay: '100ms',
  },
  {
    to: '/ledger',
    title: '红包账本',
    desc: '记录红包收支',
    icon: Wallet,
    pattern: 'wave-pattern',
    delay: '200ms',
  },
  {
    to: '/fortune',
    title: '抽签',
    desc: '抽取新年签文',
    icon: Sparkles,
    pattern: 'continuous-pattern',
    delay: '300ms',
  },
];

function Overview() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 relative overflow-hidden">
      {/* 新春装饰 */}
      <CloudDecoration />
      
      {/* 顶部装饰线条 */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* 底部装饰 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* 标题区域 */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-secondary" />
            <span className="text-secondary text-sm tracking-widest">蛇年大吉</span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif">
            新春工具集
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">实用工具，助您新春无忧</p>
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.to}
                to={card.to}
                className={`group relative p-8 rounded-xl border border-border bg-card ${card.pattern} overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/30 animate-slide-up`}
                style={{ animationDelay: card.delay }}
              >
                {/* 悬停光效 */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* 角落装饰 */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rotate-45 group-hover:from-primary/20 transition-colors duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden">
                  <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-tr from-secondary/10 to-transparent rotate-45 group-hover:from-secondary/20 transition-colors duration-300" />
                </div>

                <div className="relative flex items-start gap-5">
                  {/* 图标容器 */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors duration-300 group-hover:scale-110 transform">
                    <Icon className="w-8 h-8 text-primary group-hover:text-primary transition-colors" />
                  </div>
                  
                  {/* 文字内容 */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 font-serif text-card-foreground group-hover:text-primary transition-colors duration-300">
                      {card.title}
                    </h2>
                    <p className="text-muted-foreground">{card.desc}</p>
                    
                    {/* 进入提示 */}
                    <div className="mt-4 flex items-center text-sm text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-0 group-hover:translate-x-2">
                      <span>点击进入</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 底部装饰线 */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary group-hover:w-3/4 transition-all duration-500" />
              </Link>
            );
          })}
        </div>

        {/* 底部祝福语 */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <p className="text-muted-foreground text-sm">
            🧧 恭喜发财，红包拿来 🧧
          </p>
        </div>
      </div>
    </div>
  );
}

export default Overview;
