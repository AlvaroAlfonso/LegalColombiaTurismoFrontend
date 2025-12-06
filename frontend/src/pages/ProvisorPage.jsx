import React from 'react';
import './styles/ProvisorPage.css'; // Estilos de la nueva página

function ProvisorPage() {
  return (
    <div className="provisor-page-container">
      
      {/* SECCIÓN PRINCIPAL: Banner de Bienvenida */}
      <section className="provisor-hero">
        <div className="provisor-hero-content">
          <p className="subtitle">LEGAL TURISMO COLOMBIA</p>
          <h1>¡TU NEGOCIO NECESITA ESTE SELLO DE CONFIANZA!</h1>
          <p className="description">
            Bienvenido. Como Provisor Legal, accederás a miles de turistas que solo buscan servicios transparentes,
            seguros y formales. Diferénciate de la informalidad.
          </p>
          
          <div className="provisor-cta-buttons">
            <button className="btn-provisor-primary">INICIAR SESSION</button>
            <button className="btn-provisor-secondary">QUIERO SABER MÁS</button>
          </div>
        </div>
        
        {/* IMAGEN DE LA PÁGINA */}
        <div className="provisor-hero-image">
          {/* Placeholder de la imagen que te envié */}
          <img 
            src="/Images/mapa-provisor.png" 
            alt="Mujer señalando un mapa de Colombia con sello de verificación" 
          />
        </div>
      </section>

      <section className="provisor-validation-section">
        <div className="validation-image-container">
          {/* Placeholder de la imagen de las dos personas en el portátil */}
          <img 
            src="/Images/provisor-validation.png" 
            alt="Dos personas revisando documentación en un portátil" 
          />
        </div>
        
        <div className="validation-content">
          <p className="validation-subtitle">PROCESO DE VALIDACIÓN Y ESTÁNDARES</p>
          <h2 className='titulo_final'>EL CAMINO RÁPIDO A LA LEGALIDAD Y VISIBILIDAD</h2>
          <p className="validation-description">
            Registra tu empresa directamente en nuestra plataforma. Para asegurar tu cumplimiento,
            necesitaremos la documentación legal de tu empresa y la certificación específica de los servicios turísticos
            que ofreces.
          </p>
          <button className="btn-validation-cta">
            CONOCER MAS SOBRE REGISTRAR MI EMPRESA
          </button>
        </div>
      </section>

      <section className="provisor-categories-section">
        <div className="categories-header">
          <p className="categories-subtitle">DEFINE TU OFERTA POR CATEGORÍA</p>
          <h2>CLASIFICA TU EMPRESA SEGÚN EL ESTÁNDAR LEGAL</h2>
          <p className="categories-description">
            Para que el turista te encuentre con precisión, registra tu empresa bajo las categorías oficiales de servicio que ofrecemos. Esto asegura la coherencia y el precio justo en tu perfil.
          </p>
        </div>

        <div className="categories-grid">
          
          {/* Tarjeta 1 */}
          <div className="category-card">
            <img src="/Images/iconos/icono-hospedaje.png" alt="Icono Hospedaje" className="category-icon" />
            <h3>HOSPEDAJE CERTIFICADO</h3>
          </div>
          
          {/* Tarjeta 2 */}
          <div className="category-card">
            <img src="/Images/iconos/icono-agencias.png" alt="Icono Agencias" className="category-icon" />
            <h3>AGENCIAS & TOURS</h3>
          </div>
          
          {/* Tarjeta 3 */}
          <div className="category-card">
            <img src="/Images/iconos/icono-guias.png" alt="Icono Guías" className="category-icon" />
            <h3>GUÍAS EXPERTOS</h3>
          </div>
          
          {/* Tarjeta 4 */}
          <div className="category-card">
            <img src="/Images/iconos/icono-transporte.png" alt="Icono Transporte" className="category-icon" />
            <h3>TRANSPORTE SEGURO</h3>
          </div>
          
          {/* Tarjeta 5 */}
          <div className="category-card">
            <img src="/Images/iconos/icono-aventura.png" alt="Icono Aventura" className="category-icon" />
            <h3>AVENTURA & RECREACIÓN</h3>
          </div>
          
          {/* Tarjeta 6 */}
          <div className="category-card">
            <img src="/Images/iconos/icono-salud.png" alt="Icono Salud" className="category-icon" />
            <h3>SALUD & BIENESTAR</h3>
          </div>
          
        </div>
        
        <button className="btn-explore-categories">
          EXPLORAR TODAS LAS CATEGORÍAS QUE HAY
        </button>
      </section>

      <section className="provisor-qr-section">
        
        <div className="qr-content">
          <p className="qr-subtitle">LA HERRAMIENTA DE CRECIMIENTO Y LEGALIDAD</p>
          <h2>OBTÉN TU CÓDIGO QR Y SÉ UN REFERENTE</h2>
          <p className="qr-description">
            Una vez aprobado, recibirás tu Tarjeta Digital de Legalidad y un QR único. Úsalo para inspirar confianza y
            demostrar tu compromiso con el turismo formal.
          </p>
          <button className="btn-qr-cta">
            CONOCER MÁS
          </button>
        </div>
        
        <div className="qr-image-container">
          {/* Placeholder de la imagen del teléfono con el código QR */}
          <img 
            src="/Images/provisor-qr-code.png" 
            alt="Teléfono móvil mostrando un código QR de legalidad" 
          />
        </div>
        
      </section>
      
    </div>
  );
}

export default ProvisorPage;