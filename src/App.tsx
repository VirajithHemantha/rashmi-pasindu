import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, VolumeX, Heart } from 'lucide-react';
import { Toaster } from 'sonner';

import { EnvelopeOpening } from './components/EnvelopeOpening';
import { Hero } from './components/Hero';
import { CoupleDetails } from './components/CoupleDetails';
import { CeremonyDetails } from './components/CeremonyDetails';
import { Location } from './components/Location';
import { Gallery } from './components/Gallery';
import { Countdown } from './components/Countdown';
import { RSVPForm } from './components/RSVPForm';
import { WishesSection } from './components/WishesSection';

export default function App() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/paulyudin-wedding-485932.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.preload = 'auto';

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleMusicStart = () => {
    setIsMusicPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  if (!showInvitation) {
    return (
      <EnvelopeOpening
        onComplete={() => setShowInvitation(true)}
        onMusicStart={handleMusicStart}
      />
    );
  }

  // Set the wedding date for the countdown
  const weddingDate = new Date("2026-05-28T10:00:00");

  return (
    <div className="font-sans text-stone-800 bg-brand-ivory overflow-hidden selection:bg-brand-beige-deep/20">
      <Toaster position="top-center" />
      
      {/* Premium Floating Music Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 w-12 sm:w-14 h-12 sm:h-14 bg-white/70 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(176,137,104,0.15)] flex items-center justify-center border border-brand-beige/50 text-brand-beige-deep hover:scale-105 transition-all duration-300"
      >
        {isMusicPlaying ? <Music className="w-5 h-5 sm:w-6 sm:h-6" /> : <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />}
      </motion.button>

      <Hero />
      
      <div className="py-24 sm:py-32 bg-gradient-to-b from-brand-ivory via-white to-brand-ivory relative">
        <CoupleDetails />
      </div>

      <div className="py-24 sm:py-32 bg-white relative">
        <CeremonyDetails />
      </div>

      <div className="py-24 sm:py-32 bg-gradient-to-b from-white via-brand-champagne/30 to-brand-ivory relative">
        <Location />
      </div>

      <div className="py-24 sm:py-32 bg-white relative">
        <Gallery />
      </div>

      <div className="py-24 sm:py-32 bg-gradient-to-b from-white to-brand-ivory relative">
          <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
            <span className="text-brand-beige-deep uppercase tracking-[0.4em] text-[10px] sm:text-[11px] font-bold drop-shadow-sm">
              The Wait Is Almost Over
            </span>
          </div>
          <Countdown targetDate={weddingDate} />
      </div>

      <div className="py-24 sm:py-32 bg-brand-ivory relative">
        <RSVPForm />
      </div>

      <div className="py-24 sm:py-32 bg-gradient-to-b from-brand-ivory to-white relative mt-10">
        <WishesSection />
      </div>

      {/* Elegant Footer Signature */}
      <footer className="py-12 bg-white border-t border-brand-beige/20 text-center relative overflow-hidden mt-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-beige/10 blur-[80px] rounded-full pointer-events-none" />
        <Heart className="w-6 h-6 mx-auto mb-6 text-brand-beige-deep fill-brand-beige/20" />
        <p className="font-display text-4xl sm:text-5xl text-stone-800 mb-2">Rashmi & Pasindu</p>
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-sans text-stone-400 font-semibold block mb-12">
          May 28, 2026
        </span>

        <div className="flex flex-col items-center gap-3 relative z-10">
          <div className="w-12 h-[1px] bg-brand-beige/30 mb-2" />
          <p className="text-[10px] sm:text-[11px] text-stone-400 font-sans tracking-[0.3em] uppercase">
            Design by <span className="text-brand-beige-deep font-bold">invitemint</span>
          </p>
          <a 
            href="https://wa.me/94707819074" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] sm:text-[11px] text-stone-400 hover:text-brand-beige-deep transition-all duration-300 font-sans tracking-[0.2em]"
          >
            +94 70 781 9074
          </a>
        </div>
      </footer>
    </div>
  );
}