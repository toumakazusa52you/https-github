import { Link } from 'react-router-dom';
import { CloudDecoration } from '@/components/decorations/CloudDecoration';
import { Users, MessageSquare, Wallet, Sparkles, Mail } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  {
    to: '/email',
    title: '一封匿名信',
    desc: '如果只有一封信 你会写给谁',
    icon: Mail,
    pattern: 'cloud-pattern',
    delay: '400ms',
  },
];

function Overview() {
  // 首次进入网站时显示公告，使用sessionStorage确保同一会话中只显示一次
  const [showAnnouncement, setShowAnnouncement] = useState(() => {
    const hasSeenAnnouncement = sessionStorage.getItem('hasSeenAnnouncement');
    return !hasSeenAnnouncement;
  });

  // 标记公告已查看
  useEffect(() => {
    if (showAnnouncement) {
      sessionStorage.setItem('hasSeenAnnouncement', 'true');
    }
  }, [showAnnouncement]);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8 relative overflow-hidden">
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
            <span className="text-secondary text-sm tracking-widest">马年大吉</span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-secondary" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground font-serif">
            新春工具集
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">实用工具，助您新春无忧</p>
          
          {/* 公告按钮 */}
          <button
            onClick={() => {
              setShowAnnouncement(true);
            }}
            className="absolute top-0 right-0 px-4 py-2 bg-transparent text-black border border-black rounded-lg hover:bg-black/10 transition-all duration-200 font-medium text-sm hover:shadow-lg"
            title="查看公告"
          >
            公告
          </button>
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.to}
                to={card.to}
                className={`group relative p-6 sm:p-8 rounded-xl border border-border bg-card ${card.pattern} overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/30 animate-slide-up`}
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

        {/* 底部区域 */}
        <div className="mt-12 pb-12 animate-fade-in">
          {/* 底部祝福语 */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground text-sm">
              愿新的一年，所求皆所愿，所行化坦途
            </p>
          </div>

          {/* 右下角署名 */}
          <div className="flex justify-end">
            <p className="text-muted-foreground text-xs">
              By 子非余
            </p>
          </div>
        </div>
      </div>

      {/* 公告弹窗 */}
      <Dialog open={showAnnouncement} onOpenChange={setShowAnnouncement}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">公告</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-foreground">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-primary">新春快乐</h3>
              <p className="text-muted-foreground leading-relaxed">
                新的一年，愿你闪闪发光，每天都有小确幸，开心最重要！
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-primary">功能介绍</h3>
              <div className="space-y-3 text-muted-foreground">
                <ul className="space-y-3 list-none">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>亲戚计算器</strong>：再也不怕叫错亲戚，一键搞定复杂关系，拯救社恐星人</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>话术生成</strong>：应对七大姑八大姨的神器，让你优雅化解尴尬场面</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>红包账本</strong>：谁送多少一目了然，再也不怕算错账，记账也能很轻松</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>抽签</strong>：抽个签，看看接下来会有什么好事等着你，说不定有惊喜</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>一封匿名信</strong>：那些不敢当面说的话，这里帮你传达，情感表达新方式</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-secondary/10 to-primary/10 p-6 rounded-lg">
              <p className="text-muted-foreground leading-relaxed text-center">
                感谢使用，希望这些小工具能给你的春节增添乐趣！
              </p>
            </div>

            <div className="border-t pt-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="text-center font-bold text-primary text-lg">
                  抖音号：love_youandme
                </p>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  欢迎留言反馈，你的建议很重要！
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Overview;