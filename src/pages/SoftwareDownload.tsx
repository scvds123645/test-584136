import { useState, useEffect, useMemo } from "react";
import { Search, Star, Share2, Download, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";

// --- Types ---
interface App {
  id: string;
  name: string;
  publisher: string;
  rating: number;
  reviews: number;
  downloads: string;
  ageRating: string;
  description: string;
  icon: string;
  url?: string;
  tags?: string[];
}

// --- Data ---
const APPS_DATA: App[] = [
  {
    id: "facebook",
    name: "Facebook",
    publisher: "Meta Platforms",
    rating: 4.6,
    reviews: 800000,
    downloads: "1000万+",
    ageRating: "13+",
    description: "连接全球的社交媒体平台，让你与朋友和家人保持联系，分享生活中的精彩时刻。",
    icon: "https://www.584136.xyz/%E5%A4%B4%E5%83%8F/Facebook_icon.webp",
    url: "https://quwenjian.cc/share/download?key=b703e78f98bf6a75a8e08ce215e5fdb635803d58b049f17b99fd3232f5a1d46b&code=ULPHA",
    tags: ["社交", "通讯"]
  },
  {
    id: "gmail",
    name: "Gmail",
    publisher: "Google LLC",
    rating: 4.8,
    reviews: 1500000,
    downloads: "5000万+",
    ageRating: "4+",
    description: "谷歌推出的免费电子邮件服务，提供强大的搜索功能、智能分类与安全保障。",
    icon: "https://www.584136.xyz/%E5%A4%B4%E5%83%8F/Gmail_icon.webp",
    url: "https://quwenjian.cc/share/download?key=8c3fc56d9b8fec6fbdeb859681d1e049bb3c789cdb536995e0c609a9c727bdc7&code=WSO6N",
    tags: ["效率", "办公"]
  },
  {
    id: "outlook",
    name: "Outlook",
    publisher: "Microsoft Corporation",
    rating: 4.7,
    reviews: 800000,
    downloads: "2000万+",
    ageRating: "4+",
    description: "微软专业邮件和日历管理应用，统一收件箱与日程安排，助力高效办公。",
    icon: "https://www.584136.xyz/%E5%A4%B4%E5%83%8F/Outlook_icon.webp",
    url: "https://quwenjian.cc/share/download?key=08933905a824efbeea556cbef72061fc38d4a18699652ae99a0fbf6efac89d94&code=RZX6G",
    tags: ["商务", "邮件"]
  },
  {
    id: "zoho",
    name: "Zoho Mail",
    publisher: "Zoho Corporation",
    rating: 4.8,
    reviews: 50000,
    downloads: "500万+",
    ageRating: "3+",
    description: "安全可靠的企业邮箱服务，支持自定义域名、高级安全功能和团队协作。",
    icon: "https://www.584136.xyz/%E5%A4%B4%E5%83%8F/Zoho%20Mail_icon.webp",
    url: "https://quwenjian.cc/share/download?key=df5cd5c66b7241328f46efdc2604caf7b4363589ce1098483ff8f483ddc71938&code=13HA9",
    tags: ["企业", "SaaS"]
  },
  {
    id: "via",
    name: "Via浏览器",
    publisher: "Lakor",
    rating: 4.7,
    reviews: 120000,
    downloads: "200万+",
    ageRating: "4+",
    description: "极致轻量的高速浏览器，极简设计，支持脚本扩展与深度定制。",
    icon: "https://www.584136.xyz/%E5%A4%B4%E5%83%8F/Via_6.8.0.apk_icon.webp",
    url: "https://res.viayoo.com/v1/via-release-cn.apk",
    tags: ["工具", "极简"]
  },
  {
    id: "greentea",
    name: "绿茶VPN",
    publisher: "Greentea Security",
    rating: 4.6,
    reviews: 85000,
    downloads: "300万+",
    ageRating: "12+",
    description: "安全快速的网络连接工具，加密数据传输，保护您的在线隐私与安全。",
    icon: "https://www.584136.xyz/%E5%A4%B4%E5%83%8F/%E7%BB%BF%E8%8C%B6VPN_icon.webp",
    url: "https://quwenjian.cc/share/download?key=86241c3ad7502c7370372fdde2a1a423bb97f581ec8b7463aa9623754441e7f7&code=YIVYA",
    tags: ["网络", "安全"]
  },
  {
    id: "discord",
    name: "Discord",
    publisher: "Discord Inc.",
    rating: 4.7,
    reviews: 5600000,
    downloads: "1亿+",
    ageRating: "13+",
    description: "建立社区、与朋友畅聊的理想之地。即时语音、视频与低延迟直播。",
    icon: "https://www.584136.xyz/%E5%A4%B4%E5%83%8F/Discord_icon.webp",
    url: "https://quwenjian.cc/share/download?key=29eb683c5e92e7d340bbe7cff8c830369416921513ce89de55b602257758c119&code=E3A9B",
    tags: ["社区", "游戏"]
  },
  {
    id: "fb-unlock",
    name: "脸书白号卡网",
    publisher: "脸书资源严选",
    rating: 4.4,
    reviews: 3500,
    downloads: "1万+",
    ageRating: "18+",
    description: "专业脸书账号与虚拟卡资源交易平台，提供稳定可靠的营销资源服务。",
    icon: "https://www.584136.xyz/%E5%A4%B4%E5%83%8F/telegam@fb180.jpg",
    url: "https://fh10.zmfaka.cn/item/c24vp9/",
    tags: ["资源", "营销"]
  },
  {
    id: "fb-accounts",
    name: "3万多个未180脸书账号",
    publisher: "核心数据资源",
    rating: 4.5,
    reviews: 1200,
    downloads: "5000+",
    ageRating: "18+",
    description: "批量脸书账号资源文件（TXT格式），专为营销团队设计，方便管理。",
    icon: "data:image/svg+xml,%3Csvg viewBox='-4 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.151-.036c-2.803 0-5.074 2.272-5.074 5.074v53.841c0 2.803 2.271 5.074 5.074 5.074h45.774c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.902-20.31h-31.946z' fill='%23F9CA06'/%3E%3Cpath d='M56.008 20.316v1h-12.799s-6.312-1.26-6.129-6.708c0 0 .208 5.708 6.004 5.708h12.924z' fill='%23F7BC04'/%3E%3Cpath d='M37.106-.036v14.561c0 1.656 1.104 5.792 6.104 5.792h12.799l-18.903-20.353z' opacity='.5' fill='%23ffffff'/%3E%3Cpath d='M18.763 43.045h-3.277v10.047c0 .414-.324.738-.756.738-.414 0-.738-.324-.738-.738v-10.047h-3.259c-.36 0-.648-.288-.648-.684 0-.36.288-.648.648-.648h8.03c.36 0 .648.288.648.685 0 .359-.288.647-.648.647zm11.7 10.803c-.216 0-.415-.089-.541-.27l-3.727-4.97-3.745 4.97c-.126.181-.324.27-.54.27-.396 0-.72-.306-.72-.72 0-.144.036-.306.144-.432l3.889-5.131-3.619-4.826c-.09-.126-.144-.27-.144-.414 0-.343.288-.721.72-.721.216 0 .432.108.576.288l3.439 4.627 3.439-4.646c.126-.18.324-.27.541-.27.378 0 .738.306.738.721 0 .144-.036.288-.126.414l-3.619 4.808 3.89 5.149c.09.126.126.27.126.415 0 .396-.325.738-.721.738zm11.195-10.803h-3.277v10.047c0 .414-.323.738-.756.738-.414 0-.738-.324-.738-.738v-10.047h-3.259c-.36 0-.648-.288-.648-.684 0-.36.288-.648.648-.648h8.03c.36 0 .648.288.648.685.001.359-.287.647-.648.647z' fill='%23ffffff'/%3E%3C/svg%3E",
    url: "https://quwenjian.cc/share/download?key=0d5a04e745f8d04ae5c327f7c4ccb29232daefa6dfb37ab79b6542c57174d64f&code=53HWU",
    tags: ["数据", "账号"]
  }
];

// --- Helper Components ---

// 1. Image Component with Skeleton Loading State
const AppIcon = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-[72px] h-[72px] rounded-[18px] overflow-hidden flex-shrink-0 bg-slate-100 ring-1 ring-slate-100/50">
      {!loaded && !error && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-all duration-500 ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          setError(true);
          setLoaded(true);
          const target = e.target as HTMLImageElement;
          target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23f1f5f9' width='100' height='100'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%23cbd5e1' font-size='40'%3E?%3C/text%3E%3C/svg%3E";
        }}
      />
    </div>
  );
};

