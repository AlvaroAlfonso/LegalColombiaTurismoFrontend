


import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import './styles/RegisterPage.css';


const BaseSchema = z.object({
    nombre: z.string().min(2, "Mínimo 2 caracteres").max(50, "Máximo 50 caracteres"),
    apellido: z.string().min(2, "Mínimo 2 caracteres").max(50, "Máximo 50 caracteres"),
    
    fechaNacimiento: z.string().refine(val => {
        const date = new Date(val);
        // Validar que la fecha sea válida y que el usuario sea mayor de edad (aprox 18 años)
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
        return date < eighteenYearsAgo;
    }, {
        message: "Debes ser mayor de 18 años"
    }),

    email: z.string().email("Formato de correo inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres, usa letras y números"),
    
    numeroTelefonico: z.string().regex(/^\d{7,15}$/, "Número telefónico inválido"),
    tipoIdentificacion: z.string().min(1, "Selecciona un tipo"),
    numIdentificacion: z.string().min(5, "Mínimo 5 dígitos"),
    
    // Validar archivos subidos
    fotoDocumento: z.instanceof(FileList).refine(files => files.length > 0, "Documento de identificación requerido"),
});

// 1. Esquema Turista (Extiende el Base)
const TuristaSchema = BaseSchema.extend({
    paisResidencia: z.string().min(3, "País de residencia requerido"),
    direccionResidencia: z.string().min(5, "Dirección requerida"),
    idiomaPreferido: z.string().min(1, "Selecciona un idioma"),
    contactoEmergencia: z.string().min(2, "Nombre de contacto requerido"),
    numeroContactoEmergencia: z.string().regex(/^\d{7,15}$/, "Número de contacto de emergencia inválido"),
});

// 2. Esquema Prestador Individual (Extiende el Base)
const ProvisorIndividualSchema = BaseSchema.extend({
    nombreProfesion: z.string().min(3, "Profesión/Certificación requerida"),
    nombreServicio: z.string().min(3, "Servicio turístico ofrecido requerido"),
    afiliadoSeguridadSocial: z.enum(['si', 'no'], { message: "Selecciona una opción" }),
    ciudadOperacion: z.string().min(3, "Ciudad de operación requerida"),
    fotoRut: z.instanceof(FileList).refine(files => files.length > 0, "Foto del RUT requerida"),
    fotoMatricula: z.instanceof(FileList).refine(files => files.length > 0, "Matrícula mercantil requerida"),
    fotoPermisoAlcaldia: z.instanceof(FileList).refine(files => files.length > 0, "Permiso de alcaldía requerido"),
});

// 3. Esquema Empresa Prestadora (Extiende el Base)
const EmpresaPrestadoraSchema = BaseSchema.extend({
    nombreRazonSocial: z.string().min(5, "Razón social requerida"),
    direccionEmpresa: z.string().min(5, "Dirección de la empresa requerida"),
    categoriaEmpresa: z.string().min(1, "Selecciona una categoría"),
    rntEmpresa: z.string().min(5, "RNT requerido"),
    fotoRntCertificado: z.instanceof(FileList).refine(files => files.length > 0, "Certificado RNT requerido"),
    codigoMatriculaMercantil: z.string().min(5, "Código de matrícula requerido"),
    fotoCertificadoCamara: z.instanceof(FileList).refine(files => files.length > 0, "Certificado de Cámara requerido"),
});

const DatosGenerales = ({ register, errors, isProvisor = false }) => (
    <div className="form-section general-data-section">
        <h3>1. Datos Generales {isProvisor ? "del Representante" : ""}</h3>
        <div className="form-grid">
            
            {/* NOMBRE */}
            <div>
                <input type="text" placeholder="Nombre" {...register("nombre")} />
                {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}
            </div>
            
            {/* APELLIDO */}
            <div>
                <input type="text" placeholder="Apellido" {...register("apellido")} />
                {errors.apellido && <p className="error-message">{errors.apellido.message}</p>}
            </div>
            {/* ... (resto de los campos de DatosGenerales con sus respectivas llamadas a register y errors) */}
        </div>
    </div>
);

