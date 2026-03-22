/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sun, Moon, ArrowRight, TrendingUp, DraftingCompass, Bed, Sparkles, ExternalLink } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const workExperience = [
  {
    title: "Growth Equity & Institutional Investing",
    description: "I evaluate and underwrite growth-stage software businesses navigating transformational growth, combining rigorous financial modeling with hands-on commercial diligence. My work spans new deal evaluation, portfolio company support — including go-to-market strategy, working with management teams, and operational development.",
    tags: ["Growth Equity", "B2B SaaS", "Consumer Internet"],
    icon: <TrendingUp size={24} />
  },
  {
    title: "Investment Banking Advisory",
    description: "I advised technology company boards across the full transaction spectrum — M&A, leveraged buyouts, IPOs, and capital raises. My work included cross-border deals, public-to-public advisory mandates, and situations requiring deep collaboration with executive leadership on both the buy and sell side.",
    tags: ["M&A", "LBO", "IPO"],
    icon: <DraftingCompass size={24} />
  },
  {
    title: "Startup Founder",
    description: "Built a company from the ground up through a startup accelerator, taking on legal formation, investor relations, and financial operations. The experience of going from zero to a successful exit gave me a deep appreciation for what it actually takes to build something — and shapes how I think about the founders I work with today.",
    tags: ["Entrepreneurship", "Exit", "Operations"],
    icon: <Sparkles size={24} />
  },
  {
    title: "Personal Angel Investments",
    description: "Personal investment into Asano, a café in New York City. I took a stroll in New York and found a business changing the way we experience cafés, focused on the Japanese concept of Mottainai.",
    tags: ["Angel Investing", "F&B", "Hospitality"],
    icon: <Bed size={24} />
  }
];

