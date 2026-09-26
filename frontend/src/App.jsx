import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RedirectToSignIn, SignIn, useAuth } from "@clerk/react";

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public
import LandingPage from './pages/LandingPage';

// Auth
import AdminLogin from './pages/auth/AdminLogin';

// User Dashboard
import UserDashboard from './pages/user/UserDashboard';
import FeedbackAnalysis from './pages/user/FeedbackAnalysis';
import MyReviews from './pages/user/MyReviews';
import UserReviewDetail from './pages/user/ReviewDetail';
import Profile from './pages/user/Profile';

// Admin Dashboard
import AdminDashboard from './pages/admin/AdminDashboard';
import AllReviews from './pages/admin/AllReviews';
import AdminReviewDetail from './pages/admin/ReviewDetail';

const ProtectedRoute = ({ children }) => {
  const { isLoaded, userId } = useAuth();
  if (!isLoaded) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!userId) return <RedirectToSignIn />;
  return children;
};

const AdminProtectedRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("adminAuth") === "true";
  if (!isAdminLoggedIn) return <Navigate to="/admin/login" />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          {/* Clerk Drop-in SignIn component */}
          <Route path="/login" element={
            <div className="flex justify-center items-center py-12">
              <SignIn routing="path" path="/login" fallbackRedirectUrl="/dashboard" />
            </div>
          } />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout role="user" />
          </ProtectedRoute>
        }>
          <Route index element={<UserDashboard />} />
          <Route path="feedback/analysis" element={<FeedbackAnalysis />} />
          <Route path="reviews" element={<MyReviews />} />
          <Route path="reviews/:id" element={<UserReviewDetail />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/admin" element={
          <AdminProtectedRoute>
            <DashboardLayout role="admin" />
          </AdminProtectedRoute>
        }>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="reviews" element={<AllReviews />} />
          <Route path="reviews/:id" element={<AdminReviewDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
