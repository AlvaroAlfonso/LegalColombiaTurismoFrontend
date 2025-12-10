// src/components/ServiceCard.jsx
import React from 'react';
import './styles/ServiceCard.css';

const ServiceCard = ({ service, onEdit, onDelete }) => {
    const {
        id,
        titulo_card,
        descripcion_corta,
        unidad_precio,
        categoria_servicio,
        url_imagen_principal,
        estado_publicacion
    } = service;

    const getCategoryIcon = (category) => {
        const icons = {
            'HOSPEDAJE': '🛌',
            'AGENCIAS_TOURS': '⛵',
            'GUIAS': '🚶',
            'TRANSPORTE': '🚗',
            'AVENTURA_RECREACION': '🚴',
            'SALUD_BIENESTAR': '❤️',
            'OTRO': '📦'
        };
        return icons[category] || '📦';
    };

    return (
        <div className="service-card">
            <div className="service-card-image-container">
                <img
                    src={url_imagen_principal || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}
                    alt={titulo_card}
                    className="service-card-image"
                />
                {!estado_publicacion && (
                    <div className="service-card-badge unpublished">No Publicado</div>
                )}
            </div>

            <div className="service-card-content">
                <div className="service-card-header">
                    <h3 className="service-card-title">{titulo_card}</h3>
                    <span className="service-card-category">
                        {getCategoryIcon(categoria_servicio)} {categoria_servicio.replace(/_/g, ' ')}
                    </span>
                </div>

                <p className="service-card-description">{descripcion_corta}</p>

                <div className="service-card-footer">
                    <div className="service-card-price">
                        <span className="price-label">Precio:</span>
                        <span className="price-value">
                            {service.precio_servicio || service.unidad_precio || 'Consultar'}
                            {service.precio_servicio && service.unidad_precio && ` ${service.unidad_precio}`}
                        </span>
                    </div>

                    <div className="service-card-actions">
                        <button
                            className="btn-card-action btn-edit"
                            onClick={() => onEdit(service)}
                            title="Editar servicio"
                        >
                            ✏️ Editar
                        </button>
                        <button
                            className="btn-card-action btn-delete"
                            onClick={() => onDelete(id)}
                            title="Eliminar servicio"
                        >
                            🗑️ Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
