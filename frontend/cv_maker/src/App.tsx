import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import './App.css';
import AuthPage from './pages/AuthPage';
import CvPage from './pages/CvPage';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },
});

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/auth" element={<AuthPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn}/>} />
          <Route path="/cv" element={<CvPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer/>
      </Router>
    </ThemeProvider>
  );
};

export default App;
