import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public
import LandingPage from './pages/LandingPage';

// Auth
import UserLogin from './pages/auth/UserLogin';
import AdminLogin from './pages/auth/AdminLogin';

// User Dashboard
import UserDashboard from './pages/user/UserDashboard';
import FeedbackAnalysis from './pages/user/FeedbackAnalysis';
import MyReviews from './pages/user/MyReviews';
import UserReviewDetail from './pages/user/ReviewDetail';
import Profile from './pages/user/Profile';
import UpdatePassword from './pages/user/UpdatePassword';

// Admin Dashboard
import AdminDashboard from './pages/admin/AdminDashboard';
import AllReviews from './pages/admin/AllReviews';
import AdminReviewDetail from './pages/admin/ReviewDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout role="user" />}>
          <Route index element={<UserDashboard />} />
          <Route path="feedback/analysis" element={<FeedbackAnalysis />} />
          <Route path="reviews" element={<MyReviews />} />
          <Route path="reviews/:id" element={<UserReviewDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings/password" element={<UpdatePassword />} />
        </Route>

        <Route path="/admin" element={<DashboardLayout role="admin" />}>
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
