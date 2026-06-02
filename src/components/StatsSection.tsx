import { Users, Briefcase, IndianRupee, Star, ShieldCheck } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      id: 'stat_clients',
      label: 'Happy Indian Businesses Onboarded',
      value: '100+',
      icon: Users,
      color: 'text-amber-400',
      description: 'Retailers, Wholesalers & Manufacturers'
    },
    {
      id: 'stat_projects',
      label: 'E-commerce Standard Operations Completed',
      value: '250+',
      icon: Briefcase,
      color: 'text-[#FFC83D]',
      description: 'Catalogs, Brand Protection & Setup'
    },
    {
      id: 'stat_revenue',
      label: 'Client Gross Merchandise Value (GMV)',
      value: '₹50L+',
      icon: IndianRupee,
      color: 'text-emerald-400',
      description: 'Extra sales unlocked through digitization'
    },
    {
      id: 'stat_rating',
      label: 'Average Client Trust & Review Rating',
      value: '4.9/5',
      icon: Star,
      color: 'text-[#FFC83D]',
      description: 'Highly rated customer training'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#071B4D] to-[#0A2C73] py-20 text-white" id="stats_section">
      {/* Background visual flourishes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,200,61,0.08),transparent_50%)]" />
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16" id="stats_header">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFC83D] font-mono bg-white/10 px-3 py-1.5 rounded-full inline-block">Our Track Record</span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white mt-4">
            Helping India’s Local Artisans & Retailers Excel Globally
          </h2>
          <p className="text-gray-300 text-sm mt-3">Take a look at the milestones we have accomplished together with our client partners from around India.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="stats_metrics_grid">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                id={stat.id}
                className="relative bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/10 ${stat.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <ShieldCheck className="h-4 w-4 text-white/20" />
                </div>
                <div className="text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-white mb-2 font-mono">
                  {stat.value}
                </div>
                <h3 className="text-sm font-semibold text-[#FFC83D] tracking-wide mb-1 font-mono">{stat.label}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
