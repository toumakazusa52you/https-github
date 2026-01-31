import { useState } from "react";
import { cn } from "@/lib/utils";
import { RelativeCalculator } from "@/components/features/RelativeCalculator";
import { GreetingGenerator } from "@/components/features/GreetingGenerator";
import { RedEnvelopeLedger } from "@/components/features/RedEnvelopeLedger";
import { FortuneDraw } from "@/components/features/FortuneDraw";
import { CloudDecoration } from "@/components/decorations/CloudDecoration";
import { Users, MessageSquareText, Wallet, Sparkles } from "lucide-react";

type FeatureType = "relative" | "greeting" | "ledger" | "fortune";

const features = [
  {
    id: "relative" as FeatureType,
    title: "亲戚计算器",
    subtitle: "七大姑八大姨",
    icon: Users,
    description: "快速计算复杂的亲戚关系称呼",
  },
  {
    id: "greeting" as FeatureType,
    title: "拜年话术",
    subtitle: "出口成章",
    icon: MessageSquareText,
    description: "生成得体的新春祝福语",
  },
  {
    id: "ledger" as FeatureType,
    title: "红包账本",
    subtitle: "心中有数",
    icon: Wallet,
    description: "记录收发红包明细",
  },
  {
    id: "fortune" as FeatureType,
    title: "新春签运",
    subtitle: "求个好彩头",
    icon: Sparkles,
    description: "抽取新年运势签文",
  },
];

const Index = () => {
  const [activeFeature, setActiveFeature] = useState<FeatureType | null>(null);

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case "relative":
        return <RelativeCalculator />;
      case "greeting":
        return <GreetingGenerator />;
      case "ledger":
        return <RedEnvelopeLedger />;
      case "fortune":
        return <FortuneDraw />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background cloud-pattern relative overflow-hidden">
      {/* 装饰性云纹 */}
      <CloudDecoration />
      
      {/* 顶部装饰线条 */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-spring-gold/40 to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-spring-gold text-2xl">✦</span>
            <h1 className="text-3xl font-serif font-bold text-foreground tracking-wider">
              新春助手
            </h1>
            <span className="text-spring-gold text-2xl">✦</span>
          </div>
          <p className="text-muted-foreground text-sm">
            {new Date().getFullYear()} · 蛇年大吉
          </p>
        </header>

        {/* 功能区 */}
        {!activeFeature ? (
          <div className="grid grid-cols-2 gap-4 animate-slide-up">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={cn(
                    "group relative bg-card rounded-2xl p-5 text-left",
                    "border border-border/50 hover:border-spring-gold/30",
                    "transition-all duration-300 hover:shadow-lg hover:shadow-spring-gold/5",
                    "hover:-translate-y-1"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* 角落装饰 */}
                  <div className="absolute top-2 right-2 w-6 h-6 opacity-20 group-hover:opacity-40 transition-opacity">
                    <svg viewBox="0 0 24 24" className="w-full h-full text-spring-gold">
                      <path
                        fill="currentColor"
                        d="M12 2L9 9H2l6 5-2 8 6-4 6 4-2-8 6-5h-7z"
                      />
                    </svg>
                  </div>
                  
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-3",
                    "bg-gradient-to-br from-spring-gold/10 to-spring-gold/5",
                    "group-hover:from-spring-gold/20 group-hover:to-spring-gold/10",
                    "transition-colors duration-300"
                  )}>
                    <Icon className="w-6 h-6 text-spring-gold" />
                  </div>
                  
                  <h3 className="font-serif font-semibold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-spring-gold/80 mb-2">
                    {feature.subtitle}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="animate-scale-in">
            {/* 返回按钮 */}
            <button
              onClick={() => setActiveFeature(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
            >
              <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-spring-gold/10 transition-colors">
                ←
              </span>
              <span className="text-sm">返回首页</span>
            </button>
            
            {/* 功能内容 */}
            {renderFeatureContent()}
          </div>
        )}

        {/* 底部装饰 */}
        <footer className="text-center mt-12 text-muted-foreground/50 text-xs">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-spring-gold/20" />
            <span className="text-spring-gold/40">福</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-spring-gold/20" />
          </div>
          新春快乐 · 万事如意
        </footer>
      </div>
    </div>
  );
};

export default Index;
