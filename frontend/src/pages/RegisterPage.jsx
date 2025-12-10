


import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import './styles/RegisterPage.css';


// Esquema Base (Datos Comunes para TODOS)
const BaseSchema = z.object({
    nombre: z.string().min(2, "Mínimo 2 caracteres").max(50, "Máximo 50 caracteres"),
    apellido: z.string().min(2, "Mínimo 2 caracteres").max(50, "Máximo 50 caracteres"),
    
    fechaNacimiento: z.string().refine(val => {
        const date = new Date(val);
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
        return date < eighteenYearsAgo;
    }, {
        message: "Debes ser mayor de 18 años"
    }),

    // Datos de Login
    email: z.string().email("Formato de correo inválido"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    
    numeroTelefonico: z.string().regex(/^\d{7,15}$/, "Número telefónico inválido (7-15 dígitos)"),
    
    // Datos de Identificación
    tipoIdentificacion: z.enum(['CC', 'CE', 'Pasaporte', 'Otro'], { message: "Selecciona un tipo de identificación" }),
    numIdentificacion: z.string().min(5, "Mínimo 5 dígitos"),
    
    // Archivo
    fotoDocumento: z.instanceof(FileList).refine(files => files.length > 0, "Documento de identificación requerido"),
    
    // Tipo de Usuario (se añade automáticamente en el onSubmit, pero se incluye aquí para la validación si fuera necesario)
    tipoUsuario: z.enum(['turista', 'prestador_servicio']), // Nuevo campo para el esquema base
});

// 1. Esquema Turista (Extiende el Base)
const TuristaSchema = BaseSchema.extend({
    tipoUsuario: z.literal('turista'), // Asegura que sea 'turista'
    paisResidencia: z.string().min(3, "País de residencia requerido"),
    direccionResidencia: z.string().min(5, "Dirección requerida"),
    idiomaPreferido: z.string().min(1, "Selecciona un idioma preferido"),
    contactoEmergencia: z.string().min(2, "Nombre de contacto requerido"),
    numeroContactoEmergencia: z.string().regex(/^\d{7,15}$/, "Número de contacto de emergencia inválido"),
});

// 2. Esquema Prestador Individual (Extiende el Base)
const ProvisorIndividualSchema = BaseSchema.extend({
    tipoUsuario: z.literal('prestador_servicio'), // Asegura que sea 'prestador_servicio'
    
    // Ajustes solicitados
    afiliadoSeguridadSocial: z.enum(['si', 'no'], { message: "¿Afiliado a seguridad social?" }),
    
    // El municipio de trabajo
    municipioTrabajo: z.string().min(1, "Selecciona el municipio donde puede trabajar"), // Usaremos un select
    
    direccionRegistro: z.string().min(5, "Dirección de registro requerida"), // Nueva dirección

    // Documentos
    fotoRut: z.instanceof(FileList).refine(files => files.length > 0, "Foto del RUT requerida"),
    numeroMatriculaComerciante: z.string().min(5, "Número de matrícula comercial requerido"), // Nuevo campo
    fotoMatriculaComerciante: z.instanceof(FileList).refine(files => files.length > 0, "Foto de matrícula comercial requerida"), // Nuevo nombre
    fotoPermisoAlcaldia: z.instanceof(FileList).refine(files => files.length > 0, "Foto de permiso de alcaldía requerida"),
    
    // Se eliminan nombreProfesion y nombreServicio que no fueron solicitados en la última lista
});

// 3. Esquema Empresa Prestadora (Extiende el Base)
const EmpresaPrestadoraSchema = BaseSchema.extend({
    tipoUsuario: z.literal('prestador_servicio'), // Asegura que sea 'prestador_servicio'
    
    // Datos de la Empresa
    nombreRazonSocial: z.string().min(5, "Razón social requerida"),
    direccionEmpresa: z.string().min(5, "Dirección de la empresa requerida"),
    categoriaEmpresa: z.enum(['Hospedaje', 'Tours', 'Guias', 'Transporte', 'Aventura', 'Salud', 'Otro'], { message: "Selecciona una categoría" }),
    rntEmpresa: z.string().min(5, "RNT requerido"),
    fotoRntCertificado: z.instanceof(FileList).refine(files => files.length > 0, "Certificado RNT requerido"),
    numeroMatriculaMercantil: z.string().min(5, "Número de matrícula mercantil requerido"), // Nuevo campo
    fotoCertificadoCamara: z.instanceof(FileList).refine(files => files.length > 0, "Certificado de Cámara de Comercio requerido"),
    
    // Se eliminan 'codigoMatriculaMercantil' que es redundante con 'numeroMatriculaMercantil'
});

// FRONTEND/src/pages/RegisterPage.jsx (DatosGenerales)

const DatosGenerales = ({ register, errors, isProvisor = false }) => (
    <div className="form-section general-data-section">
        <h3>1. Datos Generales {isProvisor ? "del Representante" : ""}</h3>
        <div className="form-grid">
            
            {/* NOMBRE */}
            <div>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" placeholder="Tu Nombre" {...register("nombre")} />
                {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}
            </div>
            
            {/* APELLIDO */}
            <div>
                <label htmlFor="apellido">Apellido</label>
                <input type="text" id="apellido" placeholder="Tu Apellido" {...register("apellido")} />
                {errors.apellido && <p className="error-message">{errors.apellido.message}</p>}
            </div>

            {/* FECHA DE NACIMIENTO */}
            <div>
                <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                <input type="date" id="fechaNacimiento" {...register("fechaNacimiento")} />
                {errors.fechaNacimiento && <p className="error-message">{errors.fechaNacimiento.message}</p>}
            </div>

            {/* NÚMERO TELEFÓNICO */}
            <div>
                <label htmlFor="numeroTelefonico">Teléfono</label>
                <input type="tel" id="numeroTelefonico" placeholder="Ej: 3001234567" {...register("numeroTelefonico")} />
                {errors.numeroTelefonico && <p className="error-message">{errors.numeroTelefonico.message}</p>}
            </div>
            
            {/* TIPO IDENTIFICACIÓN */}
            <div>
                <label htmlFor="tipoIdentificacion">Tipo de Identificación</label>
                <select id="tipoIdentificacion" {...register("tipoIdentificacion")}>
                    <option value="">Selecciona el tipo</option>
                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                    <option value="CE">Cédula de Extranjería (CE)</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="Otro">Otro</option>
                </select>
                {errors.tipoIdentificacion && <p className="error-message">{errors.tipoIdentificacion.message}</p>}
            </div>

            {/* NÚMERO IDENTIFICACIÓN */}
            <div>
                <label htmlFor="numIdentificacion">Número de Identificación</label>
                <input type="text" id="numIdentificacion" placeholder="Número" {...register("numIdentificacion")} />
                {errors.numIdentificacion && <p className="error-message">{errors.numIdentificacion.message}</p>}
            </div>
            
            {/* FOTO DOCUMENTO IDENTIFICACIÓN */}
            <div className="full-width">
                <label htmlFor="fotoDocumento">Foto del Documento de Identificación</label>
                <input type="file" id="fotoDocumento" accept="image/*" {...register("fotoDocumento")} />
                {errors.fotoDocumento && <p className="error-message">{errors.fotoDocumento.message}</p>}
            </div>

            {/* EMAIL (Credenciales) */}
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="correo@ejemplo.com" {...register("email")} />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>

            {/* CONTRASEÑA (Credenciales) */}
            <div>
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" placeholder="Mínimo 8 caracteres" {...register("password")} />
                {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
        </div>
    </div>
);
// =========================================================
// COMPONENTE 2: FORMULARIO TURISTA
// =========================================================
// FRONTEND/src/pages/RegisterPage.jsx (TuristaForm)

const TuristaForm = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(TuristaSchema),
    });

    const onSubmit = (data) => {
        // Añadir tipoUsuario al objeto de datos antes de enviarlo al backend
        const finalData = { ...data, tipoUsuario: 'turista' }; 
        console.log("Datos Turista Válidos:", finalData);
        alert("¡Registro de Turista Válido!");
    };

    return (
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <DatosGenerales register={register} errors={errors} /> 

            <div className="form-section tourist-data-section">
                <h3>2. Datos de Residencia y Contacto</h3>
                <div className="form-grid">
                    
                    {/* PAÍS RESIDENCIA */}
                    <div>
                        <label htmlFor="paisResidencia">País de Residencia</label>
                        <input type="text" id="paisResidencia" placeholder="Tu país" {...register("paisResidencia")} />
                        {errors.paisResidencia && <p className="error-message">{errors.paisResidencia.message}</p>}
                    </div>
                    
                    {/* IDIOMA PREFERIDO */}
                    <div>
                        <label htmlFor="idiomaPreferido">Idioma Preferido</label>
                        <select id="idiomaPreferido" {...register("idiomaPreferido")}>
                            <option value="">Selecciona un idioma</option>
                            <option value="espanol">Español</option>
                            <option value="ingles">Inglés</option>
                            <option value="otro">Otro</option>
                        </select>
                        {errors.idiomaPreferido && <p className="error-message">{errors.idiomaPreferido.message}</p>}
                    </div>

                    {/* DIRECCIÓN DE RESIDENCIA */}
                    <div className="full-width">
                        <label htmlFor="direccionResidencia">Dirección de Residencia</label>
                        <input type="text" id="direccionResidencia" placeholder="Dirección completa" {...register("direccionResidencia")} />
                        {errors.direccionResidencia && <p className="error-message">{errors.direccionResidencia.message}</p>}
                    </div>
                    
                    {/* CONTACTO DE EMERGENCIA */}
                    <div>
                        <label htmlFor="contactoEmergencia">Nombre Contacto de Emergencia</label>
                        <input type="text" id="contactoEmergencia" placeholder="Nombre" {...register("contactoEmergencia")} />
                        {errors.contactoEmergencia && <p className="error-message">{errors.contactoEmergencia.message}</p>}
                    </div>

                    {/* NÚMERO CONTACTO EMERGENCIA */}
                    <div>
                        <label htmlFor="numeroContactoEmergencia">Teléfono Contacto de Emergencia</label>
                        <input type="tel" id="numeroContactoEmergencia" placeholder="Número telefónico" {...register("numeroContactoEmergencia")} />
                        {errors.numeroContactoEmergencia && <p className="error-message">{errors.numeroContactoEmergencia.message}</p>}
                    </div>
                    
                </div>
            </div>
            <button type="submit" className="btn-register-submit">REGISTRARME COMO TURISTA</button>
        </form>
    );
};

