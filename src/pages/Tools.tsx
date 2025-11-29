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
  Binary // 新增图标
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
      path: "/14d",
      icon: Binary,
      title: "14位数字生成工具",
      description: "批量生成6158开头的14位随机数字",
      external: false,
    },
    {
      path: "/discord",
      icon: FileText,
      title: "账号信息格式化工具",
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
      title: "Cookie 格式转换工具",
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
      title: "域名转邮箱后缀工具",
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
      {/* Main Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          
          return (
            <Card
              key={tool.path}
              onClick={() => handleNavigation(tool.path, tool.external)}
              // Material 3 Style Card:
              // - Rounded-3xl for the signature MD3 look
              // - No border (border-transparent), using soft shadow for elevation
              // - Background white (Surface)
              // - Group for hover effects on child elements
              className="
                relative group cursor-pointer overflow-hidden
                rounded-3xl border-transparent bg-white
                shadow-[0_2px_12px_rgba(0,0,0,0.06)] 
                hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]
                hover:-translate-y-1
                transition-all duration-300 ease-[cubic-bezier(0.2,0.0,0,1.0)]
                p-6
              "
            >
              {/* State Layer (Ripple simulation on hover) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] bg-blue-600 transition-opacity duration-300" />

              <div className="relative flex flex-col h-full gap-5">
                
                {/* Header: Icon & Title */}
                <div className="flex items-start justify-between">
                  {/* Icon Container: Secondary Container color (light blue), rounded-2xl */}
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                    <IconComponent className="w-7 h-7" strokeWidth={2} />
                  </div>
                  
                  {/* External Link Indicator (Subtle) */}
                  {tool.external && (
                    <div className="p-2 rounded-full bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-medium text-xl text-slate-800 group-hover:text-blue-700 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                {/* Action Footer - Pushed to bottom if content varies */}
                <div className="mt-auto pt-2 flex items-center">
                  <span className="
                    inline-flex items-center gap-2 px-4 py-2 
                    rounded-full text-sm font-medium
                    bg-blue-50 text-blue-700 
                    group-hover:bg-blue-600 group-hover:text-white
                    transition-colors duration-300
                  ">
                    {tool.external ? '访问链接' : '立即使用'}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Footer Info Card - Material 3 Surface Variant */}
      <div className="mt-10">
        <Card className="
          border-none rounded-3xl 
          bg-slate-50 
          p-6 md:p-8
        ">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Decorative Icon */}
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 text-blue-600">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-medium text-slate-800">使用提示</h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  支持批量处理
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  本地数据处理（无上传）
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  一键复制结果
                </span>
                <span className="flex items-center gap-2">
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