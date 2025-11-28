import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { 
  Hash, 
  FileText, 
  Cookie, 
  UserCheck, 
  ExternalLink, 
  KeyRound, 
  RefreshCw, 
  ListFilter, 
  AtSign, 
  Sparkles, 
  Store, 
  ArrowRight,
  MessageSquareText,
  ScanEye
} from "lucide-react";
import PageLayout from "@/components/PageLayout";

const Tools = () => {
  const navigate = useNavigate();

  const tools = [
    {
      path: "/chat",
      icon: MessageSquareText,
      title: "AI 智能问答",
      description: "基于 Gemini 3 Pro 的智能对话助手，为您解答疑惑",
      external: false,
      highlight: true
    },
    {
      path: "/image-analysis",
      icon: ScanEye,
      title: "图片智能分析",
      description: "上传图片，让 AI 深度解析画面内容与细节",
      external: false,
      highlight: true
    },
    {
      path: "/14",
      icon: Hash,
      title: "14位数字提取", 
      description: "自动从文本中提取并去重14位连续数字",
      external: false,
    },
    {
      path: "/discord",
      icon: FileText,
      title: "账号信息格式化",
      description: "批量格式化账号信息为标准格式",
      external: false,
    },
    {
      path: "/jh",
      icon: Cookie,
      title: "Cookie 筛选",
      description: "快速筛选指定的Cookie字段",
      external: false,
    },
    {
      path: "/cookie",
      icon: RefreshCw,
      title: "Cookie 格式转换",
      description: "提取c_user并转换为指定格式",
      external: false,
    },
    {
      path: "/qc",
      icon: ListFilter,
      title: "文本去重工具",
      description: "快速去除文本中的重复行",
      external: false,
    },
    {
      path: "/yopmail",
      icon: AtSign,
      title: "域名转邮箱后缀",
      description: "批量格式化域名为邮箱后缀",
      external: false,
    },
    {
      path: "/rj",
      icon: Store,
      title: "软件商店",
      description: "浏览并下载常用软件工具",
      external: false,
    },
    {
      path: "https://3.584136.xyz",
      icon: UserCheck,
      title: "账号状态检查",
      description: "Facebook 账号状态在线检测工具",
      external: true,
    },
    {
      path: "https://1.584136.xyz",
      icon: KeyRound,
      title: "Cookie 注入器",
      description: "Facebook Cookie 快速注入工具",
      external: true,
    },
  ];

  const handleNavigation = (path: string, isExternal: boolean) => {
    if (isExternal) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  return (
    <PageLayout
      title="实用工具"
      description="选择下方工具，快速完成各种数据处理任务"
      backLabel="返回首页"
      showBack={false}
    >
      {/* 
         优化 Grid:
         - gap-4: 手机端间距更紧凑
         - md:gap-6: 桌面端保持宽松
         - sm:grid-cols-2: 平板或大屏手机显示两列
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-1 md:p-2">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          const isHighlight = (tool as any).highlight;
          
          return (
            <Card
              key={tool.path}
              onClick={() => handleNavigation(tool.path, tool.external)}
              // 优化 Card 样式:
              // - active:scale-[0.98]: 增加手机点击时的按压反馈效果
              // - rounded-2xl md:rounded-3xl: 手机端圆角稍小
              // - p-5 md:p-6: 手机端内边距稍小
              className={`
                relative group cursor-pointer overflow-hidden
                rounded-2xl md:rounded-3xl 
                ${isHighlight ? 'border-blue-200 bg-blue-50/30' : 'border-transparent bg-white'}
                shadow-[0_2px_8px_rgba(0,0,0,0.04)] 
                md:shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]
                hover:-translate-y-1
                active:scale-[0.98] 
                transition-all duration-300 ease-[cubic-bezier(0.2,0.0,0,1.0)]
                p-5 md:p-6
              `}
            >
              {/* Ripple Effect Background */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] group-active:opacity-[0.05] ${isHighlight ? 'bg-purple-600' : 'bg-blue-600'} transition-opacity duration-300`} />

              <div className="relative flex flex-col h-full gap-4 md:gap-5">
                
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className={`
                    w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center 
                    transition-all duration-300 group-hover:scale-110
                    ${isHighlight 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20' 
                      : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                    }
                  `}>
                    <IconComponent className="w-6 h-6 md:w-7 md:h-7" strokeWidth={isHighlight ? 2.5 : 2} />
                  </div>
                  
                  {tool.external && (
                    <div className="p-1.5 md:p-2 rounded-full bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </div>
                  )}

                  {isHighlight && (
                     <div className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold uppercase tracking-wider">
                       New
                     </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-1.5 md:space-y-2">
                  <h3 className={`font-medium text-lg md:text-xl transition-colors line-clamp-1 ${isHighlight ? 'text-slate-900 group-hover:text-purple-700' : 'text-slate-800 group-hover:text-blue-700'}`}>
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 md:line-clamp-none">
                    {tool.description}
                  </p>
                </div>

                {/* Footer Button */}
                <div className="mt-auto pt-2 flex items-center">
                  <span className={`
                    inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 
                    rounded-full text-xs md:text-sm font-medium
                    transition-colors duration-300
                    ${isHighlight 
                      ? 'bg-white text-purple-700 shadow-sm border border-purple-100 group-hover:bg-purple-600 group-hover:text-white group-hover:border-transparent' 
                      : 'bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white'
                    }
                  `}>
                    {tool.external ? '访问' : '使用'}
                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Footer Info Card */}
      <div className="mt-6 md:mt-10 mb-6">
        <Card className="
          border-none rounded-2xl md:rounded-3xl 
          bg-slate-50 
          p-5 md:p-8
        ">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 text-blue-600">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
            </div>

            <div className="flex-1 space-y-2">
              <h3 className="text-base md:text-lg font-medium text-slate-800">使用提示</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  支持批量
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  本地处理
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  一键复制
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  多端适配
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Tools;