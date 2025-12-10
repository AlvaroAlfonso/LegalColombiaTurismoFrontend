// src/pages/CompanyDashboard.jsx (NUEVO ARCHIVO)

import React, { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm'; // Importar el formulario de empleados
import ServiceForm from '../components/ServiceForm'; // Reutilizamos el formulario de servicio individual

import './styles/CompanyDashboard.css'; 

// -----------------------------
// VISTAS TEMPORALES
// -----------------------------

// 1. Perfil de la Empresa y Representante
const CompanyProfileView = ({ companyData }) => (
    <div className="dashboard-content-box">
        <h3>🏦 Perfil de la Empresa</h3>
        {/* Datos de la empresa */}
        <p><strong>Nombre Legal:</strong> {companyData.razonSocial}</p>
        <p><strong>NIT:</strong> {companyData.nit}</p>
        {/* Datos del Representante */}
        <h4 style={{ marginTop: '20px' }}>👤 Datos del Representante Legal</h4>
        <p><strong>Nombre:</strong> {companyData.representanteNombre} {companyData.representanteApellido}</p>
        <p><strong>Email:</strong> {companyData.email}</p>
        
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
const EmployeesView = ({ setActiveView }) => (
    <div className="dashboard-content-box">
        <h3>👥 Gestión de Empleados</h3>
        <button 
            className="btn-primary-action"
            onClick={() => setActiveView('add_employee')} 
            style={{marginBottom: '20px'}}
        >
            ➕ Registrar Nuevo Empleado
        </button>
        <p>Aquí se listarán y gestionarán los empleados de la empresa.</p>
    </div>
);

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

// -----------------------------
// COMPONENTE PRINCIPAL (CompanyDashboard)
// -----------------------------

function CompanyDashboard() {
    // Nuevas vistas: 'employees', 'add_employee', 'add_service'
    const [activeView, setActiveView] = useState('profile'); 

    // Datos de ejemplo para la Empresa Prestadora
    const companyExampleData = {
        razonSocial: "Aventura Colombia SAS",
        nit: "900.123.456-7",
        representanteNombre: "Carolina",
        representanteApellido: "López",
        email: "carolina.lopez@aventura.com",
        ciudad: "Medellín",
        // ... otros datos
    };

    // Funciones de manejo de formularios
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
                // Reutilizamos el formulario de servicio (ServiceForm.jsx)
                return <ServiceForm 
                    onServiceSubmit={handleServiceSubmission} 
                    onCancel={() => setActiveView('services')} 
                />;

            case 'employees':
                return <EmployeesView setActiveView={setActiveView} />; 

            case 'add_employee':
                // Usamos el nuevo formulario de empleado
                return <EmployeeForm 
                    onEmployeeSubmit={handleEmployeeSubmission} 
                    onCancel={() => setActiveView('employees')} 
                />;
                
            // Nota: Podríamos añadir una vista de 'reviews' también
            
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