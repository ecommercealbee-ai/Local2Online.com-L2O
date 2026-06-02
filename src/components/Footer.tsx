import { Award, Mail, Phone, MapPin, MessageCircle, ExternalLink, Lock } from 'lucide-react';

interface FooterProps {
  setTab: (tab: string) => void;
}

export default function Footer({ setTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#071B4D] text-white pt-16 pb-12 border-t border-white/10" id="app_footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12" id="footer_columns_grid">
          
          {/* Column 1: About */}
          <div className="lg:col-span-2 space-y-4" id="footer_col_about">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setTab('home')}>
              <div className="bg-[#FFC83D] p-2 rounded-lg text-[#071B4D] font-bold">
                <Award className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Local<span className="text-[#FFC83D]">2</span>Online
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              We help local retailers, manufacturers, and brands build high-converting online sales pipelines across major Indian marketplaces like Amazon, Flipkart, Meesho, and commission-free custom Shopify & WooCommerce stores.
            </p>
            <div className="pt-2" id="footer_socials">
              <a
                href="https://wa.me/916361875394"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-semibold text-[#FFC83D] hover:underline"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Instant Support on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4" id="footer_col_quick_links">
            <h3 className="text-xs font-semibold text-[#FFC83D] uppercase tracking-widest font-mono">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-gray-400" id="footer_quick_links_list">
              <li>
                <button onClick={() => setTab('home')} className="hover:text-[#FFC83D] transition-colors text-left w-full">Home</button>
              </li>
              <li>
                <button onClick={() => setTab('about')} className="hover:text-[#FFC83D] transition-colors text-left w-full">About Us</button>
              </li>
              <li>
                <button onClick={() => setTab('portfolio')} className="hover:text-[#FFC83D] transition-colors text-left w-full">Case Studies</button>
              </li>
              <li>
                <button onClick={() => setTab('pricing')} className="hover:text-[#FFC83D] transition-colors text-left w-full">Investment & Plans</button>
              </li>
              <li>
                <button onClick={() => setTab('blog')} className="hover:text-[#FFC83D] transition-colors text-left w-full">Articles & Guides</button>
              </li>
              <li>
                <button onClick={() => setTab('audit')} className="text-white hover:text-[#FFC83D] font-medium text-left w-full">Get Free Store Audit ✓</button>
              </li>
            </ul>
          </div>

          {/* Column 3: Main Services */}
          <div className="space-y-4" id="footer_col_services">
            <h3 className="text-xs font-semibold text-[#FFC83D] uppercase tracking-widest font-mono">Our Channels</h3>
            <ul className="space-y-2.5 text-xs text-gray-400" id="footer_services_list">
              <li>
                <button onClick={() => setTab('services')} className="hover:text-[#FFC83D] transition-colors text-left">Amazon Seller Launch</button>
              </li>
              <li>
                <button onClick={() => setTab('services')} className="hover:text-[#FFC83D] transition-colors text-left">Flipkart Onboarding</button>
              </li>
              <li>
                <button onClick={() => setTab('services')} className="hover:text-[#FFC83D] transition-colors text-left">Meesho Zero-Commission Setup</button>
              </li>
              <li>
                <button onClick={() => setTab('services')} className="hover:text-[#FFC83D] transition-colors text-left">Shopify Design & Development</button>
              </li>
              <li>
                <button onClick={() => setTab('services')} className="hover:text-[#FFC83D] transition-colors text-left">WooCommerce Store Development</button>
              </li>
              <li>
                <button onClick={() => setTab('services')} className="hover:text-[#FFC83D] transition-colors text-left">Full Account Management</button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-4 font-sans col-span-1" id="footer_col_contact">
            <h3 className="text-xs font-semibold text-[#FFC83D] uppercase tracking-widest font-mono">Contact Info</h3>
            <ul className="space-y-3.5 text-xs text-gray-300" id="footer_contacts_list">
              <li className="flex items-start space-x-2.5">
                <Phone className="h-4 w-4 text-[#FFC83D] shrink-0 mt-0.5" />
                <a href="tel:+916361875394" className="hover:text-white transition-colors">
                  +91 63618 75394
                </a>
              </li>
              <li className="flex items-start space-x-2.5">
                <Mail className="h-4 w-4 text-[#FFC83D] shrink-0 mt-0.5" />
                <a href="mailto:contact@local2online.com" className="hover:text-white transition-colors break-all">
                  contact@local2online.com
                </a>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-[#FFC83D] shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  HSR Layout, Sector 6, Bangalore, Karnataka - 560102
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider and bottom rights row */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400" id="footer_bottom">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <p>© {currentYear} Local2Online. All Rights Reserved. (Domain registered on BigRock, hosted on InfinityFree).</p>
            <p className="mt-1 text-gray-500 text-[10px]">Empowering Indian SMEs under Atmanirbhar Bharat initiative.</p>
          </div>
          <div className="flex items-center space-x-4" id="footer_admin_link_wrapper">
            <button
              onClick={() => setTab('admin')}
              id="footer_admin_console_btn"
              className="inline-flex items-center space-x-1 py-1.5 px-3 rounded bg-white/5 border border-white/15 hover:border-[#FFC83D]/50 hover:bg-white/10 text-gray-300 hover:text-[#FFC83D] transition-all font-mono text-[11px]"
            >
              <Lock className="h-3 w-3" />
              <span>Admin Console login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
