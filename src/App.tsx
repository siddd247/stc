import { ArrowUpRight, Play, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, lazy, Suspense } from "react";

// Lazy load components
const BlurText = lazy(() => import("./components/BlurText").then(module => ({ default: module.BlurText })));


const Badge = ({ children }: { children: React.ReactNode }) => (
  <div className="liquid-glass rounded-full px-3.5 py-1.5 text-xs font-medium text-white font-body inline-flex mb-6 border border-white/10 shadow-sm uppercase tracking-widest">
    {children}
  </div>
);

const PhotoCarousel = () => {
  const gymPhotos = [
    "https://image2url.com/r2/default/images/1775416553855-6c3eb6cb-9247-48a7-8f9a-badea6f3f5ec.png",
    "https://image2url.com/r2/default/images/1775416584654-5ef36d1f-ed56-45c7-8db3-e26cefec7c1b.png",
    "https://image2url.com/r2/default/images/1775416611595-e3c00384-8981-44cc-949e-279e699b4ef1.png",
    "https://image2url.com/r2/default/images/1775416638924-29e076ef-b6bb-449c-b24b-d3b621333b6a.png"
  ];

  return (
    <div className="w-full overflow-hidden py-10 pt-0 bg-black pause-on-hover">
      <div className="flex w-fit animate-scroll-x gap-6 px-3">
        {[...gymPhotos, ...gymPhotos].map((src, i) => (
          <div key={i} className="w-[300px] md:w-[400px] aspect-square flex-shrink-0 liquid-glass rounded-[3rem] overflow-hidden border border-white/10 group">
            <img
              src={src}
              alt={`Gym ${i}`}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    setActiveSection(id);
  };

  return (
    <Suspense fallback={<div className="bg-black min-h-screen" />}>
      <div className="bg-black min-h-screen text-foreground overflow-x-hidden selection:bg-white/20">

        {/* SECTION 1 — NAVBAR */}
        <nav className="fixed top-4 left-0 right-0 z-[100] px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div
              onClick={() => scrollTo('home')}
              className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden liquid-glass flex items-center justify-center border border-white/10 shadow-lg cursor-pointer"
            >
              <img src="https://image2url.com/r2/default/images/1775414862894-d14caf5e-7dd6-43be-8add-24417312ea4d.png" alt="The Strength Culture Logo" className="w-14 h-14 md:w-20 md:h-20 object-contain" />
            </div>

            {/* Desktop Nav */}
            <div className="liquid-glass rounded-full hidden md:flex items-stretch p-1.5 border border-white/10 shadow-lg scale-110 min-w-[500px]">
              {["Home", "About", "Membership", "Find Us"].map((link) => {
                const id = link === "Find Us" ? "contact" : link.toLowerCase();
                const active = activeSection === id;
                return (
                  <a 
                    key={link} 
                    href={`#${id}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(id);
                    }}
                    className={`flex-1 flex items-center justify-center py-2.5 rounded-full text-base font-medium transition-all duration-500 relative group overflow-hidden ${
                      active 
                        ? "text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-md" 
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 backdrop-blur-xl transition-all duration-500 group-hover:bg-white/10"></div>
                    <span className="relative z-10">{link}</span>
                  </a>
                );
              })}
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden liquid-glass-strong rounded-full p-4 border border-white/10 text-white shadow-xl"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden md:block w-32"></div>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-2xl flex flex-col p-10 md:hidden"
              >
                <div className="flex justify-between items-center mb-20">
                  <div className="w-16 h-16 rounded-full overflow-hidden liquid-glass flex items-center justify-center border border-white/10">
                    <img src="https://image2url.com/r2/default/images/1775414862894-d14caf5e-7dd6-43be-8add-24417312ea4d.png" alt="TSC Logo" className="w-10 h-10 object-contain" />
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="liquid-glass-strong rounded-full p-4 border border-white/10 text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col gap-10">
                  {["Home", "About", "Membership", "Find Us"].map((link) => {
                    const id = link === "Find Us" ? "contact" : link.toLowerCase();
                    const active = activeSection === id;
                    return (
                      <button 
                        key={link} 
                        onClick={() => scrollTo(id)}
                        className={`text-4xl font-heading italic text-left transition-all duration-300 transform hover:translate-x-4 ${
                          active ? "text-white" : "text-white/50 hover:text-white"
                        }`}
                      >
                        {link}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-auto pt-10 border-t border-white/10 flex flex-col gap-6">
                  <a href="tel:+919596887888" className="text-white font-body text-lg">+91 95968 87888</a>
                  <div className="flex flex-wrap gap-x-10 gap-y-4">
                    <a href="https://wa.me/919596887888" target="_blank" rel="noopener noreferrer" className="text-white font-body text-lg">WhatsApp</a>
                    <a href="https://www.instagram.com/thestrengthculture_" target="_blank" rel="noopener noreferrer" className="text-white font-body text-lg">Instagram</a>
                    <a href="https://x.com/culture50495" target="_blank" rel="noopener noreferrer" className="text-white font-body text-lg">Twitter</a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* SECTION 2 — HERO */}
        <section id="home" className="relative w-full min-h-[1000px] bg-black overflow-hidden flex flex-col items-center pt-[15vh]">
          <div className="absolute inset-0 z-0">
            <video
              src="/videos/bg3.mp4"
              className="w-full h-full object-cover opacity-60"
              autoPlay muted loop playsInline preload="none"
            />
          </div>
          <div className="absolute inset-0 bg-black/20 z-0" />
          <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-black to-transparent z-[1]" />

          <div className="relative z-10 w-full px-6 flex flex-col items-center justify-start text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="liquid-glass rounded-full px-6 py-3 inline-flex items-center mb-10 border border-white/10 scale-110 md:mt-[20px]"
            >
              <span className="text-white/80 text-xs font-bold uppercase tracking-wider">Jammu's Premier Strength Gym</span>
            </motion.div>

            <BlurText
              text="THE STRENGTH CULTURE"
              className="text-6xl md:text-7xl lg:text-[7.5rem] font-heading italic text-white leading-[0.8] tracking-[-3px] max-w-5xl mx-auto"
            />

            <motion.p
              initial={{ filter: "blur(20px)", opacity: 0, y: 30 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="mt-10 text-xl md:text-2xl font-light text-white/60 font-body max-w-2xl mx-auto relative z-20"
            >
              Jammu's most elite strength training destination. Built for athletes, powerlifters, and anyone serious about real transformation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-14 relative z-20"
            >
              <button
                onClick={() => scrollTo('transform-section')}
                className="liquid-glass-strong rounded-full px-10 py-5 text-lg text-white font-medium flex items-center gap-2 hover:bg-white/10 transition-all duration-300 border border-white/20 shadow-2xl hover:scale-105 active:scale-95 group"
              >
                Begin Your Journey
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo('membership')}
                className="rounded-full px-8 py-5 text-lg text-white font-medium flex items-center gap-2 hover:text-white/70 transition-colors group"
              >
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Play className="w-4 h-4 fill-current ml-1" />
                </span>
                Explore Membership
              </button>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4 — ABOUT SECTION */}
        <section id="about" className="relative w-full py-20 -mt-[100px] pb-[150px] px-6 md:px-16 lg:px-24 flex items-center justify-center bg-black overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              src="/videos/bg1.mp4"
              className="w-full h-full object-cover opacity-60"
              autoPlay muted loop playsInline preload="none"
            />
          </div>
          <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent z-[1]" />
          <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent z-[1]" />

          <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
            <Badge>About Us</Badge>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.9] mt-6 mb-8 text-glow">
              Built for the ones who show up.
            </h2>
            <p className="font-body font-light text-white/60 text-xl md:text-2xl max-w-2xl mb-0">
              THE STRENGTH CULTURE is Jammu's most elite strength training destination. Built for athletes, powerlifters, and anyone serious about transformation. We don't just build bodies — we build character.
            </p>
          </div>
        </section>

        {/* PHOTO CAROUSEL SECTION */}
        <PhotoCarousel />

        {/* SECTION 5 — JOIN & TRANSFORM CARDS */}
        <section id="transform-section" className="py-20 px-6 md:px-16 lg:px-24 bg-black relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="max-w-7xl mx-auto">
            <div className="space-y-40">
              {/* Row 1 */}
              <div className="flex flex-col lg:flex-row items-center gap-20">
                <div className="flex-1 space-y-8">
                  <h3 className="text-4xl lg:text-5xl font-heading italic text-white tracking-tight">Join</h3>
                  <p className="font-body font-light text-white/50 text-xl leading-relaxed">
                    Start your membership today
                  </p>
                  <button
                    onClick={() => scrollTo('membership')}
                    className="liquid-glass-strong rounded-full px-8 py-4 mt-4 text-white font-medium inline-block border border-white/20 hover:bg-white/10 transition-all hover:scale-105 shadow-xl"
                  >
                    Join Now
                  </button>
                </div>
                <div className="flex-1 w-full">
                  <div className="liquid-glass rounded-[2rem] overflow-hidden aspect-[4/3] border border-white/10 p-3 shadow-2xl relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent z-10 pointer-events-none rounded-[1.5rem]"></div>
                    <img src="https://image2url.com/r2/default/images/1775416939053-16ecc8d2-98aa-46b2-ba11-2fd7b2fc33b5.png" alt="Join TSC" className="w-full h-full object-cover rounded-[1.5rem] transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
                <div className="flex-1 space-y-8">
                  <h3 className="text-4xl lg:text-5xl font-heading italic text-white tracking-tight">Transform</h3>
                  <p className="font-body font-light text-white/50 text-xl leading-relaxed">
                    Book a call with our coaches
                  </p>
                  <a
                    href="https://wa.me/919596887888?text=Hi%2C%20I%20want%20to%20book%20a%20call%20for%20my%20transformation."
                    target="_blank" rel="noopener noreferrer"
                    className="rounded-full px-8 py-4 mt-4 text-white font-medium inline-block border border-white/20 hover:bg-white/10 transition-all hover:scale-105"
                  >
                    Book a Call
                  </a>
                </div>
                <div className="flex-1 w-full flex justify-center lg:justify-end">
                  <div className="liquid-glass rounded-[2rem] overflow-hidden w-full max-w-[450px] aspect-[3/4] border border-white/10 p-3 shadow-2xl relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent z-10 pointer-events-none rounded-[1.5rem]"></div>
                    <img src="https://image2url.com/r2/default/images/1775416964926-bce1b0e4-2d20-4270-a589-ae132bb94a6a.png" alt="Transform at TSC" className="w-full h-full object-cover rounded-[1.5rem] transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 — MEMBERSHIP CARDS */}
        <section id="membership" className="py-32 px-6 md:px-16 lg:px-24 bg-black relative min-h-[900px] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://image2url.com/r2/default/images/1775418053582-7418f81d-9b21-458d-8378-640f626a75be.png"
              alt="Membership Background"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          <div className="absolute top-0 left-0 right-0 h-[250px] bg-gradient-to-b from-black to-transparent z-[1]" />
          <div className="absolute bottom-0 left-0 right-0 h-[250px] bg-gradient-to-t from-black to-transparent z-[1]" />

          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="mb-20 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <Badge>Membership</Badge>
                <h2 className="text-7xl md:text-8xl lg:text-[8rem] font-heading italic text-white tracking-tighter leading-[0.85] mt-6 text-glow">
                  Choose your<br />commitment.
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Monthly Member", link: "https://wa.me/919596887888?text=Hi%2C%20I%20want%20to%20join%20as%20a%20Monthly%20Member%20and%20begin%20my%20journey." },
                { title: "Quarterly Member", link: "https://wa.me/919596887888?text=Hi%2C%20I%20want%20to%20join%20as%20a%20Quarterly%20Member%20and%20begin%20my%20journey." },
                { title: "Half-Yearly Member", link: "https://wa.me/919596887888?text=Hi%2C%20I%20want%20to%20join%20as%20a%20Half-Yearly%20Member%20and%20begin%20my%20journey." },
                { title: "Yearly Member", link: "https://wa.me/919596887888?text=Hi%2C%20I%20want%20to%20join%20as%20a%20Yearly%20Member%20and%20begin%20my%20journey." }
              ].map((plan, i) => (
                <a
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={i}
                  className="block liquid-glass rounded-[2rem] p-8 border border-white/10 hover:bg-white/5 transition-all group cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)] duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="liquid-glass-strong rounded-full w-14 h-14 flex items-center justify-center mb-8 border border-white/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-xl bg-white/5">
                      <ArrowUpRight className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <h4 className="text-2xl font-heading italic text-white mb-3 group-hover:translate-x-2 transition-transform duration-300">{plan.title}</h4>
                    <p className="text-white/50 font-body font-light text-sm leading-relaxed">Become a {plan.title}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7 — REACH US / CONTACT */}
        <section id="contact" className="relative py-40 px-6 md:px-16 lg:px-24 flex items-center justify-center bg-black min-h-[600px] flex-col">
          <div className="absolute inset-0 z-0">
            <video
              src="/videos/bg2.mp4"
              className="w-full h-full object-cover opacity-50"
              style={{ filter: "saturate(0) contrast(1.2)" }}
              autoPlay muted loop playsInline preload="none"
            />
          </div>
          <div className="absolute top-0 left-0 right-0 h-[250px] bg-gradient-to-b from-black to-transparent z-[1]" />
          <div className="absolute bottom-0 left-0 right-0 h-[250px] bg-gradient-to-t from-black to-transparent z-[1]" />

          <div className="relative z-10 mb-16 text-center">
            <Badge>Find Us</Badge>
            <h2 className="text-5xl md:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mt-6">
              Reach Us
            </h2>
            <p className="mt-8 text-white/60 font-body max-w-sm mx-auto">
              Hours:<br /><br />
              Sunday: 6:30 am – 4:00 pm<br />
              Monday–Saturday: 5:30 am – 11:00 pm
            </p>
          </div>

          <div className="relative z-10 w-full max-w-6xl mx-auto liquid-glass rounded-[3rem] p-12 md:p-20 border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 text-center lg:text-left">
              <div className="flex flex-col gap-4 relative">
                <span className="text-white/60 font-body font-light text-xs md:text-sm tracking-[0.2em] uppercase">ADDRESS</span>
                <span className="text-lg font-heading italic text-white tracking-wide">Plot No. 5, Opposite Kamla Palace, Talab Tillo, Link Road, Jammu, Jammu & Kashmir 180002</span>
              </div>

              <a href="tel:+919596887888" className="flex flex-col gap-4 relative hover:opacity-80 transition-opacity">
                <span className="text-white/60 font-body font-light text-xs md:text-sm tracking-[0.2em] uppercase">PHONE</span>
                <span className="text-3xl font-heading italic text-white tracking-wide">+91 95968 87888</span>
              </a>

              <a href="https://wa.me/919596887888" target="_blank" rel="noopener noreferrer" className="flex flex-col gap-4 relative hover:opacity-80 transition-opacity">
                <span className="text-white/60 font-body font-light text-xs md:text-sm tracking-[0.2em] uppercase">WHATSAPP</span>
                <span className="text-2xl font-heading italic text-white tracking-wide">Message Us</span>
              </a>

              <a href="https://maps.app.goo.gl/gSsmWJpNDksaiRJo6" target="_blank" rel="noopener noreferrer" className="flex flex-col gap-4 relative hover:opacity-80 transition-opacity">
                <span className="text-white/60 font-body font-light text-xs md:text-sm tracking-[0.2em] uppercase">MAPS</span>
                <span className="text-2xl font-heading italic text-white tracking-wide">Locate Us</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 8 — REVIEWS SECTION */}
        <section className="pt-10 pb-2 md:py-40 px-6 md:px-16 lg:px-24 bg-black relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center">
              <Badge>What Our Members Say</Badge>
              <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-heading italic text-white tracking-tight leading-[0.9] mt-6">
                Real people. Real results.
              </h2>
            </div>

            <div className="w-full overflow-hidden py-10 pause-on-hover">
              <div className="flex w-fit animate-scroll-x gap-6 px-3">
                {[
                  { quote: "The bestest gym in Jammu with high quality and advance machinery. Great environment inside gym.", name: "Arush Sharma", role: "⭐⭐⭐⭐⭐ · 2 months ago" },
                  { quote: "This gym is fantastic! From the moment you walk in, you're greeted by friendly and helpful staff. The facility is always impeccably clean and the equipment is modern and well-maintained.", name: "Madhvan Sharma", role: "⭐⭐⭐⭐⭐ · 11 months ago" },
                  { quote: "One of the finest places to train in North India, especially in Jammu. Best in class equipment and amazing ambience. A heaven for strength training and powerlifters.", name: "Rizwan Mughal", role: "⭐⭐⭐⭐⭐ · 2 years ago" },
                  { quote: "The best gym in town! The equipment is top-notch, the environment is motivating, and the trainers genuinely care about your progress. It's more than just a gym.", name: "Aditi Mahajan", role: "⭐⭐⭐⭐⭐ · 1 year ago" },
                  { quote: "Best gym in Jammu, very good staff. Great environment for training and the athletes are also very cooperative.", name: "Saksham Sharma", role: "⭐⭐⭐⭐½ · 1 year ago" },
                  { quote: "I absolutely love this gym! The spacious environment is incredibly motivating. The atmosphere is welcoming and both members and staff are friendly and soft-spoken.", name: "Perfect Meats", role: "⭐⭐⭐⭐½ · 1 year ago" },
                  { quote: "This place has the finest environment and great equipment. Being an athlete myself, this place offers the best powerlifting equipment and the team is kind and helpful.", name: "Aditi Bakshi", role: "⭐⭐⭐⭐⭐ · 1 year ago" },
                  { quote: "This place is much more than just a gym. Everyone is dedicated and hardworking. With the best equipment, services, and people — this place ticks all the boxes. The BEST.", name: "RI PUFF", role: "⭐⭐⭐⭐⭐ · 1 year ago" },
                  // Duplicate for infinite scroll
                  { quote: "The bestest gym in Jammu with high quality and advance machinery. Great environment inside gym.", name: "Arush Sharma", role: "⭐⭐⭐⭐⭐ · 2 months ago" },
                  { quote: "This gym is fantastic! From the moment you walk in, you're greeted by friendly and helpful staff. The facility is always impeccably clean and the equipment is modern and well-maintained.", name: "Madhvan Sharma", role: "⭐⭐⭐⭐⭐ · 11 months ago" },
                  { quote: "One of the finest places to train in North India, especially in Jammu. Best in class equipment and amazing ambience. A heaven for strength training and powerlifters.", name: "Rizwan Mughal", role: "⭐⭐⭐⭐⭐ · 2 years ago" },
                  { quote: "The best gym in town! The equipment is top-notch, the environment is motivating, and the trainers genuinely care about your progress. It's more than just a gym.", name: "Aditi Mahajan", role: "⭐⭐⭐⭐⭐ · 1 year ago" }
                ].map((testimonial, i) => (
                  <div key={i} className="w-[350px] md:w-[450px] liquid-glass rounded-[2rem] p-10 border border-white/10 flex flex-col justify-between hover:bg-white/[0.05] transition-all shadow-xl flex-shrink-0 group">
                    <p className="text-white/70 font-body font-light text-base md:text-lg italic mb-12 leading-relaxed group-hover:text-white transition-colors duration-300">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-heading italic text-white/50">{testimonial.name[0]}</div>
                      <div>
                        <h4 className="text-white font-body font-medium text-sm">{testimonial.name}</h4>
                        <p className="text-white/40 font-body font-light text-xs mt-0.5">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9 — FOOTER */}
        <section className="relative pt-40 pb-12 px-6 md:px-16 lg:px-24 bg-black flex flex-col items-center overflow-hidden min-h-[800px] justify-between">
          <div className="absolute inset-0 z-0">
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
              className="w-full h-full object-cover opacity-60"
              autoPlay muted loop playsInline preload="none"
            />
          </div>
          <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black to-transparent z-[1]" />
          <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent z-[1]" />

          <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-32">
            <h2 className="text-6xl md:text-7xl lg:text-[6.5rem] font-heading italic text-white tracking-tight leading-[0.8] mb-8 drop-shadow-2xl">
              Where Iron Meets Discipline.
            </h2>
          </div>

          <footer className="relative z-10 w-full max-w-7xl mx-auto mt-40 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden liquid-glass flex items-center justify-center border border-white/10 shadow-lg">
                <img src="https://image2url.com/r2/default/images/1775414862894-d14caf5e-7dd6-43be-8add-24417312ea4d.png" alt="TSC Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="text-white/40 text-xs font-body">© 2023 The Strength Culture. All rights reserved.</span>
            </div>
            <div className="flex flex-col items-center gap-8">
              {/* Social Links Row */}
              <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
                <a href="https://www.instagram.com/thestrengthculture_" target="_blank" rel="noopener noreferrer" className="text-white/40 text-base md:text-2xl font-heading italic hover:text-white transition-all hover:scale-105">Instagram</a>
                <a href="https://x.com/culture50495" target="_blank" rel="noopener noreferrer" className="text-white/40 text-base md:text-2xl font-heading italic hover:text-white transition-all hover:scale-105">Twitter</a>
                <a href="https://wa.me/919596887888" target="_blank" rel="noopener noreferrer" className="text-white/40 text-base md:text-2xl font-heading italic hover:text-white transition-all hover:scale-105">WhatsApp</a>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </Suspense>
  );
}

export default App;
