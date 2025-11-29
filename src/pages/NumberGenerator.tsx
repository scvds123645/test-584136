import { useState, useRef } from "react";
import { 
  Sparkles, 
  Copy, 
  Trash2, 
  CheckCircle2, 
  Settings2,
  Cpu,
  Hash,
  ListOrdered
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // 假设你有这个组件，如果没有，下面使用了原生input加Tailwind样式
import PageLayout from "@/components/PageLayout";

const NumberGenerator = () => {
  // --- 配置状态 ---
  const [config, setConfig] = useState({
    prefix: "6158",
    count: 100
  });

  // --- 核心数据状态 ---
  const [resultList, setResultList] = useState<string[]>([]);
  const [historyCount, setHistoryCount] = useState(0);
  
  // --- UI 状态 ---
  const [status, setStatus] = useState<'idle' | 'generating' | 'success'>('idle');
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 震动反馈
  const triggerHaptic = (style = 'medium') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      if (style === 'heavy') navigator.vibrate(20);
      else navigator.vibrate(10);
    }
  };

  // 处理输入变化
  const handleConfigChange = (key: 'prefix' | 'count', value: string) => {
    if (key === 'count') {
      // 限制数量输入，防止过大，比如限制最大 5000
      let num = parseInt(value);
      if (isNaN(num)) num = 0;
      if (num > 5000) num = 5000; 
      setConfig(prev => ({ ...prev, count: num }));
    } else {
      // 限制前缀长度，比如最大13位（留1位随机）
      if (value.length > 13) return;
      setConfig(prev => ({ ...prev, prefix: value }));
    }
  };

  const handleGenerate = () => {
    // 基础校验
    if (!config.prefix) {
      alert("请输入前缀");
      return;
    }
    if (config.count <= 0) {
      alert("数量必须大于0");
      return;
    }

    triggerHaptic('medium');
    setStatus('generating');
    setResultList([]);
    setProgress(0);
    
    // 模拟计算进度
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
      // --- 核心逻辑更新 ---
      const prefix = config.prefix;
      const count = config.count;
      const totalLength = 14; 
      // 计算需要随机生成的位数
      const randomLength = totalLength - prefix.length;

      // 如果前缀已经超过或等于总长度，直接截取或保持
      if (randomLength <= 0) {
        setProgress(100);
        setTimeout(() => {
          // 如果前缀太长，就只生成重复的前缀（作为一种容错）或者提示错误
          // 这里简单处理：直接重复显示前缀
          const fixedList = new Array(count).fill(prefix.substring(0, totalLength));
          updateResult(fixedList);
        }, 200);
        return;
      }

      let newNumbers = [];
      for (let i = 0; i < count; i++) {
        let randomPart = "";
        for (let j = 0; j < randomLength; j++) {
          randomPart += Math.floor(Math.random() * 10).toString();
        }
        newNumbers.push(prefix + randomPart);
      }
      
      updateResult(newNumbers);
    };

    const updateResult = (list: string[]) => {
      setProgress(100);
      setTimeout(() => {
        setResultList(list);
        setHistoryCount(list.length);
        setStatus('success');
        triggerHaptic('heavy');
        
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
      }, 200);
    };
  };

  const handleCopy = () => {
    if (resultList.length === 0) return;
    triggerHaptic('medium');
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
      description="批量生成指定前缀随机数"
      backLabel="返回"
    >
      {/* Toast */}
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
        
        {/* 1. 可配置参数卡片 */}
        <Card className="rounded-3xl border-0 shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white overflow-hidden relative">
          {/* 装饰背景 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-60" />

          <div className="p-5 md:p-6 relative z-10">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-blue-600" />
                生成配置
              </h2>
              {/* 显示总位数提示 */}
              <div className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
                 <span className="text-xs font-semibold text-slate-500">总长度: 14位</span>
              </div>
            </div>

            {/* 输入区域：改为两列布局 */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* 前缀输入 */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Hash className="w-3 h-3" /> 固定前缀
                </label>
                <div className="relative">
                  <input
                    type="text" // 保持text以支持前导0
                    inputMode="numeric" // 手机端呼出数字键盘
                    value={config.prefix}
                    onChange={(e) => handleConfigChange('prefix', e.target.value)}
                    className="
                      w-full bg-slate-50 border border-slate-200 
                      rounded-xl py-3 px-3 
                      text-lg font-mono font-bold text-slate-800 
                      focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                      transition-all
                    "
                    placeholder="如: 6158"
                  />
                  {/* 输入长度提示 */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 bg-white/50 px-1 rounded">
                    {config.prefix.length}位
                  </div>
                </div>
              </div>

              {/* 数量输入 */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <ListOrdered className="w-3 h-3" /> 生成数量
                </label>
                <div className="relative">
                  <input
                    type="number"
                    pattern="\d*"
                    value={config.count}
                    onChange={(e) => handleConfigChange('count', e.target.value)}
                    className="
                      w-full bg-slate-50 border border-slate-200 
                      rounded-xl py-3 px-3 
                      text-lg font-mono font-bold text-slate-800 
                      focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                      transition-all
                    "
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    个
                  </div>
                </div>
              </div>
            </div>

            {/* 动态计算后的随机位数提示 */}
            <div className="mt-3 text-xs text-slate-400 text-center bg-slate-50/50 py-1.5 rounded-lg border border-slate-100 border-dashed">
              将在前缀后补齐 <span className="font-bold text-slate-600">{Math.max(0, 14 - config.prefix.length)}</span> 位随机数
            </div>

            <div className="mt-5">
              <button
                onClick={handleGenerate}
                disabled={status === 'generating'}
                className="w-full relative group"
              >
                <div className={`
                  relative overflow-hidden
                  w-full py-3.5 rounded-xl
                  flex items-center justify-center gap-2
                  transition-all duration-300
                  ${status === 'generating' ? 'bg-slate-100 cursor-wait' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-[0.98]'}
                `}>
                  {status === 'generating' ? (
                    <div className="flex flex-col items-center w-full px-4">
                      <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-blue-500 transition-all duration-75 ease-out rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-white/90" />
                      <span className="text-base font-semibold text-white">
                        开始生成
                      </span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </Card>

        {/* 2. 结果展示区域 - 保持之前的列表渲染优化 */}
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
                  Total: {historyCount}
                </div>
              )}
            </div>

            <div 
              ref={scrollContainerRef}
              className="relative flex-1 overflow-y-auto scroll-smooth bg-slate-50/30"
            >
              {resultList.length > 0 ? (
                <div className="flex flex-col min-h-full">
                  {resultList.map((num, index) => (
                    <div 
                      key={index} 
                      className="flex items-center hover:bg-blue-50/50 transition-colors group border-b border-slate-100/50 last:border-0"
                    >
                      {/* 行号 */}
                      <div className="
                        w-12 shrink-0 py-2 pr-3 
                        text-right font-mono text-xs text-slate-300 
                        select-none bg-white/50
                        group-hover:text-blue-400
                      ">
                        {index + 1}
                      </div>
                      
                      {/* 数字内容：高亮前缀部分 */}
                      <div className="pl-4 py-2 font-mono text-[15px] tracking-wider text-slate-700">
                        <span className="font-bold text-blue-600/80">{config.prefix}</span>
                        <span>{num.substring(config.prefix.length)}</span>
                      </div>
                    </div>
                  ))}
                  <div className="h-20 w-full" />
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                    <Cpu className="w-8 h-8 opacity-20" />
                  </div>
                  <p className="text-sm">配置参数后点击生成</p>
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
            <span>复制全部 ({historyCount})</span>
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default NumberGenerator;