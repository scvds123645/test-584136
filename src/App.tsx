import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// 1. 更改这里：引入 HashRouter 而不是 BrowserRouter
import { HashRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Tools from "./pages/Tools";
import CookieFilter from "./pages/CookieFilter";
import CookieConverter from "./pages/CookieConverter";
import TextDeduplicator from "./pages/TextDeduplicator";
import EmailDomainFormatter from "./pages/EmailDomainFormatter";
import DiscordFormatter from "./pages/DiscordFormatter";
import NumberExtractor from "./pages/NumberExtractor";
import NumberGenerator from "./pages/NumberGenerator"; 
import SoftwareDownload from "./pages/SoftwareDownload";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* 2. 更改这里：使用 HashRouter，并移除 basename */}
      {/* 注意：HashRouter 不需要 basename="/test-584136"，它会自动处理 # 后面的内容 */}
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/jh" element={<CookieFilter />} />
          <Route path="/cookie" element={<CookieConverter />} />
          <Route path="/qc" element={<TextDeduplicator />} />
          <Route path="/yopmail" element={<EmailDomainFormatter />} />
          <Route path="/discord" element={<DiscordFormatter />} />
          <Route path="/14" element={<NumberExtractor />} />
          <Route path="/14d" element={<NumberGenerator />} />
          <Route path="/rj" element={<SoftwareDownload />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;