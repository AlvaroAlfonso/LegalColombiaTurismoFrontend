import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Importamos el nuevo componente Header
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import ProvisorPage from './pages/ProvisorPage';
import LoginPage from './pages/loginPage'; 
import RegisterPage from './pages/RegisterPage';
import Turist from './pages/HomeTurist';
import Informacion from './pages/InformacionTurist';
import ServiciosSeguros from "./pages/ServiciosSeguros";

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
          
          <Route path="/Turista" element={<Turist />} />
          <Route path="/informacion" element={<Informacion />} />
          <Route path="/servicios-seguros" element={<ServiciosSeguros />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;