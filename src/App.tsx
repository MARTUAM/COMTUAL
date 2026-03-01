import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  X, ArrowRight, 
  Shield, 
  Globe,
  FileCheck, Landmark, Building2, CreditCard, FileText, Clock, Scale, Users, ShieldCheck, ChevronDown, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useLanguage } from './i18n';

// --- Components ---

const TechBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#040b14] overflow-hidden">
      {/* Stars/Particles */}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '50px 50px', opacity: 0.05 }}></div>
      
      {/* Static Glowing Orbs (Optimized: Removed heavy continuous Framer Motion animations) */}
      <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#00f0ff] rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#8a2be2] rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none" />

      {/* Grid lines */}
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
    </div>
  );
};

const Navbar = ({ onOpenPortal }: { onOpenPortal: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#040b14]/95 border-b border-[#00f0ff]/20 py-4 shadow-[0_4px_30px_rgba(0,240,255,0.05)]' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer group">
          <Link to="/" className="font-serif text-2xl md:text-3xl font-bold tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">COMTUAL</Link>
        </div>
        
        <div className="hidden lg:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
           <a href="/#inicio" className="text-xs font-bold tracking-widest text-white/70 hover:text-[#00f0ff] transition-colors uppercase">{t.nav.inicio}</a>
           <a href="/#representacion" className="text-xs font-bold tracking-widest text-white/70 hover:text-[#00f0ff] transition-colors uppercase">{t.nav.representacion}</a>
           <a href="/#servicios" className="text-xs font-bold tracking-widest text-white/70 hover:text-[#00f0ff] transition-colors uppercase">{t.nav.servicios}</a>
           <a href="/#contacto" className="text-xs font-bold tracking-widest text-white/70 hover:text-[#00f0ff] transition-colors uppercase">{t.nav.contacto}</a>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 text-xs font-bold tracking-widest text-white/70 hover:text-[#00f0ff] transition-colors uppercase"
            >
              <Globe className="w-4 h-4" />
              {lang}
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-24 bg-[#0a1526] border border-[#00f0ff]/20 rounded-lg shadow-xl overflow-hidden"
                >
                  <button 
                    onClick={() => { setLang('ES'); setIsLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors ${lang === 'ES' ? 'text-[#00f0ff] bg-white/5' : 'text-white/70 hover:text-[#00f0ff] hover:bg-white/5'}`}
                  >
                    ES
                  </button>
                  <button 
                    onClick={() => { setLang('EN'); setIsLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors ${lang === 'EN' ? 'text-[#00f0ff] bg-white/5' : 'text-white/70 hover:text-[#00f0ff] hover:bg-white/5'}`}
                  >
                    EN
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button 
            onClick={onOpenPortal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-full border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)]"
          >
            {t.nav.portal}
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const [progress, setProgress] = useState(65);
  const { scrollY } = useScroll();
  const logoY = useTransform(scrollY, [0, 500], [0, 50]);
  const { t } = useLanguage();

  return (
    <section id="inicio" className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center max-w-5xl mx-auto z-10"
      >
        <motion.div style={{ y: logoY }} className="flex items-center justify-center gap-2 mb-6">
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          {t.hero.title1} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#8a2be2] drop-shadow-[0_0_20px_rgba(0,240,255,0.5)]">
            {t.hero.title2}
          </span> <br/>
          {t.hero.title3}
        </h1>
        
        <motion.p 
          whileHover={{ scale: 1.05, color: "#00ffff" }}
          transition={{ duration: 0.3 }}
          className="text-lg md:text-xl text-white/70 mb-12 max-w-3xl mx-auto font-light cursor-default"
        >
          {t.hero.description}
        </motion.p>

        {/* Decorative Tech Progress Bar */}
        <div className="w-full max-w-3xl mx-auto mb-16">
           <div className="flex justify-between text-[10px] md:text-xs text-[#00f0ff] mb-3 font-mono uppercase tracking-widest">
             <span>{t.hero.progress.step1}</span>
             <span>{t.hero.progress.step2}</span>
             <span>{t.hero.progress.step3}</span>
           </div>
           <div className="h-1.5 w-full bg-white/10 rounded-full relative">
             <motion.div 
               initial={{ width: "0%" }}
               animate={{ width: `${progress}%` }}
               transition={{ duration: 0.1, ease: "easeOut" }}
               className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00f0ff] to-[#8a2be2] rounded-full shadow-[0_0_15px_#00f0ff]"
             />
             {/* Nodes */}
             <div className="absolute top-1/2 -translate-y-1/2 left-[0%] w-3 h-3 bg-[#00f0ff] rounded-full shadow-[0_0_10px_#00f0ff]"></div>
             <motion.div 
               initial={{ left: "0%" }}
               animate={{ left: `${progress}%` }}
               transition={{ duration: 0.1, ease: "easeOut" }}
               className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_#ffffff] z-10 pointer-events-none"
             />
             <div className="absolute top-1/2 -translate-y-1/2 left-[100%] w-3 h-3 bg-[#8a2be2] rounded-full"></div>
             
             {/* Interactive slider overlay */}
             <input 
               type="range" 
               min="0" 
               max="100" 
               value={progress} 
               onChange={(e) => setProgress(Number(e.target.value))}
               className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-8 opacity-0 cursor-pointer z-20"
             />
           </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {t.hero.badges.map((text, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + (i * 0.2) }}
              className="px-5 py-2.5 rounded-lg bg-[#0a1526] border border-[#00f0ff]/20 text-white/80 text-xs md:text-sm font-medium flex items-center gap-3 shadow-[0_0_15px_rgba(0,240,255,0.05)]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_5px_#00f0ff]"></div>
              {text}
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
};

const RepresentacionBinacional = () => {
  const { t } = useLanguage();
  return (
    <section id="representacion" className="py-24 px-6 relative z-10 bg-[#020610] border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-br from-[#060d1a] to-[#040b14] border border-white/5 rounded-[2rem] p-8 md:p-16 relative overflow-hidden group hover:border-white/10 transition-colors duration-500 shadow-2xl">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#00f0ff]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-[#00f0ff]/10 transition-colors duration-700"></div>
          <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] bg-[#8a2be2]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 group-hover:bg-[#8a2be2]/10 transition-colors duration-700"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left Column: Text Content */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-xs text-[#00f0ff] tracking-widest uppercase">{t.representacion.badge}</span>
                <div className="h-[1px] w-12 bg-gradient-to-r from-[#00f0ff]/50 to-transparent"></div>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight mb-6">
                {t.representacion.title1} <br />
                <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">{t.representacion.title2}</span>
              </h2>
              
              <p className="text-white/60 text-lg leading-relaxed font-light mb-10">
                {t.representacion.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium flex items-center gap-3 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]"></div>
                  {t.representacion.cards.secondary.tag1}
                </div>
                <div className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium flex items-center gap-3 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8a2be2] shadow-[0_0_8px_#8a2be2]"></div>
                  {t.representacion.cards.secondary.tag2}
                </div>
              </div>
            </div>

            {/* Right Column: Stats & Differentiator */}
            <div className="flex flex-col gap-6">
              {/* Main Stat Card */}
              <div className="bg-[#0a1526]/80 backdrop-blur-md border border-[#00f0ff]/20 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 to-transparent"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#00f0ff]/10 text-[#00f0ff]">
                      <Shield className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-medium text-white">{t.representacion.cards.main.title}</h3>
                  </div>
                  <p className="text-white/60 leading-relaxed text-sm font-light mb-8">
                    {t.representacion.cards.main.description}
                  </p>
                  
                  <div className="flex items-center gap-4 md:gap-8 pt-6 border-t border-white/10 flex-wrap">
                    <div className="flex flex-col">
                      <span className="font-mono text-3xl text-white mb-1">100%</span>
                      <span className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-wider md:tracking-widest font-semibold">{t.representacion.cards.main.stat1}</span>
                    </div>
                    <div className="w-[1px] h-10 bg-white/10 hidden sm:block"></div>
                    <div className="flex flex-col">
                      <span className="font-mono text-3xl text-white mb-1">0</span>
                      <span className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-wider md:tracking-widest font-semibold">{t.representacion.cards.main.stat2}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Card */}
              <div className="bg-[#0a1526]/50 backdrop-blur-md border border-white/5 rounded-3xl p-8 flex items-start gap-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 text-white/70 shrink-0 mt-1">
                  <Globe className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">{t.representacion.cards.secondary.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm font-light">
                    {t.representacion.cards.secondary.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EnfoqueCentral = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const { t } = useLanguage();

  const partners = [
    {
      title: t.enfoque.partners[0].title,
      icon: <Scale className="w-6 h-6 md:w-8 md:h-8" />,
      desc: t.enfoque.partners[0].desc
    },
    {
      title: t.enfoque.partners[1].title,
      icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
      desc: t.enfoque.partners[1].desc
    },
    {
      title: t.enfoque.partners[2].title,
      icon: <Globe className="w-6 h-6 md:w-8 md:h-8" />,
      desc: t.enfoque.partners[2].desc
    },
    {
      title: t.enfoque.partners[3].title,
      icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />,
      desc: t.enfoque.partners[3].desc
    },
    {
      title: t.enfoque.partners[4].title,
      icon: <Building2 className="w-6 h-6 md:w-8 md:h-8" />,
      desc: t.enfoque.partners[4].desc
    },
    {
      title: t.enfoque.partners[5].title,
      icon: <Landmark className="w-6 h-6 md:w-8 md:h-8" />,
      desc: t.enfoque.partners[5].desc
    }
  ];

  return (
    <section className="py-24 px-6 relative z-10 border-y border-white/5 bg-[#040b14] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#8a2be2] shadow-[0_0_8px_#8a2be2]"></div>
            <span className="text-[#8a2be2] text-xs font-bold tracking-widest uppercase">{t.enfoque.badge}</span>
            <div className="w-2 h-2 rounded-full bg-[#8a2be2] shadow-[0_0_8px_#8a2be2]"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center">
            {t.enfoque.title}
          </h2>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-3 h-[600px] lg:h-[400px]">
          {partners.map((partner, i) => {
            const isActive = hoveredIndex === i;
            return (
              <div 
                key={i} 
                onMouseEnter={() => setHoveredIndex(i)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-end p-5 md:p-6
                  ${isActive ? 'lg:flex-[3] flex-[2] border-[#00f0ff]/50 bg-[#0a1526] shadow-[0_0_30px_rgba(0,240,255,0.1)]' : 'lg:flex-[1] flex-[1] border-white/10 bg-[#040b14]/50 hover:bg-[#0a1526]/50'}
                  border
                `}
              >
                {/* Background glow */}
                <div className={`absolute inset-0 bg-gradient-to-t from-[#00f0ff]/10 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className={`transition-all duration-500 ${isActive ? 'text-[#00f0ff] scale-110 origin-top-left' : 'text-white/40 group-hover:text-white/70'}`}>
                    {partner.icon}
                  </div>
                  
                  <div className="mt-auto flex flex-col justify-end">
                    <div className="overflow-hidden">
                      <h3 className={`font-bold text-white transition-all duration-500 flex items-center
                        ${isActive ? 'text-lg md:text-xl mb-2' : 'text-xs opacity-70 group-hover:opacity-100'}
                      `}>
                        <span className={`block transition-all duration-500 ${!isActive ? 'lg:[writing-mode:vertical-rl] lg:rotate-180 whitespace-nowrap' : ''}`}>
                          {partner.title}
                        </span>
                      </h3>
                    </div>
                    
                    <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                        {partner.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

const Servicios = () => {
  const { t } = useLanguage();
  
  const servicios = [
    {
      icon: <FileCheck className="w-8 h-8 text-[#00f0ff]" />,
      title: t.servicios.items[0].title,
      items: t.servicios.items[0].items
    },
    {
      icon: <Landmark className="w-8 h-8 text-[#00f0ff]" />,
      title: t.servicios.items[1].title,
      items: t.servicios.items[1].items
    },
    {
      icon: <Building2 className="w-8 h-8 text-[#00f0ff]" />,
      title: t.servicios.items[2].title,
      items: t.servicios.items[2].items
    }
  ];

  return (
    <section id="servicios" className="py-24 px-6 relative z-10 min-h-screen flex flex-col justify-center bg-[#040b14]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]"></div>
            <span className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase">{t.servicios.badge}</span>
            <div className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            {t.servicios.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#8a2be2]">{t.servicios.title2}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicios.map((srv, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl bg-[#0a1526] border border-white/5 hover:border-[#00f0ff]/30 transition-all group relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Hover glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#00f0ff] rounded-full mix-blend-screen filter blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
              
              <motion.div 
                initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.3, type: "spring", stiffness: 200, damping: 10 }}
                className="w-16 h-16 rounded-2xl bg-[#040b14] border border-[#00f0ff]/20 flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(0,240,255,0.1)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-shadow"
              >
                {srv.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-6">{srv.title}</h3>
              <ul className="space-y-4">
                {srv.items.map((item, j) => (
                  <li key={j} className="text-white/60 text-sm flex items-start gap-3 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#8a2be2] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Simple CheckCircle icon since it's not imported
const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const ModeloDeNegocio = () => {
  const { t } = useLanguage();
  
  const puntos = [
    { icon: <CreditCard className="w-6 h-6" />, title: t.modelo.items[0].title, desc: t.modelo.items[0].desc },
    { icon: <FileText className="w-6 h-6" />, title: t.modelo.items[1].title, desc: t.modelo.items[1].desc },
    { icon: <Globe className="w-6 h-6" />, title: t.modelo.items[2].title, desc: t.modelo.items[2].desc },
    { icon: <Clock className="w-6 h-6" />, title: t.modelo.items[3].title, desc: t.modelo.items[3].desc },
    { icon: <Shield className="w-6 h-6" />, title: t.modelo.items[4].title, desc: t.modelo.items[4].desc }
  ];

  return (
    <section className="py-24 px-6 relative z-10 bg-[#040b14] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#8a2be2] shadow-[0_0_8px_#8a2be2]"></div>
            <span className="text-[#8a2be2] text-xs font-bold tracking-widest uppercase">{t.modelo.badge}</span>
            <div className="w-2 h-2 rounded-full bg-[#8a2be2] shadow-[0_0_8px_#8a2be2]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t.modelo.title1} <span className="text-[#8a2be2]">{t.modelo.title2}</span> {t.modelo.title3}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {puntos.map((punto, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-3xl bg-gradient-to-br from-[#0a1526] to-[#040b14] border border-white/5 flex flex-col items-start hover:border-[#8a2be2]/50 transition-all duration-500 group relative overflow-hidden shadow-xl
                ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}
              `}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8a2be2]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#8a2be2]/10 transition-colors duration-500"></div>
              
              <div className="w-14 h-14 rounded-2xl bg-[#8a2be2]/10 flex items-center justify-center text-[#8a2be2] mb-6 shadow-[inset_0_0_15px_rgba(138,43,226,0.2)] group-hover:scale-110 transition-transform duration-500">
                {punto.icon}
              </div>
              <h4 className="text-white font-normal text-lg mb-3 relative z-10">{punto.title}</h4>
              <p className="text-white/60 text-sm leading-relaxed relative z-10">{punto.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contacto = () => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    correo: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  });

  const [touched, setTouched] = useState({
    nombre: false,
    correo: false,
    mensaje: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name as keyof typeof touched]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'nombre':
        if (!value.trim()) error = t.contacto.form.errors.nameRequired;
        else if (value.trim().length < 3) error = t.contacto.form.errors.nameLength;
        break;
      case 'correo':
        if (!value.trim()) error = t.contacto.form.errors.emailRequired;
        else if (!validateEmail(value)) error = t.contacto.form.errors.emailInvalid;
        break;
      case 'mensaje':
        if (!value.trim()) error = t.contacto.form.errors.messageRequired;
        else if (value.trim().length < 10) error = t.contacto.form.errors.messageLength;
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    validateField('nombre', formData.nombre);
    validateField('correo', formData.correo);
    validateField('mensaje', formData.mensaje);
    
    setTouched({
      nombre: true,
      correo: true,
      mensaje: true
    });

    const hasErrors = !formData.nombre.trim() || formData.nombre.trim().length < 3 ||
                      !formData.correo.trim() || !validateEmail(formData.correo) ||
                      !formData.mensaje.trim() || formData.mensaje.trim().length < 10;

    if (!hasErrors) {
      setIsSubmitting(true);
      try {
        const formspreeId = 'mlgwkjka';
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.nombre,
            company: formData.empresa,
            email: formData.correo,
            message: formData.mensaje
          })
        });

        if (response.ok) {
          setShowSuccessModal(true);
          setFormData({ nombre: '', empresa: '', correo: '', mensaje: '' });
          setTouched({ nombre: false, correo: false, mensaje: false });
          
          // Auto-hide modal after 5 seconds
          setTimeout(() => {
            setShowSuccessModal(false);
          }, 5000);
        } else {
          alert('Hubo un error al enviar el mensaje. Por favor, verifica tu configuración de Formspree.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Hubo un error de conexión. Por favor, inténtalo de nuevo.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="contacto" className="py-24 px-6 relative z-10 min-h-screen flex flex-col justify-center bg-[#040b14]">
      <div className="max-w-4xl mx-auto w-full">
        <div className="p-px rounded-3xl bg-gradient-to-b from-[#00f0ff]/30 via-white/5 to-transparent">
          <div className="bg-[#0a1526] rounded-3xl p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.contacto.title1} <span className="text-[#00f0ff]">{t.contacto.title2}</span></h2>
              <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto">{t.contacto.subtitle}</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{t.contacto.form.name} *</label>
                  <input 
                    type="text" 
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full bg-[#040b14] border ${errors.nombre && touched.nombre ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#00f0ff] transition-colors text-sm`} 
                    placeholder="Ej. John Doe" 
                  />
                  {errors.nombre && touched.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{t.contacto.form.company}</label>
                  <input 
                    type="text" 
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className="w-full bg-[#040b14] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#00f0ff] transition-colors text-sm" 
                    placeholder="Ej. Law Firm LLC" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{t.contacto.form.email} *</label>
                <input 
                  type="email" 
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-[#040b14] border ${errors.correo && touched.correo ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#00f0ff] transition-colors text-sm`} 
                  placeholder="john@example.com" 
                />
                {errors.correo && touched.correo && <p className="text-red-500 text-xs mt-1">{errors.correo}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{t.contacto.form.message} *</label>
                <textarea 
                  rows={4} 
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-[#040b14] border ${errors.mensaje && touched.mensaje ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#00f0ff] transition-colors resize-none text-sm`} 
                  placeholder={t.contacto.form.messagePlaceholder}
                ></textarea>
                {errors.mensaje && touched.mensaje && <p className="text-red-500 text-xs mt-1">{errors.mensaje}</p>}
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#00b8ff] text-black font-bold tracking-widest uppercase text-sm transition-opacity shadow-[0_0_20px_rgba(0,240,255,0.4)] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
              >
                {isSubmitting ? 'Enviando...' : t.contacto.form.submit}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#0a1526] border border-white/10 rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-[0_0_50px_rgba(0,240,255,0.2)] relative"
            >
              <div className="w-20 h-20 mx-auto bg-[#00f0ff]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-[#00f0ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">¡Mensaje Enviado!</h3>
              <p className="text-white/60 mb-2">
                {t.contacto.form.success}
              </p>
              <p className="text-white/40 text-sm mb-8">
                Esta ventana se cerrará automáticamente en 5 segundos.
              </p>
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#00b8ff] text-black font-bold tracking-widest uppercase text-sm transition-opacity hover:opacity-90"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#040b14] border-t border-white/10 pt-20 pb-10 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-serif text-3xl font-bold tracking-widest text-white mb-6 block">COMTUAL</Link>
            <p className="text-white/50 text-sm max-w-sm leading-relaxed">
              {t.footer.description}
            </p>
          </div>
          <div>
            <h4 className="text-[#00f0ff] font-bold mb-6 text-xs uppercase tracking-widest">{t.footer.nav.title}</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="/#inicio" className="hover:text-white transition-colors">{t.nav.inicio}</a></li>
              <li><a href="/#representacion" className="hover:text-white transition-colors">{t.nav.representacion}</a></li>
              <li><a href="/#servicios" className="hover:text-white transition-colors">{t.nav.servicios}</a></li>
              <li><a href="/#contacto" className="hover:text-white transition-colors">{t.nav.contacto}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#00f0ff] font-bold mb-6 text-xs uppercase tracking-widest">{t.footer.legal.title}</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link to="/privacy" className="hover:text-white transition-colors">{t.footer.legal.privacy}</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">{t.footer.legal.terms}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} COMTUAL. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const PortalModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [view, setView] = useState<'login' | 'register' | 'forgot-password'>('login');
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setView('login'), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay - Optimized: Removed backdrop-blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#040b14]/95 z-[60]"
          />
          
          {/* Background SVG Animation (Tech style) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed z-[65] top-[30%] md:top-[15%] left-1/2 -translate-x-1/2 w-[200vw] md:w-[150vw] h-[100vh] pointer-events-none"
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="100%"
              height="100%"
              viewBox="0 0 1600 900"
              className="absolute top-0 left-0 w-full h-full origin-bottom"
              style={{ transform: 'scaleY(3) scaleX(2.25)' }}
            >
              <defs>
                <path
                  id="wave"
                  fill="#00f0ff"
                  d="M-363.852,502.589c0,0,236.988-41.997,505.475,0 s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
                />
              </defs>
              <g>
                <use href="#wave" opacity=".1">
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="translate"
                    dur="8s"
                    calcMode="spline"
                    values="270 230; -334 180; 270 230"
                    keyTimes="0; .5; 1"
                    keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                    repeatCount="indefinite"
                  />
                </use>
                <use href="#wave" opacity=".2">
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="translate"
                    dur="6s"
                    calcMode="spline"
                    values="-270 230;243 220;-270 230"
                    keyTimes="0; .6; 1"
                    keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                    repeatCount="indefinite"
                  />
                </use>
                <use href="#wave" opacity=".3">
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="translate"
                    dur="4s"
                    calcMode="spline"
                    values="0 230;-140 200;0 230"
                    keyTimes="0; .4; 1"
                    keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                    repeatCount="indefinite"
                  />
                </use>
              </g>
            </svg>
          </motion.div>

          {/* Modal Content - Optimized: Removed backdrop-blur */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-45%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-45%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-1/2 left-1/2 w-[90%] md:w-[560px] bg-[#0a1526] border border-[#00f0ff]/30 shadow-[0_0_50px_rgba(0,240,255,0.1)] rounded-[32px] px-8 py-10 z-[70] flex flex-col items-center justify-center text-center text-white"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-[#00f0ff] transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center mb-8 w-full">
              <h2 className="text-3xl font-bold tracking-tight">{t.portal.title}</h2>
            </div>

            <form className="grid gap-5 w-full mb-8" onSubmit={(e) => e.preventDefault()}>
              {view === 'forgot-password' && (
                <p className="text-white/60 text-sm mb-2">
                  {t.portal.forgotPasswordDesc}
                </p>
              )}

              {(view === 'login' || view === 'forgot-password') && (
                <div className="relative group">
                  <input 
                    required 
                    type="email" 
                    className="peer w-full h-14 bg-[#040b14] text-white text-base px-4 pt-2.5 border border-white/10 rounded-xl outline-none focus:border-[#00f0ff] transition-all duration-300" 
                  />
                  <label className="absolute top-1/2 left-4 -translate-y-1/2 text-white/40 pointer-events-none transition-all duration-300 origin-left peer-focus:scale-[0.75] peer-focus:-translate-y-[120%] peer-valid:scale-[0.75] peer-valid:-translate-y-[120%]">
                    {t.portal.email}
                  </label>
                </div>
              )}

              {view === 'login' && (
                <div className="relative group">
                  <input 
                    required 
                    type="password" 
                    className="peer w-full h-14 bg-[#040b14] text-white text-base px-4 pt-2.5 border border-white/10 rounded-xl outline-none focus:border-[#00f0ff] transition-all duration-300" 
                  />
                  <label className="absolute top-1/2 left-4 -translate-y-1/2 text-white/40 pointer-events-none transition-all duration-300 origin-left peer-focus:scale-[0.75] peer-focus:-translate-y-[120%] peer-valid:scale-[0.75] peer-valid:-translate-y-[120%]">
                    {t.portal.password}
                  </label>
                </div>
              )}

              {(view === 'register' || view === 'forgot-password') && (
                <div className="relative group">
                  <input 
                    required 
                    type="text" 
                    className="peer w-full h-14 bg-[#040b14] text-white text-base px-4 pt-2.5 border border-white/10 rounded-xl outline-none focus:border-[#00f0ff] transition-all duration-300" 
                  />
                  <label className="absolute top-1/2 left-4 -translate-y-1/2 text-white/40 pointer-events-none transition-all duration-300 origin-left peer-focus:scale-[0.75] peer-focus:-translate-y-[120%] peer-valid:scale-[0.75] peer-valid:-translate-y-[120%]">
                    {t.portal.folio}
                  </label>
                </div>
              )}
              
              <button 
                type="submit" 
                className="relative w-full h-14 bg-gradient-to-r from-[#00f0ff] to-[#00b8ff] text-black text-[15px] font-bold tracking-widest uppercase rounded-xl cursor-pointer group mt-2 hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center overflow-hidden"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-4">
                  {view === 'login' ? t.portal.login : view === 'register' ? t.portal.validate : t.portal.sendCode}
                </span>
                <ArrowRight className="absolute right-6 w-5 h-5 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
              </button>
            </form>

            {view === 'login' && (
              <button 
                onClick={() => setView('forgot-password')}
                type="button"
                className="text-[13px] text-[#00f0ff] hover:underline mb-6"
              >
                {t.portal.forgotPasswordLink}
              </button>
            )}
            
            <p className="mt-2 text-[14px] text-white/60">
              <button 
                onClick={() => setView(view === 'login' ? 'register' : 'login')}
                className="text-[#00f0ff] hover:underline font-medium"
              >
                {view === 'login' ? t.portal.registerLink : t.portal.loginLink}
              </button>
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const PrivacyPolicy = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#00f0ff] hover:text-white transition-colors mb-12 text-sm font-bold tracking-widest uppercase">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
        
        <div className="bg-gradient-to-br from-[#0a1526] to-[#040b14] border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f0ff]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 relative z-10">{t.privacy.title}</h1>
          
          <div className="space-y-6 text-white/70 leading-relaxed font-light relative z-10">
            <p>{t.privacy.content1}</p>
            <p>{t.privacy.content2}</p>
            {/* Add more paragraphs as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

const TermsOfUse = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#8a2be2] hover:text-white transition-colors mb-12 text-sm font-bold tracking-widest uppercase">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
        
        <div className="bg-gradient-to-br from-[#0a1526] to-[#040b14] border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8a2be2]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 relative z-10">{t.terms.title}</h1>
          
          <div className="space-y-6 text-white/70 leading-relaxed font-light relative z-10">
            <p>{t.terms.content1}</p>
            <p>{t.terms.content2}</p>
            {/* Add more paragraphs as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <main className="relative flex flex-col">
      <Hero />
      <RepresentacionBinacional />
      <EnfoqueCentral />
      <Servicios />
      <ModeloDeNegocio />
      <Contacto />
    </main>
  );
};

export default function App() {
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#040b14] selection:bg-[#00f0ff] selection:text-black font-sans">
      <TechBackground />
      <Navbar onOpenPortal={() => setIsPortalOpen(true)} />
      <PortalModal isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
      </Routes>

      <Footer />
    </div>
  );
}
