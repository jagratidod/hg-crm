import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Wrench, PackageSearch, ShieldCheck, ChevronRight, Gem, Clock, Star, Users, Globe, MessageCircle, Phone, Mail, Sparkles, Sun, Moon, Check } from 'lucide-react';
import { addInquiry } from '../../utils/inquiries';
import { addTestimonial, getTestimonials } from '../../utils/testimonials';
import toast from 'react-hot-toast';

const LandingPage = () => {
  const [lpTheme, setLpTheme] = useState('dark');
  const [activePhone, setActivePhone] = useState(1); // 0: Left, 1: Center, 2: Right
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const GALLERY_ITEMS = useMemo(() => [
    {
      title: "Master Command Dashboard",
      category: "Admin Portal",
      img: "/media__1779538979602.png",
      desc: "Complete 360° analytics, manufacturing metrics, metal stock ledger gauges, and quick action cards."
    },
    {
      title: "Jewellery Production Flowchart",
      category: "Manufacturing",
      img: "/media__1779539132209.png",
      desc: "Interactive visual tracking of high-end custom orders through 22 stages of production."
    },
    {
      title: "Karigar Shift Worklogs",
      category: "Karigar Queue",
      img: "/media__1779539264580.png",
      desc: "Real-time shifts logger, craftsman log card, and automatic prong tightness verification checks."
    },
    {
      title: "Vault Assets Ledger",
      category: "Inventory",
      img: "/media__1779540343938.png",
      desc: "Detailed raw gemstone matrices, 24k gold stock metrics, and dynamic metal ticker configurations."
    },
    {
      title: "Refinery Dust Wash Cycles",
      category: "Manufacturing",
      img: "/media__1779685452243.png",
      desc: "Active crucible acid wash cycles logging, scrap audits, and dust recovery percentages."
    },
    {
      title: "POS Split-Bill Checkouts",
      category: "Accounts & POS",
      img: "/media__1779687460679.png",
      desc: "Premium cash register POS slip, multi-payment support, and automated GST invoice builders."
    }
  ], []);

  const galleryCategories = ['All', 'Admin Portal', 'Manufacturing', 'Karigar Queue', 'Inventory', 'Accounts & POS'];

  const filteredGallery = useMemo(() => {
    if (galleryFilter === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.category === galleryFilter);
  }, [galleryFilter, GALLERY_ITEMS]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhone((prev) => (prev + 1) % 3);
    }, 4000); // Rotates every 4 seconds
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('hg_lp_theme');
      if (saved === 'light' || saved === 'dark') setLpTheme(saved);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('hg_lp_theme', lpTheme);
    } catch {
      // ignore
    }
  }, [lpTheme]);

  const [demoStatus, setDemoStatus] = useState('idle');
  const [demoForm, setDemoForm] = useState({
    name: '',
    business: '',
    phone: '',
    city: '',
    teamSize: '',
  });

  const [inquiryStatus, setInquiryStatus] = useState('idle');
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    business: '',
    phone: '',
    city: '',
    message: '',
  });

  const defaultTestimonials = useMemo(
    () => [
      {
        name: 'Operations Lead',
        org: 'Retail Jewellery Chain',
        quote:
          'Job updates, customer communication, and inventory visibility finally live in one place. Our turnaround time improved immediately.',
      },
      {
        name: 'Service Manager',
        org: 'Repair & Warranty Center',
        quote:
          'The portal separation is clean: customers track, employees update, admins oversee. Fewer calls, fewer follow-ups, happier customers.',
      },
      {
        name: 'Inventory Supervisor',
        org: 'Multi-branch Workshop',
        quote:
          'Tools and consumables tracking is crisp. Alerts and logs helped us cut stockouts and keep technicians moving.',
      },
    ],
    [],
  );

  const [userTestimonials, setUserTestimonials] = useState([]);
  const [testimonialStatus, setTestimonialStatus] = useState('idle');
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    org: '',
    quote: '',
  });

  useEffect(() => {
    setUserTestimonials(getTestimonials());
  }, []);

  const testimonials = useMemo(() => [...userTestimonials, ...defaultTestimonials], [defaultTestimonials, userTestimonials]);

  const faqs = useMemo(
    () => [
      {
        q: 'What do I need to start using HG ERP?',
        a: 'Create your portal login and add your branches, customers, and team. We can help with initial setup and data import.',
      },
      {
        q: 'Can customers track repairs without calling?',
        a: 'Yes. Customers can view status updates and history directly in the Customer Portal.',
      },
      {
        q: 'Does it support multiple roles and departments?',
        a: 'Yes. Separate portals exist for Customer, Employee, Inventory, and Admin workflows.',
      },
      {
        q: 'Is the system suitable for small teams?',
        a: 'Yes. Start with Basic, then upgrade when your team and branches grow.',
      },
    ],
    [],
  );

  const onDemoChange = (field) => (e) => {
    setDemoForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const onDemoSubmit = (e) => {
    e.preventDefault();
    setDemoStatus('submitting');
    // No backend wired here — keep it safe and local.
    setTimeout(() => {
      setDemoStatus('submitted');
    }, 450);
  };

  const onInquiryChange = (field) => (e) => {
    setInquiryForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const onInquirySubmit = (e) => {
    e.preventDefault();
    setInquiryStatus('submitting');

    const id = `inq_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    addInquiry({
      id,
      createdAt: new Date().toISOString(),
      ...inquiryForm,
    });

    setInquiryForm({ name: '', business: '', phone: '', city: '', message: '' });
    setInquiryStatus('submitted');
    setTimeout(() => setInquiryStatus('idle'), 1200);
  };

  const onTestimonialChange = (field) => (e) => {
    setTestimonialForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const onTestimonialSubmit = (e) => {
    e.preventDefault();
    setTestimonialStatus('submitting');

    const id = `tst_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const created = addTestimonial({
      id,
      createdAt: new Date().toISOString(),
      name: testimonialForm.name.trim(),
      org: testimonialForm.org.trim(),
      quote: testimonialForm.quote.trim(),
    });

    if (created) {
      setUserTestimonials((prev) => [created, ...prev].slice(0, 12));
      setTestimonialForm({ name: '', org: '', quote: '' });
      setTestimonialStatus('submitted');
      toast.success("Testimonial posted successfully! View it in the grid.");
      setTimeout(() => setTestimonialStatus('idle'), 1200);
      return;
    }

    setTestimonialStatus('idle');
  };

  return (
    <div
      data-lp-theme={lpTheme}
      className="min-h-screen bg-[var(--lp-bg)] text-[var(--lp-hero-text)] font-sans overflow-x-hidden selection:bg-hg-accent selection:text-black"
    >
      
      {/* Navigation Bar */}
      <nav className="absolute top-0 w-full p-4 md:p-6 flex justify-between items-center z-50 max-w-7xl mx-auto left-0 right-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 flex items-center justify-center shadow-lg shrink-0 rounded-lg overflow-hidden border border-[#D4AF37]/35 bg-black/40">
                <img src="/image.png" alt="Logo" className="w-8 h-8 object-contain" />
             </div>
             <span className="font-bold text-lg md:text-xl tracking-wide text-[var(--lp-link)]">HG ENTERPRISES</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-semibold text-[var(--lp-muted)]">
             <a href="#benefits" className="hover:text-[var(--lp-link)] transition-colors">Benefits</a>
             <a href="#features" className="hover:text-[var(--lp-link)] transition-colors">Features</a>
             <a href="#pricing" className="hover:text-[var(--lp-link)] transition-colors">Pricing</a>
             <a href="#contact" className="hover:text-[var(--lp-link)] transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLpTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              className="w-10 h-10 rounded-full border border-[var(--lp-hero-border)] bg-black/20 hover:bg-black/30 transition-colors flex items-center justify-center"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {lpTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              to="/customer/login"
              className="bg-[var(--lp-cta-bg)] text-[var(--lp-cta-text)] px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:brightness-110 transition-all hover:scale-105"
            >
              Customer Portal
            </Link>
          </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-14 lg:pt-28 lg:pb-16 flex flex-col items-center bg-[var(--lp-hero-bg)] text-[var(--lp-hero-text)] min-h-[85vh] overflow-hidden">
          
          <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-10 items-center relative z-10 mt-6">
             {/* Left side */}
             <div className="flex flex-col items-start text-left relative z-20">
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-[var(--lp-hero-text)] leading-[1.1] tracking-tight">
                 Mastering the Art of <br/> Jewellery Services
               </h1>
               
               <p className="text-base md:text-lg text-[var(--lp-hero-muted)] mb-7 max-w-md leading-relaxed font-medium">
                 A unified, 4-panel ecosystem seamlessly connecting customers, technicians, inventory, and administration.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-3 mb-10">
                  <a href="#portals" className="bg-[var(--lp-cta-bg)] text-[var(--lp-cta-text)] px-7 py-3.5 rounded-full font-bold text-base hover:brightness-110 transition-all shadow-xl hover:shadow-2xl">
                     Explore Portals
                  </a>
                  <Link to="/admin/login" className="bg-transparent border-2 border-[var(--lp-hero-border)] text-[var(--lp-hero-text)] px-7 py-3.5 rounded-full font-bold text-base hover:border-[var(--lp-link)] transition-colors flex items-center justify-center">
                     Admin Access
                  </Link>
               </div>

               {/* Stats Area */}
               <div className="flex items-center gap-10 pt-6 border-t border-[var(--lp-hero-border)] w-full max-w-md">
                  <div>
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                       <Users size={22} />
                    </div>
                    <div className="text-2xl font-extrabold text-[var(--lp-hero-text)] mb-0.5">80M+</div>
                    <div className="text-sm text-[var(--lp-hero-muted)] font-medium">Users Globally</div>
                  </div>
                  <div className="w-px h-14 bg-[var(--lp-hero-border)]"></div>
                  <div>
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                       <Globe size={22} />
                    </div>
                    <div className="text-2xl font-extrabold text-[var(--lp-hero-text)] mb-0.5">150+</div>
                    <div className="text-sm text-[var(--lp-hero-muted)] font-medium">Country Served</div>
                  </div>
               </div>
             </div>

             {/* Right side Image Mockup */}
             <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[560px]">
                {/* Background Shapes removed (clean hero) */}
                
                {/* Tablet Mockup Container */}
                <div className="absolute top-1/2 left-0 sm:left-6 -translate-y-1/2 w-full sm:w-[110%] lg:w-[120%] h-[88%] max-h-[520px] bg-[#0D0B08] rounded-[2.25rem] border-[12px] sm:border-[14px] border-gray-900 shadow-2xl overflow-hidden transform rotate-[-3deg] origin-center z-10">
                  {/* Camera */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-black/60 rounded-full z-20 border border-white/10 flex items-center justify-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/25" />
                  </div>
                  <img
                    src="/Screenshot%202026-05-19%20175737.png"
                    alt="HG ERP tablet preview"
                    className="w-full h-full object-cover object-left-top"
                    loading="eager"
                  />
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-white/10 rounded-[2.25rem]" />
                </div>
             </div>
          </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-16 px-6 bg-[var(--lp-surface)] border-y border-[var(--lp-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--lp-hero-text)] mb-3">Benefits</h2>
            <p className="text-[var(--lp-muted)] max-w-2xl mx-auto">Designed for jewellery operations: speed, visibility, and cleaner handoffs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BenefitCard icon={<Sparkles size={22} />} title="Less follow-up calls" desc="Customers track progress from the portal, reducing repeated WhatsApp/call updates." />
            <BenefitCard icon={<Clock size={22} />} title="Faster turnarounds" desc="Technicians update statuses quickly so approvals and next steps don’t get stuck." />
            <BenefitCard icon={<PackageSearch size={22} />} title="Fewer stockouts" desc="Inventory visibility and logs help you plan tools/consumables ahead of time." />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 px-6 border-y border-[var(--lp-border)] bg-[var(--lp-surface)]">
         <div className="max-w-7xl mx-auto">
             <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--lp-hero-text)] mb-3">Precision in Every Process</h2>
                <p className="text-[var(--lp-muted)] max-w-2xl mx-auto">From real-time inventory tracking to instant customer updates, our ERP handles it all.</p>
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

      {/* Mobile Preview */}
      <section className="py-16 px-6 bg-[var(--lp-bg)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-[var(--lp-hero-text)] mb-4">Mobile preview</h2>
            <p className="text-[var(--lp-muted)] max-w-xl">
              A quick look at the same dashboard optimized in a mobile frame — perfect for updates on the go.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end overflow-visible h-[500px] sm:h-[580px] items-center w-full relative">
            <div className="relative w-full max-w-[500px] h-full flex items-center justify-center overflow-visible">
              
              {/* Left Phone (Phone 0) */}
              <div 
                onClick={() => setActivePhone(0)}
                className={`transition-all duration-700 ease-in-out cursor-pointer select-none ${
                  activePhone === 0
                    ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 scale-100 opacity-100 shadow-2xl rotate-0"
                    : activePhone === 1
                    ? "absolute left-[2%] sm:left-[6%] top-1/2 -translate-y-1/2 z-10 scale-[0.82] opacity-40 -rotate-6"
                    : "absolute right-[2%] sm:right-[6%] top-1/2 -translate-y-1/2 z-10 scale-[0.82] opacity-40 rotate-6"
                }`}
              >
                <div className="relative w-[200px] sm:w-[250px] h-[420px] sm:h-[520px] rounded-[2.5rem] bg-gradient-to-b from-[#111827] to-[#000000] p-[7px] shadow-2xl border border-white/10">
                  {/* Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/75 rounded-full z-20 border border-white/10 flex items-center justify-center">
                    <div className="w-8 h-1 rounded-full bg-white/15"></div>
                  </div>
                  {/* Screen Content */}
                  <div className="relative w-full h-full rounded-[2.2rem] bg-[#0D0B08] overflow-hidden border border-white/10">
                    <img
                      src="/Screenshot%202026-05-19%20175737.png"
                      alt="HG ERP Left portal"
                      className="w-full h-full object-cover object-left-top hue-rotate-15 saturate-125"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 pointer-events-none ring-1 ring-white/10 rounded-[2.2rem]" />
                  </div>
                </div>
              </div>

              {/* Center Phone (Phone 1) */}
              <div 
                onClick={() => setActivePhone(1)}
                className={`transition-all duration-700 ease-in-out cursor-pointer select-none ${
                  activePhone === 1
                    ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 scale-100 opacity-100 shadow-2xl rotate-0"
                    : activePhone === 2
                    ? "absolute left-[2%] sm:left-[6%] top-1/2 -translate-y-1/2 z-10 scale-[0.82] opacity-40 -rotate-6"
                    : "absolute right-[2%] sm:right-[6%] top-1/2 -translate-y-1/2 z-10 scale-[0.82] opacity-40 rotate-6"
                }`}
              >
                <div className="relative w-[200px] sm:w-[250px] h-[420px] sm:h-[520px] rounded-[2.5rem] bg-gradient-to-b from-[#111827] to-[#000000] p-[7px] shadow-2xl border border-white/10">
                  {/* Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/75 rounded-full z-20 border border-white/10 flex items-center justify-center">
                    <div className="w-8 h-1 rounded-full bg-white/15"></div>
                  </div>
                  {/* Screen Content */}
                  <div className="relative w-full h-full rounded-[2.2rem] bg-[#0D0B08] overflow-hidden border border-white/10">
                    <img
                      src="/Screenshot%202026-05-19%20175737.png"
                      alt="HG ERP Center portal"
                      className="w-full h-full object-cover object-left-top"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 pointer-events-none ring-1 ring-white/10 rounded-[2.2rem]" />
                  </div>
                </div>
              </div>

              {/* Right Phone (Phone 2) */}
              <div 
                onClick={() => setActivePhone(2)}
                className={`transition-all duration-700 ease-in-out cursor-pointer select-none ${
                  activePhone === 2
                    ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 scale-100 opacity-100 shadow-2xl rotate-0"
                    : activePhone === 0
                    ? "absolute left-[2%] sm:left-[6%] top-1/2 -translate-y-1/2 z-10 scale-[0.82] opacity-40 -rotate-6"
                    : "absolute right-[2%] sm:right-[6%] top-1/2 -translate-y-1/2 z-10 scale-[0.82] opacity-40 rotate-6"
                }`}
              >
                <div className="relative w-[200px] sm:w-[250px] h-[420px] sm:h-[520px] rounded-[2.5rem] bg-gradient-to-b from-[#111827] to-[#000000] p-[7px] shadow-2xl border border-white/10">
                  {/* Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/75 rounded-full z-20 border border-white/10 flex items-center justify-center">
                    <div className="w-8 h-1 rounded-full bg-white/15"></div>
                  </div>
                  {/* Screen Content */}
                  <div className="relative w-full h-full rounded-[2.2rem] bg-[#0D0B08] overflow-hidden border border-white/10">
                    <img
                      src="/Screenshot%202026-05-19%20175737.png"
                      alt="HG ERP Right portal"
                      className="w-full h-full object-cover object-left-top hue-rotate-60 contrast-125"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 pointer-events-none ring-1 ring-white/10 rounded-[2.2rem]" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 px-6 bg-[var(--lp-bg)] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hg-accent/5 opacity-[0.03] blur-[150px] rounded-full pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--lp-hero-text)] mb-4 tracking-tight">Master Console Showcase</h2>
            <p className="text-[var(--lp-muted)] max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Explore the rich custom UI, dynamic metal price tickers, 3D CAM job queues, and karigar attendance trackers from our live enterprise portal.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-3xl mx-auto bg-black/10 dark:bg-white/5 p-1.5 rounded-2xl border border-black/5 dark:border-white/5">
              {galleryCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    galleryFilter === cat
                      ? "bg-hg-accent text-black shadow-md shadow-[#D4AF37]/15"
                      : "text-[var(--lp-muted)] hover:text-[var(--lp-hero-text)] hover:bg-black/10 dark:hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredGallery.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-3xl bg-[var(--lp-card)] border border-[var(--lp-border)] hover:border-hg-accent hover:shadow-xl hover:shadow-[#D4AF37]/5 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-video relative overflow-hidden bg-black/40 border-b border-[var(--lp-border)]">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-hg-accent text-black font-bold text-xs py-2.5 px-5 rounded-full shadow-lg shadow-hg-accent/20 uppercase tracking-widest scale-90 group-hover:scale-100 transition-transform duration-300">
                      Expand View
                    </span>
                  </div>
                </div>

                <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-hg-accent bg-hg-accent/15 px-2.5 py-1 rounded-full mb-3 inline-block">
                      {item.category}
                    </span>
                    <h3 className="text-base md:text-lg font-black text-[var(--lp-hero-text)] mb-2 tracking-tight group-hover:text-hg-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--lp-muted)] leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox / Zoom-in Modal Overlay */}
        {selectedImage && (
          <div 
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10 select-none cursor-zoom-out animate-fade-in"
          >
            <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-colors shadow"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <img 
                src={selectedImage.img} 
                alt={selectedImage.title}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl border border-white/10 object-contain"
              />
              
              <div className="mt-4 text-center text-white max-w-xl">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] mb-1.5 inline-block">{selectedImage.category}</span>
                <h4 className="text-lg font-bold tracking-tight">{selectedImage.title}</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{selectedImage.desc}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-6 bg-[var(--lp-surface)] border-y border-[var(--lp-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-[var(--lp-hero-text)] mb-4">Trusted by teams that ship repairs faster</h2>
            <p className="text-[var(--lp-muted)] max-w-2xl mx-auto">From customer updates to tool tracking — one workflow, four portals, zero guesswork.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id || `${t.name}-${t.org}-${t.quote}`}
                className="p-6 md:p-8 rounded-3xl bg-[var(--lp-card)] border border-[var(--lp-border)] hover:border-hg-accent/50 hover:shadow-xl hover:shadow-[#D4AF37]/5 transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-2 right-4 text-8xl font-serif text-[#D4AF37]/5 pointer-events-none select-none">“</div>
                <div>
                  {/* Five golden stars */}
                  <div className="flex gap-0.5 text-hg-accent mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="#D4AF37" strokeWidth={0} className="shrink-0" />
                    ))}
                  </div>
                  <p className="text-[var(--lp-hero-text)] leading-relaxed mb-6 text-sm md:text-base italic relative z-10">“{t.quote}”</p>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--lp-border)] pt-4 mt-auto">
                  <div>
                    <div className="font-bold text-sm text-[var(--lp-hero-text)]">{t.name}</div>
                    <div className="text-xs text-[var(--lp-muted)] mt-0.5">{t.org}</div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-hg-accent bg-hg-accent/10 py-1 px-2.5 rounded-full">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-xl font-semibold text-[var(--lp-hero-text)] mb-2">Write a testimonial</h3>
              <p className="text-[var(--lp-muted)] text-sm">
                Share your experience — your testimonial will appear instantly on this page (saved on your device).
              </p>
            </div>

            <form onSubmit={onTestimonialSubmit} className="glass-panel rounded-2xl p-6 border border-[var(--lp-border)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Name" required>
                  <input
                    value={testimonialForm.name}
                    onChange={onTestimonialChange('name')}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--lp-input-bg)] border border-[var(--lp-border)] text-[var(--lp-hero-text)] placeholder:text-[var(--lp-muted)] placeholder:opacity-70"
                    placeholder="Your name"
                    required
                  />
                </Field>

                <Field label="Business" required>
                  <input
                    value={testimonialForm.org}
                    onChange={onTestimonialChange('org')}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--lp-input-bg)] border border-[var(--lp-border)] text-[var(--lp-hero-text)] placeholder:text-[var(--lp-muted)] placeholder:opacity-70"
                    placeholder="Business / company"
                    required
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Testimonial" required>
                  <textarea
                    value={testimonialForm.quote}
                    onChange={onTestimonialChange('quote')}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--lp-input-bg)] border border-[var(--lp-border)] text-[var(--lp-hero-text)] placeholder:text-[var(--lp-muted)] placeholder:opacity-70 min-h-[120px]"
                    placeholder="Write your testimonial…"
                    required
                  />
                </Field>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <button
                  type="submit"
                  disabled={testimonialStatus === 'submitting'}
                  className="w-full sm:w-auto bg-[var(--lp-cta-bg)] text-[var(--lp-cta-text)] px-7 py-3.5 rounded-full font-bold hover:brightness-110 transition-all shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {testimonialStatus === 'submitting' ? 'Submitting…' : 'Submit Testimonial'}
                </button>

                {testimonialStatus === 'submitted' ? (
                  <div className="text-sm text-[var(--lp-hero-text)]">Thanks for your feedback!</div>
                ) : (
                  <div className="text-sm text-[var(--lp-muted)]">Visible on this device only.</div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 px-6 relative">
        <div className="absolute top-10 left-0 w-[500px] h-[500px] bg-hg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-[var(--lp-hero-text)] mb-4">Pricing Plans</h2>
            <p className="text-[var(--lp-muted)] max-w-2xl mx-auto">Pick a plan that matches your scale — upgrade anytime.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PricingCard
              title="Basic"
              badge="Starter"
              highlight={false}
              price="₹4,999"
              items={['Customer portal access', 'Employee job updates', 'Inventory essentials', 'Standard support']}
            />
            <PricingCard
              title="Premium"
              badge="Most Popular"
              highlight
              price="₹12,499"
              items={['Everything in Basic', 'Advanced tracking & notifications', 'Role-based controls', 'Priority support']}
            />
            <PricingCard
              title="Enterprise"
              badge="Custom"
              highlight={false}
              price="Custom"
              items={['Everything in Premium', 'Multi-branch workflows', 'Custom onboarding & training', 'SLA & dedicated success']}
            />
          </div>

          <div className="mt-8 text-center">
            <a href="#demo" className="inline-flex items-center justify-center bg-hg-accent text-black px-7 py-3.5 rounded-full font-bold text-base hover:brightness-110 transition-all shadow-xl">
              Book a Demo <ChevronRight className="ml-2" size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Demo Booking Form */}
      <section id="demo" className="py-16 px-6 bg-[var(--lp-surface)] border-y border-[var(--lp-border)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-[var(--lp-hero-text)] mb-4">Demo Booking Form</h2>
            <p className="text-[var(--lp-muted)] max-w-2xl mx-auto">Tell us a little about your team — we’ll reach out to schedule a walkthrough.</p>
          </div>

          <form onSubmit={onDemoSubmit} className="glass-panel rounded-2xl p-6 md:p-8 border border-hg-dark-gold/40">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Name" required>
                <input
                  value={demoForm.name}
                  onChange={onDemoChange('name')}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--lp-input-bg)] border border-[var(--lp-border)] text-[var(--lp-hero-text)] placeholder:text-[var(--lp-muted)] placeholder:opacity-70"
                  placeholder="Your full name"
                  required
                />
              </Field>

              <Field label="Business" required>
                <input
                  value={demoForm.business}
                  onChange={onDemoChange('business')}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--lp-input-bg)] border border-[var(--lp-border)] text-[var(--lp-hero-text)] placeholder:text-[var(--lp-muted)] placeholder:opacity-70"
                  placeholder="Business / store name"
                  required
                />
              </Field>

              <Field label="Phone" required>
                <input
                  value={demoForm.phone}
                  onChange={onDemoChange('phone')}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--lp-input-bg)] border border-[var(--lp-border)] text-[var(--lp-hero-text)] placeholder:text-[var(--lp-muted)] placeholder:opacity-70"
                  placeholder="+91 / +1 ..."
                  required
                />
              </Field>

              <Field label="City" required>
                <input
                  value={demoForm.city}
                  onChange={onDemoChange('city')}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--lp-input-bg)] border border-[var(--lp-border)] text-[var(--lp-hero-text)] placeholder:text-[var(--lp-muted)] placeholder:opacity-70"
                  placeholder="City"
                  required
                />
              </Field>

              <Field label="Team size" required>
                <select
                  value={demoForm.teamSize}
                  onChange={onDemoChange('teamSize')}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--lp-input-bg)] border border-[var(--lp-border)] text-[var(--lp-hero-text)]"
                  required
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  <option value="1-5">1–5</option>
                  <option value="6-15">6–15</option>
                  <option value="16-30">16–30</option>
                  <option value="31-60">31–60</option>
                  <option value="60+">60+</option>
                </select>
              </Field>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <button
                type="submit"
                disabled={demoStatus === 'submitting'}
                className="w-full sm:w-auto bg-hg-accent text-black px-7 py-3.5 rounded-full font-bold hover:brightness-110 transition-all shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {demoStatus === 'submitting' ? 'Submitting…' : 'Request Demo'}
              </button>

              {demoStatus === 'submitted' ? (
                <div className="text-sm text-[var(--lp-hero-text)]">Thanks — we’ll contact you shortly.</div>
              ) : (
                <div className="text-sm text-[var(--lp-muted)]">Prefer WhatsApp/call? Share your best time in the demo call.</div>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-[var(--lp-hero-text)] mb-4">FAQ</h2>
            <p className="text-[var(--lp-muted)] max-w-2xl mx-auto">Quick answers to common questions.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group p-5 rounded-2xl bg-[var(--lp-card)] border border-[var(--lp-border)] open:border-hg-accent/50 transition-colors"
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                  <span className="font-semibold text-[var(--lp-hero-text)]">{f.q}</span>
                  <span className="text-hg-accent mt-0.5 transition-transform group-open:rotate-90">
                    <ChevronRight size={18} />
                  </span>
                </summary>
                <p className="mt-4 text-[var(--lp-muted)] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + Inquiry */}
      <section id="contact" className="py-16 px-6 bg-[var(--lp-surface)] border-y border-[var(--lp-border)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-[var(--lp-hero-text)] mb-4">Contact</h2>
            <p className="text-[var(--lp-muted)] mb-8 max-w-xl">
              Reach us on WhatsApp, call, or email. Or drop an inquiry and our team will get back to you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ContactCard icon={<MessageCircle size={18} />} title="WhatsApp" value="+91 00000 00000" />
              <ContactCard icon={<Phone size={18} />} title="Call" value="+91 00000 00000" />
              <ContactCard icon={<Mail size={18} />} title="Email" value="support@hgenterprises.com" />
            </div>
          </div>

          <div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-[var(--lp-hero-text)]">Inquiry</h3>
              <p className="text-sm text-[var(--lp-muted)] mt-1">Admin can view all inquiries in the Admin Panel.</p>
            </div>

            <form onSubmit={onInquirySubmit} className="glass-panel rounded-2xl p-6 md:p-8 border border-hg-dark-gold/40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Name" required>
                  <input
                    value={inquiryForm.name}
                    onChange={onInquiryChange('name')}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--lp-input-bg)] border border-[var(--lp-border)] text-[var(--lp-hero-text)] placeholder:text-[var(--lp-muted)] placeholder:opacity-70"
                    placeholder="Your full name"
                    required
                  />
                </Field>

                <Field label="Business" required>
                  <input
                    value={inquiryForm.business}
                    onChange={onInquiryChange('business')}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--lp-input-bg)] border border-[var(--lp-border)] text-[var(--lp-hero-text)] placeholder:text-[var(--lp-muted)] placeholder:opacity-70"
                    placeholder="Business / store name"
                    required
                  />
                </Field>

                <Field label="Phone" required>
                  <input
                    value={inquiryForm.phone}
                    onChange={onInquiryChange('phone')}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--lp-input-bg)] border border-[var(--lp-border)] text-[var(--lp-hero-text)] placeholder:text-[var(--lp-muted)] placeholder:opacity-70"
                    placeholder="+91 / +1 ..."
                    required
                  />
                </Field>

                <Field label="City" required>
                  <input
                    value={inquiryForm.city}
                    onChange={onInquiryChange('city')}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--lp-input-bg)] border border-[var(--lp-border)] text-[var(--lp-hero-text)] placeholder:text-[var(--lp-muted)] placeholder:opacity-70"
                    placeholder="City"
                    required
                  />
                </Field>
              </div>

              <div className="mt-6">
                <Field label="Message" required={false}>
                  <textarea
                    value={inquiryForm.message}
                    onChange={onInquiryChange('message')}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--lp-input-bg)] border border-[var(--lp-border)] text-[var(--lp-hero-text)] placeholder:text-[var(--lp-muted)] placeholder:opacity-70 min-h-[110px]"
                    placeholder="Tell us what you need…"
                  />
                </Field>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <button
                  type="submit"
                  disabled={inquiryStatus === 'submitting'}
                  className="w-full sm:w-auto bg-hg-accent text-black px-7 py-3.5 rounded-full font-bold hover:brightness-110 transition-all shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {inquiryStatus === 'submitting' ? 'Submitting…' : 'Send Inquiry'}
                </button>

                {inquiryStatus === 'submitted' ? (
                  <div className="text-sm text-[var(--lp-hero-text)]">Inquiry sent.</div>
                ) : (
                  <div className="text-sm text-[var(--lp-muted)]">We typically respond within 1 business day.</div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#8E7A5A]/25 py-12 bg-[#0B0B0B] text-gray-400">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center shadow-lg shrink-0 rounded-lg overflow-hidden border border-[#D4AF37]/35 bg-black/40">
              <img src="/image.png" alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <div className="font-bold text-white tracking-wide">HG ENTERPRISES</div>
              <div className="text-xs text-gray-500 mt-0.5">ERP for jewellery service operations</div>
            </div>
          </div>

          <div className="text-sm">
            <div className="font-semibold text-white mb-3">Quick Links</div>
            <div className="grid grid-cols-2 gap-2 text-gray-400">
              <a href="#benefits" className="hover:text-[#D4AF37] transition-colors">Benefits</a>
              <a href="#features" className="hover:text-[#D4AF37] transition-colors">Features</a>
              <a href="#pricing" className="hover:text-[#D4AF37] transition-colors">Pricing</a>
              <a href="#demo" className="hover:text-[#D4AF37] transition-colors">Demo</a>
              <a href="#faq" className="hover:text-[#D4AF37] transition-colors">FAQ</a>
              <a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact</a>
            </div>
          </div>

          <div className="text-sm">
            <div className="font-semibold text-white mb-3">Contact</div>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center gap-2"><MessageCircle size={14} className="text-[#D4AF37]" /> WhatsApp: +91 00000 00000</div>
              <div className="flex items-center gap-2"><Phone size={14} className="text-[#D4AF37]" /> Call: +91 00000 00000</div>
              <div className="flex items-center gap-2"><Mail size={14} className="text-[#D4AF37]" /> Email: support@hgenterprises.com</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} HG Enterprises. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const BenefitCard = ({ icon, title, desc }) => (
  <div className="p-6 md:p-8 rounded-3xl bg-[var(--lp-card)] border border-[var(--lp-border)] hover:border-hg-accent hover:shadow-xl hover:shadow-[#D4AF37]/5 transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between h-full relative overflow-hidden">
    <div className="absolute -top-6 -right-6 w-20 h-20 bg-hg-accent/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
    <div>
      <div className="w-12 h-12 rounded-xl bg-hg-accent/10 text-hg-accent flex items-center justify-center mb-6 group-hover:bg-hg-accent group-hover:text-black transition-colors duration-300 shadow-md shadow-hg-accent/5">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-black text-[var(--lp-hero-text)] mb-3 tracking-tight">{title}</h3>
      <p className="text-[var(--lp-muted)] leading-relaxed text-sm">{desc}</p>
    </div>
  </div>
);

const ContactCard = ({ icon, title, value }) => (
  <div className="glass-panel p-5 rounded-2xl border border-[var(--lp-border)] hover:border-hg-accent hover:shadow-lg hover:shadow-[#D4AF37]/5 transition-all duration-300 group hover:-translate-y-1">
    <div className="flex items-center gap-2 text-[var(--lp-hero-text)] font-bold text-sm">
      <span className="text-hg-accent group-hover:scale-110 transition-transform">{icon}</span>
      {title}
    </div>
    <div className="text-[11px] text-[var(--lp-muted)] mt-2.5 font-mono select-all bg-black/15 dark:bg-white/5 py-1.5 px-3 rounded-lg border border-black/5 dark:border-white/5 inline-block">{value}</div>
  </div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-6 md:p-8 rounded-3xl bg-[var(--lp-card)] border border-[var(--lp-border)] hover:border-hg-accent hover:shadow-xl hover:shadow-[#D4AF37]/5 transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between h-full relative overflow-hidden">
    <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-hg-accent/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
    <div>
      <div className="w-14 h-14 rounded-2xl bg-hg-accent/10 text-hg-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-hg-accent group-hover:text-black transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-black text-[var(--lp-hero-text)] mb-3 tracking-tight">{title}</h3>
      <p className="text-[var(--lp-muted)] leading-relaxed text-sm">{desc}</p>
    </div>
  </div>
);

const PricingCard = ({ title, badge, items, highlight, price }) => (
  <div
    className={[
      'p-6 md:p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5',
      highlight 
        ? 'bg-gradient-to-b from-[#1F1B14] to-[#0D0B08] border-[#D4AF37] shadow-xl shadow-[#D4AF37]/5' 
        : 'bg-[var(--lp-card)] border-[var(--lp-border)] hover:border-hg-accent/50 shadow-md',
    ].join(' ')}
  >
    {highlight && (
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-[0.04] blur-2xl rounded-full pointer-events-none" />
    )}
    <div>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-2xl font-black tracking-tight text-[var(--lp-hero-text)]">{title}</div>
          <div className="text-xs text-[var(--lp-muted)] mt-1 font-semibold uppercase tracking-wider">{badge}</div>
        </div>
        {highlight && (
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-hg-accent text-black shadow-lg shadow-hg-accent/20">
            Popular
          </span>
        )}
      </div>

      {/* Price tag */}
      <div className="my-6 flex items-baseline gap-1.5 border-b border-[var(--lp-border)] pb-6">
        <span className="text-3xl font-black text-[var(--lp-hero-text)] tracking-tight">{price}</span>
        {price !== 'Custom' && <span className="text-xs text-[var(--lp-muted)]">/ month</span>}
      </div>

      <ul className="space-y-3.5 text-[var(--lp-muted)] text-sm">
        {items.map((it) => (
          <li key={it} className="flex gap-3 items-start">
            <span className="mt-0.5 w-5 h-5 rounded-full bg-hg-accent/15 text-hg-accent flex items-center justify-center shrink-0">
              <Check size={11} strokeWidth={3} />
            </span>
            <span className="leading-snug">{it}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-8">
      <a
        href="#demo"
        className={[
          'inline-flex w-full items-center justify-center px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-lg',
          highlight 
            ? 'bg-hg-accent text-black hover:brightness-110 shadow-hg-accent/10 hover:shadow-hg-accent/20' 
            : 'bg-[var(--lp-hero-text)] text-[var(--lp-bg)] hover:brightness-110 shadow-black/10',
        ].join(' ')}
      >
        Book Custom Demo <ChevronRight className="ml-2" size={14} />
      </a>
    </div>
  </div>
);

const Field = ({ label, required, children }) => (
  <label className="block">
    <div className="mb-2 text-sm font-semibold text-[var(--lp-hero-text)]">
      {label} {required ? <span className="text-hg-accent">*</span> : null}
    </div>
    {children}
  </label>
);

export default LandingPage;





