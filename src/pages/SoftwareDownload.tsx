import React, { useState, useEffect } from 'react';
import { Search, Share, Star, ChevronLeft } from 'lucide-react';
import SEO from '@/components/SEO';

// 模拟数据保持不变
const MOCK_APPS = [
  {
    id: 1,
    name: "Facebook",
    category: "社交网络",
    rating: 4.2,
    reviews: "1.8亿",
    icon: "https://www.584136.xyz/%E5%A4%B4%E5%83%8F/Facebook_icon.webp",
    downloadUrl: "https://quwenjian.cc/share/download?key=b703e78f98bf6a75a8e08ce215e5fdb635803d58b049f17b99fd3232f5a1d46b&code=ULPHA",
    description: "与朋友、家人和世界保持联系。"
  },
  {
    id: 2,
    name: "Gmail",
    category: "效率工具",
    rating: 4.8,
    reviews: "1000万+",
    icon: "https://www.584136.xyz/%E5%A4%B4%E5%83%8F/Gmail_icon.webp",
    downloadUrl: "https://quwenjian.cc/share/download?key=8c3fc56d9b8fec6fbdeb859681d1e049bb3c789cdb536995e0c609a9c727bdc7&code=WSO6N",
    description: "安全、智能且易用的电子邮箱。"
  },
  {
    id: 3,
    name: "Outlook",
    category: "效率工具",
    rating: 4.6,
    reviews: "500万+",
    icon: "https://www.584136.xyz/%E5%A4%B4%E5%83%8F/Outlook_icon.webp",
    downloadUrl: "https://quwenjian.cc/share/download?key=08933905a824efbeea556cbef72061fc38d4a18699652ae99a0fbf6efac89d94&code=RZX6G",
    description: "高效管理您的邮件与日程。"
  },
  {
    id: 4,
    name: "Zoho Mail",
    category: "商务办公",
    rating: 4.5,
    reviews: "50万",
    icon: "https://www.584136.xyz/%E5%A4%B4%E5%83%8F/Zoho%20Mail_icon.webp",
    downloadUrl: "https://quwenjian.cc/share/download?key=df5cd5c66b7241328f46efdc2604caf7b4363589ce1098483ff8f483ddc71938&code=13HA9",
    description: "安全的企业级加密邮箱。"
  },
  {
    id: 5,
    name: "Via浏览器",
    category: "实用工具",
    rating: 4.9,
    reviews: "200万",
    icon: "https://www.584136.xyz/%E5%A4%B4%E5%83%8F/Via_6.8.0.apk_icon.webp",
    downloadUrl: "https://res.viayoo.com/v1/via-release-cn.apk",
    description: "快速、轻量、极客的首选浏览器。"
  },
  {
    id: 6,
    name: "绿茶VPN",
    category: "网络工具",
    rating: 4.7,
    reviews: "85万",
    icon: "https://www.584136.xyz/%E5%A4%B4%E5%83%8F/%E7%BB%BF%E8%8C%B6VPN_icon.webp",
    downloadUrl: "https://quwenjian.cc/share/download?key=86241c3ad7502c7370372fdde2a1a423bb97f581ec8b7463aa9623754441e7f7&code=YIVYA",
    description: "安全、快速、私密的网络访问。"
  },
  {
    id: 7,
    name: "Discord",
    category: "社交聊天",
    rating: 4.8,
    reviews: "500万+",
    icon: "https://www.584136.xyz/%E5%A4%B4%E5%83%8F/Discord_icon.webp",
    downloadUrl: "https://quwenjian.cc/share/download?key=29eb683c5e92e7d340bbe7cff8c830369416921513ce89de55b602257758c119&code=E3A9B",
    description: "在这里谈话、聊天、聚会。"
  },
  {
    id: 8,
    name: "脸书白号卡网",
    category: "账号交易",
    rating: 4.4,
    reviews: "1万+",
    icon: "https://www.584136.xyz/%E5%A4%B4%E5%83%8F/telegam@fb180.jpg",
    downloadUrl: "https://fh10.zmfaka.cn/item/c24vp9/",
    description: "优质的海外账号交易平台。"
  },
  {
    id: 9,
    name: "3万多个未180脸书账号",
    category: "数据资源",
    rating: 5.0,
    reviews: "2000+",
    icon: `data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M14%202H6C4.9%202%204%202.9%204%204V20C4%2021.1%204.9%2022%206%2022H18C19.1%2022%2020%2021.1%2020%2020V8L14%202Z%22%20fill%3D%22%23007AFF%22%2F%3E%3Cpath%20d%3D%22M14%202V8H20%22%20fill%3D%22%230056B3%22%2F%3E%3Ctext%20x%3D%2212%22%20y%3D%2217%22%20font-family%3D%22sans-serif%22%20font-size%3D%226%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20text-anchor%3D%22middle%22%3ETXT%3C%2Ftext%3E%3C%2Fsvg%3E`,
    downloadUrl: "https://quwenjian.cc/share/download?key=0d5a04e745f8d04ae5c327f7c4ccb29232daefa6dfb37ab79b6542c57174d64f&code=53HWU",
    description: "海量FaceBook账号数据集合。"
  },
];

