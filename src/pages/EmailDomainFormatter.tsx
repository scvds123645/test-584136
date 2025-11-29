import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Copy, Eraser, CheckCircle2, AtSign, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";

const EmailDomainFormatter = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [addAtSymbol, setAddAtSymbol] = useState(true);
  const [addQuotes, setAddQuotes] = useState(false);
  const [domainCount, setDomainCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const formatDomains = useCallback(() => {
    if (!inputText.trim()) {
      setOutputText("");
      setDomainCount(0);
      return;
    }

    const domains = inputText
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter((item) => item);

    const formatted = domains.map((domain) => {
      let result = domain;
      if (addAtSymbol && !domain.startsWith("@")) {
        result = `@${result}`;
      }
      if (addQuotes) {
        result = `"${result}"`;
      }
      return result;
    });

    setDomainCount(domains.length);
    setOutputText(formatted.join(", "));
  }, [inputText, addAtSymbol, addQuotes]);

  useEffect(() => {
    const timer = setTimeout(() => {
      formatDomains();
    }, 300);
    return () => clearTimeout(timer);
  }, [formatDomains]);

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
    setDomainCount(0);
  };

  return (
    <PageLayout
      title="域名转邮箱后缀工具"
      description="输入域名列表，自动转换为邮箱后缀格式"
      backTo="/tools"
      backLabel="返回工具列表"
      // Assuming PageLayout accepts a className for the main container background
      className="bg-slate-50 min-h-screen" 
    >
      {/* 
        Material 3 Style Notes:
        - Cards: rounded-3xl, bg-white, shadow-sm/md, no borders.
        - Buttons: rounded-full.
        - Inputs: Filled style with rounded-2xl/3xl corners (floating effect).
        - Colors: Slate (surface), Blue-600 (Primary).
      */}

      {/* Statistics Card - Material Elevated Card */}
      <Card className="p-6 bg-white border-none shadow-sm rounded-3xl mb-8 transition-shadow hover:shadow-md">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
            <AtSign className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">处理域名数量</p>
            <p className="text-4xl font-normal text-slate-900 tracking-tight">{domainCount}</p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <Card className="p-6 bg-white border-none shadow-sm rounded-3xl h-full flex flex-col">
            <Label htmlFor="input" className="text-lg font-normal text-slate-800 mb-4 ml-1 block">
              输入域名列表
            </Label>
            
            {/* Styled to mimic a floating Material Input Surface */}
            <div className="relative flex-grow group">
              <Textarea
                id="input"
                placeholder="输入域名，支持逗号或换行分隔&#10;例如：&#10;gmail.com&#10;outlook.com, yahoo.com"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-full min-h-[320px] p-6 text-base font-normal leading-relaxed bg-slate-100/80 border-0 rounded-3xl resize-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:bg-blue-50/50 transition-all placeholder:text-slate-400"
              />
            </div>
          </Card>
        </div>

        {/* Controls & Output Section */}
        <div className="space-y-6">
          {/* Format Options Card */}
          <Card className="p-6 bg-white border-none shadow-sm rounded-3xl">
            <Label className="text-lg font-normal text-slate-800 mb-4 ml-1 block">格式选项</Label>
            <div className="space-y-2">
              {[
                { id: "at-symbol", label: "添加 @ 前缀", checked: addAtSymbol, onChange: setAddAtSymbol },
                { id: "quotes", label: '添加引号包裹 ""', checked: addQuotes, onChange: setAddQuotes },
              ].map((option) => (
                <div 
                  key={option.id} 
                  className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer group"
                  onClick={() => option.onChange(!option.checked)}
                >
                  <Checkbox
                    id={option.id}
                    checked={option.checked}
                    onCheckedChange={(checked) => option.onChange(checked === true)}
                    className="w-5 h-5 border-2 border-slate-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 rounded-md transition-all"
                  />
                  <Label htmlFor={option.id} className="text-base font-medium text-slate-700 cursor-pointer flex-grow group-hover:text-slate-900">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>

            {/* Preview Pill */}
            <div className="mt-6 px-6 py-4 rounded-2xl bg-blue-50/50 border border-blue-100/50">
              <p className="text-xs font-medium text-blue-400 uppercase tracking-wider mb-2">预览示例</p>
              <p className="text-sm font-mono text-blue-700 truncate">
                {addQuotes && '"'}{addAtSymbol && '@'}example.com{addQuotes && '"'}, {addQuotes && '"'}{addAtSymbol && '@'}domain.com{addQuotes && '"'}
              </p>
            </div>
          </Card>

          {/* Output Section Card */}
          <Card className="p-6 bg-white border-none shadow-sm rounded-3xl">
            <div className="flex items-center justify-between mb-4 ml-1">
              <Label className="text-lg font-normal text-slate-800">格式化结果</Label>
              {domainCount > 0 && (
                <span className="text-xs font-medium text-blue-600 px-3 py-1 rounded-full bg-blue-100">
                  {domainCount} results
                </span>
              )}
            </div>

            <ScrollArea className="h-[200px] w-full rounded-2xl bg-slate-50 border border-slate-100">
              <div className="p-6">
                {outputText ? (
                  <pre className="font-mono text-sm text-slate-700 whitespace-pre-wrap break-all leading-relaxed">
                    {outputText}
                  </pre>
                ) : (
                  <p className="text-slate-400 text-sm italic">等待输入...</p>
                )}
              </div>
            </ScrollArea>

            {/* Action Buttons - Material 3 Style */}
            <div className="flex gap-4 mt-6">
              <Button 
                onClick={handleCopy} 
                disabled={!outputText}
                className="flex-1 h-14 rounded-full bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 transition-all text-base font-medium tracking-wide shadow-md disabled:opacity-50 disabled:shadow-none"
              >
                {copied ? <CheckCircle2 className="mr-2 h-5 w-5" /> : <Copy className="mr-2 h-5 w-5" />}
                {copied ? "已复制" : "复制结果"}
              </Button>
              
              <Button 
                onClick={handleClear} 
                variant="outline" 
                className="flex-1 h-14 rounded-full border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 transition-all text-base font-medium"
              >
                <Eraser className="mr-2 h-5 w-5" />
                清空
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Usage Tips - Material Secondary Container Style */}
      <Card className="mt-8 p-6 bg-blue-50/50 border-none rounded-3xl shadow-sm">
        <div className="flex items-start gap-5">
          <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-blue-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 mb-3">使用说明</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-blue-400"></span>支持按行或逗号分隔输入域名</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-blue-400"></span>可选择添加 @ 前缀，将域名转换为邮箱后缀格式</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-blue-400"></span>可选择添加引号包裹，适用于各种配置文件</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-blue-400"></span>输出结果以逗号+空格分隔</li>
            </ul>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
};

export default EmailDomainFormatter;
