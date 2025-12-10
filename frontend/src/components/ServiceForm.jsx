// src/components/ServiceForm.jsx
import React, { useState, useEffect } from 'react';
import './styles/ServiceForm.css'; // Usaremos un archivo CSS para los estilos

// Lista simulada de categorías (basada en la imagen de categorías que enviaste)
const CATEGORIES = [
    { value: 'HOSPEDAJE', label: '🛌 Hospedaje Certificado' },
    { value: 'AGENCIAS_TOURS', label: '⛵ Agencias & Tours' },
    { value: 'GUIAS', label: '🚶 Guías Expertos' },
    { value: 'TRANSPORTE', label: '🚗 Transporte Seguro' },
    { value: 'AVENTURA_RECREACION', label: '🚴 Aventura & Recreación' },
    { value: 'SALUD_BIENESTAR', label: '❤️ Salud & Bienestar' },
];

// Lista simulada de unidades de precio
const PRICE_UNITS = [
    { value: 'por persona', label: 'Por persona' },
    { value: 'por grupo', label: 'Por grupo' },
    { value: 'por hora', label: 'Por hora' },
    { value: 'por noche', label: 'Por noche' },
];

const ServiceForm = ({ initialData, isEditing, onServiceSubmit, onCancel }) => {
    // Inicializar el estado con los datos existentes o campos vacíos para un nuevo servicio
    const [formData, setFormData] = useState({
        titulo_card: initialData?.titulo_card || '',
        descripcion_corta: initialData?.descripcion_corta || '',
        precio_servicio: initialData?.precio_servicio || '', // Lo llamaremos precio_servicio internamente
        unidad_precio: initialData?.unidad_precio || PRICE_UNITS[0].value,
        categoria_servicio: initialData?.categoria_servicio || CATEGORIES[0].value,
        url_imagen_principal: initialData?.url_imagen_principal || '',
        estado_publicacion: initialData?.estado_publicacion ?? true, // Por defecto, true si es nuevo
        newImageFile: null, // Para manejar la subida de un nuevo archivo de imagen
    });
    
    // Estado para manejar si el precio es un número válido
    const [priceError, setPriceError] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                titulo_card: initialData.titulo_card || '',
                descripcion_corta: initialData.descripcion_corta || '',
                precio_servicio: initialData.precio_servicio || '',
                unidad_precio: initialData.unidad_precio || PRICE_UNITS[0].value,
                categoria_servicio: initialData.categoria_servicio || CATEGORIES[0].value,
                url_imagen_principal: initialData.url_imagen_principal || '',
                estado_publicacion: initialData.estado_publicacion ?? true,
                newImageFile: null,
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    
    const handlePriceChange = (e) => {
        const value = e.target.value;
        // Solo permitir números
        if (/^\d*$/.test(value) || value === '') {
            setFormData(prev => ({
                ...prev,
                precio_servicio: value,
            }));
            setPriceError('');
        } else {
            setPriceError('Solo se permiten números en el precio.');
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFormData(prev => ({
                ...prev,
                newImageFile: e.target.files[0],
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.titulo_card || !formData.precio_servicio || !formData.descripcion_corta) {
            alert('🚨 Por favor, complete todos los campos obligatorios (Título, Precio y Descripción).');
            return;
        }

        if (priceError) {
             alert('🚨 Corrija el error del precio antes de continuar.');
            return;
        }
        
        // **Lógica de Preparación de Datos para el Backend:**
        // En un entorno real, usarías `FormData` para enviar el archivo y los datos.
        const dataForSubmission = {
            titulo_card: formData.titulo_card,
            descripcion_corta: formData.descripcion_corta,
            precio_servicio: parseInt(formData.precio_servicio, 10), // Aseguramos que sea número
            unidad_precio: formData.unidad_precio,
            categoria_servicio: formData.categoria_servicio,
            estado_publicacion: formData.estado_publicacion,
            imagen: formData.newImageFile || undefined,
            // Aquí se adjuntaría el archivo (formData.newImageFile)
            // Para la simulación en React, pasamos los datos planos:
            // Si hay nueva imagen, actualiza la URL con el nombre del archivo, sino, mantiene la vieja URL
            url_imagen_principal: formData.newImageFile 
                                  ? `uploads/${formData.newImageFile.name}` 
                                  : formData.url_imagen_principal,
        };

        // Llama al handler en ProviderDashboard
        onServiceSubmit(dataForSubmission);
    };

    return (
        <div className="service-form-container">
            <h3>{isEditing ? '✏️ Editar Servicio' : '➕ Agregar Nuevo Servicio'}</h3>
            
            <form onSubmit={handleSubmit} className="service-form">
                
                {/* GRUPO 1: TÍTULO Y CATEGORÍA */}
                <div className="form-group-grid">
                    <div className="form-field">
                        <label htmlFor="titulo_card">Título del Servicio (Card):</label>
                        <input 
                            type="text" 
                            id="titulo_card" 
                            name="titulo_card" 
                            value={formData.titulo_card} 
                            onChange={handleChange} 
                            placeholder="Ej: Tour Histórico de 3 Horas"
                            maxLength="150"
                            required
                        />
                    </div>
                    
                    <div className="form-field">
                        <label htmlFor="categoria_servicio">Categoría del Servicio:</label>
                        <select 
                            id="categoria_servicio" 
                            name="categoria_servicio" 
                            value={formData.categoria_servicio} 
                            onChange={handleChange}
                            required
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* GRUPO 2: PRECIO Y UNIDAD */}
                <div className="form-group-grid">
                    <div className="form-field">
                        <label htmlFor="precio_servicio">Precio ($):</label>
                        <input 
                            type="text" 
                            id="precio_servicio" 
                            name="precio_servicio" 
                            value={formData.precio_servicio} 
                            onChange={handlePriceChange} 
                            placeholder="Ej: 50000"
                            required
                        />
                         {priceError && <p className="error-message">{priceError}</p>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="unidad_precio">Unidad de Precio:</label>
                        <select 
                            id="unidad_precio" 
                            name="unidad_precio" 
                            value={formData.unidad_precio} 
                            onChange={handleChange}
                            required
                        >
                            {PRICE_UNITS.map(unit => (
                                <option key={unit.value} value={unit.value}>{unit.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* GRUPO 3: DESCRIPCIÓN CORTA */}
                <div className="form-field">
                    <label htmlFor="descripcion_corta">Descripción Corta (Max 500 caracteres):</label>
                    <textarea 
                        id="descripcion_corta" 
                        name="descripcion_corta" 
                        value={formData.descripcion_corta} 
                        onChange={handleChange} 
                        placeholder="Una breve descripción para la tarjeta de presentación del servicio."
                        maxLength="500"
                        rows="4"
                        required
                    />
                </div>
                
                {/* GRUPO 4: IMAGEN Y ESTADO */}
                <div className="form-group-grid">
                    <div className="form-field">
                        <label htmlFor="newImageFile">Imagen Principal:</label>
                        <input 
                            type="file" 
                            id="newImageFile" 
                            name="newImageFile" 
                            accept="image/*"
                            onChange={handleFileChange} 
                        />
                        <p className="status-info">
                            {formData.newImageFile 
                                ? `Nueva imagen: ${formData.newImageFile.name}`
                                : (isEditing && formData.url_imagen_principal 
                                    ? `Actual: ${formData.url_imagen_principal.split('/').pop()}` 
                                    : 'Aún no cargada'
                                  )
                            }
                        </p>
                    </div>

                    <div className="form-field checkbox-field">
                        <input 
                            type="checkbox" 
                            id="estado_publicacion" 
                            name="estado_publicacion" 
                            checked={formData.estado_publicacion} 
                            onChange={handleChange} 
                        />
                        <label htmlFor="estado_publicacion" style={{display: 'inline', marginLeft: '10px'}}>
                            **Publicar Servicio** (Estará visible a los turistas)
                        </label>
                    </div>
                </div>

                {/* ACCIONES */}
                <div className="form-actions service-actions">
                    <button type="button" onClick={onCancel} className="btn-cancel">
                        Cancelar
                    </button>
                    <button type="submit" className="btn-save">
                        {isEditing ? 'Guardar Cambios' : 'Registrar Servicio'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ServiceForm;