import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/DashboardTurista.css";
import { authApi, reportsApi, servicesApi } from "../api";

const CATEGORY_OPTIONS = [
  { value: "", label: "Todas" },
  { value: "Hospedaje", label: "Hospedaje" },
  { value: "Tours", label: "Tours" },
  { value: "Guias", label: "Guías" },
  { value: "Transporte", label: "Transporte" },
  { value: "Aventura", label: "Aventura" },
  { value: "Salud", label: "Salud" },
];

export default function DashboardTurista() {
  const [filters, setFilters] = useState({
    q: "",
    category: "",
    city: "",
    minPrice: "",
    maxPrice: "",
  });
  const [services, setServices] = useState([]);
  const [profile, setProfile] = useState(null);
  const [reports, setReports] = useState([]);
  const [reportForm, setReportForm] = useState({ serviceId: "", description: "", evidence: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const queryParams = useMemo(() => {
    const params = {};
    if (filters.q) params.search = filters.q;
    if (filters.category) params.category = filters.category;
    if (filters.city) params.city = filters.city;
    if (filters.minPrice) params.min_price = filters.minPrice;
    if (filters.maxPrice) params.max_price = filters.maxPrice;
    return params;
  }, [filters]);

  const handleReportChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setReportForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setReportForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('service_id', reportForm.serviceId);
    fd.append('description', reportForm.description);
    if (reportForm.evidence) fd.append('evidence', reportForm.evidence);
    try {
      setReportLoading(true);
      const { data } = await reportsApi.createReport(fd);
      setReports((prev) => [data, ...prev]);
      setReportForm({ serviceId: "", description: "", evidence: null });
    } catch (err) {
      setError('No pudimos enviar la denuncia.');
    } finally {
      setReportLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await servicesApi.fetchServices(queryParams);
        if (!active) return;
        const results = data.results || data;
        setServices(results);
      } catch (err) {
        if (!active) return;
        setError("No pudimos cargar los servicios. Intenta de nuevo.");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [queryParams]);

  useEffect(() => {
    let active = true;
    const loadPrivate = async () => {
      try {
        const [profileRes, reportsRes] = await Promise.all([
          authApi.getProfile(),
          reportsApi.fetchMyReports(),
        ]);
        if (!active) return;
        setProfile(profileRes.data);
        setReports(reportsRes.data?.results || reportsRes.data || []);
      } catch (err) {
        // silencio: algunas vistas públicas no requieren sesión
      }
    };
    loadPrivate();
    return () => { active = false; };
  }, []);

  return (
    <div className="dashboard-container">
      <section className="search-section">
        <input
          type="text"
          placeholder="Buscar destinos, servicios o categorías"
          className="search-input"
          name="q"
          value={filters.q}
          onChange={handleChange}
        />
        <div className="filters-row">
          <select name="category" value={filters.category} onChange={handleChange}>
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <input
            type="text"
            name="city"
            placeholder="Ciudad"
            value={filters.city}
            onChange={handleChange}
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Precio mín"
            value={filters.minPrice}
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Precio máx"
            value={filters.maxPrice}
            onChange={handleChange}
          />
        </div>
      </section>

      <div className="content-wrapper">
        <aside className="categories">
          <div className="category-group">
            <h3>Filtros rápidos</h3>
            <ul>
              {CATEGORY_OPTIONS.filter((c) => c.value).map((cat) => (
                <li key={cat.value}>
                  <button
                    type="button"
                    className="linklike"
                    onClick={() => setFilters((prev) => ({ ...prev, category: cat.value }))}
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="services-grid">
          {loading && <p>Cargando servicios...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && services.length === 0 && <p>No encontramos servicios con esos filtros.</p>}
          {services.map((svc) => (
            <div key={svc.id || svc.id_registro_oferta} className="service-card">
              <div className="img-placeholder" style={{ backgroundImage: `url(${svc.url_imagen_principal || ''})` }}></div>
              <h4>{svc.titulo_card || svc.nombre}</h4>
              <p>{svc.descripcion_corta || svc.descripcion}</p>
              <p className="price">
                {svc.precio_servicio ? `$${svc.precio_servicio} ${svc.unidad_precio || ''}` : 'Consultar'}
              </p>
              <Link to={`/servicio/${svc.id || svc.id_registro_oferta}`} className="btn-view">
                Ver detalle
              </Link>
            </div>
          ))}
        </section>

        <section className="services-grid">
          {profile && (
            <div className="service-card">
              <h3>Mi perfil</h3>
              <p><strong>Nombre:</strong> {profile.nombre} {profile.apellido}</p>
              <p><strong>Email:</strong> {profile.email}</p>
            </div>
          )}

          <div className="service-card">
            <h3>Crear denuncia / reporte</h3>
            <form onSubmit={handleReportSubmit} className="report-form">
              <input
                type="text"
                name="serviceId"
                placeholder="ID del servicio o prestador"
                value={reportForm.serviceId}
                onChange={handleReportChange}
                required
              />
              <textarea
                name="description"
                placeholder="Describe el incidente"
                value={reportForm.description}
                onChange={handleReportChange}
                required
              />
              <input type="file" name="evidence" onChange={handleReportChange} />
              <button type="submit" disabled={reportLoading}>
                {reportLoading ? 'Enviando...' : 'Enviar reporte'}
              </button>
            </form>
          </div>

          <div className="service-card">
            <h3>Mis denuncias</h3>
            {reports.length === 0 && <p>No tienes reportes aún.</p>}
            <ul>
              {reports.map((rep) => (
                <li key={rep.id || rep.pk}>
                  <strong>#{rep.id || rep.pk}</strong> — {rep.description || rep.descripcion} ({rep.status || rep.estado || 'pendiente'})
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
