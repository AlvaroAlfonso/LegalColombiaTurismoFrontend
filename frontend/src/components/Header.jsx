import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';

const logoUrl = '/Images/logoLegalColombia.png';

function Header() {
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
        <Link to="/iniciar-sesion" className="btn btn-primary">
          Iniciar sesión
        </Link>
         
        <Link to="/registrarse" className="btn btn-secondary">
          Registrarse
        </Link>
      </div>
      
      {/* Botón de menú responsive */}
      <button className="menu-button">
        &#9776;
      </button>
    </header>
  );
}

export default Header;
