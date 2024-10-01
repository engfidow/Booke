import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OurBooks from './pages/OurBooks';
import Contact from './pages/Contact';
import Navbar from './components/navbar';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';


const App = () => {
  return (
    <Router>
      <Navbar /> This will be displayed on all pages
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<OurBooks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
