import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Header.css';
import { useAuth } from '../context/AuthContext';

const logoUrl = '/Images/logoLegalColombia.png';

function Header() {
  const { isAuthenticated, logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header-container">
      <div className="logo-section">
        <Link to="/">
          <img src={logoUrl} alt="Legal Turismo Colombia Logo" className="logo" />
        </Link>
      </div>

      <nav className="nav-links">
        {/* 🔥 Enlace correcto hacia la página del Turista */}
        <Link to="/Turista" className="nav-link">Turistas</Link>

        {/* Enlace hacia la página Provisores */}
        <Link to="/provisores" className="nav-link-provisores">
          Provisores Legales
        </Link>
      </nav>

      <div className="auth-buttons">
        {isAuthenticated ? (
          <>
            {role === 'turista' && <Link to="/dashboard-turista" className="btn btn-primary">Mi panel</Link>}
            {(role === 'empresa') && <Link to="/dashboard-empresa" className="btn btn-primary">Panel Empresa</Link>}
            {(role === 'prestador' || role === 'prestador_servicio') && <Link to="/dashboard-proveedor" className="btn btn-primary">Panel Prestador</Link>}
            <button onClick={handleLogout} className="btn btn-secondary">Salir</button>
          </>
        ) : (
          <>
            <Link to="/iniciar-sesion" className="btn btn-primary">
              Iniciar sesión
            </Link>
             
            <Link to="/registrarse" className="btn btn-secondary">
              Registrarse
            </Link>
          </>
        )}
      </div>
      
      {/* Botón de menú responsive */}
      <button className="menu-button">
        &#9776;
      </button>
    </header>
  );
}

export default Header;
