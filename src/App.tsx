import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate
} from "framer-motion";
import {
  TrendingUp, Users, Star, Play,
  Zap, Monitor,
  ShieldCheck, ArrowRight, Lock,
  Activity, Crosshair
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
        className={cn(
          "z-10 inline-block relative text-left px-2",
          className
        )}
        key={currentWord}
      >
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: wordIndex * 0.3, duration: 0.3 }}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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

// --- Animated Counter Component ---
const AnimatedCounter = ({
  value,
  suffix = "",
  label,
  finalOpacity,
  highlight = false
}: {
  value: number,
  suffix?: string,
  label: React.ReactNode,
  finalOpacity: any,
  highlight?: boolean
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest) + suffix);

  useEffect(() => {
    const unsubscribe = finalOpacity.on("change", (v: number) => {
      if (v > 0.6) {
        animate(count, value, { duration: 1.5, ease: "easeOut" });
      } else if (v < 0.1) {
        count.set(0);
      }
    });
    return () => unsubscribe();
  }, [finalOpacity, value, count]);

  return (
    <div className="flex flex-col items-center text-center relative px-2">
      {highlight && <div className="absolute inset-0 bg-[#c9a227]/20 blur-xl rounded-full"></div>}
      <motion.span
        className={cn(
          "text-2xl md:text-5xl font-black mb-1 tracking-tighter",
          highlight ? "text-[#c9a227] drop-shadow-[0_0_15px_rgba(201,162,39,0.5)]" : "text-white drop-shadow-lg"
        )}
      >
        {rounded}
      </motion.span>
      <span className="text-[8px] md:text-[10px] font-bold text-slate-300 uppercase tracking-widest drop-shadow-md leading-tight">
        {label}
      </span>
    </div>
  );
};

