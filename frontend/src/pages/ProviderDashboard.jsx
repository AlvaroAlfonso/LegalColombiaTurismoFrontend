// src/pages/ProviderDashboard.jsx (CÓDIGO COMPLETO Y CORREGIDO)

import React, { useEffect, useState } from 'react';
import './styles/ProviderDashboard.css';

// 🚨 IMPORTAR COMPONENTES NECESARIOS 🚨
import ServiceForm from '../components/ServiceForm'; 
import ProfileEditForm from '../components/ProfileEditForm'; 
import { authApi, servicesApi } from '../api';
import { useAuth } from '../context/AuthContext';

// -----------------------------
// FUNCIÓN AUXILIAR: Renderiza estrellas para la puntuación
// -----------------------------
const StarRating = ({ score }) => {
    const totalStars = 5;
    const filledStars = '⭐'.repeat(score);
    const emptyStars = '☆'.repeat(totalStars - score);
    return <span>{filledStars}{emptyStars} ({score}/5)</span>;
};

// -----------------------------
// COMPONENTE AUXILIAR: Elemento de Servicio Editable (CON BOTÓN ELIMINAR)
// -----------------------------
// Nota: Usamos campos simulados para el Dashboard basados en la tabla card_servicio_venta
const ServiceItem = ({ service, onEdit, onDelete }) => (
    <div className="service-item" style={{ 
        border: '1px solid #e0e0e0', 
        padding: '15px', 
        marginBottom: '10px', 
        borderRadius: '5px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: '#fff'
    }}>
        <div>
            {/* Usamos el TITULO_CARD para mostrar el nombre */}
            <h4>{service.titulo_card}</h4>
            <p>Categoría: {service.categoria_servicio}</p>
            {/* El precio se muestra asumiendo que el valor numérico está en precio_servicio (simulado) y unidad_precio (texto) */}
            <p>
                Precio: ${service.precio_servicio ? service.precio_servicio.toLocaleString('es-CO') : 'N/A'} ({service.unidad_precio})
            </p>
            <p style={{ fontSize: '0.9em', color: '#666' }}>ID: {service.id_registro_oferta}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
            <button 
                className="btn-edit-service"
                onClick={() => onEdit(service)} 
                style={{ padding: '8px 15px', backgroundColor: '#3f51b5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                ✏️ Editar
            </button>
            <button 
                className="btn-delete-service"
                onClick={() => onDelete(service)}
                style={{ padding: '8px 15px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                🗑️ Eliminar
            </button>
        </div>
    </div>
);


// -----------------------------
// COMPONENTE AUXILIAR para mejorar el estilo de la etiqueta de campo
// -----------------------------
const ProfileField = ({ label, children }) => (
    <div>
        <label style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '3px', fontSize: '0.9em' }}>
            {label}
        </label>
        <p style={{ margin: 0, padding: '5px 0', borderBottom: '1px dotted #ccc' }}>
            {children}
        </p>
    </div>
);

// -----------------------------
// COMPONENTE AUXILIAR para el estado de los documentos
// -----------------------------
const DocumentStatus = ({ label, status }) => {
    const isLoaded = !!status;
    const color = isLoaded ? '#004d40' : '#d32f2f'; // Verde oscuro para cargado, Rojo para pendiente
    const statusText = isLoaded ? 'Cargado' : 'Pendiente';
    
    return (
        <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '250px', fontWeight: 'bold', marginRight: '10px' }}>{label}:</span>
            <span style={{ color: color, fontWeight: 'bold' }}>
                {isLoaded ? '✅' : '❌'} {statusText}
            </span>
        </li>
    );
};