const SoftwareDownload = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedId, setHighlightedId] = useState(null); // 用于控制高亮状态

  // 修复：在组件挂载后手动检查 URL hash 并滚动
  useEffect(() => {
    // 稍微延迟一点执行，确保 DOM 元素已经渲染
    const timer = setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        
        if (element) {
          // 1. 平滑滚动到屏幕中间
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // 2. 提取应用ID并触发高亮动画
          const appId = id.replace('app-', '');
          setHighlightedId(Number(appId));
          
          // 3. 2秒后移除高亮
          setTimeout(() => setHighlightedId(null), 2000);
        }
      }
    }, 300); // 300ms 延迟通常足够 React 完成渲染

    return () => clearTimeout(timer);
  }, []);

  const filteredApps = MOCK_APPS.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.includes(searchQuery)
  );

  return (
    <>
      <SEO
        title="软件商店"
        description="下载常用社交和办公软件：Facebook、Gmail、Outlook、Discord、Via浏览器等，提供安全可靠的APK和应用程序下载"
        keywords="软件下载,Facebook下载,Gmail下载,Outlook下载,Discord下载,Via浏览器,应用商店"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "软件商店",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Android",
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "CNY",
            "lowPrice": "0"
          }
        }}
      />
      <div className="min-h-screen bg-[#F5F5F7] font-sans text-[#1d1d1f] pb-20 selection:bg-[#0071e3] selection:text-white cursor-default">
        
        {/* 顶部导航区域 */}
      <div className="px-5 pt-10 pb-6 md:pt-16 md:px-10 max-w-7xl mx-auto relative">
        
        {/* 返回按钮 */}
        <div className="flex w-full mb-4 md:absolute md:top-16 md:left-10 md:w-auto md:mb-0 z-20">
          <a 
            href="/tools" 
            className="flex items-center gap-0.5 text-[#0071e3] transition-opacity hover:opacity-70 group"
          >
            <ChevronLeft className="w-6 h-6 -ml-1.5 stroke-[2.5]" />
            <span className="text-[17px] font-medium">返回</span>
          </a>
        </div>

        <div className="flex flex-col gap-4 md:items-center md:gap-8">
          
          {/* iOS Large Title */}
          <h1 className="text-[34px] leading-[41px] md:text-5xl font-bold tracking-tight text-[#1d1d1f] text-left md:text-center">
            软件商店
          </h1>
          {/* iOS 风格搜索栏 */}
          <div className="relative w-full md:max-w-lg group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-[18px] w-[18px] text-[#86868b] group-focus-within:text-[#1d1d1f] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="搜索应用或资源"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#E5E5EA] text-[#1d1d1f] placeholder-[#86868b] rounded-[10px] py-2.5 pl-9 pr-4 text-[17px] leading-none focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* 主要内容列表 */}
      <div className="px-4 md:px-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {filteredApps.map((app) => (
          <AppCard 
            key={app.id} 
            app={app} 
            isHighlighted={highlightedId === app.id} 
          />
        ))}
      </div>
    </div>
    </>
  );
};

