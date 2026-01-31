import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Wallet, Plus, ArrowDownCircle, ArrowUpCircle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface RedEnvelopeRecord {
  id: string;
  type: "income" | "expense";
  amount: number;
  person: string;
  note: string;
  date: string;
}

const STORAGE_KEY = "spring-red-envelope-records";

const RedEnvelopeLedger = () => {
  const [records, setRecords] = useState<RedEnvelopeRecord[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [recordType, setRecordType] = useState<"income" | "expense">("income");
  const [formData, setFormData] = useState({
    amount: "",
    person: "",
    note: "",
  });

  // 从localStorage加载数据
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse records", e);
      }
    }
  }, []);

  // 保存到localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const totalIncome = records
    .filter((r) => r.type === "income")
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpense = records
    .filter((r) => r.type === "expense")
    .reduce((sum, r) => sum + r.amount, 0);

  const balance = totalIncome - totalExpense;

  const addRecord = () => {
    if (!formData.amount || !formData.person) {
      toast.error("请填写金额和人物");
      return;
    }

    const newRecord: RedEnvelopeRecord = {
      id: Date.now().toString(),
      type: recordType,
      amount: parseFloat(formData.amount),
      person: formData.person,
      note: formData.note,
      date: new Date().toLocaleDateString("zh-CN"),
    };

    setRecords([newRecord, ...records]);
    setFormData({ amount: "", person: "", note: "" });
    setIsDialogOpen(false);
    toast.success(recordType === "income" ? "收入已记录" : "支出已记录");
  };

  const deleteRecord = (id: string) => {
    setRecords(records.filter((r) => r.id !== id));
    toast.success("记录已删除");
  };

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-spring-gold/5 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-serif">
            <Wallet className="w-5 h-5 text-spring-gold" />
            红包账本
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* 余额 */}
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-1">今年结余</p>
            <p className={cn(
              "text-4xl font-bold font-serif",
              balance >= 0 ? "text-spring-gold" : "text-primary"
            )}>
              ¥{balance.toFixed(2)}
            </p>
          </div>

          {/* 收支统计 */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-green-500/10 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                <ArrowDownCircle className="w-4 h-4" />
                <span className="text-xs">收入</span>
              </div>
              <p className="text-lg font-semibold text-green-600">
                ¥{totalIncome.toFixed(2)}
              </p>
            </div>
            <div className="bg-primary/10 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-primary mb-1">
                <ArrowUpCircle className="w-4 h-4" />
                <span className="text-xs">支出</span>
              </div>
              <p className="text-lg font-semibold text-primary">
                ¥{totalExpense.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 添加记录按钮 */}
      <div className="grid grid-cols-2 gap-3">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="h-14 border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50"
              onClick={() => setRecordType("income")}
            >
              <ArrowDownCircle className="w-5 h-5 mr-2 text-green-600" />
              <span className="text-green-600 font-medium">记收入</span>
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="h-14 border-primary/30 hover:bg-primary/10 hover:border-primary/50"
              onClick={() => setRecordType("expense")}
            >
              <ArrowUpCircle className="w-5 h-5 mr-2 text-primary" />
              <span className="text-primary font-medium">记支出</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-serif">
                {recordType === "income" ? (
                  <>
                    <ArrowDownCircle className="w-5 h-5 text-green-600" />
                    记录收入
                  </>
                ) : (
                  <>
                    <ArrowUpCircle className="w-5 h-5 text-primary" />
                    记录支出
                  </>
                )}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="amount">金额（元）</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="请输入金额"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="person">
                  {recordType === "income" ? "谁给的" : "给谁的"}
                </Label>
                <Input
                  id="person"
                  placeholder={recordType === "income" ? "如：姥姥" : "如：侄子"}
                  value={formData.person}
                  onChange={(e) =>
                    setFormData({ ...formData, person: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="note">备注（选填）</Label>
                <Input
                  id="note"
                  placeholder="如：压岁钱"
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <Button
                className={cn(
                  "w-full",
                  recordType === "income"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-primary hover:bg-primary/90"
                )}
                onClick={addRecord}
              >
                <Plus className="w-4 h-4 mr-2" />
                添加记录
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 记录列表 */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            最近记录
          </CardTitle>
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <div className="text-4xl mb-2">🧧</div>
              <p className="text-sm">暂无记录</p>
              <p className="text-xs mt-1">点击上方按钮添加红包记录</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {records.map((record) => (
                <div
                  key={record.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl",
                    "bg-muted/30 hover:bg-muted/50 transition-colors",
                    "animate-drop"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        record.type === "income"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      {record.type === "income" ? (
                        <ArrowDownCircle className="w-5 h-5" />
                      ) : (
                        <ArrowUpCircle className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {record.type === "income" ? "收到" : "发给"}{" "}
                        {record.person}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {record.date} {record.note && `· ${record.note}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "font-semibold",
                        record.type === "income"
                          ? "text-green-600"
                          : "text-primary"
                      )}
                    >
                      {record.type === "income" ? "+" : "-"}¥{record.amount}
                    </span>
                    <button
                      onClick={() => deleteRecord(record.id)}
                      className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export { RedEnvelopeLedger };
