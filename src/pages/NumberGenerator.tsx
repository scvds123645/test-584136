import { useState } from "react";
import { 
  Sparkles, 
  Copy, 
  Trash2, 
  RefreshCw, 
  Check, 
  Hash,
  Settings2,
  Zap
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import PageLayout from "@/components/PageLayout";
import { toast } from "sonner"; 

const NumberGenerator = () => {
  const [result, setResult] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [historyCount, setHistoryCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // 震动反馈辅助函数
  const triggerHaptic = () => {
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const handleGenerate = () => {
    triggerHaptic();
    setIsGenerating(true);
    
    // 模拟极短的加载延迟，提升感知体验
    setTimeout(() => {
      const prefix = "6158";
      const count = 100;
      const length = 14;
      const randomLength = length - prefix.length;

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
      setIsGenerating(false);
      
      toast.success(`成功生成 ${count} 个号码`, {
        position: "top-center",
        icon: <Zap className="w-4 h-4 text-amber-500" />
      });
    }, 300);
  };

  const handleCopy = () => {
    if (!result) return;
    triggerHaptic();
    navigator.clipboard.writeText(result);
    setIsCopied(true);
    toast.success("已复制到剪贴板", { position: "top-center" });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClear = () => {
    triggerHaptic();
    setResult("");
    setHistoryCount(0);
    toast.info("内容已清空", { position: "top-center" });
  };

  return (
    <PageLayout
      title="14位数字生成器"
      description="批量生成指定前缀的随机数字组合"
      backLabel="返回工具列表"
    >
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 p-2 md:p-4 pb-20">
        
        {/* 控制面板 Card */}
        <Card className="
          relative overflow-hidden
          rounded-3xl border-transparent bg-white
          shadow-[0_2px_12px_rgba(0,0,0,0.06)]
          p-5 md:p-8
        ">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            
            {/* 左侧说明 */}
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 md:gap-5 w-full md:w-auto">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                <Hash className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
              </div>
              <div className="space-y-2 md:space-y-1">
                <h3 className="text-lg md:text-xl font-medium text-slate-800">生成配置</h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 text-xs md:text-sm text-slate-500">
                  <span className="flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1.5 rounded-lg border border-slate-100">
                    <Settings2 className="w-3 md:w-3.5 h-3 md:h-3.5" />
                    前缀: <span className="font-semibold text-slate-700">6158</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1.5 rounded-lg border border-slate-100">
                    长度: <span className="font-semibold text-slate-700">14位</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1.5 rounded-lg border border-slate-100">
                    数量: <span className="font-semibold text-slate-700">100</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 右侧操作按钮 - 移动端全宽 */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="
                w-full md:w-auto
                group relative flex items-center justify-center gap-3 px-8 py-3.5 md:py-4 
                bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400
                text-white rounded-2xl md:rounded-full 
                font-medium text-base md:text-lg
                transition-all duration-200
                shadow-[0_4px_14px_rgba(37,99,235,0.3)]
                hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)]
                active:scale-[0.98] active:translate-y-0.5
              "
            >
              <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500`} />
              <span>{isGenerating ? '生成中...' : '立即生成'}</span>
            </button>
          </div>
        </Card>

        {/* 结果显示区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          
          {/* 左侧：统计与提示 - 移动端改为水平紧凑布局 */}
          <Card className="
            lg:col-span-1 h-fit
            rounded-3xl border-transparent bg-slate-50
            p-5 space-y-5
          ">
            {/* 统计数字 */}
            <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-start lg:items-start gap-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 lg:mb-4">当前结果</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-slate-800 tabular-nums">
                    {historyCount}
                  </span>
                  <span className="text-xs md:text-sm text-slate-500">个</span>
                </div>
              </div>
              
              {/* 移动端仅显示的装饰图标 */}
              <div className="lg:hidden w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-500">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            {/* 功能提示 - 移动端使用 Grid 2列 */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              <div className="flex flex-col lg:flex-row items-center lg:items-center gap-2 lg:gap-3 text-xs md:text-sm text-slate-600 p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <Sparkles className="w-3 h-3 lg:w-4 lg:h-4" />
                </div>
                <span className="text-center lg:text-left">随机不重复</span>
              </div>
              <div className="flex flex-col lg:flex-row items-center lg:items-center gap-2 lg:gap-3 text-xs md:text-sm text-slate-600 p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Copy className="w-3 h-3 lg:w-4 lg:h-4" />
                </div>
                <span className="text-center lg:text-left">一键全复制</span>
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
            {/* 浮动工具栏 - 增加背景模糊，防止文字重叠看不清 */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-100 shadow-sm">
              <button
                onClick={handleCopy}
                disabled={!result}
                className={`
                  flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all
                  ${isCopied 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'}
                  disabled:opacity-50 disabled:cursor-not-allowed
                  active:scale-95
                `}
              >
                {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {isCopied ? '成功' : '复制'}
              </button>
              
              <div className="w-px h-4 bg-slate-200 mx-0.5" />

              <button
                onClick={handleClear}
                disabled={!result}
                className="
                  p-1.5 md:p-2 rounded-full text-slate-400 
                  hover:bg-red-50 hover:text-red-500 
                  transition-all disabled:opacity-30 disabled:cursor-not-allowed
                  active:scale-90
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
              placeholder="生成结果将显示在这里..."
              className="
                w-full h-[350px] md:h-[450px] 
                p-5 md:p-6 
                pt-16 md:pt-16 /* 顶部留白，防止被按钮遮挡 */
                resize-none
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