// -----------------------------
// COMPONENTE 1: VISTA DE PERFIL (MEJORADA VISUALMENTE)
// -----------------------------
const ProfileView = ({ providerData, onEditClick }) => (
    <div className="dashboard-content-box">
        
        {/* === SECCIÓN DE DATOS PERSONALES (Formato Grid Mejorado) === */}
        <h3 style={{ borderBottom: '2px solid #004d40', paddingBottom: '10px' }}>
            👤 Mis Datos Personales
        </h3>
        
        <div 
            style={{ 
                marginBottom: '30px', 
                padding: '20px', 
                border: '1px solid #e0e0e0', 
                borderRadius: '8px', 
                backgroundColor: '#f5f5f5',
                // Estilo de cuadrícula (Grid) para mejor alineación
                display: 'grid',
                gridTemplateColumns: '1fr 1fr', // Dos columnas de igual tamaño
                gap: '15px 30px' // Separación vertical y horizontal
            }}
        >
            {/* Fila 1 */}
            <ProfileField label="Nombre Completo">
                {providerData.nombre} {providerData.apellido}
            </ProfileField>
            <ProfileField label="Email de Contacto">
                {providerData.email}
            </ProfileField>

            {/* Fila 2 */}
            <ProfileField label="Tipo / Núm. Identificación">
                **{providerData.tipoIdentificacion}**: {providerData.numIdentificacion}
            </ProfileField>
            <ProfileField label="Teléfono">
                {providerData.numeroTelefonico}
            </ProfileField>
            
            {/* Fila 3 */}
            <ProfileField label="Municipio de Trabajo">
                {providerData.municipioTrabajo}
            </ProfileField>
            <ProfileField label="Afiliado a Seguridad Social">
                <span style={{ fontWeight: 'bold', color: providerData.afiliadoSeguridadSocial === 'si' ? '#004d40' : '#d32f2f' }}>
                    {providerData.afiliadoSeguridadSocial === 'si' ? '✅ Sí' : '❌ No'}
                </span>
            </ProfileField>
        </div>

        {/* === SECCIÓN DE DOCUMENTACIÓN === */}
        <h3 style={{ borderBottom: '2px solid #004d40', paddingBottom: '10px', marginTop: '30px' }}>
            📁 Documentación Legal
        </h3>
        <p>
            Revisa el estado de tus documentos. Recuerda que todos deben estar **Cargados** para la activación de tus servicios.
        </p>
        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            <DocumentStatus label="Documento de Identificación (fotoDocumento)" status={providerData.fotoDocumento} />
            <DocumentStatus label="RUT (fotoRut)" status={providerData.fotoRut} />
            <DocumentStatus label="Matrícula Comerciante (fotoMatriculaComerciante)" status={providerData.fotoMatriculaComerciante} />
            <DocumentStatus label="Permiso de Alcaldía (fotoPermisoAlcaldia)" status={providerData.fotoPermisoAlcaldia} />
        </ul>
        <button 
            className="btn-manage-docs" 
            onClick={onEditClick} 
            style={{ marginTop: '20px', backgroundColor: '#3f51b5', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
        >
            ✏️ Gestionar Documentos y Datos
        </button>
    </div>
);


// -----------------------------
// COMPONENTE 2: VISTA DE SERVICIOS 
// -----------------------------
const ServicesView = ({ setActiveView, servicesList, onEditService, onDeleteService }) => {
    return (
        <div className="dashboard-content-box">
            <h3>🗺️ Mis Servicios ({servicesList.length})</h3>
            
            <button 
                className="btn-primary-action"
                onClick={() => setActiveView('add_service')} 
                style={{marginBottom: '20px', backgroundColor: '#4caf50', color: 'white'}}
            >
                ➕ Agregar Nuevo Servicio
            </button>

            {servicesList.length === 0 ? (
                <p>Aún no has registrado ningún servicio. ¡Comienza ahora!</p>
            ) : (
                <div className="services-list-container">
                    {servicesList.map(service => (
                        <ServiceItem 
                            key={service.id || service.id_registro_oferta} 
                            service={service} 
                            onEdit={onEditService} 
                            onDelete={onDeleteService}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};


// -----------------------------
// COMPONENTE AUXILIAR: Item de Comentario (Estilos Mejorados)
// -----------------------------
const ReviewItem = ({ review }) => {
    const touristName = `Turista #${review.id_turistas_fk}`;
    
    return (
        <div className="review-card" style={{
            border: '1px solid #e0e0e0',
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0', paddingBottom: '10px', marginBottom: '15px' }}>
                <h4 style={{ margin: 0, color: '#004d40' }}>
                    <span style={{ marginRight: '10px' }}>👤</span> {touristName}
                </h4>
                <p style={{ margin: 0, fontSize: '0.9em', color: '#777' }}>
                    Fecha: {review.fecha_calificacion}
                </p>
            </div>

            {/* PUNTUACIÓN GENERAL EN GRANDE */}
            <div style={{ marginBottom: '15px' }}>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1em', color: '#ff9800' }}>
                    Puntuación General: <StarRating score={review.puntuacion_general} />
                </p>
            </div>
            
            {/* FEEDBACK */}
            <div style={{ backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '6px', marginBottom: '15px' }}>
                <p style={{ margin: 0, fontStyle: 'italic', color: '#333' }}>
                    **"** {review.feedback_empresa} **"**
                </p>
            </div>

            {/* PUNTUACIONES DETALLADAS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.95em' }}>
                
                <p style={{ margin: 0 }}>
                    **📜 Certificados:** <StarRating score={review.puntuacion_certificados} />
                </p>
                <p style={{ margin: 0 }}>
                    **⏱️ Puntualidad:** <StarRating score={review.calificacion_puntualidad} />
                </p>
                <p style={{ margin: 0 }}>
                    **🧼 Limpieza:** <StarRating score={review.calificacion_limpieza} />
                </p>
            </div>

        </div>
    );
};


// -----------------------------
// COMPONENTE 3: VISTA DE COMENTARIOS
// -----------------------------
const ReviewsView = () => {
    // 🚨 Datos de comentarios simulados, con la estructura de la tabla 'calificacion_servicio_usuario' 🚨
    const simulatedReviews = [
        { 
            id_calificacion: 1, 
            puntuacion_general: 5, 
            feedback_empresa: "El tour fue impecable. Muy puntual y todo limpio. ¡Recomendado!", 
            puntuacion_certificados: 5, 
            calificacion_puntualidad: 5, 
            calificacion_limpieza: 5, 
            fecha_calificacion: "2025-12-05", 
            id_card_servicio_fk: 1, 
            id_turistas_fk: 101 
        },
        { 
            id_calificacion: 2, 
            puntuacion_general: 4, 
            feedback_empresa: "Buena atención, pero el inicio de la actividad se retrasó 15 minutos.", 
            puntuacion_certificados: 5, 
            calificacion_puntualidad: 3, 
            calificacion_limpieza: 4, 
            fecha_calificacion: "2025-11-20", 
            id_card_servicio_fk: 2, 
            id_turistas_fk: 102 
        },
    ];
    
    // Cálculo de promedio
    const totalScore = simulatedReviews.reduce((sum, review) => sum + review.puntuacion_general, 0);
    const averageScore = simulatedReviews.length > 0 ? (totalScore / simulatedReviews.length).toFixed(1) : 0;
    
    return (
        <div className="dashboard-content-box">
            <h3 style={{ borderBottom: '2px solid #004d40', paddingBottom: '10px' }}>
                ⭐ Comentarios y Reseñas ({simulatedReviews.length})
            </h3>
            
            {simulatedReviews.length > 0 && (
                <div style={{ 
                    marginBottom: '20px', 
                    padding: '15px', 
                    backgroundColor: '#e3f2fd', 
                    borderRadius: '8px'
                }}>
                    <h4 style={{ margin: 0, color: '#1565c0' }}>
                        Puntuación Promedio General: {averageScore} / 5
                    </h4>
                    <p style={{ margin: 0, color: '#1565c0', fontSize: '0.9em' }}>
                        Basado en {simulatedReviews.length} opiniones.
                    </p>
                </div>
            )}
            
            {simulatedReviews.length === 0 ? (
                <p style={{ padding: '20px', textAlign: 'center', border: '1px dashed #ccc' }}>
                    **(No hay comentarios aún. ¡Sigue prestando servicios de alta calidad!)**
                </p>
            ) : (
                <div className="reviews-list-container">
                    {simulatedReviews.map(review => (
                        <ReviewItem key={review.id_calificacion} review={review} />
                    ))}
                </div>
            )}
        </div>
    );
};

// -----------------------------
// COMPONENTE PRINCIPAL (ProviderDashboard)
// -----------------------------

function ProviderDashboard() {
    const [activeView, setActiveView] = useState('profile'); 
    const { user } = useAuth();
    const [providerData, setProviderData] = useState(null);
    const [servicesList, setServicesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [serviceToEdit, setServiceToEdit] = useState(null);


    useEffect(() => {
        let active = true;
        const loadData = async () => {
            try {
                setLoading(true);
                const [profileRes, servicesRes] = await Promise.all([
                    authApi.getProfile(),
                    servicesApi.fetchServices({ mine: true }),
                ]);
                if (!active) return;
                setProviderData(profileRes.data);
                setServicesList(servicesRes.data?.results || servicesRes.data || []);
            } catch (err) {
                if (!active) return;
                setError('No pudimos cargar tu información de prestador.');
            } finally {
                if (active) setLoading(false);
            }
        };
        loadData();
        return () => { active = false; };
    }, []);

    // --- Handlers de Perfil ---
    const handleProfileSave = (updatedData) => {
        const formData = new FormData();
        Object.entries(updatedData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value);
            }
        });
        authApi.updateProfile(formData)
            .then(({ data }) => {
                setProviderData(data);
                setActiveView('profile');
            })
            .catch(() => setError('No pudimos guardar el perfil.'))
            .finally(() => setLoading(false));
    };

    const handleCancelForm = () => {
        setServiceToEdit(null); 
        setActiveView(activeView.includes('profile') || activeView.includes('edit_profile') ? 'profile' : 'services');
    }


    // --- Handlers de Servicio ---
    const handleServiceSubmission = async (serviceData) => {
        const formData = new FormData();
        Object.entries(serviceData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) formData.append(key, value);
        });

        try {
            setLoading(true);
            if (serviceToEdit) {
                const svcId = serviceToEdit.id || serviceToEdit.id_registro_oferta;
                const { data } = await servicesApi.updateService(svcId, formData);
                setServicesList((prev) =>
                    prev.map((svc) => (svc.id === svcId || svc.id_registro_oferta === svcId ? data : svc)),
                );
                setServiceToEdit(null);
            } else {
                const { data } = await servicesApi.createService(formData);
                setServicesList((prev) => [data, ...prev]);
            }
            setActiveView('services'); 
        } catch (err) {
            setError('No pudimos guardar el servicio. Revisa los datos.');
        } finally {
            setLoading(false);
        }
    };

    const handleEditService = (service) => {
        setServiceToEdit(service);
        setActiveView('edit_service'); 
    };

    const handleDeleteService = async (service) => {
        const svcId = service.id || service.id_registro_oferta;
        try {
            setLoading(true);
            await servicesApi.deleteService(svcId);
            setServicesList((prev) => prev.filter((s) => (s.id || s.id_registro_oferta) !== svcId));
        } catch (err) {
            setError('No pudimos eliminar el servicio.');
        } finally {
            setLoading(false);
        }
    };
    

    // 4. Función para renderizar el contenido de la vista activa
    const renderContent = () => {
        switch (activeView) {
            case 'profile':
                return <ProfileView 
                    providerData={providerData} 
                    onEditClick={() => setActiveView('edit_profile')} 
                />;
            
            case 'edit_profile':
                // FORMULARIO DE EDICIÓN DE PERFIL/DOCUMENTOS
                return <ProfileEditForm 
                    providerData={providerData} 
                    onSave={handleProfileSave}
                    onCancel={handleCancelForm}
                />;
                
            case 'services':
                // VISTA: Administrar Servicios (con lista, editar, eliminar)
                return <ServicesView 
                    setActiveView={setActiveView} 
                    servicesList={servicesList}
                    onEditService={handleEditService}
                    onDeleteService={handleDeleteService}
                />; 

            case 'add_service':
            case 'edit_service':
                // VISTA: Formulario de Servicio (usa ServiceForm)
                return <ServiceForm 
                    initialData={serviceToEdit} 
                    isEditing={!!serviceToEdit} 
                    onServiceSubmit={handleServiceSubmission} 
                    onCancel={handleCancelForm} 
                />;
                
            case 'reviews':
                // VISTA: Comentarios y Reseñas
                return <ReviewsView />;
                
            default:
                return <ProfileView 
                    providerData={providerData} 
                    onEditClick={() => setActiveView('edit_profile')} 
                />;
        }
    };

    if (loading && !providerData) {
        return <div className="dashboard-container">Cargando tu información...</div>;
    }

    if (error) {
        return <div className="dashboard-container">{error}</div>;
    }

    return (
        <div className="dashboard-container">
            
            {/* -------------------- SIDEBAR (Menú de navegación) -------------------- */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <h2>Panel de Prestador</h2>
                    <p className="welcome-message">Bienvenido, {providerData.nombre}</p>
                </div>
                <nav className="sidebar-nav">
                    <button 
                        className={`nav-item ${activeView === 'profile' || activeView === 'edit_profile' ? 'active' : ''}`}
                        onClick={() => setActiveView('profile')}
                    >
                        👤 Mi Perfil
                    </button>
                    <button 
                        className={`nav-item ${activeView === 'services' || activeView === 'add_service' || activeView === 'edit_service' ? 'active' : ''}`}
                        onClick={() => setActiveView('services')}
                    >
                        🗺️ Administrar Servicios
                    </button>
                    <button 
                        className={`nav-item ${activeView === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveView('reviews')}
                    >
                        ⭐ Comentarios y Reseñas
                    </button>
                    <hr/>
                    <button className="nav-item logout">
                        Salir
                    </button>
                </nav>
            </aside>

            {/* -------------------- MAIN CONTENT (Contenido de la vista activa) -------------------- */}
            <main className="dashboard-main-content">
                <h1 className="main-title">Dashboard del Prestador Individual</h1>
                {renderContent()}
            </main>
        </div>
    );
}

export default ProviderDashboard;