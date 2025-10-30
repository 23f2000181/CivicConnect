import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Report Civic Issues Effortlessly
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100 leading-relaxed">
            Connect with your local authorities to report potholes, garbage problems,
            streetlight outages, and other civic issues in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {isAuthenticated ? (
              <Link to="/report" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                Report an Issue
              </Link>
            ) : (
              <Link to="/register" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                Get Started
              </Link>
            )}
            <Link to="/issues" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg transition-all duration-200">
              Browse Issues
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="text-6xl mb-6 text-center">📱</div>
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Report Issues</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Take a photo, add description, and report civic issues in your neighborhood with just a few taps.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="text-6xl mb-6 text-center">🗺️</div>
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Track Progress</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Monitor the status of your reports and see real-time updates from authorities.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="text-6xl mb-6 text-center">👥</div>
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Community Power</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Support issues in your area by upvoting and commenting to amplify community voices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16 text-gray-800">Making a Difference</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Issues Reported</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl font-bold text-green-600 mb-2">350+</div>
              <div className="text-gray-600 font-medium">Issues Resolved</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl font-bold text-purple-600 mb-2">1,200+</div>
              <div className="text-gray-600 font-medium">Active Users</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Areas Covered</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;