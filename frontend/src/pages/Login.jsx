import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        if (isAdmin) localStorage.setItem('preferredRole', 'admin');
        navigate('/');
      } else setError(result.message || 'Login failed');
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-sub">Sign in to manage and report issues in your community.</p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="sr-only" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="form-input"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label className="sr-only" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="form-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-field" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input id="admin" type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
            <label htmlFor="admin" className="muted">Sign in as admin</label>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading} className="nav-button">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            <div style={{ marginLeft: 'auto' }}>
              <Link to="/register" className="form-link">Don't have an account? Sign up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;