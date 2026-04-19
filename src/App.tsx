/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, Calendar, MapPin, Ticket, User, ArrowRight, 
  Star, Heart, Car, Camera, Sparkles, Flower, Flower2,
  Castle, Waves, Wind, Mountain, Music, Sunset, Map, Footprints, Church, Home
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Components ---

const FloralOrnament = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none ${className}`}>
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20 text-rose-300">
      <path d="M60 10C65 30 90 30 110 40C90 50 90 75 60 80C30 75 30 50 10 40C30 30 55 30 60 10Z" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="60" cy="45" r="4" fill="currentColor" />
      <path d="M60 80V110M60 110L45 95M60 110L75 95" stroke="currentColor" strokeWidth="1" />
    </svg>
  </div>
);

const FloatingElement = ({ children, delay = 0, duration = 5, className = "" }: { children: React.ReactNode, delay?: number, duration?: number, className?: string }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const FloralWatermark = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05] flex items-center justify-center ${className}`}>
    <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-rose-900 rotate-12">
      <path d="M400 100C450 250 650 250 750 350C650 450 650 650 400 700C150 650 150 450 50 350C150 250 350 250 400 100Z" stroke="currentColor" strokeWidth="2" />
      <path d="M400 200C430 300 550 300 620 370C550 440 550 560 400 600C250 560 250 440 180 370C250 300 370 300 400 200Z" stroke="currentColor" strokeWidth="1" />
      <circle cx="400" cy="400" r="20" stroke="currentColor" strokeWidth="1" />
      <path d="M400 400L400 800M400 400L500 500M400 400L300 500" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" />
    </svg>
  </div>
);

const LocationCard = ({ alt, delay = 0, icon: Icon }: { alt: string, delay?: number, icon?: React.ElementType }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    className="bg-white/70 backdrop-blur-sm p-6 rounded-[2rem] border border-rose-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-4 group min-h-[160px] relative overflow-hidden"
  >
    <div className="absolute -top-4 -right-4 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
       <Flower className="w-32 h-32 text-rose-900" />
    </div>
    <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform relative z-10 ring-4 ring-white shadow-sm">
      {Icon && <Icon className="w-7 h-7" />}
    </div>
    <div className="relative z-10">
      <p className="text-[10px] uppercase tracking-[0.3em] text-rose-300 font-sans font-bold mb-1">Esplora</p>
      <h5 className="text-2xl font-serif text-[#4a3b37] italic leading-none">{alt}</h5>
    </div>
  </motion.div>
);

