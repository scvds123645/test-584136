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
  ArrowRight 
} from "lucide-react";
import PageLayout from "@/components/PageLayout";

const Tools = () => {
  const navigate = useNavigate();

  const tools = [
    {
      path: "/14",
      icon: Hash,
      title: "14位数字提取工具",
      description: "自动从文本中提取并去重14位连续数字",
      external: false,
    },
    {
      path: "/discord",
      icon: FileText,
      title: "账号信息格式化", // 手机端标题稍微精简，防止换行过多
      description: "批量格式化账号信息为标准格式",
      external: false,
    },
    {
      path: "/jh",
      icon: Cookie,
      title: "Cookie 筛选工具",
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
      title: "账号状态检查器",
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
    >
      {/* 
        Grid Container Optimization:
        - gap-4: 手机端间距减小 (16px)，节省空间。
        - md:gap-6: 平板/桌面端保持较大间距 (24px)。
        - pb-8: 底部增加留白，防止手机端滚动到底部太贴边。
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-1 md:p-2 pb-8">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          
          return (
            <Card
              key={tool.path}
              onClick={() => handleNavigation(tool.path, tool.external)}
              // Card Styling Optimization:
              // - p-5 md:p-6: 手机端内边距稍微减小。
              // - active:scale-[0.98]: 手机端点击时的按压缩放效果 (代替Hover)。
              // - touch-none / select-none: 防止快速点击时出现高亮选区。
              className="
                relative group cursor-pointer overflow-hidden select-none
                rounded-[1.5rem] md:rounded-3xl border-transparent bg-white
                shadow-[0_2px_8px_rgba(0,0,0,0.04)] md:shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]
                hover:-translate-y-1
                active:scale-[0.98] active:bg-gray-50
                transition-all duration-300 ease-[cubic-bezier(0.2,0.0,0,1.0)]
                p-5 md:p-6
              "
            >
              {/* State Layer (Ripple simulation) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] bg-blue-600 transition-opacity duration-300" />

              <div className="relative flex flex-col h-full gap-4 md:gap-5">
                
                {/* Header: Icon & Title */}
                <div className="flex items-start justify-between">
                  {/* Icon Container: 手机端稍微调小一点尺寸 (w-12 vs w-14) */}
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300 shrink-0">
                    <IconComponent className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2} />
                  </div>
                  
                  {/* External Link Indicator */}
                  {tool.external && (
                    <div className="p-1.5 md:p-2 rounded-full bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-1.5 md:space-y-2">
                  {/* Title: text-lg for mobile, text-xl for desktop */}
                  <h3 className="font-bold text-lg md:text-xl text-slate-800 group-hover:text-blue-700 transition-colors line-clamp-1">
                    {tool.title}
                  </h3>
                  {/* Description: 增加 line-clamp-2 防止文字过多撑破布局 */}
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 h-10 md:h-auto">
                    {tool.description}
                  </p>
                </div>

                {/* Action Footer */}
                <div className="mt-auto pt-2 flex items-center">
                  <span className="
                    inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 
                    rounded-full text-xs md:text-sm font-medium
                    bg-blue-50 text-blue-700 
                    group-hover:bg-blue-600 group-hover:text-white
                    transition-colors duration-300
                  ">
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
          border-none rounded-[1.5rem] md:rounded-3xl 
          bg-slate-50 
          p-5 md:p-8
        ">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            {/* Decorative Icon - Hidden on very small screens if needed, or smaller */}
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 text-blue-600">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
            </div>

            <div className="flex-1 space-y-2 w-full">
              <h3 className="text-base md:text-lg font-medium text-slate-800">使用提示</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  支持批量处理
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  本地处理(无上传)
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
