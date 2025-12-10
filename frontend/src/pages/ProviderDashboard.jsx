// src/pages/ProviderDashboard.jsx

import React, { useState } from 'react';
import './styles/ProviderDashboard.css';

// 🚨 IMPORTAR COMPONENTES NECESARIOS 🚨
// 1. Asume que ServiceForm está en src/components/ServiceForm.jsx
import ServiceForm from '../components/ServiceForm'; 

// -----------------------------
// COMPONENTE 1: VISTA DE PERFIL
// -----------------------------
const ProfileView = ({ providerData }) => (
    <div className="dashboard-content-box">
        <h3>👤 Mi Perfil (Datos Personales)</h3>
        <p>Aquí se pueden editar tus datos personales y credenciales.</p>
        <div className="profile-details-grid">
            <div>
                <strong>Nombre Completo:</strong> {providerData.nombre} {providerData.apellido}
            </div>
            <div>
                <strong>Email:</strong> {providerData.email}
            </div>
            <div>
                <strong>Teléfono:</strong> {providerData.numeroTelefonico}
            </div>
            <div>
                <strong>Identificación:</strong> {providerData.tipoIdentificacion} - {providerData.numIdentificacion}
            </div>
            <div>
                <strong>Afiliado a Seguridad Social:</strong> {providerData.afiliadoSeguridadSocial === 'si' ? 'Sí' : 'No'}
            </div>
            <div>
                <strong>Municipio de Operación:</strong> {providerData.municipioTrabajo}
            </div>
            <div className="full-row">
                <button className="btn-edit-profile">Editar Datos</button>
            </div>
        </div>
        
        <h4 style={{ marginTop: '20px' }}>📁 Documentación</h4>
        <p>Los documentos cargados durante el registro están listos para ser verificados.</p>
        <ul>
            <li>Documento de Identificación (fotoDocumento)</li>
            <li>RUT (fotoRut)</li>
            <li>Matrícula Comerciante (fotoMatriculaComerciante)</li>
            <li>Permiso de Alcaldía (fotoPermisoAlcaldia)</li>
        </ul>
        <button className="btn-manage-docs">Gestionar Documentos</button>
    </div>
);

// -----------------------------
// COMPONENTE 2: VISTA DE SERVICIOS (MODIFICADA)
// Ahora recibe setActiveView para cambiar a la vista del formulario.
// -----------------------------
const ServicesView = ({ setActiveView }) => {
    // Aquí iría la lista de servicios existentes (simulación)
    const servicesList = []; 

    return (
        <div className="dashboard-content-box">
            <h3>🗺️ Mis Servicios</h3>
            
            {/* 🚨 BOTÓN PARA CAMBIAR A LA VISTA DEL FORMULARIO 🚨 */}
            <button 
                className="btn-primary-action"
                onClick={() => setActiveView('add_service')} 
                style={{marginBottom: '20px'}}
            >
                ➕ Agregar Nuevo Servicio
            </button>

            {servicesList.length === 0 ? (
                <p>Aún no has registrado ningún servicio. ¡Comienza ahora!</p>
            ) : (
                <p>Lista de servicios existentes...</p> // Aquí se renderizarían los servicios
            )}
        </div>
    );
};

// -----------------------------
// COMPONENTE 3: VISTA DE COMENTARIOS
// -----------------------------
const ReviewsView = () => (
    <div className="dashboard-content-box">
        <h3>⭐ Comentarios de Turistas</h3>
        <p>Aquí verás las opiniones y calificaciones que los turistas han dejado sobre tu servicio.</p>
        <p>**(No hay comentarios aún)**</p>
    </div>
);


// -----------------------------
// COMPONENTE PRINCIPAL
// -----------------------------

function ProviderDashboard() {
    // 1. Estado para manejar la vista activa (añadimos 'add_service')
    // Posibles estados: 'profile', 'services', 'reviews', 'add_service'
    const [activeView, setActiveView] = useState('profile'); 

    // 2. Datos de ejemplo del prestador
    const providerExampleData = {
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan.perez@turismo.com",
        numeroTelefonico: "3105555555",
        tipoIdentificacion: "CC",
        numIdentificacion: "1010123456",
        afiliadoSeguridadSocial: "si",
        municipioTrabajo: "Cartagena",
        // Aquí irían otros campos, incluyendo el tipoUsuario: 'prestador_servicio'
    };
    
    // 3. 🚨 FUNCIÓN PARA MANEJAR EL ENVÍO DEL FORMULARIO DE SERVICIO 🚨
    const handleServiceSubmission = (serviceData) => {
        // Aquí se enviaría el servicio a tu API/backend.
        console.log("SERVICIO REGISTRADO Y LISTO PARA ENVIAR:", serviceData);
        
        // Volver a la lista de servicios después del envío
        setActiveView('services'); 
        alert("¡Servicio registrado con éxito! Pendiente de aprobación.");
    };


    // 4. Función para renderizar el contenido de la vista activa
    const renderContent = () => {
        switch (activeView) {
            case 'profile':
                return <ProfileView providerData={providerExampleData} />;
                
            case 'services':
                // Pasamos setActiveView para que ServicesView pueda cambiar la vista
                return <ServicesView setActiveView={setActiveView} />; 

            case 'add_service':
                // 🚨 RENDERIZAR EL FORMULARIO DE SERVICIO 🚨
                return <ServiceForm 
                    onServiceSubmit={handleServiceSubmission} 
                    onCancel={() => setActiveView('services')} 
                />;
                
            case 'reviews':
                return <ReviewsView />;
                
            default:
                return <ProfileView providerData={providerExampleData} />;
        }
    };

    return (
        <div className="dashboard-container">
            
            {/* -------------------- SIDEBAR (Menú de navegación) -------------------- */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <h2>Panel de Prestador</h2>
                    <p className="welcome-message">Bienvenido, {providerExampleData.nombre}</p>
                </div>
                <nav className="sidebar-nav">
                    <button 
                        className={`nav-item ${activeView === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveView('profile')}
                    >
                        👤 Mi Perfil
                    </button>
                    {/* 🚨 Resaltar 'Administrar Servicios' también cuando se está en el formulario 🚨 */}
                    <button 
                        className={`nav-item ${activeView === 'services' || activeView === 'add_service' ? 'active' : ''}`}
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