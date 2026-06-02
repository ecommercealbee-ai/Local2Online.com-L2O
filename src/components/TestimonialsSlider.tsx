import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquare, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const active = testimonials[activeIndex];

  return (
    <section className="bg-gray-50 py-24" id="testimonials_section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16" id="testimonials_header">
          <span className="text-xs font-bold uppercase tracking-widest text-[#071B4D] font-mono bg-[#FFC83D]/20 text-[#071B4D] px-3 py-1.5 rounded-full inline-block">Client Voices</span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-gray-900 mt-4">
            Trusted By Real Indian Business Owners
          </h2>
          <p className="text-gray-600 text-sm mt-3">Read how we helped offline shops expand to automated national sellers without stress.</p>
        </div>

        <div className="max-w-4xl mx-auto relative px-4" id="testimonial_slider_container">
          
          {/* Card backdrop design */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden" id="active_testimonial_card">
            
            {/* Background design accents */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-bl from-[#FFC83D]/10 to-transparent rounded-full pointer-events-none" />
            <Quote className="absolute top-8 left-8 h-12 w-12 text-gray-100/80 -z-0" />

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              
              {/* Photo area */}
              <div className="shrink-0 text-center" id="testimonial_avatar_wrapper">
                <img
                  src={active.avatar}
                  alt={active.name}
                  className="h-24 w-24 rounded-2xl object-cover mx-auto shadow-md border-2 border-amber-400"
                  referrerPolicy="no-referrer"
                />
                <span className="inline-block mt-3 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-[#071B4D] bg-[#FFC83D]/30 rounded-full font-mono">
                  {active.tag}
                </span>
              </div>

              {/* Review Text Area */}
              <div className="flex-1 text-center md:text-left" id="testimonial_content">
                <div className="flex justify-center md:justify-start space-x-1 mb-3" id="testimonial_ratings">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#FFC83D] text-[#FFC83D]" />
                  ))}
                </div>
                
                <p className="text-gray-700 italic text-base sm:text-lg leading-relaxed mb-6 font-sans">
                  "{active.review}"
                </p>

                <div>
                  <h4 className="text-lg font-bold text-gray-900">{active.name}</h4>
                  <p className="text-xs text-gray-500">{active.businessName} • <span className="font-mono text-gray-400">{active.location}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Slider actions / indicators */}
          <div className="flex items-center justify-between mt-8" id="slider_controls">
            
            {/* Quick pagination index indicators */}
            <div className="flex space-x-2" id="slider_pagination">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 transition-all duration-300 rounded-full ${
                    activeIndex === idx ? 'bg-[#071B4D] w-8' : 'bg-gray-300 w-2.5'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Shift arrows */}
            <div className="flex space-x-3" id="slider_arrows">
              <button
                onClick={handlePrev}
                id="slider_prev_btn"
                className="p-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full shadow hover:shadow-md transition-all active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                id="slider_next_btn"
                className="p-3 bg-[#071B4D] text-white hover:bg-[#0A2C73] rounded-full shadow hover:shadow-md transition-all active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
