import React from 'react';
import './styles/Footer.css'; // Lo crearemos a continuación

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-section about">
        <h3>Legal Turismo Colombia</h3>
        <img className = "logo_turismo" src="/Images/logoLegalColombia.png" alt="Logo-LegalTurismo" srcset="" />
        <p>Conectamos turistas con asistencia legal especializada para un viaje seguro y tranquilo.</p>
      </div>

      <div className="footer-section links">
        <h3>Enlaces Rápidos</h3>
        <ul>
          <li><a href="#turistas">Turistas</a></li>
          <li><a href="#proveedores">Proveedores Legales</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </div>

      <div className="footer-section contact">
        <h3>Síguenos</h3>
        <p>Redes Sociales</p>
        {/* Aquí irían íconos de redes sociales */}
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Legal Turismo Colombia. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;