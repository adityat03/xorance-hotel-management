
import React, { useState, useRef } from 'react';
import { Sparkles, Camera, Upload, Wand2, History, RotateCcw, Download } from 'lucide-react';
import { editImageWithNanoBanana } from '../services/geminiService';

const ImageMagic: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setEditedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;
    
    setIsProcessing(true);
    // Use the Gemini 2.5 Flash Image model ("Nano Banana")
    const result = await editImageWithNanoBanana(image, prompt);
    
    if (result) {
      setEditedImage(result);
      setHistory(prev => [result, ...prev].slice(0, 5));
    } else {
      alert("Failed to process image. Ensure your prompt is descriptive.");
    }
    setIsProcessing(false);
  };

  const reset = () => {
    setImage(null);
    setEditedImage(null);
    setPrompt('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">Powered by Nano Banana</span>
            </div>
            <h1 className="text-4xl font-bold font-serif">Room Experience Visualizer</h1>
            <p className="text-blue-100 max-w-lg">Re-imagine your stay. Describe any modification - from interior style changes to adding amenities - and our AI will visualize it for you.</p>
          </div>
          <Sparkles className="w-24 h-24 text-white/20 hidden lg:block" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden">
            {!image ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-video border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-blue-500" />
                </div>
                <div className="text-center">
                   <p className="font-bold text-slate-700">Upload Room Photo</p>
                   <p className="text-sm text-slate-400">or capture using your device camera</p>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Original View</p>
                    <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden shadow-inner">
                      <img src={image} className="w-full h-full object-cover" alt="Original" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-blue-500 uppercase tracking-widest">AI Visualization</p>
                    <div className="aspect-square bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center relative">
                      {isProcessing ? (
                        <div className="flex flex-col items-center gap-4 animate-pulse">
                          <Wand2 className="w-12 h-12 text-blue-400 animate-spin" />
                          <p className="text-sm text-slate-500 font-medium">Nano Banana is generating...</p>
                        </div>
                      ) : editedImage ? (
                        <>
                          <img src={editedImage} className="w-full h-full object-cover" alt="Edited" />
                          <button 
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = editedImage;
                              link.download = 'lumina-room-vision.png';
                              link.click();
                            }}
                            className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur rounded-lg shadow-lg hover:bg-white text-slate-700"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        </>
                      ) : (
                        <div className="text-center p-8">
                           <Sparkles className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                           <p className="text-sm text-slate-400">Visualized result will appear here</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                   <label className="text-sm font-bold text-slate-700">How would you like to modify this room?</label>
                   <div className="flex gap-2">
                     <input 
                       type="text"
                       placeholder="e.g., 'Add a retro cinematic filter', 'Place a bouquet of fresh roses on the table', 'Make it golden hour lighting'"
                       className="flex-1 px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-800"
                       value={prompt}
                       onChange={(e) => setPrompt(e.target.value)}
                       disabled={isProcessing}
                     />
                     <button 
                       onClick={handleEdit}
                       disabled={isProcessing || !prompt}
                       className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                     >
                       <Wand2 className="w-5 h-5" />
                       Visualize
                     </button>
                   </div>
                   <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                      {['Retro Filter', 'Golden Hour', 'Add Plants', 'Luxury Silk Sheets', 'Modern Art on Walls'].map(suggestion => (
                        <button 
                          key={suggestion}
                          onClick={() => setPrompt(suggestion)}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs rounded-full whitespace-nowrap transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                   </div>
                </div>

                <button 
                  onClick={reset}
                  className="w-full py-3 flex items-center justify-center gap-2 text-slate-400 hover:text-slate-600 text-sm font-medium border-t border-slate-100 pt-6"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset and upload new image
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-2 mb-6">
               <History className="w-5 h-5 text-slate-400" />
               <h3 className="font-bold text-slate-800">Recent Visions</h3>
             </div>
             
             <div className="space-y-4">
               {history.length === 0 ? (
                 <p className="text-sm text-slate-400 text-center py-8 italic">Your creative history will appear here.</p>
               ) : (
                 history.map((histImg, idx) => (
                   <div key={idx} className="group relative rounded-xl overflow-hidden cursor-pointer">
                     <img src={histImg} className="w-full aspect-video object-cover transition-transform group-hover:scale-110" />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={() => setEditedImage(histImg)} className="px-3 py-1 bg-white rounded-lg text-xs font-bold text-slate-800">View Result</button>
                     </div>
                   </div>
                 ))
               )}
             </div>
           </div>

           <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-lg">
             <h3 className="font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                Prompt Tips
             </h3>
             <ul className="space-y-3 text-sm text-slate-300">
                <li>&bull; Be specific about lighting (e.g., "Moonlit", "Candlelight").</li>
                <li>&bull; Specify textures like "Velvet", "Marble", or "Oak Wood".</li>
                <li>&bull; Use camera terms like "Macro shot", "Cinematic", or "HDR".</li>
                <li>&bull; Mention styles like "Minimalist", "Bohemian", or "Art Deco".</li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ImageMagic;
