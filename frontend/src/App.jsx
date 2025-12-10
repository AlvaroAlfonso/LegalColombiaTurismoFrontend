import React, { useState } from 'react';
import {  useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Importamos el nuevo componente Header
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import ProvisorPage from './pages/ProvisorPage';
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage';

import ProviderDashboard from './pages/ProviderDashboard';
import CompanyDashboard from './pages/CompanyDashboard';

import Turist from './pages/HomeTurist';
import Informacion from './pages/InformacionTurist';
import ServiciosSeguros from "./pages/ServiciosSeguros";
import DashboardTurista from "./pages/DashboardTurista";
import DetalleServicio from "./pages/DetalleServicio";
import ProviderPublicProfile from "./pages/ProviderPublicProfile";
import ProtectedRoute from './components/ProtectedRoute';



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
          <Route
            path="/dashboard-empresa"
            element={
              <ProtectedRoute allowedRoles={['empresa']}>
                <CompanyDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard-proveedor"
            element={
              <ProtectedRoute allowedRoles={['prestador_servicio', 'prestador', 'empresa']}>
                <ProviderDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route path="/Turista" element={<Turist />} />
          <Route path="/informacion" element={<Informacion />} />
          <Route path="/servicios-seguros" element={<ServiciosSeguros />} />
          <Route
            path="/dashboard-turista"
            element={
              <ProtectedRoute allowedRoles={['turista']}>
                <DashboardTurista />
              </ProtectedRoute>
            }
          />
          <Route path="/servicio/:id" element={<DetalleServicio />} />
          <Route path="/prestador/:providerId" element={<ProviderPublicProfile />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;