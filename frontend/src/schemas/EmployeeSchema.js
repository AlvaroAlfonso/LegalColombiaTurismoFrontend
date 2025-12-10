// src/schemas/EmployeeSchema.js (NUEVO ARCHIVO)

import * as z from 'zod';

// Esquema para la validación de un solo certificado
const CertificateSchema = z.object({
    nombreCertificado: z.string().min(5, "El nombre del certificado es obligatorio"),
    tipoCertificado: z.string().min(3, "El tipo de certificado es obligatorio"),
    entidadEmisora: z.string().min(3, "La entidad emisora es obligatoria"),
    
    // El número de registro puede ser opcional si no todos los certificados lo requieren
    numeroRegistro: z.string().optional(),
    
    fechaExpedicion: z.string().nonempty("La fecha de expedición es requerida"),
    fechaVencimiento: z.string().nonempty("La fecha de vencimiento es requerida"),
    
    // Archivos
    fotoDiploma: z.any().refine(files => files?.length > 0, "La foto del diploma es requerida"),
    fotoDocumentoVigente: z.any().refine(files => files?.length > 0, "La foto del documento vigente es requerida"),
});

// Esquema principal para el registro del empleado
export const EmployeeSchema = z.object({
    // DATOS GENERALES
    nombre: z.string().min(2, "El nombre es requerido"),
    apellido: z.string().min(2, "El apellido es requerido"),
    ciudad: z.string().min(2, "La ciudad es requerida"),
    correoElectronico: z.string().email("Formato de correo inválido"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    
    tipoDocumento: z.enum(['CC', 'CE', 'Pasaporte'], { message: "Selecciona un tipo de documento válido" }),
    numeroDocumento: z.string().min(5, "El número de documento es requerido"),
    numeroTelefonico: z.string().min(10, "El número de teléfono es requerido"),
    
    // Archivo
    fotoDocumento: z.any().refine(files => files?.length > 0, "La foto del documento de identidad es requerida"),

    // DATOS ESPECÍFICOS DEL EMPLEADO
    cargo: z.string().min(3, "El cargo es obligatorio (Ej: Guía turístico, Conductor, etc.)"),
    
    // LISTA DE CERTIFICADOS (Array de objetos CertificateSchema)
    certificados: z.array(CertificateSchema).min(1, "Debe registrar al menos un certificado laboral o de competencia"),
});