const COLOMBIAN_CITIES = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 'Bucaramanga', 'Pereira', 'Santa Marta', 'Otro'];

const ProvisorIndividualForm = ({ onProfileChange }) => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(ProvisorIndividualSchema),
    });

    const onSubmit = (data) => {
        // Añadir tipoUsuario al objeto de datos antes de enviarlo al backend
        const finalData = { ...data, tipoUsuario: 'prestador_servicio' };
        console.log("Datos Prestador Individual Válidos:", finalData);
        alert("¡Registro de Prestador Individual Válido!");
    };
    
    return (
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <button type="button" className="btn-back-profile" onClick={() => onProfileChange('proveedor_selector')}>← Cambiar Tipo de Provisor</button>
            
            <DatosGenerales register={register} errors={errors} isProvisor={true} />

            <div className="form-section provisor-individual-data-section">
                <h3>2. Datos de Servicio y Documentación</h3>
                <div className="form-grid">
                    
                    {/* AFILIADO SEGURIDAD SOCIAL */}
                    <div>
                        <label htmlFor="afiliadoSeguridadSocial">¿Afiliado a Seguridad Social?</label>
                        <select id="afiliadoSeguridadSocial" {...register("afiliadoSeguridadSocial")}>
                            <option value="">Selecciona</option>
                            <option value="si">Sí</option>
                            <option value="no">No</option>
                        </select>
                        {errors.afiliadoSeguridadSocial && <p className="error-message">{errors.afiliadoSeguridadSocial.message}</p>}
                    </div>

                    {/* MUNICIPIO TRABAJO */}
                    <div>
                        <label htmlFor="municipioTrabajo">Municipio donde opera</label>
                        <select id="municipioTrabajo" {...register("municipioTrabajo")}>
                            <option value="">Selecciona un municipio</option>
                            {COLOMBIAN_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                        </select>
                        {errors.municipioTrabajo && <p className="error-message">{errors.municipioTrabajo.message}</p>}
                    </div>

                    {/* DIRECCIÓN REGISTRO */}
                    <div className="full-width">
                        <label htmlFor="direccionRegistro">Dirección de Registro (Personal/Comercial)</label>
                        <input type="text" id="direccionRegistro" placeholder="Dirección completa" {...register("direccionRegistro")} />
                        {errors.direccionRegistro && <p className="error-message">{errors.direccionRegistro.message}</p>}
                    </div>

                    {/* NÚMERO MATRÍCULA COMERCIANTE */}
                    <div>
                        <label htmlFor="numeroMatriculaComerciante">Número Matrícula Comerciante</label>
                        <input type="text" id="numeroMatriculaComerciante" placeholder="Número de matrícula" {...register("numeroMatriculaComerciante")} />
                        {errors.numeroMatriculaComerciante && <p className="error-message">{errors.numeroMatriculaComerciante.message}</p>}
                    </div>

                    {/* FOTO RUT */}
                    <div>
                        <label htmlFor="fotoRut" className="file-label">Foto del RUT</label>
                        <input type="file" id="fotoRut" accept="image/*" {...register("fotoRut")} />
                        {errors.fotoRut && <p className="error-message">{errors.fotoRut.message}</p>}
                    </div>
                    
                    {/* FOTO MATRÍCULA COMERCIANTE */}
                    <div>
                        <label htmlFor="fotoMatriculaComerciante" className="file-label">Foto Matrícula Comerciante</label>
                        <input type="file" id="fotoMatriculaComerciante" accept="image/*" {...register("fotoMatriculaComerciante")} />
                        {errors.fotoMatriculaComerciante && <p className="error-message">{errors.fotoMatriculaComerciante.message}</p>}
                    </div>

                    {/* FOTO PERMISO ALCALDÍA */}
                    <div>
                        <label htmlFor="fotoPermisoAlcaldia" className="file-label">Foto Permiso Alcaldía</label>
                        <input type="file" id="fotoPermisoAlcaldia" accept="image/*" {...register("fotoPermisoAlcaldia")} />
                        {errors.fotoPermisoAlcaldia && <p className="error-message">{errors.fotoPermisoAlcaldia.message}</p>}
                    </div>
                    
                </div>
            </div>
            <button type="submit" className="btn-register-submit">REGISTRARME COMO PRESTADOR INDIVIDUAL</button>
        </form>
    );
};
// =========================================================
// COMPONENTE 4: FORMULARIO EMPRESA PRESTADORA (CORREGIDO)
// =========================================================
const EmpresaPrestadoraForm = ({ onProfileChange }) => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(EmpresaPrestadoraSchema),
    });
    
    // Categorías de la empresa (Enum)
    const categorias = [
        "Hospedaje", "Tours", "Guias", "Transporte", "Aventura", 
        "Salud", "Otro" // Añadí 'Otro' por si acaso
    ];

    const onSubmit = (data) => {
        // Añadir tipoUsuario al objeto de datos antes de enviarlo al backend
        const finalData = { ...data, tipoUsuario: 'prestador_servicio' };
        console.log("Datos Empresa Prestadora Válidos:", finalData);
        alert("¡Registro de Empresa Prestadora Válido!");
    };

    return (
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <button type="button" className="btn-back-profile" onClick={() => onProfileChange('proveedor_selector')}>← Cambiar Tipo de Provisor</button>
            
            <DatosGenerales register={register} errors={errors} isProvisor={true} />

            <div className="form-section company-data-section">
                <h3>2. Datos de Registro de la Empresa</h3>
                <div className="form-grid">
                    
                    {/* RAZÓN SOCIAL */}
                    <div>
                        <label htmlFor="nombreRazonSocial">Nombre de la Empresa (Razón Social)</label>
                        <input type="text" id="nombreRazonSocial" placeholder="Nombre completo de la empresa" {...register("nombreRazonSocial")} />
                        {errors.nombreRazonSocial && <p className="error-message">{errors.nombreRazonSocial.message}</p>}
                    </div>
                    
                    {/* RNT EMPRESA */}
                    <div>
                        <label htmlFor="rntEmpresa">RNT de la Empresa</label>
                        <input type="text" id="rntEmpresa" placeholder="Registro Nacional de Turismo" {...register("rntEmpresa")} />
                        {errors.rntEmpresa && <p className="error-message">{errors.rntEmpresa.message}</p>}
                    </div>

                    {/* DIRECCIÓN */}
                    <div className="full-width">
                        <label htmlFor="direccionEmpresa">Dirección de la Empresa</label>
                        <input type="text" id="direccionEmpresa" placeholder="Dirección física" {...register("direccionEmpresa")} />
                        {errors.direccionEmpresa && <p className="error-message">{errors.direccionEmpresa.message}</p>}
                    </div>
                    
                    {/* CATEGORÍA */}
                    <div>
                        <label htmlFor="categoriaEmpresa">Categoría de la Empresa</label>
                        <select id="categoriaEmpresa" {...register("categoriaEmpresa")}>
                            <option value="">Selecciona una Categoría</option>
                            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        {errors.categoriaEmpresa && <p className="error-message">{errors.categoriaEmpresa.message}</p>}
                    </div>

                    {/* NÚMERO MATRÍCULA MERCANTIL */}
                    <div>
                        <label htmlFor="numeroMatriculaMercantil">Número de Matrícula Mercantil</label>
                        <input type="text" id="numeroMatriculaMercantil" placeholder="Número de matrícula" {...register("numeroMatriculaMercantil")} />
                        {errors.numeroMatriculaMercantil && <p className="error-message">{errors.numeroMatriculaMercantil.message}</p>}
                    </div>

                    {/* FOTO CERTIFICADO RNT */}
                    <div>
                        <label htmlFor="fotoRntCertificado" className="file-label">Foto del Certificado RNT</label>
                        <input type="file" id="fotoRntCertificado" accept="image/*" {...register("fotoRntCertificado")} />
                        {errors.fotoRntCertificado && <p className="error-message">{errors.fotoRntCertificado.message}</p>}
                    </div>
                    
                    {/* FOTO CÁMARA DE COMERCIO */}
                    <div>
                        <label htmlFor="fotoCertificadoCamara" className="file-label">Foto Certificado Cámara de Comercio</label>
                        <input type="file" id="fotoCertificadoCamara" accept="image/*" {...register("fotoCertificadoCamara")} />
                        {errors.fotoCertificadoCamara && <p className="error-message">{errors.fotoCertificadoCamara.message}</p>}
                    </div>
                    
                </div>
            </div>
            <button type="submit" className="btn-register-submit">REGISTRAR MI EMPRESA PRESTADORA</button>
        </form>
    );
};

