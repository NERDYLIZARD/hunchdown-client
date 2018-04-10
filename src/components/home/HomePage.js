import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>React Slingshot (Feature Based File Structure)</h1>

      <h2>Get Started</h2>
      <p>Review the <Link to="/cards">demo app</Link></p>
      <p><Link to="/badlink">Click this bad link</Link> to see the 404 page.</p>
    </div>
  );
};

export default HomePage;
