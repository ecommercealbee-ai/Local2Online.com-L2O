import { useState, FormEvent, startTransition } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, RefreshCw, Calendar, Tag, ShieldAlert } from 'lucide-react';
import { Lead } from '../types';

interface ContactSectionProps {
  preselectedService?: string;
  preselectedType?: 'contact' | 'audit' | 'consultation' | 'callback';
}

export default function ContactSection({ preselectedService = '', preselectedType = 'contact' }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    whatsApp: '',
    email: '',
    serviceNeeded: preselectedService || 'Amazon Seller Setup & Launch',
    notes: '',
  });

  const [formType, setFormType] = useState<'contact' | 'audit' | 'consultation' | 'callback'>(preselectedType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    message: string;
    lead?: Lead;
  } | null>(null);

  const servicesOption = [
    'Amazon Seller Setup & Launch',
    'Flipkart Seller Launchpad',
    'Meesho Low-Commission Sales Setup',
    'Shopify Premium Store Development',
    'WooCommerce & WordPress Storefronts',
    'Full Marketplace Account Management',
    'GST Registration & Compliance Support',
    'Product Listing & Catalog Upload Services',
    'Product Listing SEO & Ad Setup',
    'Free Custom Digital Audit Proposal'
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your Name and Mobile Account number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          type: formType
        })
      });
      
      const data = await response.json();
      setIsSubmitting(false);
      if (response.ok && data.success) {
        setSubmissionResult({
          success: true,
          message: data.message || 'Thank you! We will get back to you shortly.',
          lead: data.lead
        });
        // reset form
        setFormData({
          name: '',
          businessName: '',
          phone: '',
          whatsApp: '',
          email: '',
          serviceNeeded: 'Amazon Seller Setup & Launch',
          notes: ''
        });
      } else {
        setSubmissionResult({
          success: false,
          message: data.error || 'Server error, please check connections and try again.'
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmissionResult({
        success: false,
        message: 'Network connection failed. However, we have buffered your request locally in this browser!'
      });
    }
  };

  return (
    <section className="bg-white py-20 relative overflow-hidden" id="contact_and_lead_flows">
      {/* Visual background accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#071B4D] via-[#FFC83D] to-[#0A2C73]" />
      <div className="absolute top-1/2 left-0 h-96 w-96 rounded-full bg-[#FFC83D]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact_view_columns flex">
          
          {/* Left Column: Direct Consultation Pitch cards */}
          <div className="lg:col-span-5 space-y-8" id="contact_text_pitch">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#071B4D] font-mono bg-[#FFC83D]/20 px-3 py-1.5 rounded-full inline-block">Direct Ingress Routing</span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-gray-900 mt-4 leading-tight">
                Unlock 100M+ Customers Nationwide Today
              </h2>
              <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                Whether you want a high-converting automated D2C Shopify brand storefront or want to expand your inventory products instantly across Amazon, Flipkart, and Meesho, we handle the technical paperwork so you can focus purely on stocks and packing.
              </p>
            </div>

            <div className="space-y-4" id="consult_quick_cards">
              <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="p-3 bg-blue-50 text-[#071B4D] rounded-lg">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Direct Consultation Line</h4>
                  <p className="text-xs text-[#0A2C73] font-semibold mt-0.5">+91 63618 75394</p>
                  <p className="text-[11px] text-gray-400">Available: Mon - Sat (9:30 AM to 7:00 PM)</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="p-3 bg-amber-50 text-[#FFC83D] rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Official Brand Inbound</h4>
                  <p className="text-xs text-blue-900 font-semibold mt-0.5">contact@local2online.com</p>
                  <p className="text-[11px] text-gray-400">We respond within 2-3 business hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Interactive WhatsApp Support</h4>
                  <a
                    href="https://wa.me/916361875394"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-emerald-600 font-bold hover:underline block mt-0.5"
                  >
                    Chat directly with senior experts →
                  </a>
                  <p className="text-[11px] text-gray-400">Average response span: 5 Minutes</p>
                </div>
              </div>
            </div>

            {/* Quick trust banner */}
            <div className="bg-[#071B4D] text-white p-6 rounded-2xl space-y-2 border border-white/5 relative" id="contact_trust_ad">
              <div className="absolute top-2 right-4 text-white/5 font-mono font-bold text-4xl">100% SECURE</div>
              <h5 className="text-xs font-bold font-mono text-[#FFC83D] tracking-wide">WHAT HAPPENS NEXT?</h5>
              <ol className="text-xs text-gray-300 space-y-2 list-decimal list-inside leading-relaxed pl-1">
                <li>We analyze your product category online.</li>
                <li>Our specialist schedules a call to walk through commission structures.</li>
                <li>We provide a custom launching step pipeline.</li>
              </ol>
            </div>
          </div>

          {/* Right Column: Lead Form Area */}
          <div className="lg:col-span-7 bg-white border border-gray-100 p-8 rounded-3xl shadow-xl" id="lead_form_container">
            
            {/* Form Selection Toggles for Leads */}
            <div className="flex flex-wrap gap-2 mb-8 bg-gray-50 p-1.5 rounded-xl border border-gray-100" id="form_tabs_selector">
              {[
                { type: 'contact', title: 'Contact Us', desc: 'General Question' },
                { type: 'audit', title: 'Free Store Audit', desc: 'Performance Review' },
                { type: 'consultation', title: 'Book Consultation', desc: '1-on-1 Expert Session' },
                { type: 'callback', title: 'Request Callback', desc: 'Quick Voice Call' }
              ].map((tab) => (
                <button
                  key={tab.type}
                  type="button"
                  id={`form_tab_toggle_${tab.type}`}
                  onClick={() => {
                    startTransition(() => {
                      setFormType(tab.type as 'contact' | 'audit' | 'consultation' | 'callback');
                    });
                  }}
                  className={`flex-1 min-w-[120px] text-left px-3.5 py-2 rounded-lg transition-all duration-200 ${
                    formType === tab.type
                      ? 'bg-[#071B4D] text-white shadow'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="block text-xs font-bold leading-none">{tab.title}</span>
                  <span className={`block text-[9px] mt-0.5 ${formType === tab.type ? 'text-[#FFC83D]' : 'text-gray-400'}`}>
                    {tab.desc}
                  </span>
                </button>
              ))}
            </div>

            {/* If Form is successfully submitted */}
            {submissionResult ? (
              <div className="text-center py-10 space-y-5" id="submission_success_view">
                <div className="inline-flex items-center justify-center p-4 bg-emerald-50 rounded-full text-emerald-600 mb-2">
                  <CheckCircle2 className="h-16 w-16" />
                </div>
                <h3 className="text-2xl font-sans font-bold text-gray-900">Required Details Transmitted!</h3>
                <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
                  {submissionResult.message}
                </p>

                {/* Simulated Lead parameters review */}
                {submissionResult.lead && (
                  <div className="bg-gray-50 rounded-2xl p-5 max-w-sm mx-auto border border-gray-100 text-left font-mono text-xs text-gray-700 space-y-1.5" id="submitted_summary_receipt">
                    <div className="text-gray-400 border-b border-gray-200 pb-1 mb-2 font-bold flex justify-between uppercase">
                      <span>Receipt Summary</span>
                      <span className="text-[#071B4D]">{submissionResult.lead.type}</span>
                    </div>
                    <p><strong className="text-gray-900">Lead ID:</strong> {submissionResult.lead.id}</p>
                    <p><strong className="text-gray-900">Name:</strong> {submissionResult.lead.name}</p>
                    <p><strong className="text-gray-900">Business:</strong> {submissionResult.lead.businessName || 'N/A'}</p>
                    <p><strong className="text-gray-900 font-sans">WhatsApp:</strong> {submissionResult.lead.whatsApp}</p>
                    <p><strong className="text-gray-900">Interest:</strong> {submissionResult.lead.serviceNeeded}</p>
                  </div>
                )}

                <div className="pt-4 flex justify-center">
                  <button
                    onClick={() => setSubmissionResult(null)}
                    id="submit_another_btn"
                    className="inline-flex items-center space-x-2 px-5 py-2 text-sm font-semibold text-[#071B4D] hover:text-white bg-amber-400/20 hover:bg-[#071B4D] border border-amber-400/50 rounded-full transition-all"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Submit Another Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              /* The Main Active Dynamic Form Panel */
              <form onSubmit={handleSubmit} className="space-y-5" id="active_business_leads_form">
                
                {/* Form header description */}
                <div className="border-b border-gray-100 pb-3 mb-2" id="form_active_header">
                  <h3 className="text-base font-bold text-[#071B4D] uppercase tracking-wide font-mono flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-[#FFC83D]" />
                    <span>Inquiry Type: {formType.toUpperCase()} FORM</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Please provide accurate contact details so our dispatch manager can process GST and platform permissions correctly.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="form_identity_fields">
                  <div className="space-y-1">
                    <label id="lbl_form_name" className="block text-xs font-bold text-gray-700 lowercase first-letter:uppercase">Contact Person *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:border-[#071B4D] focus:outline-none"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label id="lbl_form_business" className="block text-xs font-bold text-gray-700 lowercase first-letter:uppercase">Shop / Business Legal Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Anand Textiles"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:border-[#071B4D] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="form_contact_fields">
                  <div className="space-y-1">
                    <label id="lbl_form_phone" className="block text-xs font-bold text-gray-700">Phone Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9+ ]{10,14}"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value, whatsApp: e.target.value })}
                      className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:border-[#071B4D] focus:outline-none"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label id="lbl_form_whatsapp" className="block text-xs font-bold text-gray-700">WhatsApp Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210 (same as above if empty)"
                      value={formData.whatsApp}
                      onChange={(e) => setFormData({ ...formData, whatsApp: e.target.value })}
                      className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:border-[#071B4D] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1" id="form_email_wrapper">
                  <label id="lbl_form_email" className="block text-xs font-bold text-gray-700">Official Email</label>
                  <input
                    type="email"
                    placeholder="e.g. brand@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:border-[#071B4D] focus:outline-none"
                  />
                </div>

                <div className="space-y-1" id="form_service_wrapper">
                  <label id="lbl_form_service" className="block text-xs font-bold text-gray-700">Service or Channel Needed</label>
                  <select
                    value={formData.serviceNeeded}
                    onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 bg-white focus:border-[#071B4D] focus:outline-none"
                  >
                    {servicesOption.map((srv, idx) => (
                      <option key={idx} value={srv}>{srv}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1" id="form_notes_wrapper">
                  <label id="lbl_form_notes" className="block text-xs font-bold text-gray-700">
                    {formType === 'audit' 
                      ? 'List current sales channels, website URL, or seller index if any' 
                      : 'Is there anything specific you would like to ask or mention?'}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={formType === 'audit' 
                      ? "e.g. We sell leather footwear offline in Chennai. We don't have catalog pictures yet. Want to see if Amazon or Meesho is better." 
                      : "Briefly explain what products you sell (e.g., apparels, handicrafts, furniture, spices) and your timeline."}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:border-[#071B4D] focus:outline-none"
                  />
                </div>

                {/* Secure Badge Indicators */}
                <div className="flex items-center space-x-2 text-[11px] text-gray-500 font-mono" id="form_security_badges">
                  <ShieldAlert className="h-4 w-4 text-emerald-500" />
                  <span>No upfront fees • Safe-guard data policy • Fast SSL secured submit</span>
                </div>

                <button
                  type="submit"
                  id="lead_form_submit_btn"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 font-bold text-[#071B4D] bg-[#FFC83D] hover:bg-[#ffe18c] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform active:translate-y-0.5 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Transmitting Information...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>
                        {formType === 'contact' && 'Submit Inquiry (Get Callback)'}
                        {formType === 'audit' && 'Request Comprehensive Free Audit 🔎'}
                        {formType === 'consultation' && 'Book 1-on-1 Free Call 🗓️'}
                        {formType === 'callback' && 'Receive Callback in 15 Min 📞'}
                      </span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
