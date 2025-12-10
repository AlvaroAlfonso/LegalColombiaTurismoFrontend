import "./styles/DashboardTurista.css";

export default function DashboardTurista() {
  return (
    <div className="dashboard-container">

      {/* Buscador */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Buscador..."
          className="search-input"
        />
      </section>

      <div className="content-wrapper">
        
        {/* Columna izquierda - Categorías */}
        <aside className="categories">
          <div className="category-group">
            <h3>Alojamiento y hospedaje</h3>
            <ul>
              <li>Hoteles</li>
              <li>Hostales</li>
              <li>Apartamentos turísticos</li>
              <li>Glamping & Campamentos</li>
            </ul>
          </div>

          <div className="category-group">
            <h3>Logística: Intermediación y Organización</h3>
            <ul>
              <li>Agencias y paquetes</li>
              <li>Agencias operadoras (Paquetes)</li>
              <li>Agencias Mayoristas</li>
              <li>Oficinas de Representación Turísticas</li>
            </ul>
          </div>
        </aside>

        {/* Grid dinámico de servicios */}
        <section className="services-grid">

          {/* Placeholder dinámico (sin datos quemados) */}
          {[...Array(9)].map((_, i) => (
            <div key={i} className="service-card placeholder">
              <div className="img-placeholder"></div>
              <div className="text-placeholder"></div>
              <div className="text-placeholder short"></div>
            </div>
          ))}

        </section>
      </div>
    </div>
  );
}
