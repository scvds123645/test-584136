import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Copy, Eraser, CheckCircle2, FileText, Minus, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";

const TextDeduplicator = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [originalCount, setOriginalCount] = useState(0);
  const [uniqueCount, setUniqueCount] = useState(0);
  const [removedCount, setRemovedCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const deduplicateText = useCallback(() => {
    if (!inputText.trim()) {
      setOutputText("");
      setOriginalCount(0);
      setUniqueCount(0);
      setRemovedCount(0);
      return;
    }

    const lines = inputText.split("\n");
    const original = lines.filter((line) => line.trim());
    const uniqueLines = [...new Set(original)];

    setOriginalCount(original.length);
    setUniqueCount(uniqueLines.length);
    setRemovedCount(original.length - uniqueLines.length);
    setOutputText(uniqueLines.join("\n"));
  }, [inputText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      deduplicateText();
    }, 300);
    return () => clearTimeout(timer);
  }, [deduplicateText]);

  const handleCopy = async () => {
    if (!outputText) {
      toast({ title: "没有内容可复制", variant: "destructive" });
      return;
    }
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      toast({ title: "已复制到剪贴板" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "复制失败", variant: "destructive" });
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setOriginalCount(0);
    setUniqueCount(0);
    setRemovedCount(0);
  };

  const stats = [
    {
      label: "原始行数",
      value: originalCount,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "去重后",
      value: uniqueCount,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "已删除",
      value: removedCount,
      icon: Minus,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <PageLayout
      title="文本去重工具"
      description="输入多行文本，自动去除重复行"
      backTo="/tools"
      backLabel="返回工具列表"
    >
      <div className="max-w-6xl mx-auto space-y-8 p-2">
        {/* --- 统计信息卡片 (Material 3 Elevated Cards) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="group p-6 rounded-3xl border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white flex flex-col justify-between"
            >
              <div className="flex items-center gap-5">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bgColor} transition-transform group-hover:scale-110`}
                >
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 tracking-wide">
                    {stat.label}
                  </p>
                  <p className={`text-3xl font-bold ${stat.color} mt-1`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* --- 输入区域 --- */}
          <div className="space-y-4">
            <Label
              htmlFor="input"
              className="text-lg font-medium text-gray-800 pl-1"
            >
              输入文本
            </Label>
            <div className="relative group">
              <Textarea
                id="input"
                placeholder="在此粘贴文本内容，每行一条数据..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[400px] w-full font-mono text-sm bg-gray-50 border-none rounded-3xl p-6 shadow-inner focus:ring-2 focus:ring-blue-600/50 focus:bg-white transition-all duration-300 resize-none"
              />
              {/* Decorative corner hint */}
              <div className="absolute bottom-4 right-6 pointer-events-none opacity-50">
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* --- 输出区域 --- */}
          <div className="space-y-4 flex flex-col">
            <div className="flex items-center justify-between pl-1">
              <Label className="text-lg font-medium text-gray-800">
                去重结果
              </Label>
              {removedCount > 0 && (
                <span className="animate-in fade-in zoom-in text-xs font-medium text-orange-700 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200">
                  已去除 {removedCount} 行
                </span>
              )}
            </div>

            <Card className="flex-grow border-none shadow-sm bg-white rounded-3xl overflow-hidden flex flex-col h-[400px]">
              <ScrollArea className="flex-grow h-full w-full bg-white p-2">
                <div className="p-6">
                  {outputText ? (
                    <pre className="font-mono text-sm whitespace-pre-wrap break-all text-gray-700 leading-relaxed">
                      {outputText}
                    </pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[300px] text-gray-300 gap-3">
                      <Sparkles className="w-12 h-12 opacity-20" />
                      <p className="text-sm font-medium">
                        结果将显示在这里...
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </Card>

            {/* --- 按钮区域 (Material 3 Pills) --- */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {/* Primary Action: Google Blue, Filled, Fully Rounded */}
              <Button
                onClick={handleCopy}
                className="flex-1 h-14 text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 rounded-full text-base font-medium transition-all duration-300 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:translate-y-0"
                disabled={!outputText}
              >
                {copied ? (
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                ) : (
                  <Copy className="mr-2 h-5 w-5" />
                )}
                {copied ? "已复制" : "复制结果"}
              </Button>

              {/* Secondary Action: Tonal/Outline, Fully Rounded */}
              <Button
                onClick={handleClear}
                variant="ghost"
                className="flex-1 h-14 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-full text-base font-medium border border-transparent hover:border-blue-200 transition-all duration-300"
              >
                <Eraser className="mr-2 h-5 w-5" />
                清空内容
              </Button>
            </div>
          </div>
        </div>

        {/* --- 使用说明 (Surface Variant Card) --- */}
        <Card className="mt-8 p-6 border-none bg-gray-50 rounded-3xl text-gray-600">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-900">
                使用说明
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  每行一条数据，自动去除重复
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  空行自动过滤
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  保持原始顺序
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  实时处理
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default TextDeduplicator;
