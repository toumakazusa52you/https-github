import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageSquareText, Shuffle, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface GreetingTemplate {
  category: string;
  icon: string;
  greetings: string[];
}

const greetingTemplates: GreetingTemplate[] = [
  {
    category: "长辈",
    icon: "🧓",
    greetings: [
      "祝您新的一年身体健康，福如东海，寿比南山！",
      "愿您在新的一年里笑口常开，健康长寿，儿孙满堂！",
      "祝您新春快乐，万事顺意，阖家幸福安康！",
      "恭祝您新年吉祥，福寿双全，每天都有好心情！",
      "愿您新的一年平安喜乐，身体棒棒，天天开心！",
      "祝您蛇年大吉，福气满满，身体康健！",
    ],
  },
  {
    category: "平辈",
    icon: "🧑‍🤝‍🧑",
    greetings: [
      "新年快乐！祝你事业有成，爱情甜蜜，钱包鼓鼓！",
      "祝你新的一年升职加薪，心想事成，越来越帅/美！",
      "愿你新年好运连连，财源滚滚，早日脱单/恩爱如初！",
      "祝你蛇年大吉，工作顺利，生活美满，天天开心！",
      "新年快乐！愿你所求皆所得，所行皆坦途！",
      "祝你新的一年既有前程可奔赴，也有岁月可回首！",
    ],
  },
  {
    category: "晚辈",
    icon: "👶",
    greetings: [
      "祝你新年快乐，学业进步，健康成长！",
      "愿你在新的一年里快乐学习，天天向上！",
      "祝小朋友新年快乐，聪明伶俐，健康可爱！",
      "愿你新年心想事成，考试顺利，玩得开心！",
      "祝你蛇年大吉，学业有成，前途无量！",
      "新年快乐！愿你成为最闪亮的小星星！",
    ],
  },
  {
    category: "领导",
    icon: "💼",
    greetings: [
      "祝领导新年快乐，事业蒸蒸日上，阖家幸福！",
      "恭祝领导新春大吉，鸿运当头，万事如意！",
      "感谢您一年来的指导与栽培，祝您新年快乐！",
      "祝领导蛇年大展宏图，心想事成，身体健康！",
      "愿领导新的一年工作顺利，家庭美满，前程似锦！",
      "恭祝领导新年吉祥，步步高升，财源广进！",
    ],
  },
  {
    category: "客户",
    icon: "🤝",
    greetings: [
      "感谢您一年来的信任与支持，祝您新年快乐，生意兴隆！",
      "祝您新春愉快，财源广进，合作愉快！",
      "恭祝新年大吉，愿我们的合作更上一层楼！",
      "祝您蛇年行大运，事业腾飞，阖家欢乐！",
      "新年快乐！愿新的一年我们继续携手共创辉煌！",
      "感谢您的支持，祝您新年万事如意，财运亨通！",
    ],
  },
  {
    category: "朋友",
    icon: "🎉",
    greetings: [
      "新年快乐老铁！祝你暴富，暴瘦，暴美！",
      "祝你新年发大财，早日实现财务自由！",
      "新的一年，愿你有钱有闲有对象，没烦恼没压力没黑眼圈！",
      "祝你蛇年大吉，愿你所有愿望都能实现，除了愿望本身！",
      "新年快乐！愿你新的一年除了脸什么都不要圆！",
      "祝你新年快乐，愿我们的友谊地久天长！",
    ],
  },
];

const GreetingGenerator = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("长辈");
  const [currentGreeting, setCurrentGreeting] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateGreeting = () => {
    setIsGenerating(true);
    const template = greetingTemplates.find(t => t.category === selectedCategory);
    if (template) {
      const randomIndex = Math.floor(Math.random() * template.greetings.length);
      setTimeout(() => {
        setCurrentGreeting(template.greetings[randomIndex]);
        setIsGenerating(false);
      }, 300);
    }
  };

  const copyToClipboard = async () => {
    if (currentGreeting) {
      await navigator.clipboard.writeText(currentGreeting);
      setCopied(true);
      toast.success("已复制到剪贴板");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-serif">
            <MessageSquareText className="w-5 h-5 text-spring-gold" />
            拜年话术生成
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 对象选择 */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">选择拜年对象</p>
            <div className="grid grid-cols-3 gap-2">
              {greetingTemplates.map((template) => (
                <button
                  key={template.category}
                  onClick={() => {
                    setSelectedCategory(template.category);
                    setCurrentGreeting("");
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-xl",
                    "transition-all duration-200",
                    selectedCategory === template.category
                      ? "bg-primary/10 border-2 border-primary/30"
                      : "bg-muted/30 border-2 border-transparent hover:bg-spring-gold/10"
                  )}
                >
                  <span className="text-xl">{template.icon}</span>
                  <span className="text-xs font-medium">{template.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 生成按钮 */}
          <Button
            className={cn(
              "w-full h-12 text-base font-medium",
              "bg-gradient-to-r from-primary to-spring-red-light",
              "hover:opacity-90 transition-opacity"
            )}
            onClick={generateGreeting}
            disabled={isGenerating}
          >
            <Shuffle className={cn("w-5 h-5 mr-2", isGenerating && "animate-spin")} />
            {isGenerating ? "生成中..." : "生成祝福语"}
          </Button>

          {/* 结果展示 */}
          {currentGreeting && (
            <div className="animate-scale-in">
              <div className="relative bg-gradient-to-br from-spring-gold/5 to-primary/5 rounded-2xl p-6 border border-spring-gold/20">
                {/* 装饰性引号 */}
                <span className="absolute top-3 left-4 text-4xl text-spring-gold/20 font-serif">"</span>
                <span className="absolute bottom-3 right-4 text-4xl text-spring-gold/20 font-serif">"</span>
                
                <p className="text-base leading-relaxed text-foreground px-4 py-2">
                  {currentGreeting}
                </p>
              </div>
              
              {/* 复制按钮 */}
              <Button
                variant="outline"
                className="w-full mt-3"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    复制祝福语
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 使用提示 */}
      <div className="text-center text-xs text-muted-foreground px-4">
        <p>选择对象后点击生成，获取得体的新春祝福</p>
        <p className="mt-1 text-spring-gold/60">多次点击可获取不同祝福语</p>
      </div>
    </div>
  );
};

export { GreetingGenerator };
