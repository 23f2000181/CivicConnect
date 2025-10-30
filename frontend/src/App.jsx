import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BrowseIssues from './pages/BrowseIssues';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/issues" element={<BrowseIssues />} />
              {/* Add these routes later */}
              <Route path="/report" element={<div className="container mx-auto px-4 py-8 text-center">Report Issue Page - Coming Soon</div>} />
              <Route path="/issues/:id" element={<div className="container mx-auto px-4 py-8 text-center">Issue Details - Coming Soon</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;