// =========================================================
// COMPONENTE 2: FORMULARIO TURISTA
// =========================================================
// ... (Componente TuristaForm)
const TuristaForm = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(TuristaSchema), // <--- Usar el esquema de Turista
    });

    const onSubmit = (data) => {
        console.log("Datos Turista Válidos:", data);
        alert("¡Registro de Turista Válido!");
    };

    return (
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Pasar register y errors a DatosGenerales */}
            <DatosGenerales register={register} errors={errors} /> 

            <div className="form-section tourist-data-section">
                <h3>2. Datos de Residencia y Preferencias</h3>
                <div className="form-grid">
                    
                    {/* PAÍS RESIDENCIA */}
                    <div>
                        <input type="text" placeholder="País de Residencia" {...register("paisResidencia")} />
                        {errors.paisResidencia && <p className="error-message">{errors.paisResidencia.message}</p>}
                    </div>
                    {/* ... (resto de los campos de TuristaForm) */}
                    
                </div>
            </div>
            <button type="submit" className="btn-register-submit">REGISTRARME COMO TURISTA</button>
        </form>
    );
};
// =========================================================
// COMPONENTE 3: FORMULARIO PRESTADOR INDIVIDUAL
// =========================================================
// =========================================================
// COMPONENTE 3: FORMULARIO PRESTADOR INDIVIDUAL (CORREGIDO)
// =========================================================
const ProvisorIndividualForm = ({ onProfileChange }) => {
    // 1. Integrar useForm y Zod Resolver
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(ProvisorIndividualSchema), // <-- Usar el esquema Individual
    });

    const onSubmit = (data) => {
        console.log("Datos Prestador Individual Válidos:", data);
        alert("¡Registro de Prestador Individual Válido!");
    };
    
    return (
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <button type="button" className="btn-back-profile" onClick={() => onProfileChange('proveedor_selector')}>← Cambiar Tipo de Provisor</button>
            
            {/* 2. Pasar register y errors a DatosGenerales */}
            <DatosGenerales register={register} errors={errors} isProvisor={true} />

            <div className="form-section provisor-individual-data-section">
                <h3>2. Datos de Certificación Profesional</h3>
                <div className="form-grid">
                    
                    {/* NOMBRE PROFESIÓN */}
                    <div>
                        <input type="text" placeholder="Nombre de la Profesión/Certificación" {...register("nombreProfesion")} />
                        {errors.nombreProfesion && <p className="error-message">{errors.nombreProfesion.message}</p>}
                    </div>
                    
                    {/* NOMBRE SERVICIO */}
                    <div>
                        <input type="text" placeholder="Nombre del Servicio Turístico Ofrecido" {...register("nombreServicio")} />
                        {errors.nombreServicio && <p className="error-message">{errors.nombreServicio.message}</p>}
                    </div>

                    {/* SEGURIDAD SOCIAL */}
                    <div>
                        <select {...register("afiliadoSeguridadSocial")}>
                            <option value="">¿Afiliado a Seguridad Social?</option>
                            <option value="si">Sí</option>
                            <option value="no">No</option>
                        </select>
                        {errors.afiliadoSeguridadSocial && <p className="error-message">{errors.afiliadoSeguridadSocial.message}</p>}
                    </div>

                    {/* CIUDAD OPERACIÓN */}
                    <div>
                        <input type="text" placeholder="Ciudad donde puede operar" {...register("ciudadOperacion")} />
                        {errors.ciudadOperacion && <p className="error-message">{errors.ciudadOperacion.message}</p>}
                    </div>
                    
                    {/* FOTO RUT */}
                    <div>
                        <label htmlFor="fotoRut" className="file-label">Foto del RUT</label>
                        <input type="file" id="fotoRut" accept="image/*" {...register("fotoRut")} />
                        {errors.fotoRut && <p className="error-message">{errors.fotoRut.message}</p>}
                    </div>
                    
                    {/* FOTO MATRÍCULA */}
                    <div>
                        <label htmlFor="fotoMatricula" className="file-label">Foto de Matrícula Mercantil</label>
                        <input type="file" id="fotoMatricula" accept="image/*" {...register("fotoMatricula")} />
                        {errors.fotoMatricula && <p className="error-message">{errors.fotoMatricula.message}</p>}
                    </div>

                    {/* FOTO PERMISO ALCALDÍA */}
                    <div>
                        <label htmlFor="fotoPermisoAlcaldia" className="file-label">Foto de Permiso Alcaldía</label>
                        <input type="file" id="fotoPermisoAlcaldia" accept="image/*" {...register("fotoPermisoAlcaldia")} />
                        {errors.fotoPermisoAlcaldia && <p className="error-message">{errors.fotoPermisoAlcaldia.message}</p>}
                    </div>
                    
                    <div></div> 
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
    // 1. Integrar useForm y Zod Resolver
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(EmpresaPrestadoraSchema), // <-- Usar el esquema Empresa
    });
    
    // Categorías de la empresa (Enum)
    const categorias = [
        "Hospedaje", "Tours", "Guías", "Transporte", "Aventura", 
        "Recreación", "Salud", "Bienestar"
    ];

    const onSubmit = (data) => {
        console.log("Datos Empresa Prestadora Válidos:", data);
        alert("¡Registro de Empresa Prestadora Válido!");
    };

    return (
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <button type="button" className="btn-back-profile" onClick={() => onProfileChange('proveedor_selector')}>← Cambiar Tipo de Provisor</button>
            
            {/* 2. Pasar register y errors a DatosGenerales */}
            <DatosGenerales register={register} errors={errors} isProvisor={true} />

            <div className="form-section company-data-section">
                <h3>2. Datos de Registro de la Empresa</h3>
                <div className="form-grid">
                    
                    {/* RAZÓN SOCIAL */}
                    <div>
                        <input type="text" placeholder="Nombre de la Empresa (Razón Social)" {...register("nombreRazonSocial")} />
                        {errors.nombreRazonSocial && <p className="error-message">{errors.nombreRazonSocial.message}</p>}
                    </div>
                    
                    {/* DIRECCIÓN */}
                    <div>
                        <input type="text" placeholder="Dirección de la Empresa" {...register("direccionEmpresa")} />
                        {errors.direccionEmpresa && <p className="error-message">{errors.direccionEmpresa.message}</p>}
                    </div>
                    
                    {/* CATEGORÍA */}
                    <div>
                        <select {...register("categoriaEmpresa")}>
                            <option value="">Categoría de la Empresa</option>
                            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        {errors.categoriaEmpresa && <p className="error-message">{errors.categoriaEmpresa.message}</p>}
                    </div>

                    {/* RNT EMPRESA */}
                    <div>
                        <input type="text" placeholder="RNT de la Empresa" {...register("rntEmpresa")} />
                        {errors.rntEmpresa && <p className="error-message">{errors.rntEmpresa.message}</p>}
                    </div>
                    
                    {/* FOTO CERTIFICADO RNT */}
                    <div>
                        <label htmlFor="fotoRntCertificado" className="file-label">Foto del Certificado RNT</label>
                        <input type="file" id="fotoRntCertificado" accept="image/*" {...register("fotoRntCertificado")} />
                        {errors.fotoRntCertificado && <p className="error-message">{errors.fotoRntCertificado.message}</p>}
                    </div>

                    {/* CÓDIGO MATRÍCULA MERCANTIL */}
                    <div>
                        <input type="text" placeholder="Código Matrícula Mercantil" {...register("codigoMatriculaMercantil")} />
                        {errors.codigoMatriculaMercantil && <p className="error-message">{errors.codigoMatriculaMercantil.message}</p>}
                    </div>
                    
                    {/* FOTO CÁMARA DE COMERCIO */}
                    <div>
                        <label htmlFor="fotoCertificadoCamara" className="file-label">Foto Certificado Cámara de Comercio</label>
                        <input type="file" id="fotoCertificadoCamara" accept="image/*" {...register("fotoCertificadoCamara")} />
                        {errors.fotoCertificadoCamara && <p className="error-message">{errors.fotoCertificadoCamara.message}</p>}
                    </div>
                    <div></div> 
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