const portfolioItems = [
  {
    name: "Quilt",
    category: "Community / Social",
    logo: "Quilt",
    bgColor: "bg-surface-container-highest",
  },
  {
    name: "Pinterest",
    category: "Discovery / Visual",
    logo: "Pinterest",
    bgColor: "bg-surface-container-highest",
  },
  {
    name: "Life360",
    category: "Safety / Consumer Tech",
    logo: "Life360",
    bgColor: "bg-surface-container-highest",
  },
  {
    name: "Asano",
    category: "F&B / Sustainable",
    logo: "Asano",
    bgColor: "bg-surface-container-highest",
    isSerif: true,
  },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return false;
    }
    return false;
  });
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return ['home', 'work', 'writing'].includes(hash) ? hash : 'home';
  });

  useEffect(() => {
    const newHash = activeTab === 'home' ? '' : `#${activeTab}`;
    const currentHash = window.location.hash.replace('#', '');
    const currentTab = currentHash || 'home';
    if (currentTab !== activeTab) {
      window.history.pushState(null, '', `${window.location.pathname}${newHash}`);
    }
    window.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      setActiveTab(['home', 'work', 'writing'].includes(hash) ? hash : 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-tertiary-container selection:text-on-tertiary-container transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-forest-light/95 dark:bg-forest-dark/95 backdrop-blur-md border-b border-white/10">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-6">
          <span className="text-2xl font-headline italic text-white tracking-tighter cursor-pointer" onClick={() => setActiveTab("home")}>
            The Editorial Investor
          </span>
          <div className="hidden md:flex gap-10 items-center">
            <button 
              onClick={() => setActiveTab("home")}
              className={`text-white font-headline italic tracking-tight transition-colors duration-300 ${activeTab === "home" ? "border-b-2 border-orange-200/50" : "opacity-80 hover:opacity-100"}`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveTab("work")}
              className={`text-white font-headline italic tracking-tight transition-colors duration-300 ${activeTab === "work" ? "border-b-2 border-orange-200/50" : "opacity-80 hover:opacity-100"}`}
            >
              Work
            </button>
            <button 
              onClick={() => setActiveTab("writing")}
              className={`text-white font-headline italic tracking-tight transition-colors duration-300 ${activeTab === "writing" ? "border-b-2 border-orange-200/50" : "opacity-80 hover:opacity-100"}`}
            >
              Writing
            </button>
            <div className="flex items-center ml-4">
              <button 
                onClick={toggleTheme}
                className="text-white/90 hover:scale-110 duration-200 ease-in-out p-2 rounded-full hover:bg-white/10"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-forest-light dark:bg-forest-dark border-b border-white/10 px-8 py-6 flex flex-col gap-4"
          >
            <button onClick={() => { setActiveTab("home"); setIsMenuOpen(false); }} className="text-white font-headline italic text-xl text-left">Home</button>
            <button onClick={() => { setActiveTab("work"); setIsMenuOpen(false); }} className="text-white/80 font-headline italic text-xl text-left">Work</button>
            <button onClick={() => { setActiveTab("writing"); setIsMenuOpen(false); }} className="text-white/80 font-headline italic text-xl text-left">Writing</button>
            <button onClick={toggleTheme} className="text-white/80 font-headline italic text-xl text-left flex items-center gap-2">
              {isDarkMode ? <><Sun size={20} /> Light Mode</> : <><Moon size={20} /> Dark Mode</>}
            </button>
          </motion.div>
        )}
      </nav>

      <main className="pt-32">
        {activeTab === "home" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <section className="px-8 max-w-7xl mx-auto mb-32">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex-1"
                >
                  <h1 className="font-headline text-5xl md:text-7xl text-on-surface leading-[1.1] tracking-tight mb-8">
                    Hi, I'm Chris Giron. <br />
                    <span className="italic font-normal text-forest-bright">Growth Architect & Investor.</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl leading-relaxed">
                    I back visionary founders with unique ideas at key growth inflection points. Historically focused on B2B SaaS and consumer internet companies.
                  </p>
                  <div className="mt-8 flex gap-4">
                    <button onClick={() => setActiveTab("work")} className="bg-forest-light text-white px-6 py-3 rounded-sm font-label hover:bg-forest-bright transition-colors">
                      View Work
                    </button>
                    <button onClick={() => setActiveTab("writing")} className="border border-on-surface/20 px-6 py-3 rounded-sm font-label hover:bg-on-surface/5 transition-colors">
                      Read Notes
                    </button>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full md:w-1/3 aspect-[4/5] bg-surface-container overflow-hidden rounded-sm relative"
                >
                  <div className="grid grid-cols-2 gap-2 w-full h-full">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src="https://lh3.googleusercontent.com/aida/ADBb0uhq41Y7rZ9_jtyK5vwX1p-qwYmwvUooxNVjbkESsv3XVCARy93fiiE2sqsomqBETw9c2S91RNzK6EXOU8WX8KhowLqg_o-NIqT-9llaqKJnu6NRiiiXEtB12OugjUvi-xNRsn1PsmvJ6p4smz51t-Md5QyaZFBgKhMS0jEnfvEw6xUyyWIONNt7Cfb_sWohQDySlQYRcji4WW2nA6w0QWvEtbCmuU37aNWE1ft_lvzo_GAoSLyt3wVwoDC35o9m7yWhmabNu9uEbjo" 
                        alt="Chris Giron Lifestyle" 
                        className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src="https://lh3.googleusercontent.com/aida/ADBb0ujTp-0l0GRp7mZyTSWVmEVzk0Q5w3zglbEOGpnBGK4W0hn2RSy5hxWj0p211OsIb99SX8UQdJ0NkOPbm6PyXRG8Ibo0SGbK78lxsv_EcD_S9iZFF7fKw7QMyE_keYFPhn5Epbhh6VtKNHuE3oEzlq6AolmlIvr_dQh-cd3Q93kerqsNoB7CqNge7MLoP_NxFyRKbGnVFqTeyNnfp3H3pVpCWxq78BHOeyfA_NLw2_0NjhMdmrwJ7DDxhfCRHUjUkJLXCtBXhtFMbhk" 
                        alt="Silence Please Text" 
                        className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src="https://lh3.googleusercontent.com/aida/ADBb0uhnTRK2okgX0K7yulx-EMbITaDWaknUVRvCD7dJrt3FE3nCf8aA320XHUkhNYJr4WS4tjIlT2856sDLmrCV4daHe1WvHvjW80xWZDyh_x0Hqm9D_z1sY1YhYpaZuoysP_dJGv3DzoyY3JW0EDoKwpD2LU6pttbtYponWQ-uCqRHA2lJkbEytFQiO84Gtr3pQUqdfFGmx9-bSmqD5nOI2yhjhfQIEp4NlMX4B_bwN-9ObPR4iWxAPrvO6B-ex7Ll1lFthpF04BYVrsk" 
                        alt="Geometric Pattern" 
                        className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="aspect-square overflow-hidden bg-surface-container-highest flex items-center justify-center">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYswuL6vRyMv6K5CC5C8bTDQaBYEoiI76tPYlzXZaslm1OytUBgHQIMt0hz_nrQaUJ1QFe78K2ZDX2YfpgwLnnbvaGVqL9O9EFRpYP_qUrathiINEu_AkXqqFfePebVtnL1v8D6ZK9PrfJYuLvT2MwsqmI19eF5PfszItrMLwuLECbQN6WHCIzNn5cgd-zpFAbc_pEM8HN9pRBwE_-jlinTAIEj-0mnrBUOBclZdfo8UhcGxmVcGxVnjEW5umlOrSkNT7j3RoJy-1a" 
                        alt="Placeholder Texture" 
                        className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Quick Stats / Philosophy */}
            <section className="bg-surface-container-low py-32">
              <div className="px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col gap-4">
                  <h3 className="font-headline text-2xl italic">The Philosophy</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    "Scale is not the goal; longevity is. Growth must be rooted in human behavior and operational rigor."
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="font-headline text-2xl italic">The Focus</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    B2B SaaS, Consumer Internet, and the evolution of 'Third Spaces' in Hospitality and F&B.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="font-headline text-2xl italic">The Location</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    Based in New York City, operating globally.
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === "work" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-8 max-w-7xl mx-auto pb-32"
          >
            <h2 className="font-headline text-5xl mb-16 italic">Professional Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {workExperience.map((exp, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-surface-container p-10 rounded-sm border border-on-surface/5 hover:border-forest-bright/30 transition-all group"
                >
                  <div className="text-forest-bright mb-6 group-hover:scale-110 transition-transform duration-300">
                    {exp.icon}
                  </div>
                  <h3 className="font-headline text-2xl mb-4">{exp.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed mb-6">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-label uppercase tracking-widest bg-on-surface/5 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-32">
              <h3 className="font-headline text-3xl mb-12 italic">Select Portfolio</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {portfolioItems.map((item) => (
                  <div key={item.name} className="flex flex-col gap-4 group cursor-pointer">
                    <div className={`aspect-square ${item.bgColor} dark:bg-surface-container-highest/50 overflow-hidden p-8 flex items-center justify-center relative`}>
                      <div className={`text-2xl font-bold tracking-tighter text-on-surface/30 group-hover:text-on-surface transition-colors ${item.isSerif ? 'font-headline italic' : ''}`}>
                        {item.logo}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-headline text-lg">{item.name}</h4>
                      <p className="text-xs text-on-surface-variant font-label uppercase tracking-widest">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "writing" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-8 max-w-7xl mx-auto pb-32"
          >
            <div className="mb-20">
              <h2 className="font-headline text-5xl mb-8 italic">Notes & Writing</h2>
              <p className="text-on-surface-variant max-w-2xl text-lg">
                Occasional thoughts on investing, technology, and the cultural shifts I'm observing.
              </p>
            </div>

            {/* Latest from Substack */}
            <div className="bg-surface-container-highest dark:bg-surface-container-high p-12 rounded-sm mb-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ExternalLink size={120} />
              </div>
              <div className="relative z-10">
                <span className="text-xs font-label uppercase tracking-[0.3em] text-forest-bright mb-4 block">Latest from Substack</span>
                <h3 className="font-headline text-3xl mb-6 max-w-2xl">The Future of Third Spaces: Why Hospitality is the New Tech</h3>
                <p className="text-on-surface-variant mb-8 max-w-xl leading-relaxed">
                  Exploring how physical spaces are evolving in an AI-native world, and why the "human touch" is becoming the ultimate premium asset.
                </p>
                <a 
                  href="https://substack.com/@chgi121" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-forest-bright font-medium group"
                >
                  Read on Substack
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="border-t border-on-surface/10 pt-8">
                <span className="text-xs font-label text-on-surface-variant uppercase tracking-widest mb-4 block">TBU — Coming Soon</span>
                <h4 className="font-headline text-2xl mb-4 opacity-50">AI-Native SaaS Distribution</h4>
                <p className="text-on-surface-variant opacity-50">How the next generation of software will be sold, not bought.</p>
              </div>
              <div className="border-t border-on-surface/10 pt-8">
                <span className="text-xs font-label text-on-surface-variant uppercase tracking-widest mb-4 block">TBU — Coming Soon</span>
                <h4 className="font-headline text-2xl mb-4 opacity-50">The Mottainai Principle in Growth</h4>
                <p className="text-on-surface-variant opacity-50">Applying Japanese philosophy to operational efficiency.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contact Section */}
        <section className="py-40 bg-surface" id="contact">
          <div className="px-8 max-w-3xl mx-auto text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-on-surface-variant mb-8 block font-label">Open Dialogue</span>
            <h2 className="font-headline text-5xl md:text-6xl text-on-surface mb-12 leading-tight">
              Let's collaborate on the <br /> <span className="italic">next standard.</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a href="mailto:hello@chrisgiron.com" className="bg-forest-light text-white px-10 py-4 rounded-md font-label font-medium hover:bg-forest-bright transition-all active:scale-95 shadow-lg shadow-forest-bright/10">
                Email Chris
              </a>
              <a href="https://www.linkedin.com/in/chris-s-giron/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-4 border-b border-on-surface/20 text-on-surface font-label font-medium hover:border-forest-bright transition-all group">
                Connect on LinkedIn 
                <ArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition-transform" size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-forest-dark w-full py-20 px-8">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-lg font-headline italic text-white">The Editorial Investor</span>
            <p className="font-label text-xs uppercase tracking-widest text-white/50">© 2024 The Editorial Investor. NYC Based.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <a href="https://substack.com/@chgi121" target="_blank" rel="noopener noreferrer" className="font-label text-sm uppercase tracking-widest text-white/80 hover:text-white transition-opacity border-b border-white/10 hover:border-white/40">Substack</a>
            <a href="https://www.linkedin.com/in/chris-s-giron/" target="_blank" rel="noopener noreferrer" className="font-label text-sm uppercase tracking-widest text-white/80 hover:text-white transition-opacity border-b border-white/10 hover:border-white/40">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
