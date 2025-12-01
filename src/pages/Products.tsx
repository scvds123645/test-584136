import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Star, 
  Shield, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Send, 
  Check, 
  ChevronLeft 
} from 'lucide-react';

/* 
  -----------------------------------------------------------------
  MOCKED SHADCN UI COMPONENTS
  Assume these are imported from your @/components/ui directory.
  Implemented here as inline components for a copy-pasteable demo.
  -----------------------------------------------------------------
*/
const Button = ({ className, variant = "default", size = "default", children, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200",
    outline: "border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-600",
    ghost: "hover:bg-slate-100 text-slate-700",
  };
  const sizes = {
    default: "h-12 px-6 py-2",
    icon: "h-10 w-10",
  };
  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ className, variant = "default", children }) => {
  const variants = {
    default: "border-transparent bg-blue-100 text-blue-700 hover:bg-blue-200",
    outline: "text-slate-500 border-slate-200",
  };
  return (
    <div className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

import * as DialogPrimitive from "@radix-ui/react-dialog";
// Simulating the Shadcn Dialog structure for the demo
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogContentWrapper = ({ children, className }) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-[28px] ${className}`}>
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

/* 
  -----------------------------------------------------------------
  CUSTOM PAGE LAYOUT COMPONENT
  -----------------------------------------------------------------
*/
const PageLayout = ({ children, backLabel = "返回首页" }) => {
  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] font-sans selection:bg-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Header */}
        <header className="mb-8">
          <Button variant="ghost" className="rounded-full pl-2 pr-4 hover:bg-white/50 text-slate-500">
            <ChevronLeft className="mr-1 h-5 w-5" />
            {backLabel}
          </Button>
        </header>
        {children}
      </div>
    </div>
  );
};

/* 
  -----------------------------------------------------------------
  DATA STRUCTURE
  -----------------------------------------------------------------
*/
const products = [
  {
    id: 1,
    name: "脸书白号",
    description: "企业级账号解决方案，3天质保服务，安全稳定可靠",
    price: "2",
    currency: "¥",
    unit: "/个",
    salesCount: "5418",
    stock: "999+",
    features: [
      "真实IP注册，账号安全有保障",
      "账号注册时长30-180天，活跃度高",
      "Cookie登录方式，即开即用",
      "购买后立即交付，无需等待"
    ],
    badge: "企业优选",
    trustBadges: [
      { label: "已服务", value: "5000+", icon: Star },
      { label: "好评率", value: "98.5%", icon: Shield },
      { label: "响应", value: "<2h", icon: Clock }
    ]
  }
];

const contactLinks = [1, 2, 3]; // Placeholder for loop

/* 
  -----------------------------------------------------------------
  MAIN COMPONENT: ProductsPage
  -----------------------------------------------------------------
*/
const ProductsPage = () => {
  return (
    <PageLayout backLabel="返回首页">
      
      {/* 1. Header Section */}
      <section className="flex flex-col items-center text-center space-y-6 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Promotion Chip */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
          <Sparkles className="w-4 h-4 text-blue-600 fill-blue-200" />
          <span className="text-sm font-semibold text-blue-900">
            限时优惠 · 批量购买享更多折扣
          </span>
        </div>

        {/* Titles */}
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            专业服务商
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            提供高质量Facebook白号，严格质量把控，完善售后保障体系，
            助您业务快速起飞。
          </p>
        </div>
      </section>

      {/* 2. Product Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      {/* 5. Bottom Info Card (Security) */}
      <section className="w-full max-w-4xl mx-auto">
        <div className="group relative overflow-hidden bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-lg transition-all duration-500 border border-slate-100">
          {/* Decorative background blob */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
            <div className="flex-shrink-0 w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold text-slate-900">全方位安全保障</h3>
              <p className="text-slate-500 leading-relaxed">
                所有账号均经过严格质量检测，确保环境纯净。我们提供7x24小时技术支持，
                遇到任何非人为账号封禁问题，承诺质保期内免费更换。
              </p>
            </div>

            <Button variant="outline" className="rounded-full h-12 px-8 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600">
              了解更多
            </Button>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

/* 
  -----------------------------------------------------------------
  SUB-COMPONENT: Product Card
  -----------------------------------------------------------------
*/
const ProductCard = ({ product }) => {
  return (
    <div className="group flex flex-col bg-white rounded-[2rem] p-2 border-0 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out">
      {/* Card Content Wrapper */}
      <div className="flex-1 flex flex-col p-5 space-y-6">
        
        {/* Header: Title + Badge */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-slate-900">{product.name}</h3>
            <p className="text-sm text-slate-500 leading-snug line-clamp-2">
              {product.description}
            </p>
          </div>
          <Badge className="rounded-full bg-blue-100 text-blue-700 hover:bg-blue-100 px-3 py-1 flex-shrink-0">
            {product.badge}
          </Badge>
        </div>

        {/* Pricing Section */}
        <div className="flex items-end justify-between border-b border-slate-50 pb-6">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-blue-600 mr-0.5">{product.currency}</span>
            <span className="text-5xl font-bold text-blue-600 tracking-tighter">{product.price}</span>
            <span className="text-slate-400 font-medium ml-1">{product.unit}</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
              库存: {product.stock}
            </span>
            <span className="text-xs text-slate-400">
              已售: {product.salesCount}
            </span>
          </div>
        </div>

        {/* Feature List */}
        <ul className="space-y-3 flex-1">
          {product.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center">
                <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
              </div>
              <span className="text-sm text-slate-600 font-medium">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Trust Badges Grid */}
        <div className="bg-slate-50 rounded-2xl p-4 grid grid-cols-3 gap-2">
          {product.trustBadges.map((badge, idx) => {
            const IconComponent = badge.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center space-y-1">
                <div className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center mb-1">
                  <IconComponent className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-bold text-slate-900 leading-none">{badge.value}</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500">{badge.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-2 mt-auto">
        <ContactDialog triggerText="咨询购买" />
      </div>
    </div>
  );
};

/* 
  -----------------------------------------------------------------
  SUB-COMPONENT: Contact Dialog (Reused Logic)
  -----------------------------------------------------------------
*/
const ContactDialog = ({ triggerText }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full rounded-[1.5rem] h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100 transition-all active:scale-95"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {triggerText}
        </Button>
      </DialogTrigger>
      
      <DialogContentWrapper className="bg-white/95 backdrop-blur-xl border-none p-0 gap-0 max-w-[360px] overflow-hidden shadow-2xl">
        {/* Dialog Header */}
        <div className="bg-blue-50/50 p-8 pb-6 text-center space-y-4">
          <div className="mx-auto w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm ring-4 ring-white/50">
            <Sparkles className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">专业服务团队</h2>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              我们的客服团队将为您提供<br/>一对一专业咨询服务
            </p>
          </div>
        </div>

        {/* Content List */}
        <div className="p-5 space-y-3 bg-white">
          {contactLinks.map((item, index) => (
            <a
              key={index}
              href="https://t.me/Facebookkf_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 rounded-[20px] bg-white hover:bg-blue-50 border border-slate-100 hover:border-blue-100 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-slate-50 group-hover:bg-blue-100 group-hover:text-blue-600 text-slate-400 flex items-center justify-center transition-colors">
                  <Send className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-slate-800 group-hover:text-blue-900">Telegram</span>
                  <span className="text-xs text-slate-400 font-medium">@Facebookkf_bot</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-white/50 transition-colors">
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transform group-hover:translate-x-0.5 transition-all" />
              </div>
            </a>
          ))}
        </div>
      </DialogContentWrapper>
    </Dialog>
  );
};

export default ProductsPage;
