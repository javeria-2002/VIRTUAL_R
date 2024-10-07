// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContactForm from './components/ContactForm'; 
import Signup from './components/SignUp'; // Adjust the path if necessary
import Login from './components/Login';   // Adjust the path if necessary
import HeroSection from './components/HeroSection';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DataFetcher from "./components/DataFetcher";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6"></div>
      <Routes>
  <Route path="/" element={
    <>
      <HeroSection />
      <ContactForm /> 
          </>}
        />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
</Routes>
      <div>
        <DataFetcher />
      </div>
    </Router>
  );
};

export default App;

