import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const whatsappUrl = 'https://wa.me/916361875394?text=' + encodeURIComponent('Hello Local2Online, I would like to know more about your services.');

  return (
    <div className="fixed bottom-6 right-6 z-50 group pointer-events-auto" id="whatsapp_floating_wrapper">
      {/* Tooltip on hover */}
      <div className="absolute right-16 bottom-2 bg-[#071B4D] text-white text-xs py-2 px-3.5 rounded-lg shadow-xl border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-mono" id="whatsapp_tooltip">
        <span className="text-[#FFC83D] font-bold">WhatsApp Us Now</span>
        <p className="text-[10px] text-gray-300">Get answers in 5 mins</p>
      </div>

      {/* Ripple ring effect */}
      <span className="absolute inline-flex h-14 w-14 rounded-full bg-emerald-500/35 animate-ping opacity-75 justify-center items-center" id="whatsapp_ping"></span>

      {/* Button link */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        id="whatsapp_button"
        className="relative flex items-center justify-center h-14 w-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white/20"
      >
        <MessageCircle className="h-7 w-7 animate-bounce" />
      </a>
    </div>
  );
}
