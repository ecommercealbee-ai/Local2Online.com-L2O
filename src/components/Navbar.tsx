import { useState } from 'react';
import { Menu, X, Phone, MessageSquare, Award } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export default function Navbar({ currentTab, setTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About Us' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Blog & Insights' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#071B4D] text-white border-b border-white/10 shadow-lg" id="app_navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand markup */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setTab('home')} id="logo_container">
            <div className="bg-[#FFC83D] p-2.5 rounded-lg text-[#071B4D] font-bold shadow-md">
              <Award className="h-6 w-6" id="nav_brand_award" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">
                Local<span className="text-[#FFC83D]">2</span>Online
              </span>
              <span id="nav_brand_tag" className="text-[10px] font-medium text-[#FFC83D]/90 uppercase tracking-widest block -mt-1 font-mono">
                From Local to Brand
              </span>
            </div>
          </div>

          {/* Desktop links navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4" id="desktop_nav_links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav_link_${link.id}`}
                onClick={() => setTab(link.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentTab === link.id
                    ? 'text-[#FFC83D] bg-white/5 border-b-2 border-[#FFC83D] rounded-none'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Group for consultation and audit */}
          <div className="hidden lg:flex items-center space-x-3" id="desktop_nav_cta">
            <button
              onClick={() => setTab('audit')}
              id="nav_btn_free_audit"
              className="px-4 py-2 text-xs font-semibold text-[#FFC83D] bg-transparent border border-[#FFC83D]/30 hover:border-[#FFC83D] rounded-full transition-all duration-200 hover:bg-[#FFC83D]/10"
            >
              Get Free Audit
            </button>
            <button
              onClick={() => setTab('contact')}
              id="nav_btn_consultation"
              className="px-5 py-2.5 text-xs font-bold text-[#071B4D] bg-[#FFC83D] hover:bg-[#ffe18c] rounded-full shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Free Consultation
            </button>
          </div>

          {/* Mobile responsive toggler */}
          <div className="md:hidden flex items-center space-x-2" id="mobile_menu_trigger_wrapper">
            <button
              onClick={() => setTab('audit')}
              id="mobile_quick_audit_btn"
              className="px-3 py-1.5 text-xs font-medium text-[#FFC83D]/90 border border-[#FFC83D]/20 rounded-full"
            >
              Audit
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile_menu_hamburger"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#0A2C73] border-b border-white/10" id="mobile_drawer_container">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`drawer_link_${link.id}`}
                onClick={() => {
                  setTab(link.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-md text-base font-medium transition-all ${
                  currentTab === link.id
                    ? 'text-[#FFC83D] bg-white/10 font-bold'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <div className="grid grid-cols-2 gap-2 pt-4 px-4 border-t border-white/10" id="drawer_cta_grid">
              <button
                onClick={() => {
                  setTab('audit');
                  setIsOpen(false);
                }}
                id="drawer_btn_audit"
                className="w-full text-center py-2.5 text-sm font-semibold text-[#FFC83D] border border-[#FFC83D]/30 rounded-full hover:bg-[#FFC83D]/10"
              >
                Free Audit
              </button>
              <button
                onClick={() => {
                  setTab('contact');
                  setIsOpen(false);
                }}
                id="drawer_btn_consult"
                className="w-full text-center py-2.5 text-sm font-bold text-[#071B4D] bg-[#FFC83D] rounded-full"
              >
                Consultation
              </button>
            </div>
            
            <div className="text-center pt-4 text-xs text-gray-400 font-mono" id="nav_quick_contact">
              Direct: +91 63618 75394
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
