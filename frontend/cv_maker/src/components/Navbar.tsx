import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

interface NavbarProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, handleLogout }) => {
  const theme = useTheme();

  return (
    <nav className="navbar" style={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>CvMaker</Link>
      </div>
      <div className="right">
        {isLoggedIn ? (
            <Link to="/" onClick={handleLogout} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>Logout</Link>
        ) : (
          <Link to="/auth" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;