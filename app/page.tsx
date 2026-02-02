"use client";
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, Zap, Rocket } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Sub-component for individual history cards to handle their own copy state
function HistoryCard({ item }: { item: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.transformed_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border-[3px] border-black p-6 rounded-[30px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between group hover:translate-y-[-2px] transition-all"
    >
      <div>
        <p className="font-bold text-lg leading-snug italic mb-4 line-clamp-3">"{item.transformed_text}"</p>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 text-[10px] font-black uppercase bg-gray-50 hover:bg-black hover:text-white px-3 py-1.5 rounded-lg border border-black transition-all mb-4"
        >
          {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
          {copied ? "SECURED" : "COPY DRIP"}
        </button>
      </div>
      <div className="flex justify-between items-center border-t border-black/5 pt-4">
        <span className="text-[10px] font-black uppercase opacity-40 italic">Aura Intensity: {item.intensity}</span>
        <div className={`w-3 h-3 rounded-full border border-black ${item.intensity === 5 ? 'bg-purple-600 animate-pulse shadow-[0_0_8px_rgba(147,51,234,0.5)]' : 'bg-green-400'}`} />
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [intensity, setIntensity] = useState(3);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const vibeConfig = useMemo(() => {
    const configs = [
      { color: 'bg-blue-400', label: 'Chill', emoji: '❄️' },
      { color: 'bg-green-400', label: 'Main Character', emoji: '💅' },
      { color: 'bg-yellow-400', label: 'Slay', emoji: '✨' },
      { color: 'bg-orange-500', label: 'Demon Mode', emoji: '😈' },
      { color: 'bg-purple-600', label: 'Full Sigma', emoji: '🗿' },
    ];
    return configs[intensity - 1] || configs[2];
  }, [intensity]);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('transforms')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (!error && data) setHistory(data);
    } catch (err) {
      console.error("History fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const playSound = (isSigma: boolean) => {
    try {
      const audioPath = isSigma 
        ? '/sounds/Sigma Rules ( Meme Sound Effect ) - Creator Sound Effect.mp3' 
        : '/sounds/fah-469417.mp3';
      const audio = new Audio(audioPath);
      audio.volume = 0.4;
      audio.play().catch(() => console.log("Audio blocked: interact with page first"));
    } catch (e) {
      console.error("Audio error", e);
    }
  };

  const handleTransform = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch('/api/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, intensity }),
      });
      const data = await res.json();
      setOutput(data.transformedText);
      playSound(intensity === 5);
      setTimeout(fetchHistory, 800);
    } catch (err) {
      setOutput("AI got cooked. Try again, G.");
    }
    setLoading(false);
  };

  const shakeAnimation = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      x: intensity === 5 ? [0, -5, 5, -5, 5, 0] : 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-[#1A1A1A] font-sans p-4 md:p-8 selection:bg-yellow-200">
      <nav className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Zap className="text-white" fill="white" size={24} />
          </div>
          <span className="font-black text-2xl tracking-tighter uppercase italic">Gen-Z GPT</span>
        </div>
        <div className="hidden md:flex gap-4">
          <span className="bg-white border-2 border-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            v1.0 Beta
          </span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="bg-white border-[3px] border-black rounded-[40px] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-center mb-6">
                <span className="font-black text-xs uppercase tracking-widest opacity-40">Your Corporate Yap</span>
                <div className={`px-4 py-1 rounded-full text-white font-black text-[10px] uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${vibeConfig.color}`}>
                  {vibeConfig.label} {vibeConfig.emoji}
                </div>
              </div>

              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your boring business text here..."
                className="w-full h-64 bg-transparent outline-none text-2xl font-bold placeholder:text-gray-200 resize-none"
              />

              <div className="mt-8 flex flex-col md:flex-row items-center gap-6 border-t-2 border-gray-100 pt-8">
                <div className="flex-1 w-full space-y-2">
                  <div className="flex justify-between font-black text-[10px] uppercase opacity-50">
                    <span>Mid</span>
                    <span>Sigma</span>
                  </div>
                  <input 
                    type="range" min="1" max="5" value={intensity} 
                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                    className="w-full accent-black h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer border border-black"
                  />
                </div>
                <button 
                  onClick={handleTransform}
                  disabled={loading || !input}
                  className="w-full md:w-auto bg-[#FF5F1F] text-white px-10 py-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  {loading ? "COOKING..." : <><Sparkles size={20} /> TRANSFORM</>}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Output Section */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              {output ? (
                <motion.div 
                  key="output"
                  variants={shakeAnimation}
                  initial="initial"
                  animate="animate"
                  className="bg-[#B4F8C8] border-[3px] border-black rounded-[40px] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="bg-black text-white w-fit px-3 py-1 rounded-lg text-[10px] font-black uppercase mb-6">
                      Final Result
                    </div>
                    <p className="text-3xl font-black leading-tight italic">"{output}"</p>
                  </div>
                  <button 
                    onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                    className="mt-12 w-full bg-white border-2 border-black py-4 rounded-xl font-black flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 transition-all"
                  >
                    {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                    {copied ? "SECURED" : "COPY DRIP"}
                  </button>
                </motion.div>
              ) : (
                <div className="bg-yellow-300 border-[3px] border-black rounded-[40px] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center animate-bounce">
                    <Rocket size={32} />
                  </div>
                  <h3 className="font-black text-2xl uppercase tracking-tighter">Awaiting Motion</h3>
                  <p className="font-bold opacity-60 text-sm">Input your yapping on the left to start the transformation.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Recently Cooked History */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-black text-3xl uppercase italic tracking-tighter">Recently Cooked</h3>
            <div className="h-[2px] flex-1 bg-black/5" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
            {history.length > 0 ? history.map((item) => (
              <HistoryCard key={item.id} item={item} />
            )) : (
              <p className="col-span-full text-center font-bold opacity-30 uppercase tracking-widest">No history yet. Start cooking, G.</p>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-12 text-center font-black text-[10px] uppercase tracking-[0.4em] opacity-20">
        Narrative Coding by Ronit (CoDaddy) // Securing the bag 2026
      </footer>
    </div>
  );
}