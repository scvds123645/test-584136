import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Copy, Eraser, CheckCircle2, Settings2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";

const CookieFilter = () => {
  const [inputText, setInputText] = useState("");
  const [selectedFields, setSelectedFields] = useState({
    c_user: true,
    xs: true,
  });
  const [outputText, setOutputText] = useState("");
  const [resultCount, setResultCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const processCookies = useCallback(() => {
    if (!inputText.trim()) {
      setOutputText("");
      setResultCount(0);
      return;
    }

    const lines = inputText.split("\n").filter((line) => line.trim());
    const results: string[] = [];

    lines.forEach((line) => {
      const cookies = line.split(";").map((c) => c.trim());
      const filteredPairs: string[] = [];

      cookies.forEach((cookie) => {
        const [key, value] = cookie.split("=").map((s) => s.trim());
        if (key && value) {
          if (selectedFields.c_user && key === "c_user") {
            filteredPairs.push(`${key}=${value}`);
          }
          if (selectedFields.xs && key === "xs") {
            filteredPairs.push(`${key}=${value}`);
          }
        }
      });

      if (filteredPairs.length > 0) {
        results.push(filteredPairs.join("; "));
      }
    });

    setOutputText(results.join("\n"));
    setResultCount(results.length);
  }, [inputText, selectedFields]);

  useEffect(() => {
    const timer = setTimeout(() => {
      processCookies();
    }, 300);
    return () => clearTimeout(timer);
  }, [processCookies]);

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
    setResultCount(0);
  };

  return (
    <PageLayout
      title="Cookie 筛选工具"
      description="输入cookie字符串，选择要筛选的字段"
      backTo="/tools"
      backLabel="返回工具列表"
    >
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        
        {/* Input Section */}
        <div className="space-y-6">
          <Card className="p-6 rounded-3xl bg-white shadow-md border-transparent hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-blue-600" />
                <Label htmlFor="input" className="text-lg font-medium text-slate-800">
                输入 Cookie
                </Label>
            </div>
            
            <div className="relative group">
                <Textarea
                id="input"
                placeholder="粘贴cookie字符串，支持多行输入..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[350px] w-full rounded-2xl bg-slate-50 border-transparent p-4 font-mono text-sm text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none shadow-inner"
                />
            </div>
          </Card>

          <Card className="p-6 rounded-3xl bg-white shadow-md border-transparent hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-4">
                <Settings2 className="w-5 h-5 text-blue-600" />
                <Label className="text-lg font-medium text-slate-800">筛选字段</Label>
            </div>
            
            <div className="flex flex-col gap-2">
              {[
                { id: "c_user", label: "c_user" },
                { id: "xs", label: "xs" },
              ].map((field) => (
                <div
                  key={field.id}
                  className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
                  onClick={() =>
                      setSelectedFields((prev) => ({
                        ...prev,
                        [field.id]: !prev[field.id as keyof typeof selectedFields],
                      }))
                    }
                >
                  <Label htmlFor={field.id} className="text-base text-slate-700 font-mono cursor-pointer">
                    {field.label}
                  </Label>
                  <Checkbox
                    id={field.id}
                    checked={selectedFields[field.id as keyof typeof selectedFields]}
                    onCheckedChange={() => {}} 
                    className="w-5 h-5 rounded-md border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 transition-all"
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <Card className="p-6 rounded-3xl bg-white shadow-md border-transparent hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-lg font-medium text-slate-800">筛选结果</Label>
              <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">
                {resultCount} 条结果
              </span>
            </div>
            
            {/* Modified container: bg-slate-50 instead of bg-slate-900, transparent border */}
            <div className="flex-grow relative rounded-2xl bg-slate-50 overflow-hidden border border-transparent shadow-inner">
                <ScrollArea className="h-[450px] w-full">
                <div className="p-6">
                    {outputText ? (
                    /* Modified text color: text-slate-700 instead of text-slate-300 */
                    <pre className="font-mono text-sm whitespace-pre-wrap break-all text-slate-700 leading-relaxed">
                        {outputText}
                    </pre>
                    ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 mt-20">
                        {/* Modified icon background: bg-slate-200 instead of bg-slate-800/50 */}
                        <div className="p-4 rounded-full bg-slate-200 mb-3">
                            <FileText className="w-8 h-8 opacity-50" />
                        </div>
                        <p>结果将显示在这里...</p>
                    </div>
                    )}
                </div>
                </ScrollArea>
            </div>

            <div className="flex gap-4 mt-6">
                <Button
                    onClick={handleCopy}
                    disabled={!outputText}
                    className={`flex-1 py-6 rounded-full text-base font-medium shadow-sm transition-all duration-300 ${
                        copied 
                        ? "bg-green-600 hover:bg-green-700 text-white" 
                        : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-200"
                    }`}
                >
                    {copied ? (
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                    ) : (
                        <Copy className="mr-2 h-5 w-5" />
                    )}
                    {copied ? "已复制" : "复制结果"}
                </Button>
                <Button
                    onClick={handleClear}
                    variant="outline"
                    className="flex-1 py-6 rounded-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
                >
                    <Eraser className="mr-2 h-5 w-5" />
                    清空
                </Button>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default CookieFilter;
