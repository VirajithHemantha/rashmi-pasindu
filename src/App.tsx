import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  Music,
  VolumeX,
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';
import { Toaster } from 'sonner';
import { EnvelopeOpening } from './components/EnvelopeOpening';
import { CountdownTimer } from './components/CountdownTimer';
import { PhotoGallery } from './components/PhotoGallery';
import { EventTimeline } from './components/EventTimeline';
import { RSVPForm } from './components/RSVPForm';
import { BlessingForm } from './components/BlessingForm';
import { FloatingParticles } from './components/FloatingParticles';
import { ImageWithFallback } from './components/ImageWithFallback';

export default function App() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/40 relative overflow-x-hidden">
      <Toaster position="top-center" />
      <FloatingParticles />

      {/* Music Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8a5a19] text-white shadow-[0_4px_20px_rgba(212,175,55,0.4)] flex items-center justify-center hover:scale-110 transition-transform border border-amber-200/40"
      >
        {isMusicPlaying ? <Music className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </motion.button>

      {/* Parallax Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/30 via-transparent to-transparent" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center px-4">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero Background"
            className="w-full h-full object-cover blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/95" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          {/* Decorative Top */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="mb-8 flex justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" fill="white" />
            </div>
          </motion.div>

          {/* Pre-title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-[#D4AF37] text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.5em] font-serif mb-6 uppercase"
          >
            Promise Of Love
          </motion.div>

          {/* Families */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs sm:text-sm text-gray-500 font-serif mb-8 uppercase tracking-widest leading-relaxed"
          >
            Loving Son of Father Mr. Hemantha & Mrs. Dammika <br className="hidden sm:block" />
            Together with Loving Daughter of Mr. R. Prasanna & Mrs. Nirupa
          </motion.div>

          {/* Names */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-4xl sm:text-6xl md:text-8xl font-serif text-[#183d72] mb-6 leading-tight"
          >
            Dinuka
            <motion.span
              className="inline-block mx-2 sm:mx-6 text-[#D4AF37]"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              &
            </motion.span>
            Supuni
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm sm:text-base text-gray-600 font-serif mb-8 italic"
          >
            Request the honour of the presence of Mr & Mrs / Mr / Miss / Family <br />
            To grace the occasion of the marriage of their beloved children
          </motion.div>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-base sm:text-xl md:text-2xl text-gray-700 font-serif max-w-2xl mx-auto leading-relaxed px-2 mb-10"
          >
            Invite you to join their wedding celebration on <br />
            <span className="text-[#183d72] font-bold">Thursday 07 May 2026 At 9 AM</span>
          </motion.p>


        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[#D4AF37]"
          >
            <div className="w-6 h-10 border-2 border-[#D4AF37] rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-[#D4AF37] rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Wedding Story Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-5xl font-serif text-[#183d72] mb-12 uppercase tracking-widest">
              A Match Made In Heaven
            </h2>

            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-12 shadow-xl border-2 border-[#D4AF37]/30 relative">
              <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-[#D4AF37]" />
              <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-[#D4AF37]" />
              <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-[#D4AF37]" />
              <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-[#D4AF37]" />

              <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-serif">
                <p>
                  We are getting married and would love to celebrate with you.
                  A romantic evening filled with love, flowers, music, and the people who mean the most to us.
                </p>
                <p>
                  Thank you for being part of our most beautiful chapter.
                  We're excited for a lifetime of love, joy, and togetherness.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-serif text-[#183d72] text-center mb-16 uppercase tracking-widest"
          >
            Wedding Details
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-xl border-2 border-[#D4AF37]/30 text-center relative group"
            >
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#D4AF37] opacity-50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#D4AF37] opacity-50" />

              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center text-white">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-[#183d72] mb-3">Date</h3>
              <p className="text-xl text-gray-700 font-serif">May 07, 2026</p>
              <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest">Thursday</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-xl border-2 border-[#D4AF37]/30 text-center relative group"
            >
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#D4AF37] opacity-50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#D4AF37] opacity-50" />

              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center text-white">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-[#183d72] mb-3">Time</h3>
              <p className="text-xl text-gray-700 font-serif">9:00 AM</p>
              <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest">Arrival & Gathering</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-xl border-2 border-[#D4AF37]/30 text-center relative group"
            >
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#D4AF37] opacity-50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#D4AF37] opacity-50" />

              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center text-white">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-[#183d72] mb-3">Venue</h3>
              <p className="text-xl text-gray-700 font-serif">Seven Say Banquet Hall</p>
              <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest">Magalegoda, Veyangoda</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-[#183d72] mb-4 uppercase tracking-widest">
              Counting Down
            </h2>
            <p className="text-xl text-gray-600 font-serif">
              Until the marriage of Dinuka & Supuni
            </p>
          </motion.div>

          <CountdownTimer />
        </div>
      </section>

      {/* Event Timeline Section */}
      <section id="timeline" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-[#183d72] mb-4 uppercase tracking-widest">
              Event Timeline
            </h2>
            <p className="text-xl text-gray-600 font-serif lowercase italic">
              [PORUWA CEREMONY AT 9.20AM]
            </p>
          </motion.div>

          <EventTimeline />
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-[#183d72] mb-4 uppercase tracking-widest">
              Location
            </h2>
            <p className="text-xl text-gray-600 font-serif">
              Seven Say Banquet Hall
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-slate-50 rounded-2xl overflow-hidden shadow-xl border-2 border-[#D4AF37]/30"
          >
            <div className="aspect-video relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.083756816538!2d80.0528653!3d7.1162446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2fd0df7a7003%3A0x320b2e4d32d3838d!2sMagalegoda%2C%20Veyangoda!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MapPin className="w-12 h-12 text-[#D4AF37] drop-shadow-lg" fill="#D4AF37" />
                </motion.div>
              </div>
            </div>

            <div className="p-8 text-center font-serif">
              <h3 className="text-2xl font-serif text-[#183d72] mb-3">
                Seven Say Banquet Hall
              </h3>
              <p className="text-gray-600 mb-4 uppercase tracking-widest text-sm">
                Magalegoda, Veyangoda
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Dinuka: 0757534033</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Prasanna: 0772693907</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-[#183d72] mb-4 uppercase tracking-widest">
              RSVP
            </h2>
            <p className="text-xl text-gray-600 font-serif">
              Kindly respond by 17 April 2026
            </p>
          </motion.div>

          <RSVPForm />
        </div>
      </section>

      {/* Blessing Messages Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-[#183d72] mb-4 uppercase tracking-widest">
              Blessings & Wishes
            </h2>
            <p className="text-xl text-gray-600 font-serif">
              Share your love and blessings with Dinuka & Supuni
            </p>
          </motion.div>

          <BlessingForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <Heart className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" fill="#D4AF37" />
            </div>

            <p className="text-2xl font-serif text-[#183d72] mb-4">
              We would be honored to celebrate this beautiful moment with you
            </p>

            <div className="flex items-center justify-center gap-4 my-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>

            <div className="text-3xl font-serif text-[#183d72] mb-2 uppercase tracking-[0.2em]">
              Dinuka & Supuni
            </div>

            <p className="text-gray-500 font-serif tracking-widest text-sm uppercase">
              May 07, 2026 • Seven Say Banquet Hall
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}