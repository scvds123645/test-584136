import { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Copy, 
  Trash2, 
  CheckCircle2, 
  Fingerprint,
  Cpu
} from "lucide-react";
import { Card } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";

const NumberGenerator = () => {
  // 核心数据状态
  const [resultList, setResultList] = useState<string[]>([]); // 改用数组存储，方便列表渲染
  const [historyCount, setHistoryCount] = useState(0);
  
  // UI 状态
  const [status, setStatus] = useState<'idle' | 'generating' | 'success'>('idle');
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  
  // 滚动容器引用
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 震动反馈
  const triggerHaptic = (style = 'medium') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      if (style === 'heavy') navigator.vibrate(20);
      else navigator.vibrate(10);
    }
  };

  const handleGenerate = () => {
    triggerHaptic('medium');
    setStatus('generating');
    setResultList([]); // 清空当前列表
    setProgress(0);
    
    // 模拟计算进度动画
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
        setResultList(newNumbers);
        setHistoryCount(newNumbers.length);
        setStatus('success');
        triggerHaptic('heavy');
        
        // 自动滚动到顶部
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
      }, 200);
    };
  };

  const handleCopy = () => {
    if (resultList.length === 0) return;
    triggerHaptic('medium');
    
    // 将数组重新组合成字符串进行复制
    const textToCopy = resultList.join("\n");
    navigator.clipboard.writeText(textToCopy);
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleClear = () => {
    triggerHaptic('medium');
    setResultList([]);
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
      {/* Toast 提示 */}
      <div className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none
        flex items-center gap-2 px-4 py-2 rounded-full
        bg-slate-900/90 text-white shadow-xl backdrop-blur-md
        transition-all duration-300 transform
        ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}
      `}>
        <CheckCircle2 className="w-4 h-4 text-green-400" />
        <span className="text-xs font-medium">已复制到剪贴板</span>
      </div>

      <div className="max-w-2xl mx-auto space-y-4 p-3 pb-32 md:p-6">
        
        {/* 1. 配置卡片 */}
        <Card className="rounded-3xl border-0 shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-60" />

          <div className="p-5 md:p-6 relative z-10">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-blue-600" />
                生成配置
              </h2>
              <div className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
                 <span className="text-xs font-semibold text-slate-500">Fixed List</span>
              </div>
            </div>

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
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-75 ease-out rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-white/90" />
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

        {/* 2. 结果展示区域 - 修复滚动同步问题 */}
        <div className={`
          transition-all duration-500 ease-in-out
          ${status === 'idle' ? 'opacity-50 grayscale' : 'opacity-100 grayscale-0'}
        `}>
          <Card className="rounded-3xl border-0 shadow-sm bg-white overflow-hidden flex flex-col h-[450px]">
            {/* 头部状态栏 */}
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-white z-20 shadow-sm">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${status === 'success' ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
                <span className="text-sm font-medium text-slate-600">结果列表</span>
              </div>
              {historyCount > 0 && (
                <div className="text-xs font-mono text-slate-400">
                  Count: {historyCount}
                </div>
              )}
            </div>

            {/* 
              核心修改点：
              使用 div 替代 Textarea，实现行号与内容的同步滚动。
              overflow-y-auto 加在父容器上。
            */}
            <div 
              ref={scrollContainerRef}
              className="relative flex-1 overflow-y-auto scroll-smooth bg-slate-50/30"
            >
              {resultList.length > 0 ? (
                // 有数据时渲染列表
                <div className="flex flex-col min-h-full">
                  {resultList.map((num, index) => (
                    <div 
                      key={index} 
                      className="flex items-center hover:bg-blue-50/50 transition-colors group"
                    >
                      {/* 左侧行号：禁止选中 (select-none) 方便用户只复制数字 */}
                      <div className="
                        w-12 shrink-0 py-1 pr-3 
                        text-right font-mono text-xs text-slate-300 
                        select-none border-r border-slate-100 bg-white/50
                        group-hover:text-blue-400 group-hover:bg-blue-50/30
                      ">
                        {index + 1}
                      </div>
                      
                      {/* 右侧数字：等宽字体 */}
                      <div className="pl-4 py-1 font-mono text-[15px] text-slate-700 tracking-wider">
                        {num}
                      </div>
                    </div>
                  ))}
                  {/* 底部留白，防止被遮挡 */}
                  <div className="h-20 w-full" />
                </div>
              ) : (
                // 空状态
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                    <Cpu className="w-8 h-8 opacity-20" />
                  </div>
                  <p className="text-sm">点击上方按钮生成数据</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* 3. 底部悬浮操作栏 */}
      <div className={`
        fixed bottom-0 left-0 right-0 p-4 md:p-6 z-40
        bg-gradient-to-t from-white via-white/95 to-transparent
        transition-transform duration-300 ease-out
        ${resultList.length > 0 ? 'translate-y-0' : 'translate-y-full'}
      `}>
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={handleClear}
            className="
              flex items-center justify-center w-14 h-14
              rounded-2xl bg-white border border-slate-200 shadow-sm
              text-slate-400 hover:text-red-500 hover:bg-red-50
              transition-all active:scale-95
            "
          >
            <Trash2 className="w-6 h-6" />
          </button>

          <button
            onClick={handleCopy}
            className="
              flex-1 h-14
              flex items-center justify-center gap-2
              rounded-2xl bg-slate-900 text-white font-semibold text-lg
              shadow-xl shadow-slate-900/20
              active:scale-[0.98] transition-all
            "
          >
            <Copy className="w-5 h-5" />
            <span>一键复制全部</span>
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default NumberGenerator;