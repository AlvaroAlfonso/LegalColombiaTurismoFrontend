// src/schemas/ServiceSchema.js (NUEVO ARCHIVO)

import * as z from 'zod';

export const ServiceSchema = z.object({
    // Información General
    tituloCard: z.string().min(5, "El título de la tarjeta es requerido (mínimo 5 caracteres)"),
    nombreServicio: z.string().min(5, "El nombre adicional del servicio es requerido"),
    descripcion: z.string().min(20, "La descripción es requerida (mínimo 20 caracteres)"),
    
    // Categoría
    categoriaServicio: z.enum([
        'Hospedaje', 'Tours', 'Guías', 'Transporte', 'Aventura', 'Salud', 'Otro'
    ], { message: "Selecciona una categoría válida" }),

    // Precio y Cantidad
    precio: z.number({ invalid_type_error: "El precio debe ser un número" })
              .min(1000, "El precio mínimo es de $1,000 COP")
              .positive("El precio debe ser positivo"),
              
    cantidadServicios: z.number({ invalid_type_error: "La cantidad debe ser un número entero" })
                         .int("La cantidad debe ser un número entero")
                         .min(1, "Debes ingresar al menos 1 unidad de servicio"),

    // Media y Estado
    // NOTA: Para el campo File, Zod generalmente lo maneja como 'File' o 'FileList'. 
    // Asegúrate de que tu `useForm` lo registre correctamente.
    imagenServicio: z.any().refine(files => {
        // Asegúrate de que `files` existe y tiene al menos un elemento (File)
        return files && files.length > 0;
    }, "Una imagen principal es requerida"),
    
    estadoPublicacion: z.enum(['activo', 'inactivo', 'pendiente'], { message: "Selecciona el estado de publicación" }),
});