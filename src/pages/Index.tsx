import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Sparkles, 
  ArrowRight, 
  Package, 
  Wrench, 
  Send 
} from 'lucide-react';

/* 
  ASSUMPTION: 
  These components are imported from your local shadcn/ui configuration.
  If you are using a different path, please adjust the imports accordingly.
*/
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const ContactMePage = () => {
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Set document title on mount
  useEffect(() => {
    document.title = "联系我";
  }, []);

  // Contact list data for the modal
  const contactOptions = [1, 2, 3];

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* 
        --- Background Decorative Blobs (Optional for extra Material vibe) ---
        Added subtle background gradients to enhance the 'surface' feel 
      */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

      {/* Main Content Container */}
      <main className="w-full max-w-md flex flex-col items-center text-center space-y-8 z-10 animate-in fade-in zoom-in duration-500">
        
        {/* 1. Badge: Tonal Style */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-xs font-medium text-blue-700 tracking-wide">
            专业服务 · 品质保障
          </span>
        </div>

        {/* 2. Hero Icon Container */}
        <div className="relative group cursor-default">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-blue-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          
          {/* Icon Box */}
          <div className="relative w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2rem] flex items-center justify-center shadow-xl shadow-blue-200 transform transition-transform duration-300 hover:scale-105">
            <Mail className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* 3. Typography */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            联系我
          </h1>
          <p className="text-slate-500 text-base leading-relaxed max-w-[280px] mx-auto">
            很高兴认识您！如有任何问题，欢迎随时与我联系。
          </p>
        </div>

        {/* 4. Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full px-4 sm:px-0 pt-4">
          {/* Dialog Trigger (Primary) */}
          <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
            <DialogTrigger asChild>
              <Button 
                className="flex-1 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 text-lg font-medium transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                <Send className="w-5 h-5 mr-2" />
                立即联系
                <ArrowRight className="w-5 h-5 ml-1 opacity-80" />
              </Button>
            </DialogTrigger>

            {/* Dialog Content (Modal) */}
            <DialogContent className="bg-white/95 backdrop-blur-xl rounded-[28px] p-0 gap-0 border-none shadow-2xl max-w-[340px] sm:max-w-md overflow-hidden">
              
              {/* Dialog Header Area */}
              <div className="bg-blue-50/50 p-6 pb-4 text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <DialogHeader className="space-y-1">
                  <DialogTitle className="text-2xl font-bold text-slate-800 text-center">
                    专业服务团队
                  </DialogTitle>
                  <DialogDescription className="text-slate-500 text-center text-sm leading-relaxed">
                    我们的客服团队将为您提供<br/>一对一专业咨询服务
                  </DialogDescription>
                </DialogHeader>
              </div>

              {/* Contact List */}
              <div className="p-4 space-y-2 bg-white">
                {contactOptions.map((item, index) => (
                  <a
                    key={index}
                    href="https://t.me/Facebookkf_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-blue-50 group transition-colors duration-200 cursor-pointer border border-transparent hover:border-blue-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                        <Send className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-semibold text-slate-800">Telegram</span>
                        <span className="text-xs text-slate-500">@Facebookkf_bot</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Navigation Button (Secondary) */}
          <Button 
            variant="outline"
            onClick={() => navigate('/products')}
            className="flex-1 h-14 rounded-full border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 text-lg font-medium transition-all"
          >
            <Package className="w-5 h-5 mr-2" />
            查看商品
          </Button>
        </div>
      </main>

      {/* 5. Footer / Floating Action */}
      <div className="mt-12 sm:absolute sm:bottom-8 sm:right-8">
        <button
          onClick={() => navigate('/tools')}
          className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/50 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
             <Wrench className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
          </div>
          <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 pr-1">
            工具箱
          </span>
        </button>
      </div>

    </div>
  );
};

export default ContactMePage;
