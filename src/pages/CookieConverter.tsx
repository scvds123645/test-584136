import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Copy, Eraser, AlertCircle, CheckCircle2, KeyRound, Cookie } from "lucide-react"; // Added Icons for better UI
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PageLayout from "@/components/PageLayout";

type FormatType = "format1" | "format2";

const CookieConverter = () => {
  const [inputCookies, setInputCookies] = useState("");
  const [password, setPassword] = useState("");
  const [formatType, setFormatType] = useState<FormatType>("format1");
  const [outputText, setOutputText] = useState("");
  const [resultCount, setResultCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [showError, setShowError] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const extractCUser = (cookieString: string): string | null => {
    const match = cookieString.match(/c_user=([^;]+)/);
    return match ? match[1] : null;
  };

  const convertCookies = useCallback(() => {
    if (!inputCookies.trim() || !password.trim()) {
      setShowError(true);
      setOutputText("");
      setResultCount(0);
      setErrorCount(0);
      return;
    }

    setShowError(false);
    const lines = inputCookies.split("\n").filter((line) => line.trim());
    const results: string[] = [];
    let errors = 0;

    lines.forEach((line) => {
      const cUser = extractCUser(line);
      if (!cUser) {
        results.push(`[错误] 未找到 c_user: ${line.substring(0, 50)}...`);
        errors++;
      } else {
        if (formatType === "format1") {
          results.push(`${cUser}--${password}--${line}`);
        } else {
          results.push(`${cUser}---${password}`);
        }
      }
    });

    setOutputText(results.join("\n"));
    setResultCount(results.length - errors);
    setErrorCount(errors);
  }, [inputCookies, password, formatType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputCookies && password) {
        convertCookies();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [convertCookies, inputCookies, password]);

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
    setInputCookies("");
    setPassword("");
    setOutputText("");
    setResultCount(0);
    setErrorCount(0);
    setShowError(false);
  };

  return (
    <PageLayout
      title="Cookie 格式转换工具"
      description="输入Cookie字符串和密码，选择输出格式进行转换"
      backTo="/tools"
      backLabel="返回工具列表"
    >
      {/* Material Design Container */}
      <div className="max-w-6xl mx-auto font-sans text-slate-800">
        
        {showError && (
          <Alert variant="destructive" className="mb-6 rounded-2xl border-none bg-red-50 text-red-900">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <AlertDescription className="ml-2 font-medium">请输入 Cookie 和密码后再进行转换</AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* MD3 Elevated Card */}
            <Card className="p-6 rounded-3xl border-transparent shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-4 text-blue-600">
                <Cookie className="h-5 w-5" />
                <Label htmlFor="cookies" className="text-lg font-medium text-slate-700">
                  输入 Cookie 字符串
                </Label>
              </div>
              
              {/* Styled Textarea */}
              <Textarea
                id="cookies"
                placeholder="粘贴cookie字符串，支持多行输入..."
                value={inputCookies}
                onChange={(e) => setInputCookies(e.target.value)}
                className="min-h-[250px] rounded-2xl border-slate-200 bg-slate-50 p-4 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none shadow-inner"
              />
            </Card>

            <Card className="p-6 rounded-3xl border-transparent shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-4 text-blue-600">
                <KeyRound className="h-5 w-5" />
                <Label htmlFor="password" className="text-lg font-medium text-slate-700">
                  密码
                </Label>
              </div>

              {/* Search-bar style Input (Pill shape) */}
              <Input
                id="password"
                type="text"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-full border-slate-200 bg-slate-50 px-6 font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
              />
            </Card>

            <Card className="p-6 rounded-3xl border-transparent shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
              <Label className="text-lg font-medium text-slate-700 mb-4 block">输出格式</Label>
              <RadioGroup 
                value={formatType} 
                onValueChange={(value) => setFormatType(value as FormatType)}
                className="gap-3"
              >
                {[
                  { value: "format1", label: "格式1：c_user值--密码--原cookie" },
                  { value: "format2", label: "格式2：c_user值---密码" },
                ].map((format) => (
                  <div 
                    key={format.value} 
                    className={`flex items-center space-x-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      formatType === format.value 
                        ? "bg-blue-50 border-blue-200" 
                        : "bg-white border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    <RadioGroupItem value={format.value} id={format.value} className="text-blue-600" />
                    <Label htmlFor={format.value} className="text-sm cursor-pointer text-slate-700 font-medium">
                      {format.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </Card>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <Card className="p-6 h-full flex flex-col rounded-3xl border-transparent shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-medium text-slate-700">转换结果</Label>
                <div className="flex gap-2 text-sm font-medium">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {resultCount} 成功
                  </span>
                  {errorCount > 0 && (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                      {errorCount} 错误
                    </span>
                  )}
                </div>
              </div>

              <ScrollArea className="flex-1 w-full rounded-2xl border border-slate-100 bg-slate-50 min-h-[350px]">
                <div className="p-6">
                  {outputText ? (
                    <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                      {outputText.split("\n").map((line, index) => (
                        <div
                          key={index}
                          className={`py-1 ${
                            line.startsWith("[错误]") 
                              ? "text-red-600 bg-red-50/50 px-2 rounded" 
                              : "text-slate-600"
                          }`}
                        >
                          {line}
                        </div>
                      ))}
                    </pre>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2 py-20">
                      <Cookie className="h-10 w-10 opacity-20" />
                      <p className="text-sm">
                        {showError ? "等待输入..." : "转换结果将显示在这里"}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="flex gap-4 mt-6">
                {/* Primary Action - Google Blue, Pill Shape */}
                <Button
                  onClick={handleCopy}
                  className="flex-1 py-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                  disabled={!outputText || showError}
                >
                  {copied ? <CheckCircle2 className="mr-2 h-5 w-5" /> : <Copy className="mr-2 h-5 w-5" />}
                  {copied ? "已复制" : "复制结果"}
                </Button>

                {/* Secondary Action - Outlined/Tonal, Pill Shape */}
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="flex-1 py-6 rounded-full border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 transition-all"
                >
                  <Eraser className="mr-2 h-5 w-5" />
                  清空
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CookieConverter;
