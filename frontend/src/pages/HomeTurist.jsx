import "./styles/HomeTurist.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <h4>LEGAL TURISMO COLOMBIA</h4>
          <h1>
            CERO SORPRESAS <br />
            VIAJA 100% LEGAL
          </h1>
          <p>
            Olvídate de las sorpresas. Hemos llegado para eliminar los sobrecargos
            y la informalidad. Disfruta del País de la Belleza con la tranquilidad
            que mereces.
          </p>

          <div className="hero-buttons">
            <button className="btn-orange">INICIAR SESIÓN</button>

            {/* 🔥 AQUÍ VA EL CAMBIO */}
            <button
              className="btn-dark"
              onClick={() => navigate("/informacion")}
            >
              QUIERO SABER MÁS
            </button>
          </div>
        </div>

        <img
          src="/Images/Turismo.png"
          className="hero-img"
        />
      </section>

      {/* QR SECTION */}
      <section className="qr-section">
        <img
          src="/Images/ImgQR.png"
          className="qr-img"
        />

        <div className="qr-right">
          <h4>OLVÍDATE DE LOS RIESGOS OCULTOS</h4>
          <h2>PRECIOS JUSTOS Y VERIFICACIÓN AL INSTANTE</h2>
          <p>
            Consulta tarifas estandarizadas antes de pagar. Usa nuestro escáner QR
            para confirmar que el Proveedor Legal tiene RNT activo y cumple con la ley.
          </p>

          <button className="btn-orange" onClick={() => navigate("/servicios-seguros")}>DESCUBRIR SERVICIOS SEGUROS</button>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="categories">
        <h4>SERVICIOS LEGALES Y CERTIFICADOS</h4>
        <h2>
          EXPLORA SERVICIOS CERTIFICADOS <br /> TU VIAJE, 100% LEGAL
        </h2>

        <p className="categories-description">
          Explora la red más grande de Proveedores Legales en Colombia. Selecciona una categoría para empezar a viajar con garantía de precio justo y seguridad.
        </p>

        <div className="categories-grid">
          <div className="category-card">
            <img src="/Images/Icon1.png" />
            <p>HOSPEDAJE CERTIFICADO</p>
          </div>

          <div className="category-card">
            <img src="/Images/Icon2.png" />
            <p>AGENCIAS & TOURS</p>
          </div>

          <div className="category-card">
            <img src="/Images/Icon3.png" />
            <p>GUÍAS EXPERTOS</p>
          </div>

          <div className="category-card">
            <img src="/Images/Icon4.png" />
            <p>TRANSPORTE SEGURO</p>
          </div>

          <div className="category-card">
            <img src="/Images/Icon5.png" />
            <p>AVENTURA & RECREACIÓN</p>
          </div>

          <div className="category-card">
            <img src="/Images/Icon6.png" />
            <p>SALUD & BIENESTAR</p>
          </div>
        </div>

        <button className="btn-dark categories-btn">
          EXPLORAR TODOS LOS SERVICIOS VERIFICADOS
        </button>
      </section>

      {/* PRECIOS JUSTOS */}
      <section className="pricing">
        <div className="pricing-left">
          <h4>PRECIOS ESTANDARIZADOS Y JUSTOS</h4>
          <h2>GARANTÍA DE PRECIO JUSTO Y ESTANDARIZADO</h2>

          <p>
            Para asegurar que nunca te cobren de más y que el precio sea el mismo para todos, aplicamos una Cuota de Estándar de Precio Justo.
          </p>

          <p><b>Turistas Internacionales:</b> Hasta 40%.</p>
          <p><b>Turistas Nacionales:</b> Hasta 15%.</p>

          <div className="pricing-buttons">
            <button className="btn-orange">REGISTRARSE</button>
            <button className="btn-dark">QUIERO SABER MÁS</button>
          </div>
        </div>

        <img
          src="/Images/Garant.png"
          className="pricing-img"
        />
      </section>

      {/* CALIFICA Y REPORTA */}
      <section className="review-section">
        <img
          src="/Images/Califica.png"
          className="review-img"
        />

        <div className="review-right">
          <h4>OLVÍDATE DE LOS RIESGOS OCULTOS</h4>
          <h2>CALIFICA, COMENTA Y REPORTA</h2>

          <p>
            Consulta tarifas estandarizadas antes de pagar. Usa nuestro escáner QR
            para confirmar que el Proveedor Legal tiene RNT activo y cumple con la ley.
          </p>

          <button className="btn-orange">APRENDER A REPORTAR FRAUDE</button>
        </div>
      </section>

    
    </div>
  );
}