// 2. Individual App Card Component
const AppCard = ({ 
  app, 
  highlighted, 
  onShare 
}: { 
  app: App; 
  highlighted: boolean; 
  onShare: (app: App) => void 
}) => {
  const formatReviews = (count: number): string => {
    if (count >= 100000000) return `${(count / 100000000).toFixed(1)}亿`;
    if (count >= 10000000) return `${Math.floor(count / 10000000)}千万`;
    if (count >= 10000) return `${(count / 10000).toFixed(1)}万`;
    return count.toString();
  };

  return (
    <Card
      id={app.name}
      className={`group relative p-6 border border-slate-100 bg-white/80 backdrop-blur-sm transition-all duration-500 rounded-3xl overflow-hidden
        ${highlighted 
          ? 'ring-2 ring-blue-500/50 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] scale-[1.02] z-10' 
          : 'shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1'
        }`}
    >
      {/* Background Gradient for subtle depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-5 mb-5">
          <AppIcon src={app.icon} alt={app.name} />
          
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-xl text-slate-900 truncate tracking-tight mb-1 group-hover:text-blue-600 transition-colors">
                {app.name}
              </h3>
              {app.tags && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 hidden sm:inline-block">
                  {app.tags[0]}
                </span>
              )}
            </div>
            
            <p className="text-sm text-slate-500 font-medium truncate mb-2 flex items-center gap-1">
              {app.publisher}
              <CheckCircle2 className="w-3 h-3 text-blue-500/60" />
            </p>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md">
                <span className="font-bold text-slate-700">{app.rating}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-slate-400 text-xs">|</span>
              <span className="text-slate-500 text-xs">{formatReviews(app.reviews)} 评价</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-5 p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50">
          <div className="text-center border-r border-slate-200/60">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-0.5 font-semibold">下载量</div>
            <div className="font-bold text-slate-700">{app.downloads}</div>
          </div>
          <div className="text-center">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-0.5 font-semibold">年龄分级</div>
            <div className="font-bold text-slate-700">{app.ageRating}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[14px] text-slate-600 line-clamp-2 mb-6 leading-relaxed h-[42px] opacity-90">
          {app.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          {app.url ? (
            <a href={app.url} target="_blank" rel="noopener noreferrer" className="flex-1 outline-none">
              <Button className="w-full h-11 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all active:scale-[0.98] font-medium text-[15px] group/btn border-none">
                <Download className="w-4.5 h-4.5 mr-2 transition-transform group-hover/btn:-translate-y-0.5" />
                {app.id === "fb-accounts" ? "获取资源" : "获取应用"}
              </Button>
            </a>
          ) : (
            <Button className="flex-1 h-11 rounded-full bg-slate-900 text-white shadow-lg shadow-slate-900/20 active:scale-[0.98] font-medium text-[15px]">
              <Download className="w-4.5 h-4.5 mr-2" />
              安装
            </Button>
          )}
          
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 rounded-full border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all active:scale-90 shadow-sm"
            onClick={() => onShare(app)}
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

// --- Main Component ---

const SoftwareDownload = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedApp, setHighlightedApp] = useState<string | null>(null);

  // Memoized filtered list for performance optimization
  const filteredApps = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return APPS_DATA;
    return APPS_DATA.filter(app =>
      app.name.toLowerCase().includes(query) ||
      app.publisher.toLowerCase().includes(query) ||
      app.description.toLowerCase().includes(query) ||
      app.tags?.some(tag => tag.includes(query))
    );
  }, [searchQuery]);

  const handleShare = async (app: App) => {
    let url = `${window.location.origin}/rj?app=${encodeURIComponent(app.name)}`;
    
    // Custom Deep Link Logic for FB
    if (app.id === "fb-unlock") {
      url = "https://www.584136.xyz/rj?app=fb";
    }

    if (navigator.share) {
      try {
        await navigator.share({ title: app.name, text: app.description, url });
      } catch (error) {
        console.log("Share cancelled or failed", error);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ 
        title: "链接已复制", 
        description: "分享链接已复制到剪贴板",
        className: "bg-white/90 backdrop-blur-md border-slate-200" 
      });
    }).catch(() => {
      toast({ 
        title: "复制失败", 
        description: "请手动复制链接", 
        variant: "destructive" 
      });
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let appName = params.get('app');

    // Logic: Map 'fb' to specific app name
    if (appName === 'fb') {
      appName = '脸书白号卡网';
    }

    if (appName) {
      setHighlightedApp(appName);
      // Wait for DOM render
      requestAnimationFrame(() => {
        setTimeout(() => {
          const element = document.getElementById(appName as string);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      });
      
      const timer = setTimeout(() => setHighlightedApp(null), 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <PageLayout
      title="应用商店"
      description="精选优质应用与资源，安全高速下载"
      backLabel="返回首页"
      showParticles={false}
      className="bg-slate-50/50"
    >
      {/* Aesthetic decorative background blob */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/40 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Search Bar - Sticky & Glassmorphism */}
      <div className="sticky top-4 z-40 mb-10 px-2">
        <div className="relative max-w-2xl mx-auto group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none z-10 transition-colors group-focus-within:text-blue-500" />
            <Input
              type="text"
              placeholder="搜索应用、开发商或描述..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 h-14 w-full rounded-full border-slate-200 bg-white/70 backdrop-blur-xl text-lg text-slate-800 shadow-sm hover:shadow-md transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-400 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      {filteredApps.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">未找到相关应用</h3>
          <p className="text-slate-500">尝试更换关键词，或者浏览下方的推荐列表</p>
          <Button 
            variant="link" 
            className="mt-4 text-blue-600" 
            onClick={() => setSearchQuery("")}
          >
            清除搜索
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 px-2 pb-20">
          {filteredApps.map((app, index) => (
            <div 
              key={app.id} 
              className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-backwards"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <AppCard 
                app={app} 
                highlighted={highlightedApp === app.name} 
                onShare={handleShare}
              />
            </div>
          ))}
        </div>
      )}

      {/* Safety Tip Card - Enhanced Design */}
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div className="p-1 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50">
          <Card className="p-6 border-none bg-white/60 backdrop-blur-md rounded-[20px] flex md:items-center gap-5 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 text-white shadow-lg shadow-blue-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                官方安全认证
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                所有应用均经过人工检测与自动化扫描，确保无病毒、无恶意插件。请认准官方渠道下载，保护您的设备安全。
              </p>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default SoftwareDownload;