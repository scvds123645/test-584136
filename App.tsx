import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Tools from './Tools';
import ChatBot from './components/ChatBot';
import ImageAnalyzer from './components/ImageAnalyzer';

// Placeholder components for existing routes to prevent crashes
// In a real scenario, these would be the actual existing files
const Placeholder = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">{title}</h1>
      <p className="text-slate-500">Feature not implemented in this demo.</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Tools />} />
        
        {/* New Features */}
        <Route path="/chat" element={<ChatBot />} />
        <Route path="/image-analysis" element={<ImageAnalyzer />} />

        {/* Placeholders for existing routes mentioned in Tools.tsx */}
        <Route path="/14" element={<Placeholder title="14位数字提取" />} />
        <Route path="/discord" element={<Placeholder title="账号信息格式化" />} />
        <Route path="/jh" element={<Placeholder title="Cookie 筛选" />} />
        <Route path="/cookie" element={<Placeholder title="Cookie 格式转换" />} />
        <Route path="/qc" element={<Placeholder title="文本去重工具" />} />
        <Route path="/yopmail" element={<Placeholder title="域名转邮箱后缀" />} />
        <Route path="/rj" element={<Placeholder title="软件商店" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;