import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'citizen' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      const result = await register(registerData);
      if (result.success) navigate('/');
      else setError(result.message || 'Registration failed');
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-sub">Join CivicConnect to report and track issues in your neighborhood.</p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="sr-only" htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" required className="form-input" placeholder="Full name" value={formData.name} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label className="sr-only" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required className="form-input" placeholder="Email address" value={formData.email} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label className="sr-only" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required className="form-input" placeholder="Password" value={formData.password} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label className="sr-only" htmlFor="confirmPassword">Confirm password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required className="form-input" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label className="sr-only" htmlFor="role">Role</label>
            <select id="role" name="role" className="form-input" value={formData.role} onChange={handleChange}>
              <option value="citizen">Citizen</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading} className="nav-button">{loading ? 'Creating account...' : 'Sign up'}</button>
            <div style={{ marginLeft: 'auto' }}> <Link to="/login" className="form-link">Already have an account? Sign in</Link></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;