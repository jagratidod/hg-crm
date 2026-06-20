import { create } from 'zustand';

// Initial Mock Data
const initialTenants = [
  { id: 'T-1001', company: 'Acme Corp', owner: 'John Doe', email: 'john@acme.com', plan: 'Enterprise', users: 45, storage: '45.2 GB', status: 'Active' },
  { id: 'T-1002', company: 'Stark Ind.', owner: 'Tony Stark', email: 'tony@stark.com', plan: 'Professional', users: 12, storage: '12.8 GB', status: 'Active' },
  { id: 'T-1003', company: 'Wayne Ent.', owner: 'Bruce Wayne', email: 'bruce@wayne.com', plan: 'Free', users: 2, storage: '0.5 GB', status: 'Suspended' },
  { id: 'T-1004', company: 'Oscorp', owner: 'Norman Osborn', email: 'norman@oscorp.com', plan: 'Starter', users: 5, storage: '2.1 GB', status: 'Trial' },
  { id: 'T-1005', company: 'Daily Bugle', owner: 'J.J. Jameson', email: 'jj@bugle.com', plan: 'Professional', users: 15, storage: '18.4 GB', status: 'Expired' },
];

const initialPlans = [
  { id: 'p1', name: 'Free', monthlyPrice: 0, yearlyPrice: 0, maxUsers: 2, maxStorage: '1 GB', maxLeads: 100, features: ['Basic CRM', 'Email Support'], missing: ['Advanced Reports', 'AI Assistant', 'Custom Domain'], popular: false },
  { id: 'p2', name: 'Starter', monthlyPrice: 49, yearlyPrice: 490, maxUsers: 5, maxStorage: '10 GB', maxLeads: 1000, features: ['Standard CRM', 'Basic Reports', 'Email Support'], missing: ['AI Assistant', 'Custom Domain'], popular: false },
  { id: 'p3', name: 'Professional', monthlyPrice: 99, yearlyPrice: 990, maxUsers: 20, maxStorage: '50 GB', maxLeads: 10000, features: ['Advanced CRM', 'Full ERP Modules', 'Advanced Reports', 'Priority Support'], missing: ['Custom Domain'], popular: true },
  { id: 'p4', name: 'Enterprise', monthlyPrice: 299, yearlyPrice: 2990, maxUsers: 'Unlimited', maxStorage: 'Unlimited', maxLeads: 'Unlimited', features: ['All Modules', 'AI Assistant', 'Custom Domain', '24/7 Phone Support', 'Dedicated Manager'], missing: [], popular: false }
];

const initialUsers = [
  { id: 'u1', name: 'Admin One', email: 'admin@system.com', role: 'Super Admin', company: 'System', status: 'Active' },
  { id: 'u2', name: 'John Doe', email: 'john@acme.com', role: 'Tenant Admin', company: 'Acme Corp', status: 'Active' },
  { id: 'u3', name: 'Jane Smith', email: 'jane@acme.com', role: 'Sales Manager', company: 'Acme Corp', status: 'Active' },
  { id: 'u4', name: 'Bob Malo', email: 'bob@stark.com', role: 'Employee', company: 'Stark Ind.', status: 'Blocked' },
];

const initialFeatures = [
  { id: 'crm', name: 'CRM Module', description: 'Customer relationship management tools', icon: 'LayoutTemplate', enabled: true },
  { id: 'erp', name: 'ERP Module', description: 'Enterprise resource planning systems', icon: 'Zap', enabled: true },
  { id: 'support', name: 'Support Center', description: 'Ticketing and customer helpdesk', icon: 'MessageSquare', enabled: true },
  { id: 'reports', name: 'Advanced Reports', description: 'Detailed analytics and custom reporting', icon: 'PieChart', enabled: false },
  { id: 'marketing', name: 'Marketing Tools', description: 'Email campaigns and lead generation', icon: 'Megaphone', enabled: false },
  { id: 'ai', name: 'AI Assistant', description: 'Automated insights and copilot features', icon: 'Bot', enabled: true },
];

const initialTickets = [
  { id: 'TCK-092', tenant: 'Acme Corp', subject: 'API Rate Limits', description: 'We are hitting API rate limits too frequently. Can we increase the quota?', priority: 'High', status: 'Open', time: '2 hours ago' },
  { id: 'TCK-091', tenant: 'Stark Ind.', subject: 'Billing Issue', description: 'My last invoice shows incorrect charges for additional users.', priority: 'Medium', status: 'In Progress', time: '5 hours ago' },
  { id: 'TCK-090', tenant: 'Wayne Ent.', subject: 'Custom Domain Setup', description: 'Need help setting up a custom domain for our tenant portal.', priority: 'Low', status: 'Resolved', time: '1 day ago' },
];

const initialLogs = [
  { id: 1, action: 'Login Successful', user: 'Admin One', tenant: 'System', ip: '192.168.1.1', time: '10 mins ago', type: 'info' },
  { id: 2, action: 'Plan Changed to Enterprise', user: 'John Doe', tenant: 'Acme Corp', ip: '10.0.0.5', time: '1 hour ago', type: 'warning' },
  { id: 3, action: 'Failed Login Attempt', user: 'Unknown', tenant: 'Stark Ind.', ip: '45.22.11.9', time: '2 hours ago', type: 'error' },
];

const initialLeads = [
  { id: 'L-1001', name: 'Ravi Patel', business: 'Patel Jewellers', phone: '+91 9876543210', city: 'Surat', teamSize: '10-50', status: 'New', date: new Date().toISOString() },
  { id: 'L-1002', name: 'Amit Shah', business: 'Shah Gems', phone: '+91 8765432109', city: 'Mumbai', teamSize: '1-10', status: 'Contacted', date: new Date(Date.now() - 86400000).toISOString() }
];