export default function App() {
  const [isRevealed, setIsRevealed] = useState(false);

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fb7185', '#ffffff', '#ffd1dc']
    });
  }, []);

  const handleReveal = () => {
    setIsRevealed(true);
    triggerConfetti();
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f472b6', '#ffffff']
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#fb7185', '#ffffff']
      });
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#fff9f8] text-[#5a4641] flex flex-col items-center justify-center p-4 md:p-8 overflow-x-hidden font-sans selection:bg-rose-100">
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="relative z-10 text-center max-w-2xl w-full"
          >
            <FloralWatermark className="opacity-[0.02]" />
            <FloatingElement delay={0.2} duration={6} className="mb-8 inline-block relative">
              <div className="absolute -top-12 -left-12 rotate-[-15deg] opacity-40 hidden md:block">
                <Flower2 className="w-20 h-20 text-rose-200" />
              </div>
              <div className="absolute -bottom-8 -right-8 rotate-[25deg] opacity-40 hidden md:block">
                <Flower className="w-16 h-16 text-rose-200" />
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-rose-200/50 blur-3xl rounded-full" />
                <div className="relative bg-white border border-rose-100 p-8 rounded-full shadow-2xl ring-8 ring-rose-50/50">
                  <Sparkles className="text-rose-400 w-12 h-12 md:w-16 md:h-16 mb-4 mx-auto animate-pulse" />
                  <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-tighter leading-none mb-2 text-rose-500">
                    30 <span className="text-[#4a3b37]">anni</span>
                  </h1>
                  <p className="text-rose-300 font-sans font-semibold tracking-[0.3em] uppercase text-xs">
                    Janare don't age
                  </p>
                </div>
              </div>
            </FloatingElement>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-2xl md:text-4xl font-light text-rose-900/60 leading-tight">
                Sei pronta a scoprire <br /> il tuo prossimo <span className="italic font-serif text-rose-500 font-medium underline underline-offset-8">Viaggio</span>?
              </h2>
              
              <button
                onClick={handleReveal}
                className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-300 bg-rose-400 rounded-full hover:bg-rose-500 active:scale-95 shadow-[0_20px_50px_rgba(244,114,182,0.3)] hover:shadow-[0_20px_80px_rgba(244,114,182,0.5)] overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative flex items-center gap-3 tracking-widest text-sm">
                  APRI IL REGALO
                  <Heart className="w-5 h-5 group-hover:scale-125 transition-transform" />
                </span>
              </button>
            </motion.div>

            {/* Background elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] aspect-square opacity-30 bg-[radial-gradient(circle_at_center,_#fed7e2_0%,_transparent_70%)] pointer-events-none" />
          </motion.div>
        ) : (
          <motion.div
            key="ticket-reveal"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="w-full max-w-5xl flex flex-col gap-12"
          >
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-block relative"
              >
                <div className="absolute -top-12 -right-12">
                  <FloatingElement duration={3}>
                    <Sparkles className="text-yellow-400 w-12 h-12 fill-yellow-200" />
                  </FloatingElement>
                </div>
                <p className="text-rose-500 font-serif italic text-2xl md:text-5xl max-w-4xl mx-auto leading-[1.3] md:leading-[1.4] tracking-tight py-4 drop-shadow-sm">
                  "Hai portato bellezza nella mia vita e voglio ricambiarlo con qualcosa di speciale"
                </p>
              </motion.div>
            </div>

            {/* Itinerary Explorations */}
            <div className="space-y-12">
              {/* Verso Ovest (Costa & Oceano) */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 px-4">
                  <div className="h-px flex-1 bg-rose-100" />
                  <h4 className="text-rose-400 font-accent text-4xl md:text-5xl">Scegli la Rotta Ovest · L'Oceano</h4>
                  <div className="h-px flex-1 bg-rose-100" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 max-w-6xl mx-auto w-full">
                  <LocationCard 
                    alt="Siviglia" 
                    icon={Music}
                    delay={0.6}
                  />
                  <LocationCard 
                    alt="Cadice" 
                    icon={Waves}
                    delay={0.7}
                  />
                  <LocationCard 
                    alt="Tarifa" 
                    icon={Wind}
                    delay={0.8}
                  />
                  <LocationCard 
                    alt="Malaga" 
                    icon={Waves}
                    delay={0.9}
                  />
                </div>
              </div>

              {/* Verso Est (Storia & Entroterra) */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 px-4">
                  <div className="h-px flex-1 bg-rose-100" />
                  <h4 className="text-rose-400 font-accent text-4xl md:text-5xl">Oppure la Rotta Est · La Storia</h4>
                  <div className="h-px flex-1 bg-rose-100" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 max-w-6xl mx-auto w-full">
                  <LocationCard 
                    alt="Cordoba" 
                    icon={Church}
                    delay={1.1}
                  />
                  <LocationCard 
                    alt="Granada" 
                    icon={Castle}
                    delay={1.2}
                  />
                  <LocationCard 
                    alt="Caminito del Rey" 
                    icon={Footprints}
                    delay={1.3}
                  />
                  <LocationCard 
                    alt="Malaga" 
                    icon={Waves}
                    delay={1.4}
                  />
                </div>
              </div>

              {/* L'Esperienza On The Road */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 px-4">
                  <div className="h-px flex-1 bg-rose-100" />
                  <h4 className="text-rose-400 font-accent text-4xl md:text-5xl">Paesaggi · On the Road</h4>
                  <div className="h-px flex-1 bg-rose-100" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 max-w-6xl mx-auto w-full">
                  <LocationCard 
                    alt="Colline Andaluse" 
                    icon={Mountain}
                    delay={1.5}
                  />
                  <LocationCard 
                    alt="Strade Infinite" 
                    icon={Map}
                    delay={1.6}
                  />
                  <LocationCard 
                    alt="Pueblos Blancos" 
                    icon={Home}
                    delay={1.7}
                  />
                  <LocationCard 
                    alt="Tramonto Andaluso" 
                    icon={Sunset}
                    delay={1.8}
                  />
                </div>
              </div>
            </div>

            {/* The Ticket (Boarding Pass) */}
            <div className="relative group px-4">
              <div className="absolute -top-10 -left-10 opacity-20 rotate-[-12deg] pointer-events-none">
                <FloralOrnament />
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-20 rotate-[168deg] pointer-events-none">
                <FloralOrnament />
              </div>
              <div className="absolute inset-0 bg-rose-200/20 blur-3xl -z-10 group-hover:bg-rose-200/30 transition-all duration-700 pointer-events-none" />
              
              <div className="flex flex-col md:flex-row ticket-gradient border border-rose-100 rounded-[2.5rem] overflow-hidden shadow-2xl ticket-pattern relative">
                <FloralWatermark />
                {/* Left Side */}
                <div className="flex-1 p-6 md:p-12 relative border-b md:border-b-0 md:border-r border-rose-200 border-dashed">
                  <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-4 -mr-[1px] flex-col justify-between py-6 z-20 pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-[#fff9f8]" />
                    ))}
                  </div>

                  <div className="flex justify-between items-start mb-8 md:mb-16">
                    <div>
                      <h4 className="text-rose-400 font-sans text-[10px] mb-2 uppercase tracking-[0.5em] font-bold">Priority Pass</h4>
                      <div className="flex flex-col gap-3">
                        <h5 className="text-4xl md:text-7xl font-bold font-serif uppercase flex items-center gap-2 md:gap-4 text-rose-500">
                          FCO <span className="text-xs md:text-sm font-sans tracking-widest text-[#4a3b37]/50 mt-auto pb-1 md:pb-3">Roma</span> <Plane className="w-5 h-5 md:w-8 md:h-8 text-rose-200 rotate-45" /> <span className="text-[#4a3b37]/80 text-rose-200 text-3xl md:text-7xl underline decoration-rose-100 decoration-dotted underline-offset-8">SVQ</span> <span className="text-xs md:text-sm font-sans tracking-widest text-[#4a3b37]/50 mt-auto pb-1 md:pb-3">Siviglia</span>
                        </h5>
                        <div className="h-px w-16 md:w-24 bg-rose-100" />
                        <h5 className="text-2xl md:text-4xl font-bold font-serif uppercase flex items-center gap-2 md:gap-3 opacity-30">
                          AGP <span className="text-[10px] font-sans tracking-widest mt-auto pb-1">Malaga</span> <Plane className="w-4 h-4 md:w-5 md:h-5 text-rose-200 rotate-[225deg]" /> <span className="text-[#4a3b37]/80 text-rose-200 text-xl md:text-4xl">FCO</span> <span className="text-[10px] font-sans tracking-widest mt-auto pb-1">Roma</span>
                        </h5>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-rose-300 font-sans text-[10px] uppercase mb-1 font-bold tracking-widest">Status</p>
                      <p className="font-bold text-rose-500 uppercase italic text-xs tracking-widest px-3 py-1 bg-rose-50 rounded-full border border-rose-100">Confirmed</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
                    <div>
                      <p className="flex items-center gap-2 text-rose-300 font-sans text-[10px] uppercase mb-2 font-semibold">
                        <User className="w-3 h-3 text-rose-400" /> Passeggera
                      </p>
                      <p className="text-xl md:text-2xl font-accent text-[#4a3b37] leading-none py-1">Iolanda Bernardo</p>
                    </div>
                    <div>
                      <p className="flex items-center gap-2 text-rose-300 font-sans text-[10px] uppercase mb-2 font-semibold">
                        <Calendar className="w-3 h-3 text-rose-400" /> Periodo
                      </p>
                      <p className="text-lg md:text-xl font-bold uppercase tracking-tight text-[#4a3b37]">13 - 23 Agosto</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <p className="flex items-center gap-2 text-rose-300 font-sans text-[10px] uppercase mb-2 font-semibold">
                        <MapPin className="w-3 h-3 text-rose-400" /> Itinerario
                      </p>
                      <p className="text-lg md:text-xl font-bold uppercase tracking-tight text-rose-500">Andalusia Road</p>
                    </div>
                  </div>

                  <div className="mt-16 flex flex-col md:flex-row md:items-center justify-between border-t border-rose-50 pt-8 gap-10">
                    <div className="flex gap-5">
                      <div className="h-16 w-1.5 bg-rose-300 rounded-full" />
                      <div className="space-y-2">
                        <p className="text-[10px] font-sans text-rose-400 font-bold uppercase tracking-widest italic">Viaggio on the road Andaluso</p>
                        <p className="text-xs text-rose-900/70 max-w-[500px] leading-relaxed italic font-serif">
                          11 giorni tra le meraviglie di questa terra. Dai vicoli di Siviglia al sole della Costa del Sol, fino all'adrenalina del Caminito del Rey. Deciderai tu, Iole, da che parte girare il volante e che storia scrivere in questa nostra avventura on the road.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Camera className="w-8 h-8 text-rose-200" />
                      <Car className="w-8 h-8 text-rose-200" />
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-80 bg-rose-50/30 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex justify-center items-start mb-12">
                     <div className="w-32 h-32 bg-white p-3 rotate-3 rounded-2xl shadow-xl border border-rose-100 relative z-10">
                        <div className="w-full h-full border-[2px] border-[#5a4641] grid grid-cols-4 grid-rows-4 gap-1">
                          {[...Array(16)].map((_, i) => (
                            <div key={i} className="bg-[#5a4641]" style={{ opacity: Math.random() > 0.3 ? 1 : 0.1 }} />
                          ))}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-rose-400 text-white p-2 rounded-full shadow-lg">
                          <Ticket className="w-4 h-4" />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                    <div className="border-b border-rose-100 pb-3 text-center">
                      <p className="font-bold text-lg text-rose-900/80 tracking-widest font-serif">BOARDING PASS</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-400 animate-ping opacity-75" />
                        <p className="font-bold text-sm text-rose-500 tracking-wider">PRONTA A PARTIRE</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 group/stub">
                    <div className="flex flex-col items-center gap-4">
                      <Ticket className="w-8 h-8 text-rose-100 group-hover/stub:text-rose-300 transition-colors" />
                      <div className="w-full h-10 flex gap-0.5 items-end justify-center opacity-30">
                        {[...Array(30)].map((_, i) => (
                          <div 
                            key={i} 
                            className="flex-1 bg-rose-900" 
                            style={{ height: `${30 + Math.random() * 70}%` }} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="mt-8 text-center"
            >
              <button 
                onClick={() => setIsRevealed(false)}
                className="text-rose-300 hover:text-rose-500 transition-all text-xs font-sans font-semibold uppercase tracking-[0.4em] flex items-center gap-2 mx-auto cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 rotate-180" /> Ricomincia da capo
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Floating Hearts & Flowers */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-rose-200/20"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "110%", 
              scale: Math.random() * 0.5 + 0.5,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: "-10%",
              rotate: Math.random() * 360 + 360
            }}
            transition={{ 
              duration: 20 + Math.random() * 20, 
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 20
            }}
          >
            <Heart fill="currentColor" size={Math.random() * 25 + 10} />
          </motion.div>
        ))}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`flower-${i}`}
            className="absolute text-rose-100/30"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "110%", 
              scale: Math.random() * 0.6 + 0.4,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: "-10%",
              rotate: Math.random() * 360 - 360
            }}
            transition={{ 
              duration: 25 + Math.random() * 15, 
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 15
            }}
          >
            {i % 2 === 0 ? <Flower size={Math.random() * 40 + 20} /> : <Flower2 size={Math.random() * 40 + 20} />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

