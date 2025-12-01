import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
}

const SEO = ({
  title,
  description,
  keywords = "Facebook账号,脸书白号,Cookie工具,社交媒体工具,账号管理",
  ogType = "website",
  canonicalUrl,
  structuredData
}: SEOProps) => {
  const fullTitle = `${title} | Facebook账号服务平台`;
  const siteUrl = "https://www.584136.xyz";
  const canonical = canonicalUrl || `${siteUrl}${window.location.pathname}`;
  
  return (
    <Helmet>
      {/* 基础Meta标签 */}
      <html lang="zh-CN" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* 移动优化 */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#0071e3" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Facebook账号服务平台" />
      <meta property="og:locale" content="zh_CN" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      
      {/* 规范URL */}
      <link rel="canonical" href={canonical} />
      
      {/* 结构化数据 */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* 额外Meta标签 */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Facebook账号服务平台" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    </Helmet>
  );
};

export default SEO;