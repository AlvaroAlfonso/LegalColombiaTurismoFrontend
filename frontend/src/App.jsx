import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Importamos el nuevo componente Header
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import ProvisorPage from './pages/ProvisorPage';
import LoginPage from './pages/loginPage'; 
import RegisterPage from './pages/RegisterPage';

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
          
          {/* Ruta de Inicio (Index): Muestra MainContent + Footer */}
          <Route path="/" element={<HomePage />} />
          {/* Ruta de Provisores Legales: Muestra la nueva página */}
          <Route path="/provisores" element={<ProvisorPage />} />
          {/* Puedes añadir más rutas aquí (ej. /login, /turistas) */}
          
          <Route path="/iniciar-sesion" element={<LoginPage />} />

          <Route path="/registrarse" element={<RegisterPage />} />
          
        </Routes>
      </div>
      <Footer />
    </Router>
    
  );
}

export default App;