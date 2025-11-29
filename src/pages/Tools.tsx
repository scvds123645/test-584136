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
  ChevronRight, // 新增：用于手机端列表视图的箭头
  Binary
} from "lucide-react";
import PageLayout from "@/components/PageLayout";

const Tools = () => {
  const navigate = useNavigate();

  const tools = [
    {
      path: "/14",
      icon: Hash,
      title: "14位数字提取", // 稍微精简标题以适应手机
      description: "自动从文本中提取并去重14位连续数字",
      external: false,
    },
    {
      path: "/14d",
      icon: Binary,
      title: "14位数字生成",
      description: "批量生成6158开头的14位随机数字",
      external: false,
    },
    {
      path: "/discord",
      icon: FileText,
      title: "账号格式化",
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
      title: "Cookie 转换",
      description: "提取c_user并转换为指定格式",
      external: false,
    },
    {
      path: "/qc",
      icon: ListFilter,
      title: "文本去重",
      description: "快速去除文本中的重复行",
      external: false,
    },
    {
      path: "/yopmail",
      icon: AtSign,
      title: "邮箱后缀转换",
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
      description: "Facebook 账号状态在线检测",
      external: true,
    },
    {
      path: "https://1.584136.xyz",
      icon: KeyRound,
      title: "Cookie 注入",
      description: "Facebook Cookie 快速注入",
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
    >
      {/* 
        Grid Layout Optimization:
        - Mobile: grid-cols-1, gap-3 (tighter)
        - Tablet/Desktop: grid-cols-2/3, gap-6 (spacious)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 p-1 sm:p-2">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          
          return (
            <Card
              key={tool.path}
              onClick={() => handleNavigation(tool.path, tool.external)}
              className="
                relative group cursor-pointer overflow-hidden
                /* Base styles (Mobile First) */
                rounded-2xl border-transparent bg-white
                shadow-[0_1px_3px_rgba(0,0,0,0.05)] 
                p-4
                /* Hover & Desktop styles */
                sm:rounded-3xl sm:p-6
                sm:shadow-[0_2px_12px_rgba(0,0,0,0.06)] 
                hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]
                hover:bg-blue-50/30
                sm:hover:-translate-y-1
                transition-all duration-300 ease-[cubic-bezier(0.2,0.0,0,1.0)]
              "
            >
              {/* Ripple Effect Layer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] bg-blue-600 transition-opacity duration-300 pointer-events-none" />

              {/* 
                Flex Layout Shift:
                - Mobile: Row (Icon Left -> Text Middle -> Arrow Right)
                - Desktop: Column (Icon Top -> Text Middle -> Button Bottom)
              */}
              <div className="flex flex-row items-center sm:flex-col sm:items-start sm:h-full gap-4 sm:gap-5">
                
                {/* Icon Container */}
                <div className="
                  shrink-0 flex items-center justify-center
                  rounded-xl sm:rounded-2xl 
                  w-12 h-12 sm:w-14 sm:h-14 
                  bg-blue-50 text-blue-600 
                  group-hover:scale-105 sm:group-hover:scale-110 
                  group-hover:bg-blue-100 
                  transition-all duration-300
                ">
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2} />
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0 space-y-1 sm:space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-base sm:text-xl text-slate-800 truncate group-hover:text-blue-700 transition-colors">
                      {tool.title}
                    </h3>
                    {/* External Icon (Mobile: Inline / Desktop: Corner) */}
                    {tool.external && (
                      <ExternalLink className="w-3 h-3 text-slate-400 sm:hidden" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 leading-snug line-clamp-2">
                    {tool.description}
                  </p>
                </div>

                {/* Action Area (Responsive) */}
                <div className="shrink-0 sm:mt-auto sm:w-full sm:pt-2">
                  {/* Mobile: Simple Chevron */}
                  <div className="sm:hidden text-slate-300 group-hover:text-blue-500 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>

                  {/* Desktop: Pill Button */}
                  <span className="
                    hidden sm:inline-flex items-center gap-2 px-4 py-2 
                    rounded-full text-sm font-medium
                    bg-blue-50 text-blue-700 
                    group-hover:bg-blue-600 group-hover:text-white
                    transition-colors duration-300
                  ">
                    {tool.external ? '访问链接' : '立即使用'}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  
                  {/* Desktop: External Indicator (Absolute positioned) */}
                  {tool.external && (
                    <div className="hidden sm:block absolute top-6 right-6 p-2 rounded-full bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Footer Info Card - Condensed for Mobile */}
      <div className="mt-6 sm:mt-10 pb-6">
        <Card className="
          border-none rounded-2xl sm:rounded-3xl 
          bg-slate-50 
          p-5 sm:p-8
        ">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6">
            <div className="
              w-10 h-10 sm:w-12 sm:h-12 
              rounded-full bg-white shadow-sm 
              flex items-center justify-center shrink-0 text-blue-600
            ">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <div className="flex-1 space-y-2 sm:space-y-2 w-full">
              <h3 className="text-base sm:text-lg font-medium text-slate-800">使用提示</h3>
              
              {/* Grid layout for tips on mobile for better density */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-600">
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  支持批量处理
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  本地数据安全
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  一键复制结果
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  多端完美适配
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