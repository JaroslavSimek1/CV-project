import React from 'react';
import LayoutsExamples from '../components/LayoutsExamples';
import HeaderSection from '../components/HeaderSection';

interface HomePageProps {
  isLoggedIn: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isLoggedIn }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className="diagonal-line"></div>
      <HeaderSection isLoggedIn={isLoggedIn} />
      <div style={{ background: '#e0e0e0', padding: '1rem 0', width: '100%', marginTop: '2rem',marginBottom: '5rem' }}>
        <LayoutsExamples />
      </div>
    </div>
  );
};

export default HomePage;
