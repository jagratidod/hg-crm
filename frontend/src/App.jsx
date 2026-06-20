import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Landing
import LandingPage from './panels/landing/LandingPage';

// Complete Luxury Login Screen Module
import LoginScreen from './panels/admin/pages/LoginScreen';
// Complete Luxury Login Screen Module
import LoginScreen from './panels/admin/pages/LoginScreen';

// Unified Luxury Layout
import SuperAdminLayout from './panels/super-admin/SuperAdminLayout';
import AdminLayout from './panels/admin/AdminLayout';
import EmployeeLayout from './panels/employee/EmployeeLayout';
import InventoryLayout from './panels/inventory/InventoryLayout';
import CustomerLayout from './panels/customer/CustomerLayout';

// State Store
import useErpStore from './store/erpStore';
// State Store
import useErpStore from './store/erpStore';

// Protected Route wrapper with role authorizations
// Protected Route wrapper with role authorizations
const ProtectedRoute = ({ children, allowedRole }) => {
  const { role, isLoggedIn } = useErpStore();
  const { role, isLoggedIn } = useErpStore();
  
  if (!isLoggedIn) {
    // If not logged in, route to default admin login
    return <Navigate to="/admin/login" replace />;
    // If not logged in, route to default admin login
    return <Navigate to="/admin/login" replace />;
  }
  
  // Super Admin can access everything for testing and evaluation
  if (role !== 'Super Admin' && allowedRole === 'admin' && role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  // Super Admin can access everything for testing and evaluation
  if (role !== 'Super Admin' && allowedRole === 'admin' && role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      {/* Toast configurations aligned with luxury theme */}
      {/* Toast configurations aligned with luxury theme */}
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#0F0F0F',
          color: '#FFFFFF',
          border: '1px solid #D4AF37',
          borderRadius: '12px',
          fontSize: '12px',
          fontFamily: 'Outfit, sans-serif'
          background: '#0F0F0F',
          color: '#FFFFFF',
          border: '1px solid #D4AF37',
          borderRadius: '12px',
          fontSize: '12px',
          fontFamily: 'Outfit, sans-serif'
        }
      }} />
      
      
      <Routes>
        {/* Landing Page */}
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Entrypoints */}
        <Route path="/admin/login" element={<LoginScreen />} />
        <Route path="/employee/login" element={<LoginScreen />} />
        <Route path="/inventory/login" element={<LoginScreen />} />
        <Route path="/customer/login" element={<LoginScreen />} />

        {/* Super Admin Portal */}
        <Route path="/super-admin/*" element={
          <ProtectedRoute allowedRole="admin">
            <SuperAdminLayout />
          </ProtectedRoute>
        } />

        {/* Master Admin Portal: Hosts all 18 Jewellery Manufacturing ERP modules */}
        {/* Master Admin Portal: Hosts all 18 Jewellery Manufacturing ERP modules */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        } />

        {/* Fallbacks */}
        <Route path="/employee/*" element={<Navigate to="/admin" replace />} />
        <Route path="/inventory/*" element={<Navigate to="/admin" replace />} />
        <Route path="/customer/*" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
        {/* Fallbacks */}
        <Route path="/employee/*" element={<Navigate to="/admin" replace />} />
        <Route path="/inventory/*" element={<Navigate to="/admin" replace />} />
        <Route path="/customer/*" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
