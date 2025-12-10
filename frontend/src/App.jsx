import React, { useState } from 'react';
import {  useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Importamos el nuevo componente Header
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import ProvisorPage from './pages/ProvisorPage';
import LoginPage from './pages/loginPage'; 
import RegisterPage from './pages/RegisterPage';
import ProviderDashboard from './pages/ProviderDashboard';
import CompanyDashboard from './pages/CompanyDashboard';

import './App.css'

// Componente para la página de Inicio (Index)
const HomePage = () => (
  <>
    <MainContent />
    
  </>
);


function App() {
  return (
    <Router> 
      <div className="App">
        <Header /> 
        
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/provisores" element={<ProvisorPage />} />
          <Route path="/iniciar-sesion" element={<LoginPage />} />
          <Route path="/registrarse" element={<RegisterPage />} />
          <Route path="/dashboard-empresa" element={<CompanyDashboard />} />
          <Route path="/dashboard-proveedor" element={<ProviderDashboard />}
          
         
          />
          
        </Routes>
      </div>
      <Footer />
    </Router>
    
  );
}

export default App;