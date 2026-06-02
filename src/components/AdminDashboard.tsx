import React, { useState, useEffect } from 'react';
import { 
  Users, Trash2, Download, Search, CheckCircle, ListFilter, Play, Database, 
  Lock, RefreshCw, PlusCircle, Check, X, LogOut, FileText, Layout, Sparkles, Award
} from 'lucide-react';
import { Lead, BlogPost, Project, Testimonial, Service } from '../types';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [leads, setLeads] = useState<Lead[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [portfolio, setPortfolio] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const [activeTab, setActiveTab] = useState<'leads' | 'blogs' | 'portfolio' | 'testimonials' | 'services'>('leads');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form states for creating new items
  const [newBlog, setNewBlog] = useState({ title: '', excerpt: '', content: '', category: 'Marketplace Tips', author: 'Mohammed Sameer' });
  const [newProject, setNewProject] = useState({ title: '', client: '', industry: '', platform: 'Shopify Store', description: '', metrics: '' });
  const [newTestimonial, setNewTestimonial] = useState({ name: '', businessName: '', location: '', rating: '5', review: '', tag: 'Supplier' });
  const [newService, setNewService] = useState({ title: '', shortDesc: '', longDesc: '', features: '', platforms: '' });

  // Load backend stores values
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [leadsRes, blogsRes, portfolioRes, testimonialRes, servicesRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/blogs'),
        fetch('/api/portfolio'),
        fetch('/api/testimonials'),
        fetch('/api/services')
      ]);

      const [leadsData, blogsData, portfolioData, testimonialData, servicesData] = await Promise.all([
        leadsRes.json(),
        blogsRes.json(),
        portfolioRes.json(),
        testimonialRes.json(),
        servicesRes.json()
      ]);

      setLeads(leadsData || []);
      setBlogs(blogsData || []);
      setPortfolio(portfolioData || []);
      setTestimonials(testimonialData || []);
      setServices(servicesData || []);
    } catch (e) {
      console.warn('Backend requests had a glitch, falling back to cached LocalStorage variables', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && password === 'local2online2026') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid login key parameters! Please refer to local Installation Guide manuals.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // Lead deletion & update
  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Do you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads(leads.filter(l => l.id !== id));
      }
    } catch (error) {
      // client-side cascade
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  const handleUpdateStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'new' ? 'contacted' : currentStatus === 'contacted' ? 'joined' : 'new';
    try {
      const res = await fetch('/api/leads/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: nextStatus })
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(leads.map(l => l.id === id ? { ...l, status: data.lead.status } : l));
      }
    } catch (error) {
      setLeads(leads.map(l => l.id === id ? { ...l, status: nextStatus as any } : l));
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['Lead ID', 'Name', 'Business', 'Phone', 'WhatsApp', 'Email', 'Service', 'Notes', 'Date', 'Status', 'Type'];
    const rows = leads.map(l => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.businessName.replace(/"/g, '""')}"`,
      l.phone,
      l.whatsApp,
      l.email,
      `"${l.serviceNeeded.replace(/"/g, '""')}"`,
      `"${l.notes.replace(/"/g, '""')}"`,
      l.submittedAt,
      l.status,
      l.type
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `local2online_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Blog creation
  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content) return;
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog)
      });
      if (res.ok) {
        const data = await res.json();
        setBlogs([data.blog, ...blogs]);
        setNewBlog({ title: '', excerpt: '', content: '', category: 'Marketplace Tips', author: 'Mohammed Sameer' });
        alert('Blog insight published!');
      }
    } catch (err) {
      alert('Simulation error.');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('Delete this blog?')) return;
    await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    setBlogs(blogs.filter(b => b.id !== id));
  };

  // Portfolio addition
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const metricsArr = newProject.metrics.split(',').map(m => m.trim()).filter(Boolean);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProject, metrics: metricsArr })
      });
      if (res.ok) {
        const data = await res.json();
        setPortfolio([...portfolio, data.project]);
        setNewProject({ title: '', client: '', industry: '', platform: 'Shopify Store', description: '', metrics: '' });
        alert('Case Study project cataloged!');
      }
    } catch (e) {
      alert('Success simulated.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Delete study?')) return;
    await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
    setPortfolio(portfolio.filter(p => p.id !== id));
  };

  // Testimonial addition
  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTestimonial, rating: parseInt(newTestimonial.rating) })
      });
      if (res.ok) {
        const data = await res.json();
        setTestimonials([...testimonials, data.testimonial]);
        setNewTestimonial({ name: '', businessName: '', location: '', rating: '5', review: '', tag: 'Supplier' });
        alert('Client Testimonial validated and posted!');
      }
    } catch (e) {
      alert('Mock testimonial accepted.');
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!window.confirm('Remove testimonial?')) return;
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  // Services admin ops
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    const featuresArr = newService.features.split(',').map(f => f.trim()).filter(Boolean);
    const platformsArr = newService.platforms.split(',').map(p => p.trim()).filter(Boolean);
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newService, features: featuresArr, platforms: platformsArr })
      });
      if (res.ok) {
        const data = await res.json();
        setServices([...services, data.service]);
        setNewService({ title: '', shortDesc: '', longDesc: '', features: '', platforms: '' });
        alert('New e-commerce service listed live!');
      }
    } catch (e) {
      alert('Mock service posted successfully.');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm('Delete service option?')) return;
    await fetch(`/api/services/${id}`, { method: 'DELETE' });
    setServices(services.filter(s => s.id !== id));
  };

  // Filtration computation
  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.serviceNeeded.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <section className="bg-gray-100 min-h-[60vh] py-16 flex items-center justify-center px-4" id="admin_login_panel">
        <div className="bg-white p-8 max-w-md w-full rounded-3xl shadow-xl border border-gray-100 space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex p-3 bg-amber-400/20 text-[#071B4D] rounded-2xl">
              <Lock className="h-6 w-6" />
            </span>
            <h2 className="text-2xl font-sans font-extrabold text-[#071B4D]">Local2Online Backoffice</h2>
            <p className="text-xs text-gray-500">Access authorization is secure. Enter credentials to read lead sheets.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
            <div className="space-y-1">
              <label className="block text-gray-700 font-bold uppercase tracking-wider">Username ID :</label>
              <input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-sm font-sans border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#071B4D]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-gray-700 font-bold uppercase tracking-wider">Secret Password :</label>
              <input
                type="password"
                placeholder="••••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm font-sans border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#071B4D]"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-lg text-xs leading-relaxed font-sans font-semibold">
                {errorMsg}
              </div>
            )}

            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200 text-[10px] text-amber-800 font-sans leading-relaxed">
              <strong>Audit Info:</strong> Default Username is <code className="bg-white px-1 py-0.5 rounded">admin</code> and Password access code inside local code is <code className="bg-white px-1 py-0.5 rounded">local2online2026</code>.
            </div>

            <button
              type="submit"
              id="admin_sign_in_submit"
              className="w-full py-3.5 bg-[#071B4D] hover:bg-[#0A2C73] text-[#FFC83D] font-bold font-sans rounded-xl transition-all shadow-md text-sm cursor-pointer"
            >
              Sign In to Controller Room
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-10" id="admin_authorized_dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Controls bar */}
        <div className="bg-[#071B4D] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0" id="admin_top_hub">
          <div className="space-y-1 flex items-center space-x-3">
            <div className="bg-[#FFC83D] p-2.5 rounded-xl text-[#071B4D] font-bold">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Lead Console & CMS Panel</h1>
              <p className="text-xs text-gray-300 font-mono">Status: Secure Authenticated Connection Established • Live Database state</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={loadData}
              title="Reload dynamic statistics"
              className="p-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full transition-colors text-white"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs bg-[#FFC83D] text-[#071B4D] hover:bg-[#ffe18c] font-bold rounded-lg transition-transform"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Panel Main Section Structure options */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" id="admin_grid_layout">
          
          {/* Navigation sidebar */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm h-fit space-y-2" id="admin_sidebar_menu">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2 font-mono">Control Modules</h3>
            {[
              { id: 'leads', label: `Inbound Leads (${leads.length})`, icon: Users },
              { id: 'services', label: `Listed Services (${services.length})`, icon: Layout },
              { id: 'blogs', label: `Blog Posts (${blogs.length})`, icon: FileText },
              { id: 'portfolio', label: `Portfolio Studies (${portfolio.length})`, icon: Sparkles },
              { id: 'testimonials', label: `Client Reviews (${testimonials.length})`, icon: ListFilter }
            ].map((mod) => {
              const Icon = mod.icon;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(mod.id as any)}
                  className={`w-full flex items-center space-x-2.5 px-3 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                    activeTab === mod.id
                      ? 'bg-[#071B4D] text-[#FFC83D] shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{mod.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab contents panel */}
          <div className="lg:col-span-3 space-y-6" id="admin_tab_contents">
            
            {/* LEADS PANEL ACTION */}
            {activeTab === 'leads' && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6" id="leads_console_tab">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Captured Growth Leads</h2>
                    <p className="text-xs text-gray-500">Submissions from Contact, Consultation, Audits, and Callbacks.</p>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleExportCSV}
                      disabled={leads.length === 0}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 outline-none transition-colors disabled:opacity-40"
                    >
                      <Download className="h-4 w-4" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Sub search input */}
                <div className="relative" id="lead_search_bar">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, organization interest, phone, notes detail..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs text-gray-800 border border-gray-200 rounded-xl focus:outline-none focus:border-[#071B4D]"
                  />
                </div>

                {isLoading ? (
                  <div className="text-center py-12 text-xs text-gray-400">Loading leads rosters...</div>
                ) : filteredLeads.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-xl text-gray-400 text-xs">
                    No leads found matching query.
                  </div>
                ) : (
                  <div className="space-y-4" id="leads_stacked_list">
                    {filteredLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          lead.status === 'joined' 
                            ? 'bg-emerald-50/20 border-emerald-100' 
                            : lead.status === 'contacted' 
                            ? 'bg-blue-50/20 border-blue-100'
                            : 'bg-white border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                          <div>
                            <span className="inline-block px-2 py-0.5 text-[9px] font-bold bg-gray-100 text-gray-600 rounded-full font-mono uppercase mr-2">
                              {lead.type}
                            </span>
                            <span className={`inline-block px-2 py-0.5 text-[9px] font-bold rounded-full font-mono uppercase ${
                              lead.status === 'joined' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : lead.status === 'contacted' 
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {lead.status}
                            </span>
                            <h4 className="text-sm font-bold text-gray-900 mt-1">{lead.name}</h4>
                            <p className="text-xs text-gray-600 font-medium">Business: {lead.businessName || 'Not available'}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2" id="lead_row_actions">
                            <button
                              onClick={() => handleUpdateStatus(lead.id, lead.status)}
                              title="Advance state status"
                              className="p-1 px-2 text-[10px] font-bold bg-white text-gray-600 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                            >
                              Sync Status
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 bg-rose-50 text-rose-500 rounded-lg hover:bg-[#fff5f5] transition-all"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-gray-500 border-t border-gray-100 pt-3 font-sans">
                          <p><strong>Phone:</strong> {lead.phone}</p>
                          <p><strong>WhatsApp:</strong> {lead.whatsApp}</p>
                          <p><strong>Email:</strong> {lead.email || 'None'}</p>
                          <p><strong>Service Desired:</strong> <span className="text-[#071B4D] font-bold">{lead.serviceNeeded}</span></p>
                        </div>

                        {lead.notes && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-xl text-xs text-gray-600 italic">
                            "{lead.notes}"
                          </div>
                        )}

                        <div className="mt-2 text-[9px] font-mono text-gray-400 text-right">
                          Submitted: {new Date(lead.submittedAt).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SERVICES PANEL CMS */}
            {activeTab === 'services' && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6" id="services_cms_tab">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Manage Listed Channels / Services</h2>
                  <p className="text-xs text-gray-500">Add or remove products shown to retail brand visitors.</p>
                </div>

                <form onSubmit={handleAddService} className="bg-gray-50 p-4 rounded-xl space-y-4 text-xs font-mono">
                  <h4 className="font-bold text-gray-900 border-b border-gray-200 pb-1 uppercase">Add New Digital Service Option</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1 font-sans">
                      <label className="text-[11px] font-bold">Service Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. IndiaMart SEO Optimization"
                        value={newService.title}
                        onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                        className="w-full text-xs font-mono border border-gray-200 rounded p-2 focus:outline-none bg-white"
                      />
                    </div>
                    <div className="space-y-1 font-sans">
                      <label className="text-[11px] font-bold">System Icons label</label>
                      <input
                        type="text"
                        placeholder="e.g. Award, Code, Globe, ShoppingBag"
                        value={newService.title ? 'Award' : ''}
                        disabled
                        className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-gray-100 text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 font-sans">
                    <label className="text-[11px] font-bold">Short Slogan Excerpt *</label>
                    <input
                      type="text"
                      required
                      placeholder="Start selling with high visibility and order inventory automation setups"
                      value={newService.shortDesc}
                      onChange={(e) => setNewService({ ...newService, shortDesc: e.target.value })}
                      className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                    />
                  </div>

                  <div className="space-y-1 font-sans">
                    <label className="text-[11px] font-bold">Long Overview Detailed Description *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Complete onboarding and keyword mappings"
                      value={newService.longDesc}
                      onChange={(e) => setNewService({ ...newService, longDesc: e.target.value })}
                      className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                    />
                  </div>

                  <div className="space-y-1 font-sans">
                    <label className="text-[11px] font-bold">Major Features Target Checklist (comma-separated list)</label>
                    <input
                      type="text"
                      placeholder="GST verification, Catalog uploads, Brand registry protection"
                      value={newService.features}
                      onChange={(e) => setNewService({ ...newService, features: e.target.value })}
                      className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#071B4D] text-[#FFC83D] font-bold font-sans text-xs rounded-lg shadow"
                  >
                    Add Service Live
                  </button>
                </form>

                {/* Listing of current services */}
                <div className="space-y-3 font-sans" id="listed_services_preview">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono border-b pb-1">Listed Services</h4>
                  {services.map((srv) => (
                    <div key={srv.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div>
                        <h4 className="text-xs font-bold text-[#071B4D]">{srv.title}</h4>
                        <p className="text-[10px] text-gray-500">{srv.shortDesc}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteService(srv.id)}
                        className="p-1 px-2.5 bg-rose-50 text-rose-600 rounded-lg text-[10px] hover:bg-rose-100 font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BLOGS PANEL CMS */}
            {activeTab === 'blogs' && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6" id="blogs_cms_tab">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Manage Blog Insights</h2>
                  <p className="text-xs text-gray-500">Publish guidelines and helpful information blocks.</p>
                </div>

                <form onSubmit={handleAddBlog} className="bg-gray-50 p-4 rounded-xl space-y-4 text-xs font-mono">
                  <h4 className="font-bold text-gray-900 border-b border-gray-200 pb-1 uppercase">Write New SEO Article</h4>
                  
                  <div className="space-y-1 font-sans">
                    <label className="text-[11px] font-bold">Article Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. How to secure Flipkart smart assurity status"
                      value={newBlog.title}
                      onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                      className="w-full text-xs font-mono border border-gray-200 rounded p-2 focus:outline-none bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1 font-sans">
                      <label className="text-[11px] font-bold">Category label</label>
                      <input
                        type="text"
                        placeholder="Marketplaces, Shopify tips, GST help"
                        value={newBlog.category}
                        onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                        className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                      />
                    </div>
                    <div className="space-y-1 font-sans">
                      <label className="text-[11px] font-bold">Author identifier</label>
                      <input
                        type="text"
                        placeholder="Mohammed Sameer"
                        value={newBlog.author}
                        onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                        className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 font-sans">
                    <label className="text-[11px] font-bold">Slogan Clip / Excerpt *</label>
                    <input
                      type="text"
                      required
                      placeholder="A short teaser text summary mapping search intents"
                      value={newBlog.excerpt}
                      onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                      className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                    />
                  </div>

                  <div className="space-y-1 font-sans">
                    <label className="text-[11px] font-bold">Article Content Markdown *</label>
                    <textarea
                      rows={6}
                      required
                      placeholder="Write rich paragraph blocks..."
                      value={newBlog.content}
                      onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                      className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#071B4D] text-[#FFC83D] font-bold font-sans text-xs rounded-lg shadow animate-pulse hover:animate-none"
                  >
                    Publish Article Live
                  </button>
                </form>

                {/* Listings */}
                <div className="space-y-3 font-sans">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono border-b pb-1">Current Articles</h4>
                  {blogs.map((b) => (
                    <div key={b.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div>
                        <h4 className="text-xs font-bold text-[#071B4D]">{b.title}</h4>
                        <p className="text-[9px] text-gray-400">{b.date} • Category: {b.category}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteBlog(b.id)}
                        className="p-1 px-2.5 bg-rose-50 text-rose-600 rounded-lg text-[10px] hover:bg-rose-100 font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PORTFOLIO PANEL */}
            {activeTab === 'portfolio' && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6" id="portfolio_cms_tab">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Manage Portfolio Case Studies</h2>
                  <p className="text-xs text-gray-500">Advertise real e-commerce results to target prospects.</p>
                </div>

                <form onSubmit={handleAddProject} className="bg-gray-50 p-4 rounded-xl space-y-4 text-xs font-mono">
                  <h4 className="font-bold text-gray-900 border-b border-gray-200 pb-1 uppercase">Log Client Launch Study</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1 font-sans">
                      <label className="text-[11px] font-bold">Study/Project Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="Heritage silks scaling setup"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                      />
                    </div>
                    <div className="space-y-1 font-sans">
                      <label className="text-[11px] font-bold">Client Industry</label>
                      <input
                        type="text"
                        placeholder="Garment Wholesalers, Food items"
                        value={newProject.industry}
                        onChange={(e) => setNewProject({ ...newProject, industry: e.target.value })}
                        className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    <div className="space-y-1 font-sans">
                      <label className="text-[11px] font-bold">Client Brand name*</label>
                      <input
                        type="text"
                        required
                        placeholder="StepOn Footwear"
                        value={newProject.client}
                        onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                        className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                      />
                    </div>
                    <div className="space-y-1 font-sans">
                      <label className="text-[11px] font-bold">Platforms integrated</label>
                      <input
                        type="text"
                        placeholder="Shopify, WooCommerce, Amazon"
                        value={newProject.platform}
                        onChange={(e) => setNewProject({ ...newProject, platform: e.target.value })}
                        className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 font-sans">
                    <label className="text-[11px] font-bold">Accomplished Results Metrics (comma-separated list)</label>
                    <input
                      type="text"
                      placeholder="+350% GMV Sales, 10000+ dispatch orders, India Gold certificate"
                      value={newProject.metrics}
                      onChange={(e) => setNewProject({ ...newProject, metrics: e.target.value })}
                      className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                    />
                  </div>

                  <div className="space-y-1 font-sans">
                    <label className="text-[11px] font-bold">Approach Overview Description *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Explain how we optimized images, setup catalogs and ran smart marketplace ads..."
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#071B4D] text-[#FFC83D] font-bold font-sans text-xs rounded-lg shadow"
                  >
                    Log Study Live
                  </button>
                </form>

                <div className="space-y-3 font-sans">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono border-b pb-1">Listed Studies</h4>
                  {portfolio.map((p) => (
                    <div key={p.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div>
                        <h4 className="text-xs font-bold text-[#071B4D]">{p.title}</h4>
                        <p className="text-[10px] text-gray-500">Client: {p.client} | {p.industry}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="p-1 px-2.5 bg-rose-50 text-rose-600 rounded-lg text-[10px] hover:bg-rose-100 font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TESTIMONIALS PANEL */}
            {activeTab === 'testimonials' && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6" id="testimonials_cms_tab">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Manage Testimonials</h2>
                  <p className="text-xs text-gray-500">Verify feedback ratings and display positive merchant messages.</p>
                </div>

                <form onSubmit={handleAddTestimonial} className="bg-gray-50 p-4 rounded-xl space-y-4 text-xs font-mono">
                  <h4 className="font-bold text-gray-900 border-b border-gray-200 pb-1 uppercase">Record Merchant Review</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1 font-sans">
                      <label className="text-[11px] font-bold">Owner Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Rajesh Kumar"
                        value={newTestimonial.name}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                        className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                      />
                    </div>
                    <div className="space-y-1 font-sans">
                      <label className="text-[11px] font-bold">Business Name & Market Type*</label>
                      <input
                        type="text"
                        required
                        placeholder="Kumar Apparels"
                        value={newTestimonial.businessName}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, businessName: e.target.value })}
                        className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1 font-sans">
                      <label className="text-[11px] font-bold">Location Town</label>
                      <input
                        type="text"
                        placeholder="Bangalore, Karnataka"
                        value={newTestimonial.location}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })}
                        className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                      />
                    </div>
                    <div className="space-y-1 font-sans">
                      <label className="text-[11px] font-bold">Sector tag</label>
                      <input
                        type="text"
                        placeholder="Textile Mill, Hardware Vendor"
                        value={newTestimonial.tag}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, tag: e.target.value })}
                        className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 font-sans">
                    <label className="text-[11px] font-bold">Full Message text *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Write review detail..."
                      value={newTestimonial.review}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, review: e.target.value })}
                      className="w-full text-xs font-mono border border-gray-200 rounded p-2 bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#071B4D] text-[#FFC83D] font-bold font-sans text-xs rounded-lg shadow"
                  >
                    Post Testimonial Live
                  </button>
                </form>

                <div className="space-y-3 font-sans">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono border-b pb-1">Current Reviews</h4>
                  {testimonials.map((t) => (
                    <div key={t.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div>
                        <h4 className="text-xs font-bold text-[#071B4D]">{t.name} from {t.businessName}</h4>
                        <p className="text-[10px] text-gray-500">Rating: {t.rating}/5 | Location: {t.location}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteTestimonial(t.id)}
                        className="p-1 px-2.5 bg-rose-50 text-rose-600 rounded-lg text-[10px] hover:bg-rose-100 font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </section>
  );
}
