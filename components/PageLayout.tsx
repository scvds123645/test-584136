import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageLayoutProps {
  title: string;
  description?: string;
  backLabel?: string;
  children: React.ReactNode;
  showBack?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  title, 
  description, 
  backLabel = "Back", 
  children,
  showBack = true 
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
        <div className="mb-6 md:mb-10 space-y-4">
          {showBack && (
            <button 
              onClick={() => navigate(-1)}
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
            >
              <div className="p-1 rounded-full group-hover:bg-blue-50 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              {backLabel}
            </button>
          )}
          
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-sm md:text-base text-slate-500 max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        <main className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;