import { useParams } from "react-router-dom";
import "./styles/DetalleServicio.css";

export default function DetalleServicio() {
  const { id } = useParams();

  return (
    <div className="detalle-container">

      {/* TITULO */}
      <h1 className="detalle-titulo">
        {/* Placeholder del título */}
        Confort moderno: aire acondicionado, wifi, ubicación privilegiada
      </h1>

      {/* GALERIA */}
      <section className="galeria">
        <div className="galeria-principal placeholder-img"></div>

        <div className="galeria-secundaria">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="placeholder-img small"></div>
          ))}
        </div>
      </section>

      {/* INFORMACION PRINCIPAL */}
      <section className="detalle-info">

        {/* Columna izquierda */}
        <div className="detalle-left">
          <h2 className="detalle-subtitulo">
            Alojamiento entero · Vivienda en ubicación desconocida  
          </h2>

          <p className="detalle-descripcion placeholder-text">
            Descripción del servicio, información general y detalles...
          </p>

          {/* ANFITRION */}
          <div className="anfitrion">
            <div className="avatar-placeholder"></div>
            <div>
              <strong>Anfitrión:</strong> Nombre del Prestador
            </div>
          </div>

          {/* LO QUE OFRECE */}
          <h3 className="detalle-subtitulo">Lo que este lugar ofrece</h3>

          <div className="servicios-grid">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="servicio-item placeholder-text"></div>
            ))}
          </div>

          <button className="btn-secundario">Mostrar todos los servicios</button>
        </div>

        {/* Columna derecha */}
        <div className="detalle-right">
          <div className="precio-box">
            <h2>$000.000</h2>
            <p>POR X NOCHES</p>

            <div className="fecha-picker">
              <div className="picker-box">Llegada</div>
              <div className="picker-box">Salida</div>
            </div>

            <div className="picker-box">Huéspedes</div>

            <button className="btn-reservar">Reservar</button>
          </div>

          <button className="btn-verperfil">
            Ver perfil del prestador
          </button>

          <button className="btn-calificar">Calificar servicio</button>

          <button className="btn-reportar">Reportar denuncias</button>
        </div>
      </section>
    </div>
  );
}
