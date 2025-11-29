import { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Copy, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  Hash,
  Settings2,
  Cpu,
  Fingerprint
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import PageLayout from "@/components/PageLayout";

const NumberGenerator = () => {
  const [result, setResult] = useState("");
  const [historyCount, setHistoryCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // 状态管理
  const [status, setStatus] = useState<'idle' | 'generating' | 'success'>('idle');
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // 震动反馈工具函数
  const triggerHaptic = (style = 'medium') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      // 区分震动强度
      if (style === 'heavy') navigator.vibrate(20);
      else navigator.vibrate(10);
    }
  };

  const handleGenerate = () => {
    triggerHaptic('medium');
    setStatus('generating');
    setResult("");
    setProgress(0);
    
    // 模拟进度条动画，增加计算的"重量感"
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress > 90) {
        clearInterval(interval);
        finishGeneration();
      } else {
        setProgress(currentProgress);
      }
    }, 50);

    const finishGeneration = () => {
      // 实际生成逻辑
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

      setProgress(100);
      setTimeout(() => {
        setResult(newNumbers.join("\n"));
        setHistoryCount(newNumbers.length);
        setStatus('success');
        triggerHaptic('heavy');
        
        // 自动聚焦或滚动
        if (window.innerWidth < 768) {
           // 稍微延迟让DOM渲染完
           setTimeout(() => {
             const resultEl = document.getElementById('result-area');
             resultEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
           }, 200);
        }
      }, 200);
    };
  };

  const handleCopy = () => {
    if (!result) return;
    triggerHaptic('medium');
    navigator.clipboard.writeText(result);
    
    // 显示 Toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleClear = () => {
    triggerHaptic('medium');
    setResult("");
    setHistoryCount(0);
    setStatus('idle');
    setProgress(0);
  };

  return (
    <PageLayout
      title="14位数字生成器"
      description="批量随机数生成工具"
      backLabel="返回"
    >
      {/* 顶部 Toast 提示 */}
      <div className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        flex items-center gap-2 px-4 py-2 rounded-full
        bg-slate-900/90 text-white shadow-xl backdrop-blur-md
        transition-all duration-300 transform
        ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0 pointer-events-none'}
      `}>
        <CheckCircle2 className="w-4 h-4 text-green-400" />
        <span className="text-xs font-medium">已复制到剪贴板</span>
      </div>

      <div className="max-w-2xl mx-auto space-y-4 p-3 pb-32 md:p-6">
        
        {/* 1. 参数仪表盘 Card */}
        <Card className="rounded-3xl border-0 shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white overflow-hidden relative">
          {/* 背景装饰 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-60" />

          <div className="p-5 md:p-6 relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-blue-600" />
                  生成配置
                </h2>
                <p className="text-xs text-slate-400 mt-1">当前参数已锁定，点击生成即可</p>
              </div>
              <div className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
                 <span className="text-xs font-semibold text-slate-500">v2.0</span>
              </div>
            </div>

            {/* 参数可视化展示 */}
            <div className="flex gap-3">
              <div className="flex-1 bg-slate-50 rounded-2xl p-3 border border-slate-100 flex flex-col items-start gap-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">固定前缀</span>
                <span className="text-xl font-mono font-bold text-slate-700 tracking-tight">6158</span>
              </div>
              <div className="flex-1 bg-slate-50 rounded-2xl p-3 border border-slate-100 flex flex-col items-start gap-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">生成数量</span>
                <span className="text-xl font-mono font-bold text-slate-700">100<span className="text-xs text-slate-400 ml-1 font-sans font-normal">个</span></span>
              </div>
            </div>

            {/* 动态生成按钮 */}
            <div className="mt-6">
              <button
                onClick={handleGenerate}
                disabled={status === 'generating'}
                className="w-full relative group"
              >
                <div className={`
                  relative overflow-hidden
                  w-full py-4 rounded-2xl
                  flex items-center justify-center gap-2
                  transition-all duration-300
                  ${status === 'generating' ? 'bg-slate-100 cursor-wait' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-[0.98]'}
                `}>
                  {status === 'generating' ? (
                    <div className="flex flex-col items-center w-full px-4">
                      <div className="flex justify-between w-full text-xs text-slate-500 font-medium mb-1.5 px-1">
                        <span>计算中...</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      {/* 进度条轨道 */}
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-75 ease-out rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-white/90 group-hover:scale-110 transition-transform" />
                      <span className="text-base font-semibold text-white">
                        {status === 'success' ? '重新生成' : '立即生成'}
                      </span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </Card>

        {/* 2. 结果展示区域 */}
        {/* 使用 AnimatePresence 逻辑的 CSS 实现 */}
        <div id="result-area" className={`
          transition-all duration-500 ease-in-out
          ${status === 'idle' ? 'opacity-50 grayscale' : 'opacity-100 grayscale-0'}
        `}>
          <Card className="rounded-3xl border-0 shadow-sm bg-white overflow-hidden flex flex-col min-h-[400px]">
            {/* 头部状态栏 */}
            <div className="px-5 py-3 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${status === 'success' ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
                <span className="text-sm font-medium text-slate-600">输出结果</span>
              </div>
              {historyCount > 0 && (
                <div className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-md">
                  Total: {historyCount}
                </div>
              )}
            </div>

            <div className="relative flex-1 bg-slate-50/30">
              {/* 装饰行号列 */}
              <div className="absolute left-0 top-4 bottom-4 w-10 border-r border-slate-100 flex flex-col items-center gap-[2px] pt-[2px] overflow-hidden text-[10px] text-slate-300 font-mono select-none">
                {Array.from({length: 20}).map((_, i) => (
                  <div key={i} className="h-6 flex items-center">{i + 1}</div>
                ))}
                <div className="mt-2">...</div>
              </div>

              {/* 核心文本域 */}
              <Textarea 
                ref={textareaRef}
                value={result}
                readOnly
                placeholder="等待生成..."
                className="
                  w-full h-[450px]
                  pl-12 pr-4 py-4
                  bg-transparent border-0 focus-visible:ring-0
                  font-mono text-[15px] leading-6 tracking-wide text-slate-700
                  resize-none
                "
              />
              
              {/* 空状态下的提示 */}
              {!result && status !== 'generating' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 pointer-events-none bg-white/50 backdrop-blur-[1px]">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                    <Cpu className="w-8 h-8 opacity-20" />
                  </div>
                  <p className="text-sm">点击上方按钮开始计算</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* 3. 底部悬浮操作栏 (Sticky Bottom Bar) */}
      {/* 仅在有结果时滑出，提升移动端操作便捷性 */}
      <div className={`
        fixed bottom-0 left-0 right-0 p-4 md:p-6 z-40
        bg-gradient-to-t from-white via-white to-transparent
        transition-transform duration-300 ease-out
        ${result ? 'translate-y-0' : 'translate-y-full'}
      `}>
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={handleClear}
            className="
              flex items-center justify-center w-14 h-14
              rounded-2xl bg-white border border-slate-200 shadow-sm
              text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50
              transition-all duration-200
            "
            aria-label="清空"
          >
            <Trash2 className="w-6 h-6" />
          </button>

          <button
            onClick={handleCopy}
            className="
              flex-1 h-14
              flex items-center justify-center gap-2
              rounded-2xl bg-slate-900 text-white font-semibold text-lg
              shadow-lg shadow-slate-900/20
              active:scale-[0.98] transition-all
            "
          >
            <Copy className="w-5 h-5" />
            <span>一键复制结果</span>
          </button>
        </div>
      </div>

    </PageLayout>
  );
};

export default NumberGenerator;