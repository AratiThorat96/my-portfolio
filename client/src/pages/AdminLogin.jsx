import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthStore from '../store/authStore';
import { useDarkMode } from '../hooks/useDarkMode';
import api from '../api/axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { isDark } = useDarkMode();
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      if (response.data.success) {
        setAuth(response.data.admin, response.data.token, response.data.refreshToken);
        toast.success('Login successful!');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-secondary' : 'bg-gray-50'}`}>
      <div className={`max-w-md w-full p-8 rounded-lg shadow-lg ${isDark ? 'bg-black/30' : 'bg-white'}`}>
        <h1 className="text-3xl font-bold text-center text-primary mb-8">Admin Login</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-primary mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-4 py-2 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition ${
                isDark ? 'bg-black/50 text-white' : 'bg-white text-black'
              }`}
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-primary mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-4 py-2 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition ${
                isDark ? 'bg-black/50 text-white' : 'bg-white text-black'
              }`}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition font-bold disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          <Link to="/" className="text-primary hover:text-accent transition">
            Back to Portfolio
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