// --- Feature Reveal Item Component ---
const FeatureItem = ({
  title,
  description,
  icon: Icon,
  index,
  total,
  scrollYProgress
}: {
  title: string,
  description: React.ReactNode,
  icon: any,
  index: number,
  total: number,
  scrollYProgress: any
}) => {
  const start = index / total;
  const end = (index + 1) / total;

  const itemOpacity = useTransform(scrollYProgress,
    [Math.max(0, start - 0.05), start, end - 0.05, Math.min(1, end)],
    [0, 1, 1, 0]
  );

  const itemBlur = useTransform(scrollYProgress,
    [Math.max(0, start - 0.05), start, end - 0.05, Math.min(1, end)],
    ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]
  );

  const itemScale = useTransform(scrollYProgress,
    [Math.max(0, start - 0.05), start, end - 0.05, Math.min(1, end)],
    [0.9, 1, 1, 1.05]
  );

  const fillProgress = useTransform(scrollYProgress, [start, start + (end - start) * 0.3], [0, 1]);
  const clipPath = useTransform(fillProgress, [0, 1], ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]);

  const contentOpacity = useTransform(scrollYProgress, [start + (end - start) * 0.3, start + (end - start) * 0.5], [0, 1]);
  const contentY = useTransform(scrollYProgress, [start + (end - start) * 0.3, start + (end - start) * 0.5], [30, 0]);

  return (
    <motion.div
      style={{ opacity: itemOpacity, scale: itemScale, filter: itemBlur }}
      className="absolute inset-0 flex flex-col justify-center pointer-events-none"
    >
      <div className="relative pointer-events-auto">
        <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-slate-200/60">
          {title}
        </h3>
        <motion.h3
          style={{ clipPath }}
          className="absolute top-0 left-0 text-3xl md:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#EAD196] via-[#C49535] to-[#7A550F] select-none drop-shadow-sm"
        >
          {title}
        </motion.h3>
      </div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="mt-6 md:mt-8 max-w-2xl pointer-events-auto text-slate-600 text-sm md:text-lg leading-relaxed font-medium"
      >
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-[#c9a227]/10 flex items-center justify-center border border-[#c9a227]/30 shadow-[0_0_15px_rgba(201,162,39,0.15)]">
            <Icon className="text-[#c9a227] w-4 h-4 md:w-5 md:h-5" />
          </div>
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-[#c9a227]">Growmax Exclusive</span>
        </div>
        {description}
      </motion.div>
    </motion.div>
  );
};

// --- Multi-Phase Cinematic Section ---
const ScrollRevealFeatures = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const lineProgress = useTransform(scrollYProgress, [0, 0.50], [0, 1]);
  const scaleY = useSpring(lineProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const lineOpacity = useTransform(scrollYProgress, [0.46, 0.50], [1, 0]);
  const lineBlur = useTransform(scrollYProgress, [0.46, 0.50], ["blur(0px)", "blur(8px)"]);
  const glowOpacityGold = useTransform(scrollYProgress, [0.46, 0.50], [0.08, 0]);
  const glowOpacityEmerald = useTransform(scrollYProgress, [0.46, 0.50], [0.04, 0]);

  const inkClipPath = useTransform(scrollYProgress, [0.50, 0.55], ["circle(0% at 50% 50%)", "circle(150% at 50% 50%)"]);
  const overlayPointerEvents = useTransform(scrollYProgress, v => v > 0.50 ? "auto" : "none");

  const containerBgColor = useTransform(scrollYProgress, [0.82, 0.86], ["#0a192f", "#fafafa"]);

  const text1Opacity = useTransform(scrollYProgress, [0.60, 0.63, 0.68, 0.71], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0.60, 0.63], [40, 0]);
  const text1Scale = useTransform(scrollYProgress, [0.68, 0.71], [1, 0.95]);

  const imageOpacity = useTransform(scrollYProgress, [0.55, 0.60, 0.68, 0.71, 0.82, 0.86], [0, 0.35, 0.35, 1, 1, 0]);
  const darkOverlayOpacity = useTransform(scrollYProgress, [0.68, 0.71, 0.82, 0.86], [1, 0.4, 0.4, 0]);
  const imageFilter = useTransform(scrollYProgress, [0.68, 0.71], ["grayscale(100%)", "grayscale(0%)"]);

  const finalOpacity = useTransform(scrollYProgress, [0.71, 0.75, 0.82, 0.86], [0, 1, 1, 0]);
  const finalY = useTransform(scrollYProgress, [0.71, 0.75], [40, 0]);
  const finalPointerEvents = useTransform(scrollYProgress, v => (v > 0.71 && v < 0.82) ? "auto" : "none");

  const contactOpacity = useTransform(scrollYProgress, [0.86, 0.90], [0, 1]);
  const contactY = useTransform(scrollYProgress, [0.86, 0.90], [40, 0]);
  const contactPointerEvents = useTransform(scrollYProgress, v => v > 0.86 ? "auto" : "none");

  const features = [
    {
      title: "Live Execution",
      icon: Monitor,
      content: (
        <div className="flex flex-col gap-4">
          <p>Stop trading in isolation. Watch us identify supply zones and liquidity sweeps as they happen.</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-video rounded-xl bg-slate-100 overflow-hidden border border-slate-200/60 shadow-inner relative group">
              <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400" className="w-full h-full object-cover grayscale opacity-60" alt="Charts" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
            </div>
            <div className="p-3 md:p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col justify-center shadow-xl border border-slate-700">
              <Zap className="text-[#c9a227] w-4 h-4 mb-2" />
              <p className="text-[10px] font-black text-white uppercase tracking-widest leading-tight">Zero Lag Entries</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Capital Guard",
      icon: ShieldCheck,
      content: (
        <div className="flex flex-col gap-4">
          <p>Every club trade follows a non-negotiable risk-to-reward ratio. We protect your capital.</p>
          <div className="flex gap-3">
            <div className="flex-1 p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-900">
              <Lock className="w-4 h-4 text-red-500 mb-2" />
              <p className="text-[10px] font-bold uppercase">Hard Stop-Loss</p>
            </div>
            <div className="flex-1 p-4 rounded-xl bg-gradient-to-br from-[#c9a227]/10 to-[#c9a227]/5 border border-[#c9a227]/20 text-slate-900">
              <Crosshair className="w-4 h-4 text-[#c9a227] mb-2" />
              <p className="text-[10px] font-bold uppercase">Position Sizing</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Inner Circle",
      icon: Users,
      content: (
        <div className="flex flex-col gap-4">
          <p>Access our private inner circle. Discuss setups and refine your edge with 1,000+ pros.</p>
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-2xl relative overflow-hidden shadow-2xl border border-slate-800">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-white text-3xl font-black tracking-tighter">98.4%</p>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden shadow-lg">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Mental Edge",
      icon: TrendingUp,
      content: (
        <div className="flex flex-col gap-4">
          <p>Mirroring isn't just about the buttons—it's about the mindset.</p>
          <div className="space-y-2">
            {["Daily Debriefs", "Psychology Workshops"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-700">
                <ArrowRight className="w-3 h-3 text-[#c9a227]" />
                <span className="font-bold text-slate-200 text-[11px] uppercase tracking-wider">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <div ref={containerRef} className="relative h-[1200vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden isolate bg-[#fafafa]">

        {/* Dynamic Premium Ambient Glows */}
        <motion.div style={{ opacity: glowOpacityGold }} className="absolute left-[-10%] top-[10%] -z-10 h-[500px] w-[500px] rounded-full bg-[#C49535] blur-[120px]" />
        <motion.div style={{ opacity: glowOpacityEmerald }} className="absolute right-[-10%] bottom-[10%] -z-10 h-[400px] w-[400px] rounded-full bg-emerald-500 blur-[100px]" />

        {/* --- PHASE 1: Features Layout --- */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-[60px_1fr] gap-4 md:gap-12 h-[70vh]">

          <motion.div style={{ opacity: lineOpacity, filter: lineBlur }} className="hidden md:flex flex-col items-center py-10 h-full">
            <div className="relative w-[4px] h-full">
              <div className="absolute inset-0 bg-slate-200/50 rounded-full overflow-hidden">
                <motion.div style={{ scaleY }} className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#EAD196] via-[#C49535] to-[#7A550F] origin-top rounded-full" />
              </div>
              <motion.div
                style={{ top: useTransform(scaleY, [0, 1], ["0%", "100%"]) }}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full border-[5px] border-[#c9a227] shadow-[0_0_25px_rgba(201,162,39,0.8)] z-20 flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 bg-[#c9a227] rounded-full animate-ping" />
              </motion.div>
            </div>
          </motion.div>

          <div className="relative h-full">
            {features.map((feature, i) => (
              <FeatureItem key={i} index={i} total={8.0} title={feature.title} description={feature.content} icon={feature.icon} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>

        {/* --- PHASE 2, 3, 4 & 5 Overlay --- */}
        <motion.div
          style={{ clipPath: inkClipPath, backgroundColor: containerBgColor, pointerEvents: overlayPointerEvents as any }}
          className="absolute inset-0 z-30 flex items-center justify-center overflow-hidden"
        >
          <motion.div style={{ opacity: imageOpacity }} className="absolute inset-0">
            <motion.div style={{ opacity: darkOverlayOpacity }} className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/80 to-[#0a192f] z-10" />
            <div className="absolute inset-0 bg-[#c9a227]/10 z-10 mix-blend-color" />
            <motion.img
              src="https://kseb-challenge.web.app/assets/group-WLE0uGTF.webp"
              style={{ filter: imageFilter }}
              className="w-full h-full object-cover object-center sm:object-cover"
              alt="Community Background"
            />
          </motion.div>

          {/* TEXT 1 */}
          <motion.div
            style={{ opacity: text1Opacity, y: text1Y, scale: text1Scale }}
            className="absolute inset-0 z-20 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/30 text-[#c9a227] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(201,162,39,0.15)]">
              <Star className="w-3.5 h-3.5 fill-current" /> India's Elite Circle
            </div>
            <h2 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
              Trade with the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFF1BA] via-[#D4AF37] to-[#996D17]">Top 1%</span>
            </h2>
          </motion.div>

          {/* PHASE 4: Bottom Stats Over Image */}
          <motion.div
            style={{ opacity: finalOpacity, y: finalY, pointerEvents: finalPointerEvents as any }}
            className="absolute inset-0 z-30 flex flex-col justify-end pb-12 sm:pb-20"
          >
            <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 w-full mb-8">
                <AnimatedCounter value={50} suffix="+" label={<>Years Combined<br />Experience</>} finalOpacity={finalOpacity} />
                <AnimatedCounter value={500} suffix="+" label={<>Members<br />Mentored</>} finalOpacity={finalOpacity} highlight={true} />
                <AnimatedCounter value={11} label={<>Expert<br />Mentors</>} finalOpacity={finalOpacity} />
                <AnimatedCounter value={4} suffix="+" label={<>Markets<br />Covered</>} finalOpacity={finalOpacity} />
              </div>
              <a href="#" className="inline-flex h-12 md:h-14 items-center justify-center rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#996D17] border border-[#FFF1BA]/50 px-8 md:px-12 text-xs md:text-sm font-extrabold text-white uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                Join The Floor
              </a>
            </div>
          </motion.div>

          {/* PHASE 5: Light Theme Pricing - FULLY RESPONSIVE */}
          <motion.div
            style={{ opacity: contactOpacity, y: contactY, pointerEvents: contactPointerEvents as any }}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center overflow-y-auto pt-20 pb-10"
          >
            <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
              <div className="text-center mb-8 md:mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/20 text-[#c9a227] text-[9px] md:text-xs font-bold uppercase tracking-widest mb-4">
                  RESERVE YOUR SPOT
                </div>
                <h2 className="text-3xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-tight">
                  Become a <span className="text-[#c9a227]">Growmax Club Member</span>
                </h2>
                <p className="text-slate-500 text-sm md:text-lg max-w-xl mx-auto font-medium">
                  Mentors, live sessions, proven frameworks and a private community. One payment, lifetime access.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
                {/* Features List */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">WHAT YOU GET</h4>
                  {[
                    { icon: Zap, text: "Live trading sessions every day" },
                    { icon: Users, text: "Private community & direct mentor access" },
                    { icon: Activity, text: "Expert trade reviews & strategy breakdowns" },
                    { icon: ShieldCheck, text: "Lifetime access — single payment" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white p-3 md:p-4 rounded-xl border border-slate-100 shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-[#c9a227]/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-[#c9a227] w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-700 text-xs md:text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing Card */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#EAD196] via-[#C49535] to-[#EAD196] rounded-[2rem] blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="relative bg-slate-950 p-6 md:p-10 rounded-[2rem] border border-slate-800 shadow-2xl flex flex-col items-center text-center">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-slate-600 line-through text-lg font-bold">₹4,999</span>
                      <span className="bg-[#c9a227]/20 text-[#c9a227] text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full border border-[#c9a227]/30">80% OFF</span>
                    </div>
                    <div className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter flex items-baseline justify-center gap-2">
                      ₹999 <span className="text-sm text-slate-500 font-bold uppercase tracking-widest">one-time</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">LIMITED TIME OFFER</p>
                    <a href="#" className="inline-flex w-full h-14 md:h-16 items-center justify-center rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#996D17] px-8 text-sm md:text-base font-black text-white uppercase tracking-widest shadow-[0_4px_25px_rgba(196,149,53,0.4)] hover:shadow-[0_0_35px_rgba(196,149,53,0.7)] transition-all duration-300">
                      Join Growmax Club <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Main Landing Page Component ---
export default function App() {
  const flipWordsArray = ["Faster.", "Better.", "Together."];

  return (
    <div className="bg-[#fafafa] text-slate-900 font-sans antialiased selection:bg-[#C49535]/20 selection:text-slate-900 overflow-clip min-h-screen relative">
      <nav className="fixed top-0 z-50 w-full bg-transparent pt-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#EAD196] via-[#C49535] to-[#996D17] flex items-center justify-center shadow-lg shadow-[#C49535]/30">
                <TrendingUp className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">GROWMAX</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-[#C49535] transition-colors">Live Calls</a>
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-[#C49535] transition-colors">Mentorship</a>
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-[#C49535] transition-colors">Results</a>
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-[#C49535] transition-colors">Reviews</a>
            </div>
            <div className="flex items-center">
              <a href="#" className="text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors mr-6 hidden sm:block">Member Login</a>
              <a href="#" className="inline-flex h-10 items-center justify-center rounded-lg bg-[#c9a227] border border-white/20 px-6 text-xs font-extrabold text-white uppercase tracking-widest shadow-[0_4px_15px_rgba(201,162,39,0.4)] hover:shadow-[0_0_25px_rgba(201,162,39,0.8)] hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-300">
                <span className="drop-shadow-sm">Get Started</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative isolate pt-16">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute left-[-10%] top-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#C49535] opacity-[0.10] blur-[120px]"></div>
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pb-32 lg:flex lg:px-8 lg:py-32 items-center lg:gap-16">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-wrap items-center gap-3">
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
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="mt-8 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-[4.5rem] leading-[1.05]">
              Let's trade <br />
              <span className="relative inline-block mt-2 h-[1.5em] min-w-[280px]">
                <FlipWords words={flipWordsArray} className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAD196] via-[#C49535] to-[#7A550F] -ml-2 pb-2" />
              </span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-6 text-lg leading-relaxed text-slate-600 font-medium max-w-lg">
              Join India's most active trading community. Get live calls, daily analysis & expert mentorship — one simple investment, lifetime access.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-10 relative group w-full max-w-md sm:w-max">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#EAD196] via-[#C49535] to-[#EAD196] rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative bg-white p-1.5 rounded-2xl border border-slate-200/60 shadow-xl">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <a href="#" className="w-full sm:w-auto inline-flex h-12 sm:h-14 items-center justify-center rounded-xl bg-[#c9a227] px-6 sm:px-8 text-xs sm:text-sm font-extrabold text-white uppercase tracking-widest shadow-lg z-10 order-2 sm:order-1">
                    Get Started — ₹999
                  </a>
                  <div className="flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-center w-full sm:w-auto px-4 py-2 sm:py-0 z-10 order-1 sm:order-2">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 line-through text-xs sm:text-sm font-bold">₹4,999</span>
                      <span className="bg-red-50 text-red-600 text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded">80% OFF</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl justify-center lg:mt-0 lg:max-w-none lg:flex-none">
            <div className="relative max-w-sm flex-none w-full lg:w-[24rem]">
              <div className="relative w-full aspect-[9/16] rounded-[2.5rem] bg-slate-900 p-2 shadow-2xl ring-1 ring-slate-200/50">
                <div className="relative h-full w-full rounded-[2rem] overflow-hidden bg-slate-800 group">
                  <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800" alt="Charts" className="absolute inset-0 h-full w-full object-cover blur-[6px] opacity-70 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/90"></div>
                  <div className="flex z-10 absolute inset-0 items-center justify-center">
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-2xl">
                      <Play className="text-[#C49535] w-8 h-8 ml-1.5 fill-current" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="relative isolate">
        <ScrollRevealFeatures />
      </section>

      <footer className="bg-[#fafafa] border-t border-slate-200/60 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="mt-8 text-slate-400 text-xs font-medium">© 2024 Growmax Trading Club. Trading involves market risk.</p>
        </div>
      </footer>
    </div>
  );
}