const useSuperAdminStore = create((set, get) => ({
  tenants: initialTenants,
  plans: initialPlans,
  customPlans: [],
  users: initialUsers,
  features: initialFeatures,
  tickets: initialTickets,
  logs: initialLogs,
  leads: initialLeads,

  // Helper to add audit log
  addLog: (action, type = 'info', user = 'System Admin', tenant = 'System') => set((state) => {
    const newLog = {
      id: Date.now(),
      action,
      user,
      tenant,
      ip: '127.0.0.1',
      time: 'Just now',
      type
    };
    return { logs: [newLog, ...state.logs] };
  }),

  // Tenant Actions
  addTenant: (tenantData) => set((state) => {
    const newTenant = {
      id: `T-${Math.floor(1000 + Math.random() * 9000)}`,
      ...tenantData,
      users: 1,
      storage: '0.1 GB',
      status: 'Active'
    };
    get().addLog(`Created new tenant: ${newTenant.company}`);
    return { tenants: [newTenant, ...state.tenants] };
  }),
  updateTenantStatus: (id, status) => set((state) => {
    const tenant = state.tenants.find(t => t.id === id);
    if (tenant) get().addLog(`Changed tenant ${tenant.company} status to ${status}`, status === 'Suspended' ? 'warning' : 'info');
    return {
      tenants: state.tenants.map(t => t.id === id ? { ...t, status } : t)
    };
  }),
  deleteTenant: (id) => set((state) => {
    const tenant = state.tenants.find(t => t.id === id);
    if (tenant) get().addLog(`Deleted tenant: ${tenant.company}`, 'error');
    return { tenants: state.tenants.filter(t => t.id !== id) };
  }),

  // Plan Actions
  addPlan: (plan) => set((state) => {
    get().addLog(`Created new plan: ${plan.name}`);
    return { plans: [...state.plans, { id: `p${Date.now()}`, ...plan }] };
  }),
  editPlan: (id, updatedData) => set((state) => {
    get().addLog(`Edited global plan: ${updatedData.name}`);
    return {
      plans: state.plans.map(p => p.id === id ? { ...p, ...updatedData } : p)
    };
  }),
  assignCustomPlan: (tenantId, overrides) => set((state) => {
    const tenant = state.tenants.find(t => t.id === tenantId);
    get().addLog(`Assigned custom plan to tenant: ${tenant?.company || tenantId}`);
    return {
      customPlans: [...state.customPlans, { id: `cp${Date.now()}`, tenantId, ...overrides }],
      tenants: state.tenants.map(t => t.id === tenantId ? { ...t, plan: 'Custom' } : t)
    };
  }),

  // Feature Actions
  toggleFeature: (id) => set((state) => {
    const feature = state.features.find(f => f.id === id);
    if (feature) get().addLog(`Toggled feature ${feature.name} ${!feature.enabled ? 'ON' : 'OFF'}`, !feature.enabled ? 'info' : 'warning');
    return {
      features: state.features.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f)
    };
  }),

  // User Actions
  toggleUserStatus: (id) => set((state) => {
    const user = state.users.find(u => u.id === id);
    const newStatus = user.status === 'Active' ? 'Blocked' : 'Active';
    if (user) get().addLog(`Changed user ${user.name} status to ${newStatus}`, newStatus === 'Blocked' ? 'warning' : 'info');
    return {
      users: state.users.map(u => u.id === id ? { ...u, status: newStatus } : u)
    };
  }),

  // Lead Actions
  addLead: (lead) => set((state) => {
    const newLead = { id: `L-${Date.now().toString().slice(-4)}`, status: 'New', date: new Date().toISOString(), ...lead };
    get().addLog(`New Lead Received: ${lead.business} (${lead.name})`);
    return { leads: [newLead, ...state.leads] };
  }),
  updateLeadStatus: (id, status) => set((state) => {
    const lead = state.leads.find(l => l.id === id);
    if (lead) get().addLog(`Lead ${lead.business} marked as ${status}`);
    return { leads: state.leads.map(l => l.id === id ? { ...l, status } : l) };
  }),

  // Ticket Actions
  addTicket: (ticket) => set((state) => {
    const newTicket = { id: `TCK-${Math.floor(100 + Math.random() * 900)}`, status: 'Open', time: 'Just now', ...ticket };
    get().addLog(`New Support Ticket created: ${ticket.subject}`, 'warning', 'Tenant Admin', ticket.tenant);
    return { tickets: [newTicket, ...state.tickets] };
  }),
  updateTicketStatus: (id, status) => set((state) => {
    const ticket = state.tickets.find(t => t.id === id);
    if (ticket) get().addLog(`Ticket ${ticket.id} marked as ${status}`);
    return { tickets: state.tickets.map(t => t.id === id ? { ...t, status } : t) };
  }),

  // Dashboard Aggregates
  getDashboardStats: () => {
    const state = get();
    return {
      totalTenants: state.tenants.length,
      activeTenants: state.tenants.filter(t => t.status === 'Active').length,
      totalUsers: state.users.length,
      monthlyRevenue: state.tenants.reduce((acc, t) => {
        const plan = state.plans.find(p => p.name === t.plan);
        return acc + (plan ? plan.monthlyPrice : 0);
      }, 0),
      pendingPayments: 2450 // Mock static
    };
  }
}));

export default useSuperAdminStore;
