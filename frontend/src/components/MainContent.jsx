import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/MainContent.css'; // Todos los estilos combinados irán aquí


const TuristaContent = () => (
  <div className="role-specific-content turista-content">
    <h3>✅ Servicios Clave para Turistas</h3>
    <ul>
      <li> Contacto Legal Inmediata 24/7 en caso de emergencias </li>
      <li> Verificación de Proveedores turísticos (Hoteles, Taxis, Tours) </li>
      <li> Formulario para publicar fraude o algun problema durante el turismo</li>
    </ul>
    <button className="cta-button-small btn-turista">Ver Asistencia</button>
  </div>
);

const ProveedorContent = () => (
  <div className="role-specific-content proveedor-content">
    <h3>💼 Beneficios para Proveedores Legales</h3>
    <ul>
      <li> Publicacion del servicio turistico que ofrece</li>
      <li> Contacto de clientes turisticos</li>
      <li> Feedback sobre el servicio que ofrece</li>
    </ul>
    <button className="cta-button-small btn-proveedor">Registra tu Servicio</button>
  </div>
);

function MainContent() {
const [activeRole, setActiveRole] = useState('turista');
const navigate = useNavigate();

  return (
    <main className="main-content">
      
      {/* ======================== 1. HERO SECTION (Banner Principal) ======================== */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">Legal Turismo Colombia</p>
          <h1>Viaja con confianza. Contrata sólo servicios certificados.</h1>
          <p className="hero-sub">
            Encuentra, verifica y reserva servicios turísticos 100% legales. Tarifas claras, proveedores validados y soporte inmediato.
          </p>
          <div className="hero-cta-group">
            <button className="cta-button" onClick={() => navigate('/dashboard-turista')}>
              Explorar servicios
            </button>
            <button className="cta-button ghost" onClick={() => navigate('/registrarse')}>
              Registrar proveedor
            </button>
          </div>
          <div className="hero-badges">
            <span>✓ Verificación RNT</span>
            <span>✓ Precios estandarizados</span>
            <span>✓ Soporte 24/7</span>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="stat-card">
          <h3>5k+</h3>
          <p>Turistas protegidos</p>
        </div>
        <div className="stat-card">
          <h3>1.2k</h3>
          <p>Proveedores validados</p>
        </div>
        <div className="stat-card">
          <h3>98%</h3>
          <p>Casos resueltos con soporte</p>
        </div>
      </section>

      {/* ======================== 2. ROLE SELECTOR SECTION (Alternancia Turista/Proveedor) ======================== */}
      <section className="role-selector-section">
        <h2>¿Qué perfil te interesa?</h2>
        <div className="selector-tabs">
          <button 
            className={`tab tab-turista ${activeRole === 'turista' ? 'active' : ''}`}
            onClick={() => setActiveRole('turista')}
          >
            Soy Turista
          </button>
          <button 
            className={`tab tab-proveedor ${activeRole === 'proveedor' ? 'active' : ''}`}
            onClick={() => setActiveRole('proveedor')}
          >
            Soy Proveedor Legal
          </button>
        </div>
        {/* Contenido de Alternancia: Se muestra según el estado 'activeRole' */}
        <div className="role-content-display">
          {activeRole === 'turista' ? <TuristaContent /> : <ProveedorContent />}
        </div>
      </section>

      {/* Nueva sección: Pasos rápidos */}
      <section className="steps-section">
        <div className="steps-left">
          <p className="eyebrow">Cómo funciona</p>
          <h2>En 3 pasos validas y reservas sin sorpresas</h2>
          <p className="steps-desc">Centralizamos la validación legal, precios estandarizados y comunicación segura entre turista y proveedor.</p>
          <button className="cta-button" onClick={() => navigate('/servicios-seguros')}>Ver detalles</button>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">1</span>
            <h3>Busca y filtra</h3>
            <p>Selecciona ciudad, categoría y rango de precios. Solo verás proveedores validados.</p>
          </div>
          <div className="step-card">
            <span className="step-number">2</span>
            <h3>Verifica legalidad</h3>
            <p>Consulta RNT, certificados y tarifas antes de contratar o reservar.</p>
          </div>
          <div className="step-card">
            <span className="step-number">3</span>
            <h3>Reserva con soporte</h3>
            <p>Conecta con el proveedor y recibe soporte 24/7 ante cualquier incidente.</p>
          </div>
        </div>
      </section>

      {/* ======================== 3. FEATURES SECTION (Características y Beneficios) ======================== */}
      <section className="features-section">
        <h2>Servicios Clave para tu Tranquilidad</h2>
        <div className="feature-cards-container">
          
          <div className="feature-card">
            <img src="/Images/icono-asistencia.png" alt="Icono Asistencia" className="feature-icon" /> {/* Placeholder 1x1 */}
            <h3>Asistencia Inmediata 24/7</h3>
            <p>Accede a una red de servicios certificados en turismo en cualquier momento y lugar de Colombia.</p>
          </div>
          
          <div className="feature-card">
            <img src="/Images/icono-verificacion.png" alt="Icono Verificación" className="feature-icon" /> {/* Placeholder 1x1 */}
            <h3>Verificación Legal Rigurosa</h3>
            <p>Todos nuestros provisores están certificados y validados para tu total tranquilidad y seguridad jurídica.</p>
          </div>
          
          <div className="feature-card">
            <img src="/Images/icono-expertos.png" alt="Icono Especialización" className="feature-icon" /> {/* Placeholder 1x1 */}
            <h3>Expertos en Turismo</h3>
            <p>Encuentra profesionales con conocimientos trusiticos para que tu experiencia sea la mejor</p>
          </div>

        </div>
      </section>

      {/* ======================== 4. NUEVA SECCIÓN: TESTIMONIOS (Ejemplo de otra sección) ======================== */}
      <section className="testimonials-section">
        <h2>Lo que dicen nuestros usuarios</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"¡Un servicio invaluable! Mis vacaciones en Colombia fueron las mejores. Zero sobrecostos y todo verificado."</p>
            <img  className="image_user" src="/Images/persona1.jpeg" alt="persona_Maria_Turista" />
            <p className="testimonial-author">María G. · Turista</p>
          </div>
          <div className="testimonial-card">
            <p>"Certifiqué mi empresa y en semanas empezaron a contactarme. El QR genera mucha confianza."</p>
            <img className="image_user" src="/Images/persona2.jpeg" alt="persona_Juan_Provisor" />
            <p className="testimonial-author">Juan R. · Proveedor</p>
          </div>
        </div>
      </section>
      
    </main>
  );
}

export default MainContent;