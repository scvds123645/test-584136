import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Upload, ImageIcon, X, Loader2, ScanEye, Sparkles, ArrowRight } from 'lucide-react';
import PageLayout from './PageLayout';
import { Card } from './ui/card';

const ImageAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('详细描述这张图片的内容，并指出其中有趣或关键的细节。');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setSelectedImage(objectUrl);
      setResult(''); // Clear previous result

      // Convert to base64 for API
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64Data = base64String.split(',')[1];
        setImageBase64(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageBase64(null);
    setResult('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!imageBase64) return;

    setIsLoading(true);
    setResult('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: {
          parts: [
            {
              inlineData: {
                data: imageBase64,
                mimeType: 'image/jpeg', // Assuming jpeg/png for simplicity, or detect from file
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      setResult(response.text || "No analysis generated.");

    } catch (error) {
      console.error("Analysis error:", error);
      setResult("Error analyzing image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout
      title="图片智能分析"
      description="上传图片，让 Gemini 3 Pro 为您深度解析画面内容"
      backLabel="返回工具列表"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Upload & Input */}
        <div className="space-y-6">
          <Card className="p-6 md:p-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-600" />
              上传图片
            </h2>
            
            {!selectedImage ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="
                  border-2 border-dashed border-slate-200 rounded-2xl p-10
                  flex flex-col items-center justify-center gap-4
                  cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all group
                "
              >
                <div className="w-16 h-16 rounded-full bg-slate-50 group-hover:bg-white group-hover:shadow-md flex items-center justify-center transition-all duration-300">
                  <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-slate-700">点击选择图片</p>
                  <p className="text-sm text-slate-400 mt-1">支持 JPG, PNG, WebP</p>
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 group">
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  className="w-full h-auto max-h-[400px] object-contain bg-slate-50" 
                />
                <button 
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-red-500 text-white rounded-full backdrop-blur-sm transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageSelect} 
            />

            <div className="mt-6 space-y-3">
              <label className="block text-sm font-medium text-slate-700">提示词 (Prompt)</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 bg-slate-50 border-none rounded-xl text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all resize-none"
                rows={3}
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!selectedImage || isLoading}
              className="
                w-full mt-6 py-3 px-4 rounded-xl font-medium
                flex items-center justify-center gap-2
                bg-blue-600 text-white shadow-lg shadow-blue-600/20
                hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none
                transition-all duration-300
              "
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  正在分析...
                </>
              ) : (
                <>
                  <ScanEye className="w-5 h-5" />
                  开始分析
                </>
              )}
            </button>
          </Card>
        </div>

        {/* Right Column: Result */}
        <div className="h-full">
          <Card className={`h-full p-6 md:p-8 min-h-[400px] flex flex-col ${result ? 'bg-white' : 'bg-slate-50/50 border-dashed'}`}>
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              分析结果
            </h2>

            {result ? (
              <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-li:marker:text-blue-500">
                <div className="whitespace-pre-wrap text-slate-700">{result}</div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-50">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                  <ArrowRight className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-slate-500 max-w-xs">
                  上传图片并点击“开始分析”后，AI 识别结果将显示在这里。
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ImageAnalyzer;