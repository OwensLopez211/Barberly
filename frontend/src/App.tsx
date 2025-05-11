import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Auth pages
import Auth from './pages/Auth';

// Stylist pages
import StylistDashboard from './pages/stylist/StylistDashboard';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';

// Protected route wrapper
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (user.role === 'stylist') {
      return <Navigate to="/stylist" replace />;
    } else {
      return <Navigate to="/client" replace />;
    }
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Stylist routes */}
          <Route 
            path="/stylist" 
            element={
              <ProtectedRoute allowedRoles={['stylist']}>
                <StylistDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Default redirect */}
          <Route 
            path="/" 
            element={<Navigate to="/auth" replace />} 
          />
          
          {/* 404 route */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
                <a 
                  href="/"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Go Home
                </a>
              </div>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;