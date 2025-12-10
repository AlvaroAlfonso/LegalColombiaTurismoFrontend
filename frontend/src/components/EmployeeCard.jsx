// src/components/EmployeeCard.jsx
import React from 'react';
import './styles/EmployeeCard.css';

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
    const {
        id,
        cargo,
        id_usuario_fk
    } = employee;

    // Extract user info if available
    const nombre = id_usuario_fk?.nombre || id_usuario_fk?.first_name || 'Sin nombre';
    const apellido = id_usuario_fk?.apellido || id_usuario_fk?.last_name || '';
    const email = id_usuario_fk?.email || 'Sin email';

    const getCargoIcon = (cargo) => {
        const cargoLower = cargo?.toLowerCase() || '';
        if (cargoLower.includes('guía') || cargoLower.includes('guia')) return '🚶';
        if (cargoLower.includes('conductor')) return '🚗';
        if (cargoLower.includes('chef') || cargoLower.includes('cocinero')) return '👨‍🍳';
        if (cargoLower.includes('recepcion')) return '🏨';
        if (cargoLower.includes('gerente') || cargoLower.includes('administrador')) return '💼';
        return '👤';
    };

    return (
        <div className="employee-card">
            <div className="employee-card-header">
                <div className="employee-avatar">
                    {getCargoIcon(cargo)}
                </div>
                <div className="employee-info">
                    <h3 className="employee-name">{nombre} {apellido}</h3>
                    <p className="employee-email">{email}</p>
                </div>
            </div>

            <div className="employee-card-body">
                <div className="employee-cargo">
                    <span className="cargo-label">Cargo:</span>
                    <span className="cargo-value">{cargo}</span>
                </div>
            </div>

            <div className="employee-card-footer">
                <button
                    className="btn-card-action btn-edit"
                    onClick={() => onEdit(employee)}
                    title="Editar empleado"
                >
                    ✏️ Editar
                </button>
                <button
                    className="btn-card-action btn-delete"
                    onClick={() => onDelete(id)}
                    title="Eliminar empleado"
                >
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    );
};

export default EmployeeCard;
