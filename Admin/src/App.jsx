import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './middlewares/Authcontext';
import PrivateRoute from './routes/ProtectedRoute';
import Layout from './layout/AdminLayout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Plans from './pages/Plans';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import Settings from './pages/Settings';

export default function App() {
  return (
    <AuthProvider>
      <Toaster />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="plans" element={<Plans />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </AuthProvider>
  );
}