// =========================================================
// COMPONENTE 5: SELECTOR DE TIPO DE PRESTADOR
// =========================================================
const ProvisorTypeSelector = ({ onProfileSelect }) => (
    <div className="register-type-selector-container">
        <h2 className="register-title">¿Qué tipo de prestador eres?</h2>
        <div className="selector-buttons">
            <button 
                className="btn-role-select btn-individual"
                onClick={() => onProfileSelect('individual')}
            >
                Soy Prestador Individual
            </button>
            <button 
                className="btn-role-select btn-empresa"
                onClick={() => onProfileSelect('empresa')}
            >
                Soy Empresa Prestadora
            </button>
        </div>
    </div>
);


// =========================================================
// COMPONENTE PRINCIPAL DE REGISTRO (RegisterPage)
// =========================================================
function RegisterPage() {
    // Estado para controlar el rol seleccionado: null, 'turista', 'proveedor_selector', 'individual', 'empresa'
    const [selectedRole, setSelectedRole] = useState(null); 

    const renderForm = () => {
        switch (selectedRole) {
            case 'turista':
                return <TuristaForm />;
            case 'individual':
                return <ProvisorIndividualForm onProfileChange={setSelectedRole} />;
            case 'empresa':
                return <EmpresaPrestadoraForm onProfileChange={setSelectedRole} />;
            case 'proveedor_selector':
                return <ProvisorTypeSelector onProfileSelect={setSelectedRole} />;
            case null:
            default:
                return (
                    <div className="register-role-selector-container">
                        <h2 className="register-title">Quiero Registrarme como:</h2>
                        <div className="selector-buttons">
                            <button 
                                className="btn-role-select btn-turista"
                                onClick={() => setSelectedRole('turista')}
                            >
                                Soy Turista
                            </button>
                            <button 
                                className="btn-role-select btn-proveedor"
                                onClick={() => setSelectedRole('proveedor_selector')}
                            >
                                Soy Prestador de Servicio
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="register-page-container">
            <div className="form-content-wrapper">
                {selectedRole && selectedRole !== 'proveedor_selector' && (
                    <button 
                        className="btn-back-main" 
                        onClick={() => setSelectedRole(null)}
                    >
                        ← Volver a Selección Principal
                    </button>
                )}
                
                {renderForm()}
            </div>
        </div>
    );
}

export default RegisterPage;