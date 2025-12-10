import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { providersApi } from '../api';
import './styles/ServiciosSeguros.css';

export default function ProviderPublicProfile() {
  const { providerId } = useParams();
  const [provider, setProvider] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const [providerRes, certsRes, servicesRes] = await Promise.all([
          providersApi.fetchProvider(providerId),
          providersApi.fetchProviderCertificates(providerId),
          providersApi.fetchProviderServices(providerId),
        ]);
        if (!active) return;
        setProvider(providerRes.data);
        setCertificates(certsRes.data?.results || certsRes.data || []);
        setServices(servicesRes.data?.results || servicesRes.data || []);
      } catch (err) {
        if (!active) return;
        setError('No pudimos cargar la información del prestador.');
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchData();
    return () => {
      active = false;
    };
  }, [providerId]);

  if (loading) return <div className="servicios-container">Cargando perfil del prestador...</div>;
  if (error) return <div className="servicios-container">{error}</div>;
  if (!provider) return null;

  return (
    <div className="servicios-container">
      <h1 className="titulo-principal">
        {provider.nombre_empresa || provider.nombre_comercial || provider.nombre}
        <br />
        <span>Perfil público del prestador</span>
      </h1>

      <div className="modulo">
        <div className="modulo-texto">
          <h2>Información general</h2>
          <p>{provider.descripcion || 'El prestador aún no ha agregado una descripción.'}</p>
          <p><strong>Ciudad:</strong> {provider.ciudad || provider.municipioTrabajo || 'No especificada'}</p>
          <p><strong>Contacto:</strong> {provider.email || provider.contacto || 'No disponible'}</p>
        </div>
      </div>

      <div className="modulo">
        <div className="modulo-texto">
          <h2>Certificados y sellos de calidad</h2>
          {certificates.length === 0 && <p>El prestador aún no ha publicado certificados.</p>}
          <ul>
            {certificates.map((cert) => (
              <li key={cert.id || cert.nombre}>
                <strong>{cert.nombre || cert.titulo}</strong>
                {cert.estado && <span> — Estado: {cert.estado}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="modulo">
        <div className="modulo-texto">
          <h2>Servicios ofertados</h2>
          {services.length === 0 && <p>No hay servicios publicados aún.</p>}
          <div className="categories-grid">
            {services.map((svc) => (
              <div key={svc.id || svc.id_registro_oferta} className="category-card">
                <h3>{svc.titulo_card || svc.nombre}</h3>
                <p>{svc.descripcion_corta || svc.descripcion}</p>
                <p><strong>Precio:</strong> {svc.precio_servicio ? `$${svc.precio_servicio}` : 'Consultar'}</p>
                <Link to={`/servicio/${svc.id || svc.id_registro_oferta}`} className="btn-dark" style={{ display: 'inline-block', marginTop: 10 }}>
                  Ver servicio
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

