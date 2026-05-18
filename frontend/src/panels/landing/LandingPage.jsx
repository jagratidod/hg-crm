import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Wrench, PackageSearch, ShieldCheck, ChevronRight, Gem, Clock, Star } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#1A1610] text-hg-cream font-sans overflow-x-hidden selection:bg-hg-accent selection:text-black">
      
      {/* Navigation Bar */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-50 max-w-7xl mx-auto left-0 right-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-[#EAB308] rounded-lg rotate-45 flex items-center justify-center shadow-lg shadow-hg-accent/20">
                <img src="/image.png" alt="Logo" className="w-6 h-6 object-contain -rotate-45" />
             </div>
             <span className="font-bold text-xl tracking-wide text-hg-gold-light">HG ENTERPRISES</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-hg-gold-beige">
             <a href="#features" className="hover:text-hg-accent transition-colors">Features</a>
             <a href="#portals" className="hover:text-hg-accent transition-colors">Portals</a>
             <a href="#contact" className="hover:text-hg-accent transition-colors">Contact</a>
          </div>
          <Link to="/customer/login" className="bg-hg-accent text-black px-5 py-2.5 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(201,168,76,0.4)] hover:bg-[#d8b859] transition-all hover:scale-105">
             Customer Portal
          </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 flex flex-col items-center text-center overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hg-accent/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="inline-block border border-hg-accent/30 bg-hg-accent/5 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-hg-accent tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             NEXT-GENERATION ERP
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-hg-cream leading-tight max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
             Mastering the Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-hg-gold-light to-[#EAB308]">Jewellery Services</span>
          </h1>
          
          <p className="text-lg md:text-xl text-hg-gold-beige mb-12 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
             A unified, 4-panel ecosystem seamlessly connecting customers, technicians, inventory, and administration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <a href="#portals" className="bg-hg-accent text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#d8b859] transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(201,168,76,0.3)]">
                  Explore Portals <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/admin/login" className="bg-[#2A2621] border border-hg-dark-gold/50 text-hg-cream px-8 py-4 rounded-xl font-bold text-lg hover:border-hg-accent transition-colors flex items-center justify-center">
                  Admin Access
              </Link>
          </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 border-y border-hg-dark-gold/20 bg-[#1F1B14]">
         <div className="max-w-7xl mx-auto">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-hg-gold-light mb-4">Precision in Every Process</h2>
                <p className="text-hg-gold-beige max-w-2xl mx-auto">From real-time inventory tracking to instant customer updates, our ERP handles it all.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <FeatureCard 
                    icon={<Gem size={32} />} 
                    title="Product Management" 
                    desc="Customers can register their jewellery for seamless warranty and repair tracking." 
                 />
                 <FeatureCard 
                    icon={<Clock size={32} />} 
                    title="Real-Time Tracking" 
                    desc="Employees update job statuses instantly, keeping customers informed at every step." 
                 />
                 <FeatureCard 
                    icon={<Star size={32} />} 
                    title="Premium CRM" 
                    desc="Admins manage leads and vendors from a powerful, centralized glassmorphism dashboard." 
                 />
             </div>
         </div>
      </section>

      {/* Portals Section */}
      <section id="portals" className="py-24 px-6 relative">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-hg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto text-center">
             <h2 className="text-3xl md:text-5xl font-bold text-hg-cream mb-6">Choose Your Portal</h2>
             <p className="text-hg-gold-beige mb-16 max-w-2xl mx-auto">Access your dedicated workspace tailored to your role within the HG ecosystem.</p>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PortalCard 
                  title="Customer Portal" 
                  desc="Track repairs, view warranty, raise service requests."
                  link="/customer/login"
                  Icon={Smartphone}
                />
                <PortalCard 
                  title="Employee Portal" 
                  desc="Manage assigned jobs, update status, request tools."
                  link="/employee/login"
                  Icon={Wrench}
                />
                <PortalCard 
                  title="Inventory Portal" 
                  desc="Manage tools, consumables, alerts, and stock."
                  link="/inventory/login"
                  Icon={PackageSearch}
                />
                <PortalCard 
                  title="Admin Portal" 
                  desc="Complete overview, analytics, leads and control."
                  link="/admin/login"
                  Icon={ShieldCheck}
                />
             </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-hg-dark-gold/20 py-8 text-center text-hg-gold-beige text-sm bg-[#1A1610]">
          <p>© {new Date().getFullYear()} HG Enterprises. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-2xl bg-[#2A2621] border border-hg-dark-gold/30 hover:border-hg-accent/50 transition-colors group">
     <div className="w-14 h-14 rounded-xl bg-hg-accent/10 text-hg-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-hg-accent group-hover:text-black transition-all">
        {icon}
     </div>
     <h3 className="text-xl font-bold text-hg-cream mb-3">{title}</h3>
     <p className="text-hg-gold-beige leading-relaxed text-sm">{desc}</p>
  </div>
);

const PortalCard = ({ title, desc, link, Icon }) => (
  <Link to={link} className="glass-panel p-8 rounded-2xl border border-hg-dark-gold hover:border-hg-accent hover:bg-hg-accent/5 transition-all duration-300 group hover:-translate-y-2 flex flex-col items-center text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-hg-accent/0 to-hg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="text-5xl mb-6 group-hover:scale-110 group-hover:text-hg-accent transition-all text-hg-gold-light relative z-10">
      <Icon size={48} strokeWidth={1.5} />
    </div>
    <h3 className="text-2xl font-semibold mb-3 text-hg-cream relative z-10">{title}</h3>
    <p className="text-hg-gold-beige text-sm leading-relaxed relative z-10">{desc}</p>
  </Link>
);

export default LandingPage;
