import { Navigate } from 'react-router-dom';
import { useAuth } from '../middlewares/Authcontext';

export default function PrivateRoute({ children }) {
  const { loading } = useAuth();

  const token = localStorage.getItem("token");

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-8 h-8 text-brand-500" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          </svg>
          <p className="text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  return token ? children : <Navigate to="/login" replace />;
}