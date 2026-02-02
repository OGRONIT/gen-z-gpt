"use client";
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Star, Flame } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 px-4 flex flex-col items-center overflow-hidden">
      
      {/* Dynamic Floating "Stickers" - Gen-Z Aesthetic */}
      <motion.div 
        animate={{ rotate: [-5, 5, -5], y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] hidden lg:block"
      >
        <div className="bg-yellow-300 border-2 border-black p-3 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-12">
          <Flame size={24} fill="currentColor" />
        </div>
      </motion.div>

      <motion.div 
        animate={{ rotate: [5, -5, 5], y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-[12%] hidden lg:block"
      >
        <div className="bg-[#B4F8C8] border-2 border-black p-3 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-12">
          <Star size={24} fill="currentColor" />
        </div>
      </motion.div>

      {/* Modern Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative flex items-center gap-3 px-6 py-2 rounded-full border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer mb-12"
      >
        <span className="flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF5F1F]"></span>
        </span>
        <span className="text-xs font-black uppercase tracking-widest text-black">
          V2.0 LIVE ON PRODUCT HUNT
        </span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </motion.div>

      {/* Main Headline */}
      <div className="text-center max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-block"
        >
          <h1 className="text-6xl md:text-9xl font-black tracking-tightest font-montserrat uppercase leading-[0.85]">
            THE <span className="text-[#FF5F1F] italic drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">AURA</span>
          </h1>
          {/* Scribble underline effect */}
          <div className="h-4 bg-yellow-300 w-full absolute bottom-2 -z-10 -rotate-1" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-8xl font-black tracking-tightest uppercase italic mt-2"
        >
          ENGINE.
        </motion.h2>
      </div>

      {/* Narrative Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-[#1A1A1A]/70 text-lg md:text-2xl max-w-2xl text-center font-bold leading-tight"
      >
        Stop sounding like a corporate NPC. Developed by <span className="bg-black text-white px-2 py-0.5">CoDaddy</span> to inject 
        <span className="text-[#FF5F1F]"> high-signal rizz </span> into your updates.
      </motion.p>

      {/* CTA / Trust Markers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-wrap items-center justify-center gap-6 mt-16"
      >
        <div className="flex items-center gap-3 bg-white border-2 border-black px-6 py-3 rounded-2xl font-black text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Zap size={18} fill="#FFD700" className="text-black" /> SECURE THE BAG
        </div>
        <div className="flex items-center gap-3 bg-white border-2 border-black px-6 py-3 rounded-2xl font-black text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <ShieldCheck size={18} fill="#B4F8C8" className="text-black" /> NO CAP AI
        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FDFDFF] to-transparent pointer-events-none" />
    </section>
  );
}