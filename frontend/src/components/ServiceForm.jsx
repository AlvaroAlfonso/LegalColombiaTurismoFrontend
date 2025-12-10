// src/components/ServiceForm.jsx (ARCHIVO CORREGIDO)

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// 🚨 IMPORTACIÓN CORREGIDA 
// 🚨 AJUSTA ESTA RUTA según donde hayas guardado ServiceSchema.js
import { ServiceSchema } from '../schemas/ServiceSchema'; 


// Categorías disponibles
const CATEGORIES = ['Hospedaje', 'Tours', 'Guías', 'Transporte', 'Aventura', 'Salud', 'Otro'];

const ServiceForm = ({ onServiceSubmit, onCancel }) => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        // La importación ya está limpia y correcta
        resolver: zodResolver(ServiceSchema), 
        defaultValues: {
            // Nota: Para los campos number en defaultValues, es mejor usar `undefined` 
            // o 0 si la validación Zod no falla con 0, pero `react-hook-form`
            // intentará convertir el string de input a número si usas valueAsNumber: true.
            precio: undefined, 
            cantidadServicios: undefined, 
            estadoPublicacion: 'activo',
        }
    });

    const onSubmit = (data) => {
        // En este punto, react-hook-form ya convierte los campos a number si usaste valueAsNumber.
        // Solo para estar seguro con el manejo de archivos:
        const file = data.imagenServicio[0]; // Tomamos el primer archivo de la lista
        
        console.log("Datos de Servicio Válidos (Incluyendo Archivo):", { ...data, imagenFile: file });
        onServiceSubmit({ ...data, imagenFile: file }); 
    };

    return (
        <div className="dashboard-content-box service-form-container">
            <h3>➕ Registrar Nuevo Servicio</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-grid">
                    
                    {/* TÍTULO EN LA CARD */}
                    <div className="full-width">
                        <label htmlFor="tituloCard">Título que aparece en la tarjeta del servicio</label>
                        <input type="text" id="tituloCard" placeholder="Ej: Tour Gastronómico por el Centro Histórico" {...register("tituloCard")} />
                        {errors.tituloCard && <p className="error-message">{errors.tituloCard.message}</p>}
                    </div>

                    {/* NOMBRE ADICIONAL DEL SERVICIO */}
                    <div>
                        <label htmlFor="nombreServicio">Nombre Adicional / Subtítulo</label>
                        <input type="text" id="nombreServicio" placeholder="Ej: Vive una experiencia culinaria inolvidable" {...register("nombreServicio")} />
                        {errors.nombreServicio && <p className="error-message">{errors.nombreServicio.message}</p>}
                    </div>
                    
                    {/* CATEGORÍA */}
                    <div>
                        <label htmlFor="categoriaServicio">Categoría del Servicio</label>
                        <select id="categoriaServicio" {...register("categoriaServicio")}>
                            <option value="">Selecciona la categoría</option>
                            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        {errors.categoriaServicio && <p className="error-message">{errors.categoriaServicio.message}</p>}
                    </div>

                    {/* PRECIO */}
                    <div>
                        <label htmlFor="precio">Precio del Servicio (COP)</label>
                        {/* ⚠️ Importante: input type="number" y valueAsNumber: true para el registro */}
                        <input type="number" id="precio" step="1000" min="1000" placeholder="Ej: 50000" {...register("precio", { valueAsNumber: true })} /> 
                        {errors.precio && <p className="error-message">{errors.precio.message}</p>}
                    </div>

                    {/* CANTIDAD DE SERVICIOS */}
                    <div>
                        <label htmlFor="cantidadServicios">Cantidad de Servicios/Cupos</label>
                        {/* ⚠️ Importante: input type="number" y valueAsNumber: true para el registro */}
                        <input type="number" id="cantidadServicios" min="1" placeholder="Ej: 10 (Cupos disponibles)" {...register("cantidadServicios", { valueAsNumber: true })} />
                        {errors.cantidadServicios && <p className="error-message">{errors.cantidadServicios.message}</p>}
                    </div>

                    {/* ESTADO DE PUBLICACIÓN */}
                    <div>
                        <label htmlFor="estadoPublicacion">Estado de Publicación</label>
                        <select id="estadoPublicacion" {...register("estadoPublicacion")}>
                            <option value="activo">Activo (Visible)</option>
                            <option value="inactivo">Inactivo (No visible)</option>
                            <option value="pendiente">Pendiente de Revisión</option>
                        </select>
                        {errors.estadoPublicacion && <p className="error-message">{errors.estadoPublicacion.message}</p>}
                    </div>

                    {/* IMAGEN DEL SERVICIO */}
                    <div>
                        <label htmlFor="imagenServicio" className="file-label">Imagen Principal del Servicio</label>
                        <input type="file" id="imagenServicio" accept="image/*" {...register("imagenServicio")} />
                        {errors.imagenServicio && <p className="error-message">{errors.imagenServicio.message}</p>}
                    </div>
                    
                    {/* DESCRIPCIÓN */}
                    <div className="full-width">
                        <label htmlFor="descripcion">Descripción Detallada del Servicio</label>
                        <textarea id="descripcion" rows="5" placeholder="Describe qué incluye el servicio, horarios, y puntos destacados..." {...register("descripcion")} />
                        {errors.descripcion && <p className="error-message">{errors.descripcion.message}</p>}
                    </div>

                </div>

                <div className="form-actions full-width">
                    <button type="submit" className="btn-primary-action">GUARDAR Y PUBLICAR SERVICIO</button>
                    <button type="button" onClick={onCancel} className="btn-secondary-action">Cancelar / Volver</button>
                </div>
            </form>
        </div>
    );
};

export default ServiceForm;