// src/pages/CompanyDashboard.jsx

import React, { useState } from 'react';
// Asegúrate de que tienes un archivo CSS para los estilos del dashboard (puede ser compartido o uno nuevo)
import './styles/CompanyDashboard.css'; 

import EmployeeForm from '../components/EmployeeForm'; // Formulario complejo para empleados
import ServiceForm from '../components/ServiceForm'; // Reutilizamos el formulario de servicio individual

// -----------------------------
// VISTAS DEL DASHBOARD DE EMPRESA
// -----------------------------

// 1. Perfil de la Empresa y Representante
const CompanyProfileView = ({ companyData }) => (
    <div className="dashboard-content-box">
        <h3>🏦 Perfil de la Empresa</h3>
        <p>Aquí se editan los datos legales de la empresa y del representante.</p>
        
        {/* Datos de la empresa */}
        <h4 style={{ marginTop: '20px' }}>Datos Legales</h4>
        <div className="profile-details-grid">
            <div>
                <strong>Razón Social:</strong> {companyData.razonSocial}
            </div>
            <div>
                <strong>NIT:</strong> {companyData.nit}
            </div>
            <div>
                <strong>Ciudad de Operación:</strong> {companyData.ciudad}
            </div>
        </div>

        {/* Datos del Representante */}
        <h4 style={{ marginTop: '20px' }}>👤 Datos del Representante Legal</h4>
        <div className="profile-details-grid">
            <div>
                <strong>Nombre:</strong> {companyData.representanteNombre} {companyData.representanteApellido}
            </div>
            <div>
                <strong>Email:</strong> {companyData.email}
            </div>
        </div>
        
        <h4 style={{ marginTop: '20px' }}>📁 Documentación Legal</h4>
        <ul>
            <li>Cámara de Comercio (Certificado)</li>
            <li>RUT de la Empresa (Certificado)</li>
            {/* Aquí irían más datos y la lógica para subir/verificar documentos */}
        </ul>
        <button className="btn-edit-profile">Editar Perfil / Subir Certificados</button>
    </div>
);

// 2. Gestión de Empleados
const EmployeesView = ({ setActiveView }) => {
    // Simulación de lista de empleados
    const employeesList = [
        { id: 1, nombre: "Carlos", cargo: "Guía Certificado" },
        { id: 2, nombre: "Luisa", cargo: "Conductor Turístico" }
    ];

    return (
        <div className="dashboard-content-box">
            <h3>👥 Gestión de Empleados ({employeesList.length})</h3>
            <button 
                className="btn-primary-action"
                onClick={() => setActiveView('add_employee')} 
                style={{marginBottom: '20px'}}
            >
                ➕ Registrar Nuevo Empleado
            </button>
            
            {employeesList.length > 0 ? (
                <div className="employee-list">
                    <h4>Lista de Empleados Activos</h4>
                    {employeesList.map(emp => (
                        <p key={emp.id}>• {emp.nombre} - {emp.cargo}</p>
                    ))}
                </div>
            ) : (
                <p>Aún no has registrado empleados.</p>
            )}
        </div>
    );
};

// 3. Gestión de Servicios de la Empresa
const CompanyServicesView = ({ setActiveView }) => (
    <div className="dashboard-content-box">
        <h3>🗺️ Servicios de la Empresa</h3>
        <button 
            className="btn-primary-action"
            onClick={() => setActiveView('add_service')} 
            style={{marginBottom: '20px'}}
        >
            ➕ Registrar Nuevo Servicio de la Empresa
        </button>
        <p>Aquí se listarán los servicios que ofrece la empresa.</p>
    </div>
);

// 4. ⭐ NUEVA VISTA: Comentarios y Reseñas
const CompanyReviewsView = () => (
    <div className="dashboard-content-box">
        <h3>⭐ Comentarios y Reseñas</h3>
        <p>Aquí verás las opiniones y calificaciones que los turistas han dejado sobre tu empresa y sus servicios.</p>
        <div className="review-summary">
            <h4>Calificación Promedio: 4.5/5.0</h4>
            <p>Total de Reseñas: 58</p>
        </div>
        <p>**(Listado de reseñas recientes...)**</p>
    </div>
);


// -----------------------------
// COMPONENTE PRINCIPAL (CompanyDashboard)
// -----------------------------

function CompanyDashboard() {
    // Añadimos 'reviews' a los posibles estados
    const [activeView, setActiveView] = useState('profile'); 

    // Datos de ejemplo para la Empresa Prestadora
    const companyExampleData = {
        razonSocial: "Aventura Colombia SAS",
        nit: "900.123.456-7",
        representanteNombre: "Carolina",
        representanteApellido: "López",
        email: "carolina.lopez@aventura.com",
        ciudad: "Medellín",
    };

    // Funciones de manejo de formularios (iguales que antes)
    const handleEmployeeSubmission = (employeeData) => {
        console.log("EMPLEADO REGISTRADO:", employeeData);
        setActiveView('employees');
        alert("Empleado registrado con éxito. Revisar documentación.");
    };

    const handleServiceSubmission = (serviceData) => {
        console.log("SERVICIO DE EMPRESA REGISTRADO:", serviceData);
        setActiveView('services');
        alert("Servicio registrado con éxito.");
    };


    const renderContent = () => {
        switch (activeView) {
            case 'profile':
                return <CompanyProfileView companyData={companyExampleData} />;
                
            case 'services':
                return <CompanyServicesView setActiveView={setActiveView} />; 

            case 'add_service':
                return <ServiceForm 
                    onServiceSubmit={handleServiceSubmission} 
                    onCancel={() => setActiveView('services')} 
                />;

            case 'employees':
                return <EmployeesView setActiveView={setActiveView} />; 

            case 'add_employee':
                return <EmployeeForm 
                    onEmployeeSubmit={handleEmployeeSubmission} 
                    onCancel={() => setActiveView('employees')} 
                />;
                
            case 'reviews':
                // 🚨 NUEVA VISTA RENDERIZADA 🚨
                return <CompanyReviewsView />;
            
            default:
                return <CompanyProfileView companyData={companyExampleData} />;
        }
    };

    return (
        <div className="dashboard-container">
            
            {/* -------------------- SIDEBAR (Menú de navegación) -------------------- */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <h2>Panel de Empresa</h2>
                    <p className="welcome-message">Bienvenida, {companyExampleData.representanteNombre}</p>
                </div>
                <nav className="sidebar-nav">
                    <button 
                        className={`nav-item ${activeView === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveView('profile')}
                    >
                        🏢 Perfil y Documentación
                    </button>
                    <button 
                        className={`nav-item ${activeView === 'services' || activeView === 'add_service' ? 'active' : ''}`}
                        onClick={() => setActiveView('services')}
                    >
                        🗺️ Administrar Servicios
                    </button>
                    <button 
                        className={`nav-item ${activeView === 'employees' || activeView === 'add_employee' ? 'active' : ''}`}
                        onClick={() => setActiveView('employees')}
                    >
                        👥 Gestión de Empleados
                    </button>
                    {/* 🚨 NUEVO BOTÓN DE NAVEGACIÓN 🚨 */}
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

            {/* -------------------- MAIN CONTENT -------------------- */}
            <main className="dashboard-main-content">
                <h1 className="main-title">Dashboard de {companyExampleData.razonSocial}</h1>
                {renderContent()}
            </main>
        </div>
    );
}

export default CompanyDashboard;