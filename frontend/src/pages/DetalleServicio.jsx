import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles/DetalleServicio.css";
import { providersApi, servicesApi } from "../api";

export default function DetalleServicio() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        const [svcRes, revRes] = await Promise.all([
          servicesApi.fetchServiceDetail(id),
          servicesApi.fetchServiceReviews(id),
        ]);
        if (!active) return;
        const svc = svcRes.data;
        setService(svc);
        setReviews(revRes.data?.results || revRes.data || []);
        if (svc?.provider_id || svc?.id_provider) {
          const providerId = svc.provider_id || svc.id_provider;
          const provRes = await providersApi.fetchProvider(providerId);
          if (active) setProvider(provRes.data);
        }
      } catch (err) {
        if (!active) return;
        setError("No pudimos cargar el servicio.");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <div className="detalle-container">Cargando servicio...</div>;
  if (error) return <div className="detalle-container">{error}</div>;
  if (!service) return null;

  const priceLabel = service.precio_servicio
    ? `$${service.precio_servicio} ${service.unidad_precio || ""}`
    : "Consultar";

  return (
    <div className="detalle-container">
      <h1 className="detalle-titulo">
        {service.titulo_card || service.nombre || "Servicio"}
      </h1>

      <section className="galeria">
        <div
          className="galeria-principal placeholder-img"
          style={{ backgroundImage: `url(${service.url_imagen_principal || ""})` }}
        ></div>

        <div className="galeria-secundaria">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="placeholder-img small"></div>
          ))}
        </div>
      </section>

      <section className="detalle-info">
        <div className="detalle-left">
          <h2 className="detalle-subtitulo">
            {service.categoria_servicio || service.categoria || "Categoría"}
          </h2>

          <p className="detalle-descripcion">
            {service.descripcion_larga || service.descripcion || service.descripcion_corta}
          </p>

          {provider && (
            <div className="anfitrion">
              <div className="avatar-placeholder"></div>
              <div>
                <strong>Anfitrión:</strong> {provider.nombre || provider.nombre_comercial}
                <div>
                  <Link to={`/prestador/${provider.id}`}>Ver perfil público</Link>
                </div>
              </div>
            </div>
          )}

          <h3 className="detalle-subtitulo">Reseñas</h3>
          {reviews.length === 0 && <p>No hay reseñas aún.</p>}
          <div className="servicios-grid">
            {reviews.map((rev) => (
              <div key={rev.id || rev.pk} className="servicio-item">
                <strong>{rev.puntuacion_general}/5</strong>
                <p>{rev.comentario || rev.feedback_empresa}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="detalle-right">
          <div className="precio-box">
            <h2>{priceLabel}</h2>
            <p>{service.ciudad || service.ubicacion || ""}</p>
            <button className="btn-reservar">Reservar</button>
          </div>

          {provider && (
            <Link className="btn-verperfil" to={`/prestador/${provider.id}`}>
              Ver perfil del prestador
            </Link>
          )}

          <a className="btn-calificar" href="#reseñas">
            Calificar servicio
          </a>

          <Link className="btn-reportar" to="/dashboard-turista">
            Reportar denuncias
          </Link>
        </div>
      </section>
    </div>
  );
}
