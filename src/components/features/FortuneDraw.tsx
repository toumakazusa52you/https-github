import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, RotateCcw } from "lucide-react";

interface Fortune {
  level: string;
  levelColor: string;
  title: string;
  content: string;
  advice: string;
  luckyNumber: number;
  luckyColor: string;
  luckyDirection: string;
}

const fortunes: Fortune[] = [
  {
    level: "上上签",
    levelColor: "text-yellow-500",
    title: "鸿运当头",
    content: "紫气东来，万事亨通。贵人相助，心想事成。",
    advice: "宜积极进取，大胆行事，必有收获。",
    luckyNumber: 8,
    luckyColor: "金色",
    luckyDirection: "东方",
  },
  {
    level: "上签",
    levelColor: "text-spring-gold",
    title: "吉星高照",
    content: "春风得意，步步为营。稳中求进，前程可期。",
    advice: "宜脚踏实地，循序渐进。",
    luckyNumber: 6,
    luckyColor: "红色",
    luckyDirection: "南方",
  },
  {
    level: "上签",
    levelColor: "text-spring-gold",
    title: "福星高照",
    content: "贵人扶持，逢凶化吉。财运亨通，健康平安。",
    advice: "宜广结善缘，乐于助人。",
    luckyNumber: 9,
    luckyColor: "紫色",
    luckyDirection: "东南",
  },
  {
    level: "中上签",
    levelColor: "text-green-500",
    title: "渐入佳境",
    content: "柳暗花明，否极泰来。坚持努力，终见曙光。",
    advice: "宜保持耐心，等待时机。",
    luckyNumber: 3,
    luckyColor: "绿色",
    luckyDirection: "西方",
  },
  {
    level: "中签",
    levelColor: "text-blue-500",
    title: "平稳顺遂",
    content: "风平浪静，诸事平和。虽无大喜，亦无大忧。",
    advice: "宜安于现状，稳步前行。",
    luckyNumber: 5,
    luckyColor: "蓝色",
    luckyDirection: "北方",
  },
  {
    level: "中签",
    levelColor: "text-blue-500",
    title: "守得云开",
    content: "暂时沉寂，蓄势待发。韬光养晦，厚积薄发。",
    advice: "宜充实自我，提升能力。",
    luckyNumber: 7,
    luckyColor: "白色",
    luckyDirection: "西北",
  },
  {
    level: "中下签",
    levelColor: "text-orange-500",
    title: "小心谨慎",
    content: "山重水复，需多思量。小心行事，方保无虞。",
    advice: "宜三思后行，谨言慎行。",
    luckyNumber: 4,
    luckyColor: "黄色",
    luckyDirection: "西南",
  },
  {
    level: "下签",
    levelColor: "text-muted-foreground",
    title: "韬光养晦",
    content: "时运不济，需待时日。守成为上，勿冒进。",
    advice: "宜静待时机，修身养性。",
    luckyNumber: 2,
    luckyColor: "灰色",
    luckyDirection: "东北",
  },
];

