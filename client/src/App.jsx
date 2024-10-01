import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OurBooks from './pages/OurBooks';
import Contact from './pages/Contact';
import Navbar from './components/navbar';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthAwareNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<OurBooks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// Show navbar only if the user is not on login/register pages
const AuthAwareNavbar = () => {
  const { user } = useAuth();
  const currentPath = window.location.pathname;

  if (currentPath === '/login' || currentPath === '/register') {
    return null;
  }

  return <Navbar user={user} />;
};

export default App;
