import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">CivicConnect</h3>
          <p className="text-gray-300">
            Making our communities better, one issue at a time.
          </p>
          <p className="text-gray-400 mt-4">
            &copy; 2024 CivicConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;