const FortuneDraw = () => {
  const [currentFortune, setCurrentFortune] = useState<Fortune | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const drawFortune = () => {
    if (isDrawing) return;
    
    setIsDrawing(true);
    setIsShaking(true);
    setCurrentFortune(null);

    // 摇签动画
    setTimeout(() => {
      setIsShaking(false);
      // 随机抽取（稍微偏向好签）
      const weights = [15, 20, 20, 15, 12, 10, 5, 3]; // 权重
      const totalWeight = weights.reduce((a, b) => a + b, 0);
      let random = Math.random() * totalWeight;
      let selectedIndex = 0;
      
      for (let i = 0; i < weights.length; i++) {
        random -= weights[i];
        if (random <= 0) {
          selectedIndex = i;
          break;
        }
      }
      
      setCurrentFortune(fortunes[selectedIndex]);
      setIsDrawing(false);
    }, 1000);
  };

  const reset = () => {
    setCurrentFortune(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-serif">
            <Sparkles className="w-5 h-5 text-spring-gold" />
            新春签运
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 签筒 */}
          <div 
            ref={containerRef}
            className="relative flex justify-center py-8"
          >
            <div className={cn(
              "relative w-24 h-36 rounded-b-2xl rounded-t-sm",
              "bg-gradient-to-b from-amber-800 to-amber-900",
              "shadow-lg border-2 border-amber-700",
              "flex items-end justify-center pb-2",
              isShaking && "animate-shake"
            )}>
              {/* 签筒装饰 */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 rounded-t-lg bg-amber-700 border-2 border-amber-600" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-spring-gold/30" />
              
              {/* 签条 */}
              <div className="flex gap-0.5 mb-2">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-2 bg-gradient-to-t from-amber-100 to-amber-50 rounded-t-sm",
                      "shadow-sm"
                    )}
                    style={{
                      height: `${50 + Math.random() * 30}px`,
                      transform: `rotate(${(i - 3) * 2}deg)`,
                    }}
                  />
                ))}
              </div>
              
              {/* 福字 */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-spring-gold text-xl font-serif">
                福
              </div>
            </div>
          </div>

          {/* 抽签按钮 */}
          {!currentFortune ? (
            <Button
              className={cn(
                "w-full h-14 text-lg font-serif",
                "bg-gradient-to-r from-primary to-spring-red-light",
                "hover:opacity-90 transition-all",
                "shadow-lg shadow-primary/20"
              )}
              onClick={drawFortune}
              disabled={isDrawing}
            >
              <Sparkles className={cn("w-5 h-5 mr-2", isDrawing && "animate-spin")} />
              {isDrawing ? "摇签中..." : "摇一摇 · 求好签"}
            </Button>
          ) : (
            <div className="space-y-4 animate-scale-in">
              {/* 签文结果 */}
              <div className="relative bg-gradient-to-br from-spring-cream to-spring-gold/10 rounded-2xl p-6 border border-spring-gold/30 shadow-lg">
                {/* 装饰角 */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-spring-gold/40 rounded-tl" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-spring-gold/40 rounded-tr" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-spring-gold/40 rounded-bl" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-spring-gold/40 rounded-br" />

                <div className="text-center">
                  {/* 签等级 */}
                  <p className={cn("text-sm font-medium", currentFortune.levelColor)}>
                    第 {Math.floor(Math.random() * 99) + 1} 签 · {currentFortune.level}
                  </p>
                  
                  {/* 签名 */}
                  <h3 className="text-2xl font-serif font-bold text-foreground mt-2 mb-4">
                    {currentFortune.title}
                  </h3>
                  
                  {/* 签文 */}
                  <p className="text-base text-foreground/80 leading-relaxed font-serif">
                    {currentFortune.content}
                  </p>
                  
                  {/* 分割线 */}
                  <div className="flex items-center justify-center gap-3 my-4">
                    <span className="w-12 h-px bg-gradient-to-r from-transparent to-spring-gold/30" />
                    <span className="text-spring-gold/60 text-xs">解</span>
                    <span className="w-12 h-px bg-gradient-to-l from-transparent to-spring-gold/30" />
                  </div>
                  
                  {/* 解签 */}
                  <p className="text-sm text-muted-foreground">
                    {currentFortune.advice}
                  </p>
                </div>
              </div>

              {/* 幸运信息 */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">幸运数字</p>
                  <p className="text-lg font-bold text-spring-gold">{currentFortune.luckyNumber}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">幸运颜色</p>
                  <p className="text-lg font-bold text-spring-gold">{currentFortune.luckyColor}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">吉利方位</p>
                  <p className="text-lg font-bold text-spring-gold">{currentFortune.luckyDirection}</p>
                </div>
              </div>

              {/* 重新抽签 */}
              <Button
                variant="outline"
                className="w-full"
                onClick={reset}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                再求一签
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 温馨提示 */}
      <div className="text-center text-xs text-muted-foreground px-4">
        <p>心诚则灵，点击摇签按钮开始</p>
        <p className="mt-1 text-spring-gold/60">仅供娱乐，祝您新年好运</p>
      </div>
    </div>
  );
};

export { FortuneDraw };
