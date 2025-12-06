import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css'; // Importamos el archivo de estilos CSS

// Reemplaza esta ruta con la ruta correcta de tu logo
// Nota: Si el logo está en public/, usa /logo.png. Si está en assets/, usa la importación normal.
// Por simplicidad, asumiremos que está accesible en /logo.png
const logoUrl = '/Images/logoLegalColombia.png'; 

function Header() {
  return (
    <header className="header-container">
      <div className="logo-section">
        <img src={logoUrl} alt="Legal Turismo Colombia Logo" className="logo" />
      </div>

      <nav className="nav-links">
        <a href="#turistas">Turistas</a>
        <Link to="/provisores" className="nav-link-provisores">Provisores Legales</Link>
      </nav>

      <div className="auth-buttons">
        <Link to="/iniciar-sesion" className="btn btn-primary">
            Iniciar session
        </Link>
         
        <Link to="/registrarse" className="btn btn-secondary">
        Registrate
        </Link>
        
          
      
      </div>
      
      {/* Botón de menú responsive */}
      <button className="menu-button">
        &#9776; {/* Símbolo de tres líneas (hamburguesa) */}
      </button>
    </header>
  );
}

export default Header;