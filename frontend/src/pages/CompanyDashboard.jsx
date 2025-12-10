// src/pages/CompanyDashboard.jsx

import React, { useEffect, useState } from 'react';
// Asegúrate de que tienes un archivo CSS para los estilos del dashboard (puede ser compartido o uno nuevo)
import './styles/CompanyDashboard.css';

import EmployeeForm from '../components/EmployeeForm';
import ServiceForm from '../components/ServiceForm';
import ServiceCard from '../components/ServiceCard';
import EmployeeCard from '../components/EmployeeCard';
import ReviewCard from '../components/ReviewCard';
import { authApi, servicesApi, employeesApi } from '../api';
import { useAuth } from '../context/AuthContext';

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
const EmployeesView = ({ setActiveView, employeesList, onEditEmployee, onDeleteEmployee }) => {
    return (
        <div className="dashboard-content-box">
            <h3>👥 Gestión de Empleados ({employeesList.length})</h3>
            <button
                className="btn-primary-action"
                onClick={() => setActiveView('add_employee')}
                style={{ marginBottom: '20px' }}
            >
                ➕ Registrar Nuevo Empleado
            </button>

            {employeesList.length === 0 ? (
                <p>Aún no has registrado empleados.</p>
            ) : (
                <div className="cards-grid">
                    {employeesList.map(emp => (
                        <EmployeeCard
                            key={emp.id}
                            employee={emp}
                            onEdit={onEditEmployee}
                            onDelete={onDeleteEmployee}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// 3. Gestión de Servicios de la Empresa
const CompanyServicesView = ({ setActiveView, servicesList, onEditService, onDeleteService }) => (
    <div className="dashboard-content-box">
        <h3>🗺️ Servicios de la Empresa</h3>
        <button
            className="btn-primary-action"
            onClick={() => setActiveView('add_service')}
            style={{ marginBottom: '20px' }}
        >
            ➕ Registrar Nuevo Servicio de la Empresa
        </button>
        {servicesList.length === 0 ? (
            <p>Aún no has registrado servicios.</p>
        ) : (
            <div className="cards-grid">
                {servicesList.map((svc) => (
                    <ServiceCard
                        key={svc.id || svc.id_registro_oferta}
                        service={svc}
                        onEdit={onEditService}
                        onDelete={onDeleteService}
                    />
                ))}
            </div>
        )}
    </div>
);

// 4. ⭐ NUEVA VISTA: Comentarios y Reseñas
const CompanyReviewsView = ({ reviewsList }) => (
    <div className="dashboard-content-box">
        <h3>⭐ Comentarios y Reseñas</h3>
        <p>Aquí verás las opiniones y calificaciones que los turistas han dejado sobre tu empresa y sus servicios.</p>
        {reviewsList.length === 0 ? (
            <p>Aún no tienes reseñas.</p>
        ) : (
            <div className="cards-grid">
                {reviewsList.map((review, idx) => (
                    <ReviewCard key={review.id || idx} review={review} />
                ))}
            </div>
        )}
    </div>
);


// -----------------------------
// COMPONENTE PRINCIPAL (CompanyDashboard)
// -----------------------------

function CompanyDashboard() {
    const [activeView, setActiveView] = useState('profile');
    const { user } = useAuth();
    const [companyData, setCompanyData] = useState(null);
    const [servicesList, setServicesList] = useState([]);
    const [employeesList, setEmployeesList] = useState([]);
    const [reviewsList, setReviewsList] = useState([]);
    const [editingService, setEditingService] = useState(null);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let active = true;
        const load = async () => {
            try {
                setLoading(true);

                // --- 1. CARGA DE PERFIL (Con Fallback) ---
                let profileData = null;
                try {
                    const profileRes = await authApi.getProfile();
                    // FIX: Map nested API response to flat structure expected by UI
                    // API returns: { ..., empresa: { ... }, ... }
                    const apiData = profileRes.data || {};
                    const empresaData = apiData.empresa || {};

                    profileData = {
                        razonSocial: empresaData.nombre_razon_social || apiData.nombre || "Empresa Sin Nombre",
                        nit: empresaData.nit_empresa || "No registrado",
                        ciudad: empresaData.direccion || "Sin dirección registrada", // Using address as city isn't separate yet
                        representanteNombre: apiData.nombre || user?.nombre,
                        representanteApellido: apiData.apellido || user?.apellido,
                        email: apiData.email || user?.email
                    };
                } catch (err) {
                    console.warn("Error cargando perfil de empresa, usando datos simulados:", err);
                    profileData = {
                        razonSocial: "Empresa Demo SAS",
                        nit: "900.000.000-1",
                        ciudad: "Bogotá D.C.",
                        representanteNombre: user?.nombre || "Pepito",
                        representanteApellido: user?.apellido || "Pérez",
                        email: user?.email || "contacto@empresa.com"
                    };
                }
                if (!active) return;
                setCompanyData(profileData);

                // --- 2. CARGA DE SERVICIOS (Con Fallback) ---
                try {
                    const servicesRes = await servicesApi.fetchServices({ mine: true });
                    console.log("DEBUG: Services Response:", servicesRes.data);
                    setServicesList(servicesRes.data?.results || servicesRes.data || []);
                } catch (err) {
                    console.warn("Error cargando servicios de empresa, lista vacía:", err);
                    setServicesList([]);
                }

                // --- 3. CARGA DE EMPLEADOS ---
                try {
                    const employeesRes = await employeesApi.fetchEmployees({ mine: true });
                    console.log("DEBUG: Employees Response:", employeesRes.data);
                    setEmployeesList(employeesRes.data?.results || employeesRes.data || []);
                } catch (err) {
                    console.warn("Error cargando empleados, lista vacía:", err);
                    setEmployeesList([]);
                }

            } catch (globalErr) {
                if (!active) return;
                console.error("Error crítico en company dashboard:", globalErr);
                setError('Hubo un problema cargando el panel. Intenta recargar.');
            } finally {
                if (active) setLoading(false);
            }
        };
        load();
        return () => { active = false; };
    }, []);

    // Funciones de manejo de formularios y acciones
    const handleEmployeeSubmission = async (employeeData) => {
        try {
            setLoading(true);
            if (editingEmployee) {
                // Update existing employee
                const { data } = await employeesApi.updateEmployee(editingEmployee.id, employeeData);
                setEmployeesList((prev) => prev.map(e => e.id === data.id ? data : e));
                setEditingEmployee(null);
            } else {
                // Create new employee
                const { data } = await employeesApi.createEmployee(employeeData);
                setEmployeesList((prev) => [data, ...prev]);
            }
            setActiveView('employees');
        } catch (err) {
            console.error('Error guardando empleado:', err);
            alert(editingEmployee ? 'No pudimos actualizar el empleado.' : 'No pudimos registrar el empleado.');
        } finally {
            setLoading(false);
        }
    };

    const handleServiceSubmission = async (serviceData) => {
        const formData = new FormData();
        Object.entries(serviceData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) formData.append(key, value);
        });
        try {
            setLoading(true);
            if (editingService) {
                // Update existing service
                const { data } = await servicesApi.updateService(editingService.id, formData);
                setServicesList((prev) => prev.map(s => s.id === data.id ? data : s));
                setEditingService(null);
            } else {
                // Create new service
                const { data } = await servicesApi.createService(formData);
                setServicesList((prev) => [data, ...prev]);
            }
            setActiveView('services');
        } catch (err) {
            setError(editingService ? 'No pudimos actualizar el servicio.' : 'No pudimos registrar el servicio.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteService = async (serviceId) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este servicio?')) return;
        try {
            await servicesApi.deleteService(serviceId);
            setServicesList(prev => prev.filter(s => s.id !== serviceId));
        } catch (err) {
            console.error('Error eliminando servicio:', err);
            alert('No se pudo eliminar el servicio.');
        }
    };

    const handleEditService = (service) => {
        setEditingService(service);
        setActiveView('edit_service');
    };

    const handleDeleteEmployee = async (employeeId) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este empleado?')) return;
        try {
            await employeesApi.deleteEmployee(employeeId);
            setEmployeesList(prev => prev.filter(e => e.id !== employeeId));
        } catch (err) {
            console.error('Error eliminando empleado:', err);
            alert('No se pudo eliminar el empleado.');
        }
    };

    const handleEditEmployee = (employee) => {
        setEditingEmployee(employee);
        setActiveView('edit_employee');
    };


    const renderContent = () => {
        switch (activeView) {
            case 'profile':
                return <CompanyProfileView companyData={companyData || {}} />;

            case 'services':
                return <CompanyServicesView
                    setActiveView={setActiveView}
                    servicesList={servicesList}
                    onEditService={handleEditService}
                    onDeleteService={handleDeleteService}
                />;

            case 'add_service':
                return <ServiceForm
                    onServiceSubmit={handleServiceSubmission}
                    onCancel={() => setActiveView('services')}
                />;

            case 'edit_service':
                return <ServiceForm
                    initialData={editingService}
                    isEditing={true}
                    onServiceSubmit={handleServiceSubmission}
                    onCancel={() => {
                        setEditingService(null);
                        setActiveView('services');
                    }}
                />;

            case 'employees':
                return <EmployeesView
                    setActiveView={setActiveView}
                    employeesList={employeesList}
                    onEditEmployee={handleEditEmployee}
                    onDeleteEmployee={handleDeleteEmployee}
                />;

            case 'add_employee':
                return <EmployeeForm
                    onEmployeeSubmit={handleEmployeeSubmission}
                    onCancel={() => setActiveView('employees')}
                />;

            case 'edit_employee':
                return <EmployeeForm
                    initialData={editingEmployee}
                    isEditing={true}
                    onEmployeeSubmit={handleEmployeeSubmission}
                    onCancel={() => {
                        setEditingEmployee(null);
                        setActiveView('employees');
                    }}
                />;

            case 'reviews':
                return <CompanyReviewsView reviewsList={reviewsList} />;

            default:
                return <CompanyProfileView companyData={companyData || {}} />;
        }
    };

    if (loading && !companyData) {
        return <div className="dashboard-container">Cargando panel de empresa...</div>;
    }

    if (error) {
        return <div className="dashboard-container">{error}</div>;
    }

    return (
        <div className="dashboard-container">

            {/* -------------------- SIDEBAR (Menú de navegación) -------------------- */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <h2>Panel de Empresa</h2>
                    <p className="welcome-message">Bienvenido/a, {companyData?.representanteNombre || 'Usuario'}</p>
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
                    <hr />
                    <button className="nav-item logout">
                        Salir
                    </button>
                </nav>
            </aside>

            {/* -------------------- MAIN CONTENT -------------------- */}
            <main className="dashboard-main-content">
                <h1 className="main-title">Dashboard de {companyData?.razonSocial || 'Mi Empresa'}</h1>
                {renderContent()}
            </main>
        </div>
    );
}

export default CompanyDashboard;