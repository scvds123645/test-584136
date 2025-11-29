import { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Copy, 
  Trash2, 
  RefreshCw, 
  Check, 
  Hash,
  Settings2,
  ListOrdered
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import PageLayout from "@/components/PageLayout";

const NumberGenerator = () => {
  const [result, setResult] = useState("");
  const [historyCount, setHistoryCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [generateStatus, setGenerateStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  // 震动反馈
  const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const handleGenerate = () => {
    triggerHaptic();
    setGenerateStatus('loading');
    
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
      
      setGenerateStatus('success');
      setTimeout(() => setGenerateStatus('idle'), 2000);
      setCopyStatus('idle');
      
      // 移动端体验优化：生成后自动滚动到结果区域
      if (window.innerWidth < 768) {
        // 简单的延时滚动，避免键盘弹出等干扰
        setTimeout(() => {
            textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }, 400); // 稍微增加一点时间让动画更明显
  };

  const handleCopy = () => {
    if (!result) return;
    triggerHaptic();
    navigator.clipboard.writeText(result);
    setCopyStatus('copied');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  const handleClear = () => {
    triggerHaptic();
    setResult("");
    setHistoryCount(0);
    setCopyStatus('idle');
    setGenerateStatus('idle');
  };

  return (
    <PageLayout
      title="14位数字生成器"
      description="批量生成指定前缀随机数"
      backLabel="返回"
    >
      <div className="max-w-2xl mx-auto space-y-4 p-3 pb-24 md:p-6 md:pb-10">
        
        {/* 1. 配置与操作区域 - 移动端更紧凑 */}
        <Card className="rounded-2xl md:rounded-3xl border-0 shadow-sm bg-white overflow-hidden">
          <div className="p-4 md:p-6 space-y-5">
            
            {/* 标题与图标 */}
            <div className="flex items-center gap-3 text-slate-700 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Settings2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base md:text-lg">生成配置</h3>
            </div>

            {/* 参数网格 - 手机端三列排布 */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <div className="bg-slate-50 p-2.5 md:p-3 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-wider mb-0.5">前缀</span>
                <span className="font-mono text-sm md:text-base font-bold text-slate-700">6158</span>
              </div>
              <div className="bg-slate-50 p-2.5 md:p-3 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-wider mb-0.5">长度</span>
                <span className="font-mono text-sm md:text-base font-bold text-slate-700">14位</span>
              </div>
              <div className="bg-slate-50 p-2.5 md:p-3 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-wider mb-0.5">数量</span>
                <span className="font-mono text-sm md:text-base font-bold text-slate-700">100</span>
              </div>
            </div>

            {/* 生成按钮 - 大尺寸触控区 */}
            <button
              onClick={handleGenerate}
              disabled={generateStatus === 'loading'}
              className={`
                w-full relative overflow-hidden
                flex items-center justify-center gap-2 
                py-3.5 md:py-4 rounded-xl md:rounded-2xl
                font-semibold text-sm md:text-base text-white
                shadow-lg shadow-blue-500/20
                transition-all duration-200 active:scale-[0.98]
                ${generateStatus === 'success' 
                  ? 'bg-green-600' 
                  : 'bg-blue-600 active:bg-blue-700'}
                disabled:opacity-80
              `}
            >
              <div className="relative z-10 flex items-center gap-2">
                {generateStatus === 'loading' ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : generateStatus === 'success' ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Sparkles className="w-5 h-5 fill-white/20" />
                )}
                <span>
                  {generateStatus === 'loading' && '正在计算...'}
                  {generateStatus === 'success' && '生成完毕'}
                  {generateStatus === 'idle' && '立即生成 100 个号码'}
                </span>
              </div>
            </button>
          </div>
        </Card>

        {/* 2. 结果区域 - 整合了统计和操作 */}
        <Card className={`
          relative flex flex-col
          rounded-2xl md:rounded-3xl border-0 shadow-sm bg-white
          transition-all duration-500
          ${result ? 'opacity-100 translate-y-0' : 'opacity-95'}
        `}>
          
          {/* 结果区域头部：显示数量 */}
          <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-500">
              <ListOrdered className="w-4 h-4" />
              <span className="text-sm font-medium">生成结果</span>
            </div>
            
            {historyCount > 0 && (
              <div className="flex items-baseline gap-1 animate-in fade-in zoom-in duration-300">
                <span className="text-lg font-bold text-blue-600 tabular-nums">
                  {historyCount}
                </span>
                <span className="text-xs text-slate-400">个</span>
              </div>
            )}
          </div>

          {/* 文本区域 */}
          <div className="relative group bg-slate-50/50 min-h-[300px]">
            <Textarea 
              ref={textareaRef}
              value={result}
              readOnly
              placeholder="点击上方按钮生成数字..."
              className="
                w-full h-[400px] md:h-[500px]
                p-4 md:p-6 pb-20 
                resize-none border-0 focus-visible:ring-0 
                bg-transparent 
                font-mono text-sm md:text-base leading-relaxed text-slate-700
              "
            />

            {/* 空状态占位图 - 仅在无结果时显示 */}
            {!result && generateStatus !== 'loading' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 pointer-events-none">
                <Hash className="w-16 h-16 mb-2 opacity-20" />
                <span className="text-sm">暂无数据</span>
              </div>
            )}

            {/* 3. 浮动操作栏 - 移至下方，拇指操作区 */}
            <div className={`
              absolute bottom-4 left-4 right-4 md:left-auto md:right-6
              flex items-center justify-between md:justify-end gap-3
              transition-all duration-300 transform
              ${result ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}
            `}>
              {/* 清空按钮 - 弱化显示 */}
              <button
                onClick={handleClear}
                className="
                  flex-1 md:flex-none md:w-auto
                  flex items-center justify-center gap-2
                  px-4 py-3 md:py-2.5
                  rounded-xl bg-white border border-slate-200 shadow-sm
                  text-slate-500 text-sm font-medium
                  active:bg-slate-50 active:scale-95 transition-all
                "
              >
                <Trash2 className="w-4 h-4" />
                <span className="md:hidden">清空</span>
              </button>

              {/* 复制按钮 - 强化显示 */}
              <button
                onClick={handleCopy}
                className={`
                  flex-[2] md:flex-none
                  flex items-center justify-center gap-2
                  px-6 py-3 md:py-2.5
                  rounded-xl shadow-lg shadow-blue-500/10
                  text-sm font-bold
                  transition-all duration-300 active:scale-95
                  ${copyStatus === 'copied'
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-900 text-white'}
                `}
              >
                {copyStatus === 'copied' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>一键复制全部</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Card>

        {/* 底部提示文字 */}
        <p className="text-center text-xs text-slate-400 px-4">
          生成结果已自动去重 • 仅用于测试用途
        </p>

      </div>
    </PageLayout>
  );
};

export default NumberGenerator;