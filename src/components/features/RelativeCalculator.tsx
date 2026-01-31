import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RotateCcw, Users } from "lucide-react";

// 亲戚关系链数据
const relationships: Record<string, Record<string, string>> = {
  "我": {
    "爸爸": "爸爸",
    "妈妈": "妈妈",
    "哥哥": "哥哥",
    "弟弟": "弟弟",
    "姐姐": "姐姐",
    "妹妹": "妹妹",
    "儿子": "儿子",
    "女儿": "女儿",
    "老公": "老公",
    "老婆": "老婆",
  },
  "爸爸": {
    "爸爸": "爷爷",
    "妈妈": "奶奶",
    "哥哥": "伯伯",
    "弟弟": "叔叔",
    "姐姐": "姑姑",
    "妹妹": "姑姑",
    "老婆": "妈妈",
    "儿子": "兄弟",
    "女儿": "姐妹",
  },
  "妈妈": {
    "爸爸": "外公",
    "妈妈": "外婆",
    "哥哥": "舅舅",
    "弟弟": "舅舅",
    "姐姐": "姨妈",
    "妹妹": "姨妈",
    "老公": "爸爸",
    "儿子": "兄弟",
    "女儿": "姐妹",
  },
  "爷爷": {
    "爸爸": "太爷爷",
    "妈妈": "太奶奶",
    "老婆": "奶奶",
    "儿子": "伯伯/叔叔",
    "女儿": "姑姑",
  },
  "奶奶": {
    "老公": "爷爷",
    "儿子": "伯伯/叔叔",
    "女儿": "姑姑",
  },
  "外公": {
    "爸爸": "太外公",
    "妈妈": "太外婆",
    "老婆": "外婆",
    "儿子": "舅舅",
    "女儿": "姨妈",
  },
  "外婆": {
    "老公": "外公",
    "儿子": "舅舅",
    "女儿": "姨妈",
  },
  "伯伯": {
    "老婆": "伯母",
    "儿子": "堂哥/堂弟",
    "女儿": "堂姐/堂妹",
  },
  "叔叔": {
    "老婆": "婶婶",
    "儿子": "堂哥/堂弟",
    "女儿": "堂姐/堂妹",
  },
  "姑姑": {
    "老公": "姑父",
    "儿子": "表哥/表弟",
    "女儿": "表姐/表妹",
  },
  "舅舅": {
    "老婆": "舅妈",
    "儿子": "表哥/表弟",
    "女儿": "表姐/表妹",
  },
  "姨妈": {
    "老公": "姨父",
    "儿子": "表哥/表弟",
    "女儿": "表姐/表妹",
  },
  "哥哥": {
    "老婆": "嫂子",
    "儿子": "侄子",
    "女儿": "侄女",
  },
  "弟弟": {
    "老婆": "弟妹",
    "儿子": "侄子",
    "女儿": "侄女",
  },
  "姐姐": {
    "老公": "姐夫",
    "儿子": "外甥",
    "女儿": "外甥女",
  },
  "妹妹": {
    "老公": "妹夫",
    "儿子": "外甥",
    "女儿": "外甥女",
  },
  "儿子": {
    "老婆": "儿媳",
    "儿子": "孙子",
    "女儿": "孙女",
  },
  "女儿": {
    "老公": "女婿",
    "儿子": "外孙",
    "女儿": "外孙女",
  },
};

const relationButtons = [
  { label: "爸爸", icon: "👨" },
  { label: "妈妈", icon: "👩" },
  { label: "哥哥", icon: "👦" },
  { label: "弟弟", icon: "🧒" },
  { label: "姐姐", icon: "👧" },
  { label: "妹妹", icon: "👶" },
  { label: "老公", icon: "🤵" },
  { label: "老婆", icon: "👰" },
  { label: "儿子", icon: "👦" },
  { label: "女儿", icon: "👧" },
];

const RelativeCalculator = () => {
  const [chain, setChain] = useState<string[]>(["我"]);
  const [result, setResult] = useState<string>("");

  const addRelation = (relation: string) => {
    const newChain = [...chain, relation];
    setChain(newChain);
    calculateResult(newChain);
  };

  const calculateResult = (currentChain: string[]) => {
    if (currentChain.length <= 1) {
      setResult("");
      return;
    }

    let current = "我";
    for (let i = 1; i < currentChain.length; i++) {
      const relation = currentChain[i];
      if (relationships[current] && relationships[current][relation]) {
        current = relationships[current][relation];
      } else {
        // 尝试简化的逻辑
        current = `${current}的${relation}`;
      }
    }
    setResult(current);
  };

  const reset = () => {
    setChain(["我"]);
    setResult("");
  };

  const removeLast = () => {
    if (chain.length > 1) {
      const newChain = chain.slice(0, -1);
      setChain(newChain);
      calculateResult(newChain);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-serif">
            <Users className="w-5 h-5 text-spring-gold" />
            亲戚计算器
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 关系链显示 */}
          <div className="bg-muted/50 rounded-xl p-4 min-h-[60px]">
            <div className="flex flex-wrap items-center gap-2">
              {chain.map((item, index) => (
                <span key={index} className="flex items-center gap-1">
                  <span className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium",
                    index === 0 
                      ? "bg-spring-gold/20 text-spring-gold" 
                      : "bg-primary/10 text-primary"
                  )}>
                    {item}
                  </span>
                  {index < chain.length - 1 && (
                    <span className="text-muted-foreground text-xs">的</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* 结果显示 */}
          {result && (
            <div className="text-center py-4 animate-scale-in">
              <p className="text-sm text-muted-foreground mb-1">应该叫</p>
              <p className="text-3xl font-serif font-bold text-primary">
                {result}
              </p>
            </div>
          )}

          {/* 关系按钮 */}
          <div className="grid grid-cols-5 gap-2">
            {relationButtons.map((btn) => (
              <button
                key={btn.label}
                onClick={() => addRelation(btn.label)}
                className={cn(
                  "flex flex-col items-center gap-1 p-3 rounded-xl",
                  "bg-muted/30 hover:bg-spring-gold/10",
                  "border border-transparent hover:border-spring-gold/20",
                  "transition-all duration-200 active:scale-95"
                )}
              >
                <span className="text-lg">{btn.icon}</span>
                <span className="text-xs text-foreground">{btn.label}</span>
              </button>
            ))}
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={removeLast}
              disabled={chain.length <= 1}
            >
              撤销
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={reset}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              重来
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 使用提示 */}
      <div className="text-center text-xs text-muted-foreground px-4">
        <p>依次点击关系按钮，计算复杂的亲戚称呼</p>
        <p className="mt-1 text-spring-gold/60">例如：爸爸的姐姐的儿子 = 表哥</p>
      </div>
    </div>
  );
};

export { RelativeCalculator };