const AppCard = ({ app, isHighlighted }) => {
  return (
    // scroll-mt-32: 确保滚动时上方留出约 128px 的空间，不会紧贴顶部
    <div 
      id={`app-${app.id}`} 
      className={`group relative bg-white rounded-[20px] md:rounded-[2rem] p-5 md:p-6 flex flex-col 
      shadow-[0_2px_10px_rgb(0,0,0,0.03)] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)]
      transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
      hover:md:scale-[1.02] hover:md:shadow-[0_20px_40px_rgb(0,0,0,0.08)]
      active:scale-[0.96] scroll-mt-32
      ${isHighlighted ? 'ring-2 ring-[#0071e3] ring-offset-4' : ''}
      `}
    >
      
      <div className="flex items-start gap-4">
        {/* App Icon */}
        <div className="w-[64px] h-[64px] md:w-20 md:h-20 rounded-[14px] md:rounded-[22px] overflow-hidden border border-black/5 shadow-sm shrink-0 relative z-10 bg-gray-50">
          <img 
            src={app.icon} 
            alt={`${app.name} 应用图标`} 
            className="w-full h-full object-cover"
            onError={(e) => {e.currentTarget.src = "https://api.dicebear.com/7.x/shapes/svg?seed=Fallback"}} 
          />
        </div>
        
        {/* Info Section */}
        <div className="flex flex-col flex-1 pt-0.5 min-w-0">
          <div className="flex justify-between items-start">
            <div className="pr-2 flex-1 min-w-0">
              <h3 className="text-[17px] md:text-xl font-semibold text-[#1d1d1f] leading-tight tracking-tight truncate">
                {app.name}
              </h3>
              <p className="text-[13px] md:text-sm text-[#86868b] font-medium truncate mt-0.5">
                {app.category}
              </p>
            </div>
            
            {/* Get Button */}
            <a 
              href={app.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#eff0f2] text-[#0071e3] font-bold rounded-full px-5 py-1.5 text-[13px] md:text-sm uppercase tracking-wide
              md:bg-[#0071e3] md:text-white md:shadow-md md:shadow-[#0071e3]/20
              active:bg-[#0071e3]/10 md:active:bg-[#0071e3] md:active:brightness-90
              transition-all transform active:scale-95 shrink-0 no-underline text-center"
            >
              获取
            </a>
          </div>
          
          {/* Rating Row */}
          <div className="flex items-center gap-1 text-[11px] md:text-xs font-medium text-[#86868b] mt-1.5">
            <Star className="w-3 h-3 fill-[#86868b] text-[#86868b]" />
            <span className="tabular-nums">{app.rating}</span>
            <span className="mx-1 text-[#d1d1d6]">•</span>
            <span className="tabular-nums">{app.reviews}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-[#f5f5f7] flex items-center justify-between">
        {/* Description */}
        <p className="text-[#1d1d1f]/70 text-[13px] md:text-sm font-medium line-clamp-1 mr-4">
          {app.description}
        </p>
        {/* Share Button */}
        <button 
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5F5F7] text-[#0071e3] 
          transition-transform active:scale-90 hover:bg-[#E5E5EA]"
          aria-label="分享"
          onClick={() => {
              const baseUrl = window.location.href.split('#')[0];
              const shareUrl = `${baseUrl}#app-${app.id}`;
              
              if (navigator.share) {
                  navigator.share({
                      title: app.name,
                      url: shareUrl
                  }).catch(console.error);
              } else {
                  navigator.clipboard.writeText(shareUrl).then(() => {
                      alert("链接已复制到剪贴板：" + shareUrl);
                  }).catch(() => {
                      alert("分享链接：" + shareUrl);
                  });
              }
          }}
        >
          <Share className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

export default SoftwareDownload;
