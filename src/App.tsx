import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  TrendingUp, Users, Star, Play, Wallet
} from "lucide-react";

// --- Utility Function ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// --- FlipWords Component ---
const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation();
      }, duration);
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: "blur(8px)",
          scale: 2,
          position: "absolute",
        }}
        className={cn("z-10 inline-block relative px-2 -ml-2 pb-2", className)}
        key={currentWord}
        style={{
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: wordIndex * 0.3, duration: 0.3 }}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: wordIndex * 0.3 + letterIndex * 0.05,
                  duration: 0.2,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

// --- Main Landing Page Component ---
export default function App() {
  const flipWordsArray = ["Faster.", "Better.", "Together."];

  return (
    <div className="bg-[#fafafa] text-slate-900 font-sans antialiased selection:bg-[#C49535]/20 selection:text-slate-900 overflow-x-hidden min-h-screen relative">

      {/* Custom Keyframes for Premium Metallic Effects */}
      <style>{`
        @keyframes gold-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-gold-shimmer {
          animation: gold-shimmer 2.5s linear infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#EAD196] via-[#C49535] to-[#996D17] flex items-center justify-center shadow-lg shadow-[#C49535]/30">
                <TrendingUp className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">GROWMAX</span>
            </div>

            {/* Nav Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-[#C49535] transition-colors">Live Calls</a>
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-[#C49535] transition-colors">Mentorship</a>
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-[#C49535] transition-colors">Results</a>
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-[#C49535] transition-colors">Reviews</a>
            </div>

            {/* Right Action */}
            <div className="flex items-center">
              <a href="#" className="text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors mr-6 hidden sm:block">Member Login</a>
              {/* Ultra-Premium Nav Button */}
              <a href="#" className="inline-flex h-10 items-center justify-center rounded-lg bg-[#c9a227] border border-white/20 px-6 text-xs font-extrabold text-white uppercase tracking-widest shadow-[0_4px_15px_rgba(201,162,39,0.4)] hover:shadow-[0_0_25px_rgba(201,162,39,0.8)] hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-300">
                <span className="drop-shadow-sm">Get Started</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative isolate pt-16">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        {/* Premium Ambient Glows */}
        <div className="absolute left-[-10%] top-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#C49535] opacity-[0.10] blur-[120px]"></div>
        <div className="absolute right-[-10%] top-[20%] -z-10 h-[400px] w-[400px] rounded-full bg-emerald-500 opacity-[0.05] blur-[100px]"></div>

        <div className="mx-auto max-w-7xl px-6 pb-12 pt-12 sm:pb-24 lg:px-8 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Group 1: Content Top (Mobile Order 1, Desktop Col 1) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-1 lg:col-span-1">
            {/* Market Status & Badge */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-8 sm:mt-12 lg:mt-0"
            >
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Market is Open
              </div>
              <div className="inline-flex items-center space-x-1.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                <Users className="text-[#C49535] w-3.5 h-3.5" />
                <span>1,000+ traders already in</span>
              </div>
            </motion.div>

            {/* Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 text-[3rem] sm:text-5xl lg:text-[4.5rem] font-extrabold tracking-tight text-slate-900 leading-[1.05]"
            >
              Let's trade <br />
              {/* Increased height to 1.5em and added bottom padding (pb-2) to prevent the 'g' from clipping */}
              <span className="relative inline-block mt-2 h-[1.5em] min-w-[280px] sm:min-w-[360px] lg:min-w-[440px]">
                <FlipWords
                  words={flipWordsArray}
                  className="bg-gradient-to-r from-[#EAD196] via-[#C49535] to-[#7A550F]"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-medium max-w-lg mx-auto lg:mx-0"
            >
              Join India's most active trading community. Get live calls, daily analysis & expert mentorship — one simple investment, lifetime access.
            </motion.p>
          </div>

          {/* Group 2: Video (Mobile Order 2, Desktop Col 2) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex max-w-2xl justify-center lg:max-w-none w-full order-2 lg:order-2 lg:row-span-2 lg:col-start-2"
          >
            <div className="relative max-w-sm flex-none w-full lg:w-[24rem]">

              {/* App Frame Mockup (Bezel) */}
              <div className="relative w-full aspect-[9/16] rounded-[2.5rem] bg-slate-900 p-2 shadow-2xl shadow-slate-900/30 ring-1 ring-slate-200/50">

                {/* Screen Content */}
                <div className="relative h-full w-full rounded-[2rem] overflow-hidden bg-slate-800 isolate group cursor-pointer">

                  {/* Blurred Background Image */}
                  <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop" alt="Trading Charts" className="absolute inset-0 h-full w-full object-cover scale-105 blur-[6px] opacity-70 transition-all duration-700 ease-out group-hover:scale-110 group-hover:blur-sm group-hover:opacity-90" />

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/90"></div>
                  <div className="absolute inset-0 bg-[#C49535]/15 mix-blend-overlay"></div>

                  {/* Central Play Button */}
                  <div className="flex z-10 py-10 absolute inset-0 items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-[#C49535]/50 shadow-sm animate-ping opacity-60"></div>
                      <div className="absolute inset-0 rounded-full bg-[#C49535]/30 shadow-sm animate-pulse scale-150"></div>
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-2xl ring-4 ring-white/20 group-hover:bg-white transition-all duration-300 group-hover:scale-110">
                        <div className="absolute inset-2 rounded-full border border-dashed border-[#C49535]/40 animate-[spin_10s_linear_infinite]"></div>
                        <Play className="text-[#C49535] w-8 h-8 ml-1.5 fill-current" style={{ filter: 'drop-shadow(0 4px 6px rgba(196, 149, 53, 0.5))' }} />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Decorative Floating Element */}
              <div className="absolute -right-6 -bottom-6 bg-white p-3 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 animate-[bounce_4s_infinite] hidden sm:block z-30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Wallet className="text-green-600 w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today's P&L</div>
                    <div className="text-sm font-extrabold text-green-600">+ ₹14,250</div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Group 3: Actions (Mobile Order 3, Desktop Col 1 Row 2) */}
          <div className="flex flex-col items-center lg:items-start order-3 lg:order-3 lg:col-span-1 w-full">
            {/* High-Converting Pricing Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 relative group w-full sm:w-max"
            >
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#EAD196] via-[#C49535] to-[#EAD196] rounded-2xl blur-lg opacity-60 group-hover:opacity-100 group-hover:blur-xl transition duration-1000 group-hover:duration-200 animate-pulse"></div>

              <div className="relative flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-0 bg-white p-2 rounded-2xl border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">

                {/* Ultra-Premium Hero Button */}
                <a href="#" className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-[#C49535] to-[#996D17] border border-white/20 px-8 text-base font-bold text-white tracking-wide shadow-[0_4px_20px_rgba(201,162,39,0.4)] hover:shadow-[0_0_35px_rgba(201,162,39,0.8)] hover:scale-[1.02] hover:brightness-110 transition-all duration-300 z-10">
                  <span className="drop-shadow-sm flex items-center gap-2">
                    Get Started <span className="bg-white/20 px-2 py-0.5 rounded text-white text-sm font-semibold ml-1">₹999</span>
                  </span>
                </a>

                <div className="flex flex-col items-center sm:items-start justify-center px-6 pb-2 sm:pb-0 z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 line-through text-sm font-bold decoration-2">₹4,999</span>
                    <span className="bg-red-100 text-red-700 text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded">80% OFF</span>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold mt-1">One-time payment, lifetime access</span>
                </div>
              </div>
            </motion.div>

            {/* Trust Indicators & Stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col sm:flex-row items-center sm:items-center gap-8 border-t border-slate-200/60 pt-8 w-full justify-center lg:justify-start"
            >
              {/* Rating & Avatars */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3 overflow-hidden p-1">
                  <img className="inline-block h-11 w-11 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="Trader" />
                  <img className="inline-block h-11 w-11 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" alt="Trader" />
                  <img className="inline-block h-11 w-11 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="Trader" />
                </div>
                <div>
                  <div className="flex items-center text-[#C49535] text-base">
                    <Star className="fill-current w-4 h-4" />
                    <Star className="fill-current w-4 h-4" />
                    <Star className="fill-current w-4 h-4" />
                    <Star className="fill-current w-4 h-4" />
                    <Star className="fill-current w-4 h-4" />
                    <span className="ml-2 font-extrabold text-slate-900">4.9/5</span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold mt-1">From 2,400+ reviews</p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-12 bg-slate-200"></div>

              {/* Stats */}
              <div className="flex gap-8">
                <div>
                  <div className="font-extrabold text-2xl text-slate-900 tracking-tight">1K+</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">Active Members</div>
                </div>
                <div>
                  <div className="font-extrabold text-2xl text-slate-900 tracking-tight">94+</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">Live Sessions</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </main>

    </div>
  );
}
