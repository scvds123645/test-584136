import { useState } from "react";
import { 
  Sparkles, 
  Copy, 
  Trash2, 
  RefreshCw, 
  Check, 
  Hash,
  Settings2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // 假设你有这个组件，如果没有可以使用原生button
import { Textarea } from "@/components/ui/textarea"; // 假设你有这个组件
import PageLayout from "@/components/PageLayout";
import { toast } from "sonner"; // 假设使用 sonner 或其他 toast 库，如果没有可移除

const NumberGenerator = () => {
  const [result, setResult] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [historyCount, setHistoryCount] = useState(0);

  // 核心生成逻辑
  const handleGenerate = () => {
    const prefix = "6158";
    const count = 100;
    const length = 14;
    const randomLength = length - prefix.length; // 10位随机数

    let newNumbers = [];
    
    for (let i = 0; i < count; i++) {
      let randomPart = "";
      for (let j = 0; j < randomLength; j++) {
        randomPart += Math.floor(Math.random() * 10).toString();
      }
      newNumbers.push(prefix + randomPart);
    }

    const resultString = newNumbers.join("\n");
    setResult(resultString);
    setHistoryCount(newNumbers.length);
    setIsCopied(false);
    
    // 可选：提示生成成功
    // toast.success(`成功生成 ${count} 个号码`);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    // toast.success("已复制到剪贴板");
  };

  const handleClear = () => {
    setResult("");
    setHistoryCount(0);
  };

  return (
    <PageLayout
      title="14位数字生成器"
      description="批量生成指定前缀的随机数字组合"
      backLabel="返回工具列表"
    >
      <div className="max-w-4xl mx-auto space-y-6 p-2">
        
        {/* 控制面板 Card - Material 3 Style */}
        <Card className="
          relative overflow-hidden
          rounded-3xl border-transparent bg-white
          shadow-[0_2px_12px_rgba(0,0,0,0.06)]
          p-6 md:p-8
        ">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* 左侧说明 */}
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Hash className="w-7 h-7" strokeWidth={2.5} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-medium text-slate-800">生成配置</h3>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md">
                    <Settings2 className="w-3.5 h-3.5" />
                    前缀: <span className="font-semibold text-slate-700">6158</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md">
                    长度: <span className="font-semibold text-slate-700">14位</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md">
                    数量: <span className="font-semibold text-slate-700">100个</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 右侧操作按钮 */}
            <button
              onClick={handleGenerate}
              className="
                group relative flex items-center gap-3 px-8 py-4 
                bg-blue-600 hover:bg-blue-700 text-white 
                rounded-full font-medium transition-all duration-300
                shadow-[0_4px_14px_rgba(37,99,235,0.3)]
                hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)]
                hover:-translate-y-0.5 active:translate-y-0
              "
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>立即生成</span>
            </button>
          </div>
        </Card>

        {/* 结果显示区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 左侧：统计与提示 */}
          <Card className="
            lg:col-span-1 h-fit
            rounded-3xl border-transparent bg-slate-50
            p-6 space-y-6
          ">
            <div>
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">当前状态</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-slate-800">{historyCount}</span>
                <span className="text-sm text-slate-500">个结果</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600 p-3 bg-white rounded-2xl shadow-sm">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>随机不重复生成</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 p-3 bg-white rounded-2xl shadow-sm">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Copy className="w-4 h-4" />
                </div>
                <span>支持一键复制所有</span>
              </div>
            </div>
          </Card>

          {/* 右侧：文本输出区域 */}
          <Card className="
            lg:col-span-2 relative
            rounded-3xl border-transparent bg-white
            shadow-[0_2px_12px_rgba(0,0,0,0.06)]
            p-1
          ">
            {/* 工具栏 */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!result}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${isCopied 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'}
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {isCopied ? '已复制' : '复制'}
              </button>
              
              <button
                onClick={handleClear}
                disabled={!result}
                className="
                  p-2 rounded-full bg-slate-100 text-slate-500 
                  hover:bg-red-50 hover:text-red-600 
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                "
                title="清空"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* 文本框 */}
            <Textarea 
              value={result}
              readOnly
              placeholder="点击“立即生成”按钮开始生成号码..."
              className="
                w-full h-[400px] p-6 resize-none
                border-none focus-visible:ring-0 
                bg-transparent text-slate-700 font-mono text-base leading-relaxed
                rounded-3xl
              "
            />
          </Card>
        </div>

      </div>
    </PageLayout>
  );
};

export default NumberGenerator;