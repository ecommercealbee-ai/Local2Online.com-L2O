import { useState, useEffect, TransitionStartFunction } from 'react';
import { 
  ShoppingBag, Layers, TrendingUp, Globe, Code, ShieldCheck, 
  ArrowRight, Check, Play, ChevronRight, User, Menu, Star, 
  HelpCircle, Sparkles, MessageSquare, Briefcase, FileText, 
  Calculator, Award, CheckCircle, Clock 
} from 'lucide-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StatsSection from './components/StatsSection';
import TestimonialsSlider from './components/TestimonialsSlider';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ContactSection from './components/ContactSection';
import AdminDashboard from './components/AdminDashboard';

import { Service, BlogPost, Project, Testimonial, PricingTier } from './types';
import { 
  INITIAL_SERVICES, INITIAL_TESTIMONIALS, INITIAL_PRICING, 
  INITIAL_PORTFOLIO, INITIAL_BLOGS, GENERAL_FAQS 
} from './data';

export default function App() {
  const [currentTab, setTab] = useState<string>('home');
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [pricing, setPricing] = useState<PricingTier[]>(INITIAL_PRICING);
  const [portfolio, setPortfolio] = useState<Project[]>(INITIAL_PORTFOLIO);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);

  const [preselectedService, setPreselectedService] = useState<string>('');
  const [preselectedFormType, setPreselectedFormType] = useState<'contact' | 'audit' | 'consultation' | 'callback'>('contact');
  
  // Interactive pricing calculator state variables
  const [selectedCalculatedPlatforms, setSelectedCalculatedPlatforms] = useState<string[]>(['amazon']);

  // Dynamic portfolio filter
  const [selectedPortfolioTag, setSelectedPortfolioTag] = useState<string>('all');

  // Currently expanded blog article
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);

  // Load dynamically from backend if available, fallback gracefully to initial seeds
  useEffect(() => {
    const fetchFreshContent = async () => {
      try {
        const [servicesRes, testimonialsRes, blogsRes, portfolioRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/testimonials'),
          fetch('/api/blogs'),
          fetch('/api/portfolio')
        ]);
        
        if (servicesRes.ok) {
          const sData = await servicesRes.json();
          if (sData && sData.length > 0) setServices(sData);
        }
        if (testimonialsRes.ok) {
          const tData = await testimonialsRes.json();
          if (tData && tData.length > 0) setTestimonials(tData);
        }
        if (blogsRes.ok) {
          const bData = await blogsRes.json();
          if (bData && bData.length > 0) setBlogs(bData);
        }
        if (portfolioRes.ok) {
          const pData = await portfolioRes.json();
          if (pData && pData.length > 0) setPortfolio(pData);
        }
      } catch (err) {
        console.log('Using robust initial clients data seeds (static node fallback)', err);
      }
    };
    fetchFreshContent();
  }, [currentTab]);

  // Route wrapper helpers
  const handleSelectServiceAndGo = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    setPreselectedFormType('contact');
    setTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToAudit = () => {
    setPreselectedFormType('audit');
    setTab('audit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPackageAndGo = (pkgName: string) => {
    setPreselectedService(pkgName + " Setup & Launch Package Plan");
    setPreselectedFormType('consultation');
    setTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pricing calculator helper computation
  const baseCalculatorMap: Record<string, { price: number; name: string; feat: string }> = {
    'amazon': { price: 8000, name: 'Amazon Seller Onboarding', feat: 'Seller central account registry + first listings + PPC configure' },
    'flipkart': { price: 6000, name: 'Flipkart Launch Setup', feat: 'Verification approval support + smart catalog templates' },
    'meesho': { price: 5000, name: 'Meesho Supplier Hub Enablement', feat: 'Commission-free pricing matrix configuration' },
    'shopify': { price: 15000, name: 'Premium Shopify D2C store', feat: 'Design theme setup + payment integration + shipping rules' },
    'woocommerce': { price: 14000, name: 'Hosting Self-Managed WordPress store', feat: 'Lifetime license + unlimited products listing' },
  };

  const calcPlatformsSum = selectedCalculatedPlatforms.reduce(
    (sum, code) => sum + (baseCalculatorMap[code]?.price || 0), 
    0
  );

  // Bundle discount calculations (e.g. 15% discount if more than 2 items are bought simultaneously)
  const isEligibleDiscount = selectedCalculatedPlatforms.length >= 3;
  const rawFinalPrice = calcPlatformsSum;
  const calculatedDiscount = isEligibleDiscount ? Math.round(rawFinalPrice * 0.15) : 0;
  const calculatedTax = Math.round((rawFinalPrice - calculatedDiscount) * 0.18); // standard 18% GST estimate
  const calculatedFinalSum = (rawFinalPrice - calculatedDiscount) + calculatedTax;

  // Render icons helper
  const renderIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'shoppingbag': return <ShoppingBag className="h-6 w-6 text-[#FFC83D]" />;
      case 'layers': return <Layers className="h-6 w-6 text-[#FFC83D]" />;
      case 'trendingup': return <TrendingUp className="h-6 w-6 text-[#FFC83D]" />;
      case 'globe': return <Globe className="h-6 w-6 text-[#FFC83D]" />;
      case 'code': return <Code className="h-6 w-6 text-[#FFC83D]" />;
      case 'shieldcheck': return <ShieldCheck className="h-6 w-6 text-[#FFC83D]" />;
      default: return <Award className="h-6 w-6 text-[#FFC83D]" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white" id="app_root_layout">
      
      {/* Dynamic Navigation components */}
      <Navbar currentTab={currentTab} setTab={(t) => {
        setPreselectedService('');
        setPreselectedFormType('contact');
        setTab(t);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Primary Routing view switcher */}
      <main className="flex-grow" id="main_pages_routing">
        
        {/* ==================== HOME PAGE VIEW ==================== */}
        {currentTab === 'home' && (
          <div id="view_home" className="space-y-0">
            
            {/* SECTION 1 — HERO SECTION */}
            <section className="relative bg-gradient-to-r from-[#071B4D] via-[#092261] to-[#0A2C73] text-white pt-24 pb-28 px-4 overflow-hidden" id="hero_section">
              {/* Artistic Background blobs */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,200,61,0.12),transparent_40%)]" />
              <div className="absolute top-1/2 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -bottom-10 right-10 h-64 w-64 bg-[#FFC83D]/5 blur-3xl" />

              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                
                {/* Text Side Content */}
                <div className="lg:col-span-7 space-y-6" id="hero_left_content">
                  <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10" id="hero_badge">
                    <Sparkles className="h-4 w-4 text-[#FFC83D]" />
                    <span className="text-xs font-semibold tracking-wide text-gray-200">#1 Marketplace Enabler in South India</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight leading-tight text-white" id="hero_title">
                    We Help Businesses <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC83D] to-orange-400">Sell Online & Grow Faster</span>
                  </h1>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl" id="hero_descriptions">
                    We help local retailers, manufacturers and brands sell on Amazon, Flipkart, Meesho, Shopify and their own websites. We manage GST registration, high-converting catalogs, smart search SEO, and profitable ad accounts.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4" id="hero_cta_buttons">
                    <button
                      onClick={() => handleSelectServiceAndGo('Booked Free Direct Advisory Consultation')}
                      id="hero_btn_book_consultation"
                      className="px-8 py-4 text-sm font-bold text-[#071B4D] bg-[#FFC83D] hover:bg-[#ffe18c] text-center rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      Book Free Consultation
                    </button>
                    <button
                      onClick={handleGoToAudit}
                      id="hero_btn_get_audit"
                      className="px-8 py-4 text-sm font-bold text-white bg-white/10 hover:bg-white/15 border border-white/25 hover:border-white/50 text-center rounded-xl transition-all duration-300 cursor-pointer"
                    >
                      Get Free Store Audit ✓
                    </button>
                  </div>

                  <div className="flex items-center space-x-8 pt-6 border-t border-white/10" id="hero_trust_indicators">
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xl font-bold font-mono">100+</span>
                        <Star className="h-4 w-4 fill-[#FFC83D] text-[#FFC83D]" />
                      </div>
                      <p className="text-xs text-gray-400">Indian Merchants</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xl font-bold font-mono">250+</span>
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                      </div>
                      <p className="text-xs text-gray-400">Stores Live Onboarded</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xl font-bold font-mono">4.9/5</span>
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      </div>
                      <p className="text-xs text-gray-400">Customer Rating</p>
                    </div>
                  </div>
                </div>

                {/* Styled Device visual mockups matching the design reference details */}
                <div className="lg:col-span-5 relative" id="hero_right_visual">
                  <div className="bg-[#0A2C73] border-4 border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden" id="hero_mockup_container">
                    
                    {/* UI Floating Cards */}
                    <div className="absolute top-4 left-4 bg-[#FFC83D] text-[#071B4D] p-3 rounded-xl shadow-lg text-xs font-bold font-mono flex items-center space-x-2 animate-bounce">
                      <TrendingUp className="h-4 w-4" />
                      <span>+350% Reach Live</span>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
                        <div className="h-10 w-10 bg-white/15 rounded-xl flex items-center justify-center font-bold text-[#FFC83D] font-mono">L2O</div>
                        <div>
                          <h4 className="text-xs font-bold font-mono text-white">Merchant Dashboard</h4>
                          <span className="text-[9px] text-gray-300">Live API Channel sync: ACTIVE</span>
                        </div>
                      </div>

                      {/* Animated orders review mockup */}
                      <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400">Total Monthly Revenue</span>
                          <span className="text-emerald-400 font-bold">+184% MoM</span>
                        </div>
                        <div className="text-2xl font-bold text-white font-mono">₹4,89,500</div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-400 to-[#FFC83D] w-3/4" />
                        </div>
                      </div>

                      {/* Interactive marketplace checklist mockup */}
                      <div className="space-y-2 text-xs text-gray-300">
                        <p className="font-bold text-gray-200">Integrated Active Channel Feeds:</p>
                        <ul className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                          <li className="flex items-center space-x-1.5"><Check className="h-3 w-3 text-[#FFC83D]" /> <span>Amazon Seller Central</span></li>
                          <li className="flex items-center space-x-1.5"><Check className="h-3 w-3 text-[#FFC83D]" /> <span>Flipkart Hub</span></li>
                          <li className="flex items-center space-x-1.5"><Check className="h-3 w-3 text-[#FFC83D]" /> <span>Meesho Supplier</span></li>
                          <li className="flex items-center space-x-1.5"><Check className="h-3 w-3 text-[#FFC83D]" /> <span>Shopify Premium D2C</span></li>
                        </ul>
                      </div>

                      <div className="pt-2 text-[11px] text-gray-400 text-center uppercase font-mono tracking-widest leading-relaxed">
                        ★ Shopify, WooCommerce, Amazon Partner ★
                      </div>
                    </div>
                  </div>
                  
                  {/* Outer circle layout elements */}
                  <div className="absolute -z-10 -bottom-6 -left-6 bg-amber-400 h-16 w-16 rounded-full blur-xl opacity-40" />
                </div>
              </div>
            </section>

            {/* SECTION 2 — TRUSTED PLATFORMS */}
            <section className="bg-gray-50 border-y border-gray-100 py-12" id="trusted_platforms">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 font-mono block">We Integrated With All Trusted Distribution Channels</span>
                
                {/* Visual grid representing the logos in polished modern monochrome text nodes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-items-center opacity-85" id="trusted_logos_flex">
                  {[
                    { name: 'Amazon India', desc: '100M+ Buyer Base', badge: 'bg-[#FFC83D]/10 text-[#071B4D]' },
                    { name: 'Flipkart Seller', desc: 'Homegrown Leader', badge: 'bg-[#FFC83D]/10 text-[#071B4D]' },
                    { name: 'Meesho Supplier', desc: '0% Referral Fees', badge: 'bg-[#FFC83D]/10 text-[#071B4D]' },
                    { name: 'Shopify Store', desc: 'Premium D2C Freedom', badge: 'bg-[#FFC83D]/10 text-[#071B4D]' },
                    { name: 'WooCommerce', desc: 'WordPress Scaling', badge: 'bg-[#FFC83D]/10 text-[#071B4D]' },
                  ].map((plat, index) => (
                    <div
                      key={index}
                      className="px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-[180px] text-center hover:scale-105 hover:border-amber-400 transition-all cursor-pointer"
                    >
                      <h4 className="text-sm font-extrabold text-[#071B4D] tracking-tight">{plat.name}</h4>
                      <p className="text-[10px] text-gray-400 font-semibold font-mono mt-0.5">{plat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 3 — WHY SELL ONLINE? */}
            <section className="bg-white py-24" id="why_sell_online">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left block containing graphic mock statistical highlights */}
                  <div className="lg:col-span-5 space-y-4" id="why_sell_online_left">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#071B4D] font-mono bg-[#FFC83D]/20 px-3 py-1.5 rounded-full inline-block">The Digital Wave</span>
                    <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-gray-900 leading-tight">
                      Your Customers Are Already Shopping Online
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Indian e-commerce is on track to cross **$200 Billion** in sales within years. Traditional shops relying purely on foot-traffic are seeing massive slumps. By moving your inventory catalogs to digital hubs, you sell 24/7 beyond physical boundaries!
                    </p>
                    
                    <div className="bg-amber-400/10 border-l-4 border-[#FFC83D] p-5 rounded-r-xl" id="quote_box">
                      <p className="text-sm text-gray-800 italic">
                        "More than 50% of orders processed on Meesho and Amazon now originate in Tier 2 & Tier 3 towns where local manufacturers previously had no distribution routes!"
                      </p>
                    </div>
                  </div>

                  {/* Right block: 4 Core strategic advantages */}
                  <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6" id="why_sell_online_right_grid">
                    {[
                      {
                        title: 'Exponential Wider Reach',
                        desc: 'Transition from serving a single neighborhood to listing your products visible to all pin codes in India.',
                        icon: Globe,
                        color: 'bg-indigo-50 text-indigo-600'
                      },
                      {
                        title: 'Non-Stop 24/7 Sales',
                        desc: 'Physical shops close down at night. Your online Amazon and Shopify store processes customer checkouts non-stop.',
                        icon: Clock,
                        color: 'bg-emerald-50 text-emerald-600'
                      },
                      {
                        title: 'Massive Marketplace Scalability',
                        desc: 'Automate order booking and let marketplace delivery partners collect product packages directly from your warehouse.',
                        icon: Layers,
                        color: 'bg-amber-50 text-[#FFC83D]'
                      },
                      {
                        title: 'Direct Client Loyalty',
                        desc: 'Gather customer emails and WhatsApp details on your custom web store to launch targeted discount promo catalogs.',
                        icon: Sparkles,
                        color: 'bg-rose-50 text-rose-600'
                      }
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div key={idx} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                          <div className={`p-3 rounded-xl w-fit ${item.color} mb-4`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4 — WHY CHOOSE LOCAL2ONLINE? */}
            <section className="bg-[#071B4D] text-white py-24 relative overflow-hidden" id="why_choose_local2online">
              <div className="absolute top-0 right-0 h-96 w-96 bg-[#FFC83D]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-64 w-64 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FFC83D] font-mono bg-white/10 px-3 py-1.5 rounded-full inline-block">Absolute Security</span>
                  <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight mt-4">
                    Your Complete Online Selling Partner
                  </h2>
                  <p className="text-gray-300 text-sm mt-3">From regulatory paperwork like GSTIN certificates to daily organic sales optimization, we remove the technical headaches completely.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="why_choose_cards_grid">
                  {[
                    {
                      title: 'Complete GST Setup Support',
                      desc: 'Don’t have a GST number yet? We handle filing and regulatory onboarding, making you compliant for amazon and flipkart hub permissions.',
                    },
                    {
                      title: 'Marketplace Integration Setup',
                      desc: 'Deploy products central catalogues across Amazon, Flipkart and Meesho concurrently with unified stock setups.',
                    },
                    {
                      title: 'SEO Product Optimized Listings',
                      desc: 'Write rich titles, tags and metadata descriptions so that customers searching find your products on front search interfaces.',
                    },
                    {
                      title: 'D2C Custom Store Development',
                      desc: 'Premium Shopify store design with local payment checkouts and shipping aggregators supporting automatic cash on delivery logic.',
                    },
                    {
                      title: 'Account Management',
                      desc: 'Tired of regular portal tasks? We act as your outsourcing growth partner, adjusting bids, resolving disputes, and executing ads.',
                    },
                    {
                      title: 'Transparent Reporting',
                      desc: 'Weekly and monthly summaries of total sales volume, payout summaries, marketing return ROI, and inventory advisory logs.',
                    }
                  ].map((benefit, idx) => (
                    <div
                      key={idx}
                      className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 h-1 bg-[#FFC83D] w-0 group-hover:w-full transition-all duration-300" />
                      
                      <div className="h-8 w-8 rounded-full bg-[#FFC83D]/20 text-[#FFC83D] flex items-center justify-center font-bold font-mono text-xs mb-4">
                        ✓
                      </div>

                      <h3 className="text-base font-bold text-white mb-2">{benefit.title}</h3>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 5 — OUR SERVICES PARTIAL GRID */}
            <section className="bg-white py-24" id="home_services_grid">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16" id="srv_header_block">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#071B4D] font-mono bg-[#FFC83D]/20 text-[#071B4D] px-3 py-1.5 rounded-full inline-block">Professional Channels</span>
                    <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-gray-900 mt-4">
                      Everything You Need To Sell Online
                    </h2>
                  </div>
                  <button
                    onClick={() => setTab('services')}
                    id="find_all_services_btn"
                    className="inline-flex items-center space-x-1 text-sm font-bold text-[#071B4D] hover:text-[#0A2C73] transition-colors mt-4 md:mt-0 font-mono"
                  >
                    <span>View Detailed Features List</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="srv_cards_wrapper">
                  {services.slice(0, 6).map((service) => (
                    <div
                      key={service.id}
                      className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 relative flex flex-col justify-between"
                      id={`srv_card_${service.id}`}
                    >
                      <div>
                        <div className="p-3.5 bg-[#071B4D] text-[#FFC83D] w-fit rounded-2xl mb-6 shadow-md">
                          {renderIcon(service.icon)}
                        </div>
                        <h4 className="text-base font-extrabold text-gray-900 mb-2">{service.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed mb-6 font-sans">
                          {service.shortDesc}
                        </p>
                        
                        <div className="space-y-2 border-t border-gray-100 pt-4" id="srv_card_feats">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Core deliverables :</p>
                          <ul className="text-xs text-gray-600 space-y-2 pl-1 font-sans">
                            {service.features.slice(0, 3).map((feat, idx) => (
                              <li key={idx} className="flex items-start space-x-1.5 leading-relaxed">
                                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-8">
                        <button
                          onClick={() => handleSelectServiceAndGo(service.title)}
                          id={`srv_learn_more_${service.id}`}
                          className="w-full py-2.5 text-center text-xs font-bold text-[#071B4D] bg-gray-50 hover:bg-[#FFC83D] rounded-xl transition-colors duration-200"
                        >
                          Launch This Channel →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 6 — HOW IT WORKS TIMELINE */}
            <section className="bg-gray-50 py-24 border-y border-gray-100" id="how_it_works">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-20" id="timeline_header">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#071B4D] font-mono bg-[#FFC83D]/20 text-[#071B4D] px-3 py-1.5 rounded-full inline-block">Our Blueprint</span>
                  <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-gray-900 mt-4 animate-pulse hover:animate-none">
                    How We Take You Online
                  </h2>
                  <p className="text-gray-600 text-sm mt-3">A transparent five-stage digital pipeline crafted to protect your capital and accelerate sales.</p>
                </div>

                <div className="relative" id="timeline_grid_rail">
                  {/* Decorative timeline bar */}
                  <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-[#0A2C73]/10" />

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8" id="timeline_stages_flex">
                    {[
                      { step: '01', title: 'Free Consultation', desc: 'Book a free strategy overview. We review your products and tell you which portals will yield high sales velocity.' },
                      { step: '02', title: 'Paperwork Documentation', desc: 'Secure bank certifications, trade documents, and GST registration approvals without leaving your home.' },
                      { step: '03', title: 'Setup & Store Launch', desc: 'Establish seller channels, verify trademark brand records, design storefronts, and list stock items live.' },
                      { step: '04', title: 'Catalog Search Optimization', desc: 'Configure search tag keywords, product bullet SEO listings, and automated shipping parcel routing.' },
                      { step: '05', title: 'PPC Growth Management', desc: 'Scale automated keyword ad budgets, process review captures, and restock reports on monthly cycles.' },
                    ].map((stage, idx) => (
                      <div key={idx} className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm" id={`stage_card_${idx + 1}`}>
                        <span className="absolute -top-4 left-6 text-2xl font-mono font-extrabold text-[#071B4D] bg-[#FFC83D] px-2.5 py-1 rounded-xl shadow border border-amber-300">
                          {stage.step}
                        </span>
                        
                        <div className="pt-4 space-y-2">
                          <h4 className="text-sm font-extrabold text-[#071B4D] tracking-tight">{stage.title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed font-sans">{stage.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7 — STATS SECTION METRIC */}
            <StatsSection />

            {/* SECTION 8 — TESTIMONIALS SLIDER */}
            <TestimonialsSlider testimonials={testimonials} />

            {/* SECTION 9 — PRICING PACKAGES OVERVIEW */}
            <section className="bg-white py-24" id="pricing_teaser_section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-16" id="pricing_header">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#071B4D] font-mono bg-[#FFC83D]/20 text-[#071B4D] px-3 py-1.5 rounded-full inline-block">Flat Uncomplicated Investment Plans</span>
                  <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-gray-900 mt-4">
                    Pricing That Fits Your Ambitions
                  </h2>
                  <p className="text-gray-600 text-sm mt-3">We have flat commissions on setup. No monthly cuts of your sales or complex pricing contracts.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" id="pricing_columns_wrapper">
                  {pricing.map((tier) => (
                    <div
                      key={tier.id}
                      className={`relative bg-white rounded-3xl p-8 border flex flex-col justify-between hover:shadow-2xl transition-all duration-300 ${
                        tier.isPopular ? 'border-[#FFC83D] shadow-xl md:-translate-y-2' : 'border-gray-100 shadow-sm'
                      }`}
                      id={`pricing_tier_${tier.id}`}
                    >
                      {tier.isPopular && (
                        <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest text-[#071B4D] bg-[#FFC83D] rounded-full shadow-md font-mono">
                          MOST POPULAR RETAILER CHOICE
                        </span>
                      )}

                      <div className="space-y-4">
                        <div className="border-b border-gray-100 pb-4">
                          <h3 className="text-lg font-bold text-gray-900">{tier.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">{tier.subtitle}</p>
                        </div>

                        <div className="py-2" id="tier_price">
                          <span className="text-3xl sm:text-4xl font-sans font-extrabold text-[#071B4D] tracking-tight">{tier.price}</span>
                          <span className="text-xs text-gray-400 font-mono italic ml-2">/ {tier.period}</span>
                        </div>

                        <p className="text-xs text-gray-500 leading-relaxed italic pr-4">
                          "{tier.description}"
                        </p>

                        <ul className="space-y-2.5 text-xs text-gray-600 border-t border-gray-50 pt-4" id="tier_feats_list">
                          {tier.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start space-x-2 leading-relaxed">
                              <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-8">
                        <button
                          onClick={() => handleSelectPackageAndGo(tier.name)}
                          id={`pricing_btn_tier_${tier.id}`}
                          className={`w-full py-3 text-center text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                            tier.isPopular
                              ? 'bg-[#071B4D] text-[#FFC83D] hover:bg-[#0A2C73] shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-[#FFC83D] hover:text-[#071B4D]'
                          }`}
                        >
                          {tier.ctaText}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PRICING COMPARISON TABLE SUBSECTION */}
                <div className="bg-gray-50 rounded-3xl p-6 sm:p-10 border border-gray-100" id="pricing_comparison_table">
                  <div className="text-center sm:text-left border-b border-gray-200 pb-4 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 font-sans">Compare Setup Deliverables</h3>
                    <p className="text-xs text-gray-500 font-mono">See how packages stack up against launch metrics</p>
                  </div>
                  
                  <div className="overflow-x-auto" id="table_responsive_wrapper">
                    <table className="w-full text-left text-xs text-gray-600 border-collapse table-auto" id="pricing_comparison_grid">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-100/50">
                          <th className="py-3 px-4 font-bold text-[#071B4D] uppercase font-mono">Deliverables</th>
                          <th className="py-3 px-4 font-bold">Starter Pack</th>
                          <th className="py-3 px-4 font-bold">Growth Option</th>
                          <th className="py-3 px-4 font-bold">Omnichannel Pro</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-sans">
                        {[
                          { criteria: 'GST Filing Assistance', starter: '✓ (Email setup)', growth: '✓ (Full service)', pro: '✓ (Full service)' },
                          { criteria: 'Enabled Marketplace Pools', starter: '1 Channel', growth: '3 Channels', pro: 'All channels + own D2C' },
                          { criteria: 'Maximum Product Listing', starter: '30 Products', growth: '80 Products', pro: 'Unlimited Products' },
                          { criteria: 'Keyword Ad Campaigns configuration', starter: 'Basic launch training', growth: '✓ (Setup + 30 days sync)', pro: '✓ (Setup + 60 days management)' },
                          { criteria: 'Unified Inventory setup', starter: '❌', growth: '✓ (Manual system)', pro: '✓ (Live automated hub)' },
                          { criteria: 'Payment Merchant Gateways (Razorpay/UPI)', starter: '❌', growth: '❌', pro: '✓ (Fully integrated)' },
                          { criteria: 'WhatsApp abandonment triggers', starter: '❌', growth: '❌', pro: '✓ (Custom templates sync)' },
                        ].map((row, index) => (
                          <tr key={index} className="hover:bg-amber-400/5 transition-colors">
                            <td className="py-3 px-4 font-bold text-gray-800">{row.criteria}</td>
                            <td className="py-3 px-4 font-mono">{row.starter}</td>
                            <td className="py-3 px-4 font-mono text-[#071B4D] font-bold">{row.growth}</td>
                            <td className="py-3 px-4 font-mono text-emerald-600 font-semibold">{row.pro}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 10 — FAQ ACCORDION */}
            <section className="bg-gray-50 py-24 border-t border-gray-100" id="home_faq">
              <div className="max-w-4xl mx-auto px-4 sm:px-6">
                
                <div className="text-center mb-16" id="faq_header">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#071B4D] font-mono bg-[#FFC83D]/20 text-[#071B4D] px-3 py-1.5 rounded-full inline-block">Frequently Answered Queries</span>
                  <h2 className="text-3xl font-sans font-bold tracking-tight text-gray-900 mt-4">
                    Still Unsure About Taking Your Business Online?
                  </h2>
                </div>

                <div className="space-y-4" id="faq_accordion_wrapper">
                  {GENERAL_FAQS.map((faq, index) => (
                    <details 
                      key={index} 
                      className="group bg-white p-6 border border-gray-100 rounded-2xl shadow-sm [&_summary::-webkit-details-marker]:hidden cursor-pointer"
                      id={`faq_details_${index}`}
                    >
                      <summary className="flex items-center justify-between text-left text-sm font-bold text-gray-900 select-none">
                        <span>{faq.q}</span>
                        <HelpCircle className="h-5 w-5 text-gray-400 group-open:text-[#071B4D] group-open:rotate-180 transition-all" />
                      </summary>
                      <p className="mt-3 text-xs text-gray-600 leading-relaxed font-sans border-t border-gray-50 pt-3">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 11 — FINAL CTA */}
            <section className="bg-gradient-to-r from-[#071B4D] to-[#0A2C73] py-20 text-white relative overflow-hidden" id="final_cta_sec">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,200,61,0.1),transparent_40%)]" />
              <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
                <span className="text-xs font-mono font-bold text-[#FFC83D] uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full inline-block">Secure Onboarding</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
                  Ready To Take Your Business Online?
                </h2>
                <p className="text-gray-300 text-sm max-w-2xl mx-auto font-sans leading-relaxed">
                  Join hundreds of growing Indian manufacturers, boutique operators, and wholesalers scaling nationwide. Request a free audit or schedule a live screen-share call today!
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4" id="cta_buttons_row_2">
                  <button
                    onClick={() => handleSelectServiceAndGo('Booked Free Direct Advisory Consultation')}
                    id="cta_btn_consultation_2"
                    className="px-8 py-4 text-sm font-bold text-[#071B4D] bg-[#FFC83D] hover:bg-[#ffe18c] rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Book Free Consultation
                  </button>
                  <button
                    onClick={handleGoToAudit}
                    id="cta_btn_audit_2"
                    className="px-8 py-4 text-sm font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/50 rounded-xl transition-all cursor-pointer"
                  >
                    Get Free Store Audit ✓
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== SERVICES DETAILED PAGE VIEW ==================== */}
        {currentTab === 'services' && (
          <section className="bg-white py-16" id="view_services_detail_page">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              <div className="text-center max-w-3xl mx-auto" id="services_page_header">
                <span className="text-xs font-bold uppercase tracking-widest text-[#071B4D] font-mono bg-[#FFC83D]/25 px-3.5 py-1.5 rounded-full inline-block">Detailed Capabilities Catalog</span>
                <h1 className="text-3xl sm:text-4xl font-sans font-bold text-gray-900 mt-4 leading-tight">
                  E-commerce Launch & Management Services
                </h1>
                <p className="text-gray-600 text-sm mt-3">We provide deep technical expertise to handle catalog file creations, keyword indexing algorithms, automated shipping hubs and local GST filings.</p>
              </div>

              {/* Stack of services with big beautiful breakdowns alternating left and right */}
              <div className="space-y-12" id="services_stack_expanded">
                {services.map((srv, idx) => (
                  <div
                    key={srv.id}
                    className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-md hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                    id={`srv_row_${srv.id}`}
                  >
                    <div className="lg:col-span-7 space-y-4">
                      <div className="p-3 bg-[#071B4D] text-[#FFC83D] w-fit rounded-xl">
                        {renderIcon(srv.icon)}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{srv.title}</h2>
                      <p className="text-xs text-gray-400 font-mono font-bold">Standard Integrated Portals: {srv.platforms.join(', ')}</p>
                      
                      <p className="text-gray-600 text-sm leading-relaxed font-sans pb-2">
                        {srv.longDesc || srv.shortDesc}
                      </p>

                      <div className="space-y-2 border-t border-gray-100 pt-4" id="srv_row_feat_checks">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Core Setup Deliverables :</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="srv_row_grid">
                          {srv.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start space-x-1.5 text-xs text-gray-700 font-sans">
                              <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-gray-50 rounded-2xl p-6 text-center space-y-4 border border-gray-100" id="srv_row_right_panel">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Get Started</h4>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans">Ready to launch on this platform? Our specialized agent will contact you to collect catalog listings and check GST parameters.</p>
                      
                      <div className="pt-2">
                        <button
                          onClick={() => handleSelectServiceAndGo(srv.title)}
                          id={`srv_action_btn_${srv.id}`}
                          className="w-full py-3 px-4 bg-[#071B4D] hover:bg-[#0A2C73] text-white text-xs font-bold rounded-xl shadow transition-transform"
                        >
                          Launch {srv.title} Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQs hook */}
              <div className="bg-gray-50 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto border border-gray-100 space-y-4" id="srv_customs_cta">
                <h3 className="text-xl font-bold text-gray-900">Need a Customized Omnichannel Package?</h3>
                <p className="text-gray-600 text-sm max-w-2xl mx-auto">No problem! We design custom blueprints for small apparel factories, brass manufacturers, and organic farm cooperatives based on their target budget profiles.</p>
                <button
                  onClick={() => handleSelectServiceAndGo('Custom Omnichannel Factory Onboarding Solution')}
                  id="srv_cta_custom_btn"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#FFC83D] text-[#071B4D] font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Request Custom Quote Proposal →
                </button>
              </div>

            </div>
          </section>
        )}

        {/* ==================== PRICING PAGE VIEW ==================== */}
        {currentTab === 'pricing' && (
          <section className="bg-white py-16" id="view_pricing_details_page">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              <div className="text-center max-w-3xl mx-auto" id="pricing_top_header">
                <span className="text-xs font-bold uppercase tracking-widest text-[#071B4D] font-mono bg-[#FFC83D]/25 px-3.5 py-1.5 rounded-full inline-block">Calculate Your Investment Return</span>
                <h1 className="text-3xl sm:text-4xl font-sans font-bold text-gray-900 mt-4 leading-tight">
                  Flat One-Time Setup Investment Plans
                </h1>
                <p className="text-gray-600 text-sm mt-3">We believe in transparent pricing. No backend commission commissions or monthly hidden upkeep fees. Only true results.</p>
              </div>

              {/* Main Column list */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="pricing_detail_columns">
                {pricing.map((tier) => (
                  <div
                    key={tier.id}
                    className={`relative bg-white rounded-3xl p-8 border flex flex-col justify-between hover:shadow-2xl transition-all duration-300 ${
                      tier.isPopular ? 'border-[#FFC83D] shadow-xl md:-translate-y-2' : 'border-gray-100 shadow-sm'
                    }`}
                    id={`pricing_tier_p2_${tier.id}`}
                  >
                    {tier.isPopular && (
                      <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest text-[#071B4D] bg-[#FFC83D] rounded-full shadow-md font-mono">
                        BEST ROI CHANNELS VALUE
                      </span>
                    )}

                    <div className="space-y-4">
                      <div className="border-b border-gray-150 pb-4">
                        <h3 className="text-lg font-bold text-gray-900">{tier.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{tier.subtitle}</p>
                      </div>

                      <div className="py-2">
                        <span className="text-3xl sm:text-4xl font-sans font-extrabold text-[#071B4D] tracking-tight">{tier.price}</span>
                        <span className="text-xs text-gray-400 font-mono italic ml-2">/ {tier.period}</span>
                      </div>

                      <p className="text-xs text-gray-500 leading-relaxed italic pr-4">
                        "{tier.description}"
                      </p>

                      <ul className="space-y-2.5 text-xs text-gray-600 border-t border-gray-50 pt-4" id="tier_p2_feats_list">
                        {tier.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start space-x-2 leading-relaxed">
                            <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-8">
                      <button
                        onClick={() => handleSelectPackageAndGo(tier.name)}
                        id={`pricing_btn_tier_p2_${tier.id}`}
                        className={`w-full py-3 text-center text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                          tier.isPopular
                            ? 'bg-[#071B4D] text-[#FFC83D] hover:bg-[#0A2C73] shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-[#FFC83D]'
                        }`}
                      >
                        {tier.ctaText}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* DYNAMIC CALCULATOR */}
              <div className="bg-[#071B4D] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-white/5 relative overflow-hidden" id="interactive_calculator_container">
                <div className="absolute top-0 right-0 h-40 w-40 bg-[#FFC83D]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 h-40 w-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10" id="calculator_grid">
                  
                  {/* Left: Check selection elements of interactive pricing calculator */}
                  <div className="lg:col-span-7 space-y-6" id="calculator_choices">
                    <div className="space-y-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#FFC83D] font-mono bg-white/10 px-3 py-1.5 rounded-full inline-block">CRO Tool Engine</span>
                      <h3 className="text-xl sm:text-2xl font-bold font-sans">Build Your Bespoke E-commerce Blueprint Estimate</h3>
                      <p className="text-xs text-gray-300">Select the channels you want to launch simultaneously. We apply custom discounts for multi-channel onboarding requests.</p>
                    </div>

                    <div className="space-y-3.5" id="calculator_boxes">
                      {Object.entries(baseCalculatorMap).map(([code, plat]) => {
                        const isSelected = selectedCalculatedPlatforms.includes(code);
                        return (
                          <label
                            key={code}
                            className={`flex items-start justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${
                              isSelected 
                                ? 'bg-white/10 border-[#FFC83D]' 
                                : 'bg-white/5 border-white/10 hover:border-white/25'
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {
                                  if (isSelected) {
                                    // ensure at least 1 platform is chosen
                                    if (selectedCalculatedPlatforms.length > 1) {
                                      setSelectedCalculatedPlatforms(selectedCalculatedPlatforms.filter(c => c !== code));
                                    }
                                  } else {
                                    setSelectedCalculatedPlatforms([...selectedCalculatedPlatforms, code]);
                                  }
                                }}
                                className="h-4 w-4 rounded text-[#FFC83D] border-gray-300 focus:ring-[#FFC83D] mt-0.5 accent-amber-400"
                              />
                              <div>
                                <span className="text-xs font-extrabold text-white block">{plat.name}</span>
                                <span className="text-[10px] text-gray-300 leading-none block mt-0.5">{plat.feat}</span>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-[#FFC83D] font-mono">₹{plat.price.toLocaleString()}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Price receipt calculation result mockup */}
                  <div className="lg:col-span-5 bg-white text-gray-900 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl relative" id="calculator_receipt">
                    <span className="absolute -top-3 right-4 px-2 py-0.5 bg-emerald-500 text-white text-[9px] font-bold font-mono tracking-wider rounded uppercase">Instant calculation</span>
                    <h4 className="text-sm font-bold text-[#071B4D] uppercase font-mono tracking-wider border-b pb-2 mb-2">Estimate Proposal</h4>
                    
                    <div className="text-xs space-y-1.5 text-gray-600 font-sans" id="receipt_breakdown">
                      {selectedCalculatedPlatforms.map((code) => (
                        <div key={code} className="flex justify-between">
                          <span>{baseCalculatorMap[code]?.name}</span>
                          <span className="font-mono text-gray-900">₹{baseCalculatorMap[code]?.price}</span>
                        </div>
                      ))}
                      
                      <div className="border-t border-gray-100 pt-3 mt-3 space-y-1.5">
                        <div className="flex justify-between">
                          <span>Sub Total</span>
                          <span className="font-mono text-gray-900 font-semibold">₹{calcPlatformsSum}</span>
                        </div>
                        {isEligibleDiscount && (
                          <div className="flex justify-between text-emerald-600 font-bold">
                            <span>Bundle Discount (15% Off)</span>
                            <span className="font-mono">-₹{calculatedDiscount}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-gray-400 text-[11px]">
                          <span>Estimated GST (18%)</span>
                          <span className="font-mono">+₹{calculatedTax}</span>
                        </div>
                      </div>

                      <div className="border-t-2 border-dashed border-gray-200 pt-3 flex justify-between text-base font-bold text-[#071B4D]" id="receipt_total">
                        <span>Total Investment</span>
                        <span className="font-mono text-emerald-600">₹{calculatedFinalSum.toLocaleString()}</span>
                      </div>
                    </div>

                    {isEligibleDiscount ? (
                      <div className="p-3 bg-emerald-50 rounded-lg text-[10px] text-emerald-800 leading-normal font-sans">
                        ✓ **Combo launch applied!** You received 15% discount because you chose 3 or more online channels to publish!
                      </div>
                    ) : (
                      <div className="p-3 bg-amber-50 rounded-lg text-[10px] text-amber-800 leading-normal font-sans">
                        💡 **Power Tip:** Choose 3 or more channels (e.g., Amazon + Flipkart + Meesho) to instantly unlock **15% Combo setup discount** automatically.
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        onClick={() => handleSelectServiceAndGo(`Bespoke Multi-Channel Blueprint Setup Estimate: ${selectedCalculatedPlatforms.join(', ').toUpperCase()}`)}
                        id="calc_btn_receipt_quote"
                        className="w-full py-3 bg-[#FFC83D] hover:bg-[#ffe18c] text-[#071B4D] shadow-md font-bold text-xs rounded-xl text-center transform hover:scale-[1.02] transition-colors"
                      >
                        Lock This Quote & Get Consultation
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </section>
        )}

        {/* ==================== ABOUT US PAGE VIEW ==================== */}
        {currentTab === 'about' && (
          <section className="bg-white py-16" id="view_about_page">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="about_story_split">
                <div className="lg:col-span-7 space-y-6" id="about_story_left">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#071B4D] font-mono bg-[#FFC83D]/25 px-3 py-1.5 rounded-full inline-block">Our Story & Advisors</span>
                  <h1 className="text-3xl sm:text-4xl font-sans font-bold text-gray-900 mt-2 leading-tight">
                    Taking Indian Local Retailers Online Since 2016
                  </h1>
                  <p className="text-gray-600 text-sm leading-relaxed font-sans">
                    Founded by dynamic digital marketing advisors **Mohammed Sameer** and **Adnan Ahmed** in Bangalore, Local2Online represents the grassroots mission to transition local manufacturers, weavers, wholesalers and boutique shops into national brands.
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed font-sans">
                    We noticed a major disparity: while global SaaS suites and multi-million agencies offer optimization services, simple wholesalers in Hubballi, Surat, Ludhiana, or HSR Layout struggled to navigate basic things like GST registration filings, brand registries, GTIN exemption forms, or smart ad bidding models.
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed font-sans font-bold text-[#071B4D]">
                    We set out to change this. We provide premium setup configurations with transparent flat commissions and handholding training—making internet commerce accessible to every hard-working trader.
                  </p>
                </div>

                <div className="lg:col-span-5 bg-gradient-to-r from-[#071B4D] to-[#0A2C73] text-white p-8 rounded-3xl space-y-6 shadow-xl border border-white/10 relative" id="about_story_right_card">
                  <div className="absolute top-2 right-4 text-white/5 font-mono text-5xl font-bold">100% SECURE</div>
                  <h3 className="text-sm font-semibold text-[#FFC83D] uppercase tracking-widest font-mono">Our Founding Values</h3>
                  <ul className="space-y-4 text-xs text-gray-300 font-sans" id="founding_values_list">
                    <li>
                      <strong className="text-white block">Absolute Financial Honesty</strong>
                      No monthly retainer scams. We charge plain flat prices.
                    </li>
                    <li>
                      <strong className="text-white block">Empowerment Over Dependence</strong>
                      We configure catalogs, set up rules, and train you or your staff for 2 hours so you can process shipping labels independently!
                    </li>
                    <li>
                      <strong className="text-white block">Grassroots Commitment</strong>
                      We specialized in localized product listing SEO metrics written clearly for Indian search preferences.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Leadership block */}
              <div className="space-y-8" id="about_leadership">
                <h3 className="text-lg font-bold text-[#071B4D] uppercase font-mono tracking-wider border-b pb-1">Senior Advisors & Consultation Core</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8" id="leadership_profiles_grid">
                  {[
                    {
                      name: 'Mohammed Sameer',
                      role: 'Founder & Senior Marketplace Growth Lead',
                      experience: '8+ Years experience',
                      focus: 'Specializes in Amazon Smart algorithms, Meesho 0%-referral pricing tricks and regulatory GST onboarding files.',
                    },
                    {
                      name: 'Adnan Ahmed',
                      role: 'Co-Founder & Web Development Consultant',
                      experience: '6+ Years experience',
                      focus: 'Specializes in custom optimized Shopify templates, WordPress WooCommerce speed configurations and courier automation API syncing.',
                    }
                  ].map((lead, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative" id={`leader_card_${idx + 1}`}>
                      <div className="absolute top-4 right-4 text-[#FFC83D]">
                        <Award className="h-6 w-6" />
                      </div>
                      <h4 className="text-base font-bold text-gray-900">{lead.name}</h4>
                      <p className="text-xs text-[#0A2C73] font-mono mt-0.5">{lead.role} • <span className="text-gray-400">{lead.experience}</span></p>
                      <p className="text-xs text-gray-500 font-sans mt-3 leading-relaxed">{lead.focus}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ==================== PORTFOLIO DETAILED PAGE VIEW ==================== */}
        {currentTab === 'portfolio' && (
          <section className="bg-white py-16" id="view_portfolio_page">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              
              <div className="text-center max-w-3xl mx-auto" id="portfolio_header_block">
                <span className="text-xs font-bold uppercase tracking-widest text-[#071B4D] font-mono bg-[#FFC83D]/25 px-3.5 py-1.5 rounded-full inline-block">Real Indian Success Case Studies</span>
                <h1 className="text-3xl sm:text-4xl font-sans font-bold text-gray-900 mt-4 leading-tight">
                  Local Shops Transformed Into National Brands
                </h1>
                <p className="text-gray-600 text-sm mt-3">Read through real milestones accomplished. We rebuild listings, automate processes, and scale ad campaigns parameters.</p>
              </div>

              {/* Tag Filters */}
              <div className="flex flex-wrap justify-center gap-2 mb-8 bg-gray-50 p-1.5 rounded-2xl w-fit mx-auto border" id="portfolio_tag_filters">
                {[
                  { tag: 'all', label: 'All Projects' },
                  { tag: 'Ethnic Wear', label: 'Fashion & Handlooms' },
                  { tag: 'Organic Foods', label: 'Spices & Agri-products' },
                  { tag: 'Footwear & Fashion', label: 'Footwear Factories' }
                ].map((btn) => (
                  <button
                    key={btn.tag}
                    id={`portfolio_filter_btn_${btn.tag.replace(/[^a-z0-9]+/g, '-')}`}
                    onClick={() => setSelectedPortfolioTag(btn.tag)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                      selectedPortfolioTag === btn.tag
                        ? 'bg-[#071B4D] text-white shadow'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Portfolio Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="portfolio_projects_list">
                {portfolio
                  .filter(p => selectedPortfolioTag === 'all' || p.industry === selectedPortfolioTag)
                  .map((project) => (
                    <div
                      key={project.id}
                      className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                      id={`project_card_${project.id}`}
                    >
                      <div className="relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-52 w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[9px] font-bold text-[#071B4D] bg-[#FFC83D] rounded-full uppercase tracking-wider font-mono shadow">
                          {project.industry}
                        </span>
                      </div>

                      <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="text-[10px] text-gray-400 font-mono font-bold block uppercase">{project.client} • {project.platform}</span>
                          <h4 className="text-base font-extrabold text-[#071B4D] leading-snug">{project.title}</h4>
                          <p className="text-xs text-gray-500 leading-normal font-sans pt-1">
                            {project.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 space-y-2" id="project_metrics_display">
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono">Accomplished Results:</p>
                          <div className="flex flex-wrap gap-1" id="project_metrics_flex">
                            {project.metrics.map((met, idx) => (
                              <span key={idx} className="px-2 py-0.5 text-[9px] font-bold font-mono bg-emerald-50 text-emerald-800 rounded-full border border-emerald-100">
                                {met}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 pt-0">
                        <button
                          onClick={() => handleSelectServiceAndGo(`Discussing Case Study: ${project.client}`)}
                          className="w-full text-center py-2 text-xs font-bold text-[#071B4D] bg-gray-50 hover:bg-[#FFC83D] rounded-xl transition-colors font-mono"
                        >
                          I Want Similar Results →
                        </button>
                      </div>
                    </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ==================== BLOG PAGE VIEW ==================== */}
        {currentTab === 'blog' && (
          <section className="bg-white py-16" id="view_blogs_page">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              
              <div className="text-center max-w-3xl mx-auto" id="blogs_header_block">
                <span className="text-xs font-bold uppercase tracking-widest text-[#071B4D] font-mono bg-[#FFC83D]/25 px-3.5 py-1.5 rounded-full inline-block">Free Strategic Guides & Checklists</span>
                <h1 className="text-3xl sm:text-4xl font-sans font-bold text-gray-900 mt-4 leading-tight">
                  E-commerce Insights for Indian Sellers
                </h1>
                <p className="text-gray-600 text-sm mt-3">Read tactical instructions written by our advisors Mohammed Sameer and Adnan Ahmed to optimize payouts.</p>
              </div>

              {selectedBlogSlug ? (
                /* DETAILED ARTICLE READER VIEW */
                <article className="max-w-3xl mx-auto bg-white border border-gray-150 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6" id="blog_article_reader">
                  {(() => {
                    const post = blogs.find(b => b.slug === selectedBlogSlug);
                    if (!post) return <p>Article not found.</p>;
                    return (
                      <div className="space-y-6">
                        <button
                          onClick={() => setSelectedBlogSlug(null)}
                          className="text-xs font-extrabold text-[#071B4D] hover:underline cursor-pointer uppercase font-mono block mb-2"
                        >
                          ← Back to Articles list
                        </button>
                        
                        <div className="space-y-2 border-b border-gray-100 pb-4">
                          <span className="px-2.5 py-1 text-[10px] font-bold text-[#071B4D] bg-[#FFC83D]/30 rounded-full uppercase font-mono">
                            {post.category}
                          </span>
                          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight pt-1">{post.title}</h1>
                          <p className="text-xs text-gray-400 font-mono">Date: {post.date} • By advisor {post.author} • {post.readTime}</p>
                        </div>

                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-64 sm:h-80 w-full object-cover rounded-2xl"
                          referrerPolicy="no-referrer"
                        />

                        {/* Article body rendered inside custom layout containers */}
                        <div className="text-[#1A1A1A] text-[13px] leading-relaxed font-sans space-y-4" id="article_raw_contents">
                          {post.content.split('\n\n').map((para, pIdx) => {
                            if (para.startsWith('###')) {
                              return <h3 key={pIdx} className="text-base font-extrabold text-[#071B4D] pt-2">{para.replace('###', '')}</h3>;
                            }
                            if (para.startsWith('-')) {
                              return (
                                <ul key={pIdx} className="list-disc list-inside space-y-1.5 pl-2">
                                  {para.split('\n').map((li, lIdx) => (
                                    <li key={lIdx}>{li.replace('-', '').trim()}</li>
                                  ))}
                                </ul>
                              );
                            }
                            return <p key={pIdx}>{para}</p>;
                          })}
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center space-y-3" id="article_quick_hook">
                          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-mono">Want expert assistance executing this setup?</h4>
                          <p className="text-xs text-gray-500 leading-relaxed max-w-lg mx-auto">We handle all technical compliance filing, image alignments and listing keywords. Click below to book a consultation.</p>
                          <button
                            onClick={() => handleSelectServiceAndGo(`Discussing Article: ${post.title}`)}
                            className="px-5 py-2.5 bg-[#071B4D] text-[#FFC83D] font-bold text-xs rounded-lg shadow cursor-pointer"
                          >
                            Book Setup Consultation →
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </article>
              ) : (
                /* THE MASTER BLOG TIMELINE GRID */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="blogs_grid_cards_list">
                  {blogs.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                      id={`blog_card_${post.id}`}
                    >
                      <div className="relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-48 w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-3 left-3 px-2 py-0.5 text-[9px] font-bold text-[#071B4D] bg-[#FFC83D] rounded-full uppercase tracking-wider font-mono">
                          {post.category}
                        </span>
                      </div>

                      <div className="p-6 space-y-3 flex-grow flex flex-col justify-between font-sans">
                        <div className="space-y-1">
                          <span className="text-[9px] text-gray-400 font-mono">{post.date} • {post.readTime}</span>
                          <h4 className="text-sm font-extrabold text-[#071B4D] font-heading leading-snug">{post.title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed pt-1">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-gray-50">
                          <button
                            onClick={() => setSelectedBlogSlug(post.slug)}
                            id={`read_article_link_${post.id}`}
                            className="inline-flex items-center space-x-1 text-xs font-bold text-[#0A2C73] hover:text-[#071B4D] transition-colors cursor-pointer"
                          >
                            <span>Read Comprehensive Article</span>
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </section>
        )}

        {/* ==================== CONTACT US PAGE VIEW ==================== */}
        {currentTab === 'contact' && (
          <div id="view_contact_form">
            <ContactSection preselectedService={preselectedService} preselectedType={preselectedFormType} />
          </div>
        )}

        {/* ==================== FREE AUDIT PAGE VIEW ==================== */}
        {currentTab === 'audit' && (
          <div id="view_audit_form">
            <ContactSection preselectedService="Request Free Comprehensive Store Onboarding Audit" preselectedType="audit" />
          </div>
        )}

        {/* ==================== ADMIN SYSTEM PANEL VIEW ==================== */}
        {currentTab === 'admin' && (
          <div id="view_admin_panel">
            <AdminDashboard />
          </div>
        )}

      </main>

      {/* Floating contact helpers */}
      <FloatingWhatsApp />

      {/* FOOTER markups */}
      <Footer setTab={(t) => {
        setPreselectedService('');
        setPreselectedFormType('contact');
        setTab(t);
        setSelectedBlogSlug(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
}
