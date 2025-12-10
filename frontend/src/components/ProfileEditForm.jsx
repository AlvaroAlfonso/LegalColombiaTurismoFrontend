// src/components/ProfileEditForm.jsx
import React, { useState, useEffect } from 'react';
import './styles/ProfileEditForm.css'; // Usaremos un archivo CSS simple

// Función auxiliar para obtener el nombre del archivo de una URL o cadena
const getFileName = (path) => path ? path.split('/').pop().split('\\').pop() : 'No cargado';

const ProfileEditForm = ({ providerData, onSave, onCancel }) => {
    // 1. Estado inicial del formulario usando los datos del prestador (providerData)
    const [formData, setFormData] = useState({
        ...providerData,
        // Usamos un campo para la nueva contraseña, pero lo inicializamos vacío
        newPassword: '', 
        // Agregamos campos para las nuevas fotos (serán objetos File)
        fileFotoDocumento: null,
        fileFotoRut: null,
        fileFotoMatriculaComerciante: null,
        fileFotoPermisoAlcaldia: null,
    });

    // 2. Estado para controlar la visibilidad de la contraseña
    const [showPassword, setShowPassword] = useState(false);

    // 3. Efecto para inicializar el estado cuando cambian los datos del prop
    useEffect(() => {
        setFormData({
            ...providerData,
            newPassword: '', // Aseguramos que el campo de contraseña esté vacío al abrir
            fileFotoDocumento: null,
            fileFotoRut: null,
            fileFotoMatriculaComerciante: null,
            fileFotoPermisoAlcaldia: null,
        });
    }, [providerData]);
    
    // 4. Manejadores de cambio para campos de texto/selección
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    
    // 5. Manejador de cambio para archivos (fotos)
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0], // Guardamos el objeto File
            }));
        }
    };
    
    // 6. Manejador de envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // --- Lógica de Pre-envío ---
        // 1. Aquí se construiría el objeto para el backend (ej. usando FormData)
        
        // Simulamos la actualización de los datos del proveedor
        const updatedProviderData = {
            ...providerData, // Mantenemos ID, email, tipoIdent, numIdent
            nombre: formData.nombre,
            apellido: formData.apellido,
            numeroTelefonico: formData.numeroTelefonico,
            municipioTrabajo: formData.municipioTrabajo,
            afiliadoSeguridadSocial: formData.afiliadoSeguridadSocial,
            
            // Si hay nueva contraseña, actualizarla (PENDIENTE DE ENCRIPTACIÓN EN BACKEND)
            ...(formData.newPassword && { password_hash: '********' }), 
            
            // Si se subió un nuevo archivo, actualizamos la referencia de la URL/nombre para la vista ProfileView
            fotoDocumento: formData.fileFotoDocumento ? formData.fileFotoDocumento.name : providerData.fotoDocumento,
            fotoRut: formData.fileFotoRut ? formData.fileFotoRut.name : providerData.fotoRut,
            fotoMatriculaComerciante: formData.fileFotoMatriculaComerciante ? formData.fileFotoMatriculaComerciante.name : providerData.fotoMatriculaComerciante,
            fotoPermisoAlcaldia: formData.fileFotoPermisoAlcaldia ? formData.fileFotoPermisoAlcaldia.name : providerData.fotoPermisoAlcaldia,
        };
        
        // Llamamos al handler del componente padre para guardar los datos
        onSave(updatedProviderData);
    };

    return (
        <div className="profile-edit-container">
            <h3>✏️ Editar Mi Perfil</h3>
            <p className="form-info">
                **Nota:** El **Email** y la **Identificación (CC/NIT)** no pueden ser modificados.
            </p>
            <form onSubmit={handleSubmit} className="profile-form">
                
                {/* ========================================================= */}
                {/* 1. INFORMACIÓN PERSONAL (EDITABLE) */}
                {/* ========================================================= */}
                <fieldset className="form-section editable-fields">
                    <legend>Información Personal (Editable)</legend>

                    <label>Nombre(s):</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        value={formData.nombre || ''} 
                        onChange={handleChange} 
                        required 
                    />

                    <label>Apellido(s):</label>
                    <input 
                        type="text" 
                        name="apellido" 
                        value={formData.apellido || ''} 
                        onChange={handleChange} 
                        required 
                    />

                    <label>Teléfono:</label>
                    <input 
                        type="tel" 
                        name="numeroTelefonico" 
                        value={formData.numeroTelefonico || ''} 
                        onChange={handleChange} 
                        required 
                    />

                    <label>Municipio de Trabajo:</label>
                    <input 
                        type="text" 
                        name="municipioTrabajo" 
                        value={formData.municipioTrabajo || ''} 
                        onChange={handleChange} 
                        required 
                    />
                    
                    <label>Afiliado a Seguridad Social:</label>
                    <select
                        name="afiliadoSeguridadSocial"
                        value={formData.afiliadoSeguridadSocial || 'no'}
                        onChange={handleChange}
                        required
                    >
                        <option value="si">Sí, estoy afiliado</option>
                        <option value="no">No estoy afiliado</option>
                    </select>

                    <label className="password-label">
                        Nueva Contraseña:
                    </label>
                    <div className="password-input-group">
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            name="newPassword" 
                            value={formData.newPassword} 
                            onChange={handleChange} 
                            placeholder="Dejar vacío para no cambiar"
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="toggle-password-btn"
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>

                </fieldset>


                {/* ========================================================= */}
                {/* 2. INFORMACIÓN NO EDITABLE */}
                {/* ========================================================= */}
                <fieldset className="form-section non-editable-fields">
                    <legend>Datos Fijos (No Editables)</legend>
                    
                    <label>Email:</label>
                    <input type="email" value={providerData.email} disabled />

                    <label>Tipo de Identificación:</label>
                    <input type="text" value={providerData.tipoIdentificacion} disabled />
                    
                    <label>Número de Identificación (Cédula/NIT):</label>
                    <input type="text" value={providerData.numIdentificacion} disabled />
                    
                </fieldset>


                {/* ========================================================= */}
                {/* 3. SUBIDA DE DOCUMENTOS (FOTOS) */}
                {/* ========================================================= */}
                <fieldset className="form-section document-upload-fields">
                    <legend>Carga de Documentos Legales (Requerido)</legend>
                    
                    {/* Componente auxiliar para subir archivos (DRY - Don't Repeat Yourself) */}
                    {[
                        { 
                            name: 'fileFotoDocumento', 
                            label: 'Documento de Identificación (Cédula)', 
                            currentStatus: providerData.fotoDocumento 
                        },
                        { 
                            name: 'fileFotoRut', 
                            label: 'RUT o Cédula de Ciudadanía', 
                            currentStatus: providerData.fotoRut 
                        },
                        { 
                            name: 'fileFotoMatriculaComerciante', 
                            label: 'Matrícula Mercantil o Certificado', 
                            currentStatus: providerData.fotoMatriculaComerciante 
                        },
                        { 
                            name: 'fileFotoPermisoAlcaldia', 
                            label: 'Permiso de Alcaldía / Cámara de Comercio', 
                            currentStatus: providerData.fotoPermisoAlcaldia 
                        },
                    ].map(field => (
                        <DocumentUploader 
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            onChange={handleFileChange}
                            currentStatus={field.currentStatus}
                            newFile={formData[field.name]}
                        />
                    ))}

                </fieldset>
                
                {/* Botones de acción */}
                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="btn-cancel">
                        Cancelar
                    </button>
                    <button type="submit" className="btn-save">
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
};

// Componente auxiliar para la subida de documentos
const DocumentUploader = ({ name, label, onChange, currentStatus, newFile }) => {
    const statusText = newFile 
        ? `Nuevo archivo: ${newFile.name}` 
        : (currentStatus ? `Cargado: ${getFileName(currentStatus)}` : 'Pendiente de subir');
    
    const statusColor = newFile ? '#3f51b5' : (currentStatus ? '#004d40' : '#d32f2f'); // Azul, Verde, Rojo

    return (
        <div className="document-uploader">
            <label htmlFor={name}>{label}:</label>
            <input 
                type="file" 
                id={name}
                name={name} 
                accept="image/*,application/pdf" // Acepta imágenes y PDF
                onChange={onChange} 
            />
            <p className="current-status" style={{ color: statusColor, fontSize: '0.9em', marginTop: '5px' }}>
                **Estado:** {statusText}
            </p>
        </div>
    );
};

export default ProfileEditForm;