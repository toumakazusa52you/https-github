const CloudDecoration = () => {
  return (
    <>
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

      {/* 右上角祥云 */}
      <div className="absolute -top-5 -right-5 w-32 h-32 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-spring-gold">
          <path
            fill="currentColor"
            d="M20 60c0-11 9-20 20-20 2-11 12-20 24-20 13 0 24 10 24 23 8 3 12 10 12 18 0 11-9 19-20 19H20c-11 0-20-9-20-20z"
          />
        </svg>
      </div>

      {/* 左下角装饰 */}
      <div className="absolute bottom-20 -left-10 w-24 h-24 opacity-15 animate-float" style={{ animationDelay: '4s' }}>
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
      <div className="absolute top-1/3 -right-6 w-20 h-20 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-spring-gold transform -scale-x-100">
          <path
            fill="currentColor"
            d="M50 30c-5 0-10 3-13 8-8-3-17-1-22 5 5 3 9 8 10 14-3 5-4 11-2 16 5-1 10-1 15 1 3 6 8 11 12 13 4-2 9-7 12-13 5-2 10-2 15-1 2-5 1-11-2-16 1-6 5-11 10-14-5-6-14-8-22-5-3-5-8-8-13-8z"
          />
        </svg>
      </div>

      {/* 中间悬浮的小装饰点 */}
      <div className="absolute top-1/2 left-10 w-2 h-2 rounded-full bg-spring-gold/20 animate-shimmer" />
      <div className="absolute top-1/4 right-20 w-1.5 h-1.5 rounded-full bg-spring-gold/15 animate-shimmer" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 left-1/4 w-1 h-1 rounded-full bg-primary/10 animate-shimmer" style={{ animationDelay: '0.5s' }} />
    </>
  );
};

export { CloudDecoration };
