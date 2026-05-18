import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Landing
import LandingPage from './panels/landing/LandingPage';

// Login Pages
import Login from './auth/Login';

// Layouts
import AdminLayout from './panels/admin/AdminLayout';
import EmployeeLayout from './panels/employee/EmployeeLayout';
import InventoryLayout from './panels/inventory/InventoryLayout';
import CustomerLayout from './panels/customer/CustomerLayout';

// Store
import useAuthStore from './store/authStore';

// Simple Protected Route wrapper
const ProtectedRoute = ({ children, allowedRole }) => {
  const { role, isLoggedIn } = useAuthStore();
  
  if (!isLoggedIn) {
    return <Navigate to={`/${allowedRole}/login`} replace />;
  }
  
  if (role !== allowedRole && role !== 'admin') {
     // Admin can access anything for testing
    return <Navigate to={`/${role}`} replace />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#1F1B14',
          color: '#E0CEAD',
          border: '1px solid #645E52',
        }
      }} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Routes */}
        <Route path="/admin/login" element={<Login role="admin" />} />
        <Route path="/employee/login" element={<Login role="employee" />} />
        <Route path="/inventory/login" element={<Login role="inventory" />} />
        <Route path="/customer/login" element={<Login role="customer" />} />

        {/* Admin Panel Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        } />

        {/* Employee Panel Routes */}
        <Route path="/employee/*" element={
          <ProtectedRoute allowedRole="employee">
            <EmployeeLayout />
          </ProtectedRoute>
        } />

        {/* Inventory Panel Routes */}
        <Route path="/inventory/*" element={
          <ProtectedRoute allowedRole="inventory">
            <InventoryLayout />
          </ProtectedRoute>
        } />

        {/* Customer Panel Routes */}
        <Route path="/customer/*" element={
          <ProtectedRoute allowedRole="customer">
            <CustomerLayout />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
