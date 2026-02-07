const CloudDecoration = () => {
  return (
    <>
      {/* 左侧灯笼 */}
      <div className="absolute top-0 left-8 animate-swing hidden md:block" style={{ transformOrigin: 'top center' }}>
        <svg width="40" height="70" viewBox="0 0 40 70" className="drop-shadow-lg">
          {/* 灯笼顶部 */}
          <rect x="15" y="0" width="10" height="5" fill="hsl(40 70% 50%)" rx="1" />
          <rect x="12" y="5" width="16" height="3" fill="hsl(0 65% 45%)" rx="1" />
          {/* 灯笼主体 */}
          <ellipse cx="20" cy="30" rx="18" ry="22" fill="hsl(0 65% 50%)" />
          <ellipse cx="20" cy="30" rx="15" ry="19" fill="hsl(0 70% 55%)" />
          {/* 灯笼条纹 */}
          <path d="M8 20 Q20 35 32 20" stroke="hsl(40 70% 50%)" strokeWidth="1.5" fill="none" />
          <path d="M6 30 Q20 45 34 30" stroke="hsl(40 70% 50%)" strokeWidth="1.5" fill="none" />
          <path d="M8 40 Q20 55 32 40" stroke="hsl(40 70% 50%)" strokeWidth="1.5" fill="none" />
          {/* 福字 */}
          <text x="20" y="33" textAnchor="middle" fill="hsl(40 70% 50%)" fontSize="12" fontWeight="bold">福</text>
          {/* 灯笼底部 */}
          <rect x="12" y="50" width="16" height="3" fill="hsl(0 65% 45%)" rx="1" />
          {/* 流苏 */}
          <path d="M16 53 L16 65" stroke="hsl(40 70% 50%)" strokeWidth="2" />
          <path d="M20 53 L20 68" stroke="hsl(40 70% 50%)" strokeWidth="2" />
          <path d="M24 53 L24 65" stroke="hsl(40 70% 50%)" strokeWidth="2" />
          <circle cx="16" cy="66" r="2" fill="hsl(40 70% 50%)" />
          <circle cx="20" cy="69" r="2" fill="hsl(40 70% 50%)" />
          <circle cx="24" cy="66" r="2" fill="hsl(40 70% 50%)" />
        </svg>
        {/* 灯笼光晕 */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-20 lantern-glow animate-glow-pulse" />
      </div>

      {/* 右侧灯笼 */}
      <div className="absolute top-0 right-8 animate-swing hidden md:block" style={{ transformOrigin: 'top center', animationDelay: '0.5s' }}>
        <svg width="40" height="70" viewBox="0 0 40 70" className="drop-shadow-lg">
          <rect x="15" y="0" width="10" height="5" fill="hsl(40 70% 50%)" rx="1" />
          <rect x="12" y="5" width="16" height="3" fill="hsl(0 65% 45%)" rx="1" />
          <ellipse cx="20" cy="30" rx="18" ry="22" fill="hsl(0 65% 50%)" />
          <ellipse cx="20" cy="30" rx="15" ry="19" fill="hsl(0 70% 55%)" />
          <path d="M8 20 Q20 35 32 20" stroke="hsl(40 70% 50%)" strokeWidth="1.5" fill="none" />
          <path d="M6 30 Q20 45 34 30" stroke="hsl(40 70% 50%)" strokeWidth="1.5" fill="none" />
          <path d="M8 40 Q20 55 32 40" stroke="hsl(40 70% 50%)" strokeWidth="1.5" fill="none" />
          <text x="20" y="33" textAnchor="middle" fill="hsl(40 70% 50%)" fontSize="12" fontWeight="bold">春</text>
          <rect x="12" y="50" width="16" height="3" fill="hsl(0 65% 45%)" rx="1" />
          <path d="M16 53 L16 65" stroke="hsl(40 70% 50%)" strokeWidth="2" />
          <path d="M20 53 L20 68" stroke="hsl(40 70% 50%)" strokeWidth="2" />
          <path d="M24 53 L24 65" stroke="hsl(40 70% 50%)" strokeWidth="2" />
          <circle cx="16" cy="66" r="2" fill="hsl(40 70% 50%)" />
          <circle cx="20" cy="69" r="2" fill="hsl(40 70% 50%)" />
          <circle cx="24" cy="66" r="2" fill="hsl(40 70% 50%)" />
        </svg>
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-20 lantern-glow animate-glow-pulse" />
      </div>

      {/* 左上角祥云 */}
      <div className="absolute -top-10 -left-10 w-40 h-40 opacity-30 animate-float">
        <svg viewBox="0 0 100 100" className="w-full h-full text-spring-gold">
          <path
            fill="currentColor"
            d="M20 60c0-11 9-20 20-20 2-11 12-20 24-20 13 0 24 10 24 23 8 3 12 10 12 18 0 11-9 19-20 19H20c-11 0-20-9-20-20z"
            opacity="0.6"
          />
          <circle cx="25" cy="55" r="15" fill="currentColor" opacity="0.4" />
          <circle cx="50" cy="50" r="18" fill="currentColor" opacity="0.5" />
          <circle cx="72" cy="52" r="14" fill="currentColor" opacity="0.4" />
        </svg>
      </div>

      {/* 右上角祥云 - 更大更明显 */}
      <div className="absolute -top-5 -right-5 w-36 h-36 opacity-25 animate-float" style={{ animationDelay: '2s' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-spring-gold">
          <path
            fill="currentColor"
            d="M20 60c0-11 9-20 20-20 2-11 12-20 24-20 13 0 24 10 24 23 8 3 12 10 12 18 0 11-9 19-20 19H20c-11 0-20-9-20-20z"
          />
        </svg>
      </div>

      {/* 左下角祥云 */}
      <div className="absolute bottom-20 -left-10 w-28 h-28 opacity-20 animate-float" style={{ animationDelay: '4s' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
          <path
            fill="currentColor"
            d="M50 10 L90 50 L50 90 L10 50 Z"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            d="M50 25 L75 50 L50 75 L25 50 Z"
          />
        </svg>
      </div>

      {/* 右侧蝙蝠纹装饰（福的象征） */}
      <div className="absolute top-1/3 -right-6 w-24 h-24 opacity-15 animate-float-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full text-spring-gold transform -scale-x-100">
          <path
            fill="currentColor"
            d="M50 30c-5 0-10 3-13 8-8-3-17-1-22 5 5 3 9 8 10 14-3 5-4 11-2 16 5-1 10-1 15 1 3 6 8 11 12 13 4-2 9-7 12-13 5-2 10-2 15-1 2-5 1-11-2-16 1-6 5-11 10-14-5-6-14-8-22-5-3-5-8-8-13-8z"
          />
        </svg>
      </div>

      {/* 金色光斑粒子 */}
      <div className="absolute top-1/2 left-10 w-3 h-3 rounded-full bg-spring-gold/30 animate-sparkle" />
      <div className="absolute top-1/4 right-20 w-2 h-2 rounded-full bg-spring-gold/25 animate-sparkle" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-primary/20 animate-sparkle" style={{ animationDelay: '1s' }} />
      <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-spring-gold/20 animate-sparkle" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/3 left-1/3 w-2 h-2 rounded-full bg-spring-gold/15 animate-sparkle" style={{ animationDelay: '2s' }} />

      {/* 烟花粒子效果 */}
      <div className="absolute top-20 left-1/4 w-1 h-1 rounded-full bg-primary/40 animate-sparkle" style={{ animationDelay: '0.3s' }} />
      <div className="absolute top-32 right-1/4 w-1 h-1 rounded-full bg-spring-gold/40 animate-sparkle" style={{ animationDelay: '0.7s' }} />
      <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 rounded-full bg-primary/30 animate-sparkle" style={{ animationDelay: '1.2s' }} />
      <div className="absolute bottom-32 right-1/5 w-1 h-1 rounded-full bg-spring-gold/35 animate-sparkle" style={{ animationDelay: '1.8s' }} />

      {/* 底部装饰波浪 */}
      <div className="absolute bottom-0 left-0 right-0 h-2 overflow-hidden opacity-20">
        <svg viewBox="0 0 1200 20" className="w-full h-full" preserveAspectRatio="none">
          <path
            fill="hsl(40 70% 50%)"
            d="M0 10 Q150 0 300 10 T600 10 T900 10 T1200 10 V20 H0 Z"
          />
        </svg>
      </div>

      {/* 顶部装饰元素 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30">
        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-spring-gold" />
        <div className="w-2 h-2 rounded-full bg-spring-gold animate-pulse" />
        <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-spring-gold" />
      </div>
    </>
  );
};

export { CloudDecoration };
