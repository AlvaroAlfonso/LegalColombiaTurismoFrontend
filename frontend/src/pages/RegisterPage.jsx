


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import './styles/RegisterPage.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Esquema Base (Datos Comunes para TODOS)
const BaseSchema = z.object({
    nombre: z.string().min(2, "Mínimo 2 caracteres").max(50, "Máximo 50 caracteres"),
    apellido: z.string().min(2, "Mínimo 2 caracteres").max(50, "Máximo 50 caracteres"),

    fecha_nacimiento: z.string().refine(val => {
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

    numero_telefonico: z.string().regex(/^\d{7,15}$/, "Número telefónico inválido (7-15 dígitos)"),

    // Datos de Identificación
    tipo_identificacion: z.enum(['CC', 'CE', 'Pasaporte', 'Otro'], { message: "Selecciona un tipo de identificación" }),
    num_identificacion: z.string().min(5, "Mínimo 5 dígitos"),

    // Archivo
    url_foto_documento: z.any().optional(), // Opcional

    // Tipo de Usuario
    nombre_tipo: z.enum(['TURISTA', 'PRESTADOR', 'EMPRESA']),
});

// 1. Esquema Turista (Extiende el Base)
const TuristaSchema = BaseSchema.extend({
    nombre_tipo: z.literal('TURISTA'),
    pais_residencia: z.string().min(3, "País de residencia requerido"),
    direccion_residencia: z.string().min(5, "Dirección requerida"),
    idioma_preferido: z.string().min(1, "Selecciona un idioma preferido"),
    contacto_emergencia_nombre: z.string().min(2, "Nombre de contacto requerido"),
    contacto_emergencia_telefono: z.string().regex(/^\d{7,15}$/, "Número de contacto de emergencia inválido"),
});

// 2. Esquema Prestador Individual (Extiende el Base)
const ProvisorIndividualSchema = BaseSchema.extend({
    nombre_tipo: z.literal('PRESTADOR'),

    // Ajustes solicitados
    estado_afiliacion_seguridad: z.enum(['si', 'no'], { message: "¿Afiliado a seguridad social?" }),

    // El municipio de trabajo
    municipio_operacion: z.string().min(1, "Selecciona el municipio donde puede trabajar"),

    lugar_prestacion_servicio: z.string().min(5, "Lugar de prestación requerido"),
    direccion_registro: z.string().min(5, "Dirección de registro requerida"),

    // Documentos
    url_rut: z.any().optional(),
    matricula_comerciante_ind: z.string().min(5, "Número de matrícula comercial requerido"),
    url_permiso_alcaldia: z.any().optional(),

    profesion_servicio_principal: z.string().min(3, "Profesión requerida"),
});

// 3. Esquema Empresa Prestadora (Extiende el Base)
const EmpresaPrestadoraSchema = BaseSchema.extend({
    nombre_tipo: z.literal('EMPRESA'),

    // Datos de la Empresa
    nit_empresa: z.string().min(5, "NIT requerido"),
    nombre_razon_social: z.string().min(5, "Razón social requerida"),
    direccion: z.string().min(5, "Dirección de la empresa requerida"),
    categoria_empresa: z.enum(['Hospedaje', 'Tours', 'Guias', 'Transporte', 'Aventura', 'Salud', 'Otro'], { message: "Selecciona una categoría" }),
    rnt_empresa: z.string().min(5, "RNT requerido"),
    url_rnt_certificado: z.any().optional(),
    matricula_mercantil: z.string().min(5, "Número de matrícula mercantil requerido"),
    url_cert_camara_comercio: z.any().optional(),
});

const toFormData = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (value instanceof FileList) {
            if (value.length > 0) formData.append(key, value[0]);
            return;
        }
        formData.append(key, value);
    });
    return formData;
};

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
                <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
                <input type="date" id="fecha_nacimiento" {...register("fecha_nacimiento")} />
                {errors.fecha_nacimiento && <p className="error-message">{errors.fecha_nacimiento.message}</p>}
            </div>

            {/* NÚMERO TELEFÓNICO */}
            <div>
                <label htmlFor="numero_telefonico">Teléfono</label>
                <input type="tel" id="numero_telefonico" placeholder="Ej: 3001234567" {...register("numero_telefonico")} />
                {errors.numero_telefonico && <p className="error-message">{errors.numero_telefonico.message}</p>}
            </div>

            {/* TIPO IDENTIFICACIÓN */}
            <div>
                <label htmlFor="tipo_identificacion">Tipo de Identificación</label>
                <select id="tipo_identificacion" {...register("tipo_identificacion")}>
                    <option value="">Selecciona el tipo</option>
                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                    <option value="CE">Cédula de Extranjería (CE)</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="Otro">Otro</option>
                </select>
                {errors.tipo_identificacion && <p className="error-message">{errors.tipo_identificacion.message}</p>}
            </div>

            {/* NÚMERO IDENTIFICACIÓN */}
            <div>
                <label htmlFor="num_identificacion">Número de Identificación</label>
                <input type="text" id="num_identificacion" placeholder="Número" {...register("num_identificacion")} />
                {errors.num_identificacion && <p className="error-message">{errors.num_identificacion.message}</p>}
            </div>

            {/* FOTO DOCUMENTO IDENTIFICACIÓN */}
            <div className="full-width">
                <label htmlFor="url_foto_documento">Foto del Documento de Identificación</label>
                <input type="file" id="url_foto_documento" accept="image/*" {...register("url_foto_documento")} />
                {errors.url_foto_documento && <p className="error-message">{errors.url_foto_documento.message}</p>}
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

const TuristaForm = ({ onRegister, loading, error }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(TuristaSchema),
        defaultValues: { nombre_tipo: 'TURISTA' },
    });

    const onInvalid = (formErrors) => {
        console.error("Errores de validación (Turista):", formErrors);
    };

    const onSubmit = async (data) => {
        const finalData = { ...data, nombre_tipo: 'TURISTA' };
        const formData = toFormData(finalData);
        await onRegister(formData, 'turista');
    };

    return (
        <form className="register-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <DatosGenerales register={register} errors={errors} />
            <input type="hidden" value="TURISTA" {...register("nombre_tipo")} />

            <div className="form-section tourist-data-section">
                <h3>2. Datos de Residencia y Contacto</h3>
                <div className="form-grid">

                    {/* PAÍS RESIDENCIA */}
                    <div>
                        <label htmlFor="pais_residencia">País de Residencia</label>
                        <input type="text" id="pais_residencia" placeholder="Tu país" {...register("pais_residencia")} />
                        {errors.pais_residencia && <p className="error-message">{errors.pais_residencia.message}</p>}
                    </div>

                    {/* IDIOMA PREFERIDO */}
                    <div>
                        <label htmlFor="idioma_preferido">Idioma Preferido</label>
                        <select id="idioma_preferido" {...register("idioma_preferido")}>
                            <option value="">Selecciona un idioma</option>
                            <option value="espanol">Español</option>
                            <option value="ingles">Inglés</option>
                            <option value="otro">Otro</option>
                        </select>
                        {errors.idioma_preferido && <p className="error-message">{errors.idioma_preferido.message}</p>}
                    </div>

                    {/* DIRECCIÓN DE RESIDENCIA */}
                    <div className="full-width">
                        <label htmlFor="direccion_residencia">Dirección de Residencia</label>
                        <input type="text" id="direccion_residencia" placeholder="Dirección completa" {...register("direccion_residencia")} />
                        {errors.direccion_residencia && <p className="error-message">{errors.direccion_residencia.message}</p>}
                    </div>

                    {/* CONTACTO DE EMERGENCIA */}
                    <div>
                        <label htmlFor="contacto_emergencia_nombre">Nombre Contacto de Emergencia</label>
                        <input type="text" id="contacto_emergencia_nombre" placeholder="Nombre" {...register("contacto_emergencia_nombre")} />
                        {errors.contacto_emergencia_nombre && <p className="error-message">{errors.contacto_emergencia_nombre.message}</p>}
                    </div>

                    {/* NÚMERO CONTACTO EMERGENCIA */}
                    <div>
                        <label htmlFor="contacto_emergencia_telefono">Teléfono Contacto de Emergencia</label>
                        <input type="tel" id="contacto_emergencia_telefono" placeholder="Número telefónico" {...register("contacto_emergencia_telefono")} />
                        {errors.contacto_emergencia_telefono && <p className="error-message">{errors.contacto_emergencia_telefono.message}</p>}
                    </div>

                </div>
            </div>
            <button type="submit" className="btn-register-submit" disabled={loading}>
                {loading ? 'Enviando...' : 'REGISTRARME COMO TURISTA'}
            </button>
            {error && <p className="error-message">{String(error)}</p>}
        </form>
    );
};

const COLOMBIAN_CITIES = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 'Bucaramanga', 'Pereira', 'Santa Marta', 'Otro'];

const ProvisorIndividualForm = ({ onProfileChange, onRegister, loading, error }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(ProvisorIndividualSchema),
        defaultValues: { nombre_tipo: 'PRESTADOR' },
    });

    const onInvalid = (formErrors) => {
        console.error("Errores de validación (Prestador individual):", formErrors);
    };

    const onSubmit = async (data) => {
        const finalData = { ...data, nombre_tipo: 'PRESTADOR' };
        const formData = toFormData(finalData);
        await onRegister(formData, 'prestador_servicio');
    };

    return (
        <form className="register-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <button type="button" className="btn-back-profile" onClick={() => onProfileChange('proveedor_selector')}>← Cambiar Tipo de Provisor</button>

            <DatosGenerales register={register} errors={errors} isProvisor={true} />
            <input type="hidden" value="PRESTADOR" {...register("nombre_tipo")} />

            <div className="form-section provisor-individual-data-section">
                <h3>2. Datos de Servicio y Documentación</h3>
                <div className="form-grid">

                    {/* PROFESIÓN / SERVICIO PRINCIPAL */}
                    <div>
                        <label htmlFor="profesion_servicio_principal">Profesión o Servicio Principal</label>
                        <input type="text" id="profesion_servicio_principal" placeholder="Ej: Guía Turístico" {...register("profesion_servicio_principal")} />
                        {errors.profesion_servicio_principal && <p className="error-message">{errors.profesion_servicio_principal.message}</p>}
                    </div>

                    {/* LUGAR DE PRESTACIÓN */}
                    <div>
                        <label htmlFor="lugar_prestacion_servicio">Lugar de Prestación del Servicio</label>
                        <input type="text" id="lugar_prestacion_servicio" placeholder="Ej: Parque Central" {...register("lugar_prestacion_servicio")} />
                        {errors.lugar_prestacion_servicio && <p className="error-message">{errors.lugar_prestacion_servicio.message}</p>}
                    </div>

                    {/* AFILIADO SEGURIDAD SOCIAL */}
                    <div>
                        <label htmlFor="estado_afiliacion_seguridad">¿Afiliado a Seguridad Social?</label>
                        <select id="estado_afiliacion_seguridad" {...register("estado_afiliacion_seguridad")}>
                            <option value="">Selecciona</option>
                            <option value="si">Sí</option>
                            <option value="no">No</option>
                        </select>
                        {errors.estado_afiliacion_seguridad && <p className="error-message">{errors.estado_afiliacion_seguridad.message}</p>}
                    </div>

                    {/* MUNICIPIO TRABAJO */}
                    <div>
                        <label htmlFor="municipio_operacion">Municipio donde opera</label>
                        <select id="municipio_operacion" {...register("municipio_operacion")}>
                            <option value="">Selecciona un municipio</option>
                            {COLOMBIAN_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                        </select>
                        {errors.municipio_operacion && <p className="error-message">{errors.municipio_operacion.message}</p>}
                    </div>

                    {/* DIRECCIÓN REGISTRO */}
                    <div className="full-width">
                        <label htmlFor="direccion_registro">Dirección de Registro (Personal/Comercial)</label>
                        <input type="text" id="direccion_registro" placeholder="Dirección completa" {...register("direccion_registro")} />
                        {errors.direccion_registro && <p className="error-message">{errors.direccion_registro.message}</p>}
                    </div>

                    {/* NÚMERO MATRÍCULA COMERCIANTE */}
                    <div>
                        <label htmlFor="matricula_comerciante_ind">Número Matrícula Comerciante</label>
                        <input type="text" id="matricula_comerciante_ind" placeholder="Número de matrícula" {...register("matricula_comerciante_ind")} />
                        {errors.matricula_comerciante_ind && <p className="error-message">{errors.matricula_comerciante_ind.message}</p>}
                    </div>

                    {/* FOTO RUT */}
                    <div>
                        <label htmlFor="url_rut" className="file-label">Foto del RUT</label>
                        <input type="file" id="url_rut" accept="image/*" {...register("url_rut")} />
                        {errors.url_rut && <p className="error-message">{errors.url_rut.message}</p>}
                    </div>

                    {/* FOTO PERMISO ALCALDÍA */}
                    <div>
                        <label htmlFor="url_permiso_alcaldia" className="file-label">Foto Permiso Alcaldía</label>
                        <input type="file" id="url_permiso_alcaldia" accept="image/*" {...register("url_permiso_alcaldia")} />
                        {errors.url_permiso_alcaldia && <p className="error-message">{errors.url_permiso_alcaldia.message}</p>}
                    </div>

                </div>
            </div>
            <button type="submit" className="btn-register-submit" disabled={loading}>
                {loading ? 'Enviando...' : 'REGISTRARME COMO PRESTADOR INDIVIDUAL'}
            </button>
            {error && <p className="error-message">{String(error)}</p>}
        </form>
    );
};
// =========================================================
// COMPONENTE 4: FORMULARIO EMPRESA PRESTADORA (CORREGIDO)
// =========================================================
const EmpresaPrestadoraForm = ({ onProfileChange, onRegister, loading, error }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(EmpresaPrestadoraSchema),
        defaultValues: { nombre_tipo: 'EMPRESA' },
    });

    // Categorías de la empresa (Enum)
    const categorias = [
        "Hospedaje", "Tours", "Guias", "Transporte", "Aventura",
        "Salud", "Otro" // Añadí 'Otro' por si acaso
    ];

    const onInvalid = (formErrors) => {
        console.error("Errores de validación (Empresa):", formErrors);
    };

    const onSubmit = async (data) => {
        const finalData = { ...data, nombre_tipo: 'EMPRESA' };
        const formData = toFormData(finalData);
        await onRegister(formData, 'empresa');
        console.log("Form data:", formData);
    };

    return (
        <form className="register-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <button type="button" className="btn-back-profile" onClick={() => onProfileChange('proveedor_selector')}>← Cambiar Tipo de Provisor</button>

            <DatosGenerales register={register} errors={errors} isProvisor={true} />
            <input type="hidden" value="EMPRESA" {...register("nombre_tipo")} />

            <div className="form-section company-data-section">
                <h3>2. Datos de Registro de la Empresa</h3>
                <div className="form-grid">

                    {/* NIT EMPRESA */}
                    <div>
                        <label htmlFor="nit_empresa">NIT de la Empresa</label>
                        <input type="text" id="nit_empresa" placeholder="NIT (sin dígito de verificación ni guiones)" {...register("nit_empresa")} />
                        {errors.nit_empresa && <p className="error-message">{errors.nit_empresa.message}</p>}
                    </div>

                    {/* RAZÓN SOCIAL */}
                    <div>
                        <label htmlFor="nombre_razon_social">Nombre de la Empresa (Razón Social)</label>
                        <input type="text" id="nombre_razon_social" placeholder="Nombre completo de la empresa" {...register("nombre_razon_social")} />
                        {errors.nombre_razon_social && <p className="error-message">{errors.nombre_razon_social.message}</p>}
                    </div>

                    {/* RNT EMPRESA */}
                    <div>
                        <label htmlFor="rnt_empresa">RNT de la Empresa</label>
                        <input type="text" id="rnt_empresa" placeholder="Registro Nacional de Turismo" {...register("rnt_empresa")} />
                        {errors.rnt_empresa && <p className="error-message">{errors.rnt_empresa.message}</p>}
                    </div>

                    {/* DIRECCIÓN */}
                    <div className="full-width">
                        <label htmlFor="direccion">Dirección de la Empresa</label>
                        <input type="text" id="direccion" placeholder="Dirección física" {...register("direccion")} />
                        {errors.direccion && <p className="error-message">{errors.direccion.message}</p>}
                    </div>

                    {/* CATEGORÍA */}
                    <div>
                        <label htmlFor="categoria_empresa">Categoría de la Empresa</label>
                        <select id="categoria_empresa" {...register("categoria_empresa")}>
                            <option value="">Selecciona una Categoría</option>
                            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        {errors.categoria_empresa && <p className="error-message">{errors.categoria_empresa.message}</p>}
                    </div>

                    {/* NÚMERO MATRÍCULA MERCANTIL */}
                    <div>
                        <label htmlFor="matricula_mercantil">Número de Matrícula Mercantil</label>
                        <input type="text" id="matricula_mercantil" placeholder="Número de matrícula" {...register("matricula_mercantil")} />
                        {errors.matricula_mercantil && <p className="error-message">{errors.matricula_mercantil.message}</p>}
                    </div>

                    {/* FOTO CERTIFICADO RNT */}
                    <div>
                        <label htmlFor="url_rnt_certificado" className="file-label">Foto del Certificado RNT</label>
                        <input type="file" id="url_rnt_certificado" accept="image/*" {...register("url_rnt_certificado")} />
                        {errors.url_rnt_certificado && <p className="error-message">{errors.url_rnt_certificado.message}</p>}
                    </div>

                    {/* FOTO CÁMARA DE COMERCIO */}
                    <div>
                        <label htmlFor="url_cert_camara_comercio" className="file-label">Foto Certificado Cámara de Comercio</label>
                        <input type="file" id="url_cert_camara_comercio" accept="image/*" {...register("url_cert_camara_comercio")} />
                        {errors.url_cert_camara_comercio && <p className="error-message">{errors.url_cert_camara_comercio.message}</p>}
                    </div>

                </div>
            </div>
            <button type="submit" className="btn-register-submit" disabled={loading}>
                {loading ? 'Enviando...' : 'REGISTRAR MI EMPRESA PRESTADORA'}
            </button>
            {error && <p className="error-message">{String(error)}</p>}
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
    const { register: registerUser, loading, error } = useAuth();
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(null);

    const handleRegister = async (formData, roleKey) => {
        setSubmitError(null);
        setSubmitSuccess(null);
        try {
            const response = await registerUser(formData);
            const role = response?.role || response?.usuario?.nombre_tipo || roleKey;
            setSubmitSuccess('Registro exitoso, redirigiendo...');
            // Redirige según rol después de registro
            if (role === 'TURISTA' || role === 'turista') {
                navigate('/dashboard-turista');
            } else if (role === 'EMPRESA' || role === 'empresa') {
                navigate('/dashboard-empresa');
            } else {
                navigate('/dashboard-proveedor');
            }
        } catch (err) {
            console.error("Error en registro:", err?.response || err);
            const raw = err?.response?.data;
            const message =
                raw?.detail ||
                raw?.error ||
                (typeof raw === 'string' ? raw : '') ||
                'No pudimos registrar. Revisa los datos.';
            setSubmitError(message);
        }
    };

    const renderForm = () => {
        switch (selectedRole) {
            case 'turista':
                return <TuristaForm onRegister={handleRegister} loading={loading} error={error} />;
            case 'individual':
                return <ProvisorIndividualForm onProfileChange={setSelectedRole} onRegister={handleRegister} loading={loading} error={error} />;
            case 'empresa':
                return <EmpresaPrestadoraForm onProfileChange={setSelectedRole} onRegister={handleRegister} loading={loading} error={error} />;
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
                {(submitError || submitSuccess) && (
                    <div className={submitError ? "form-status error" : "form-status success"}>
                        {submitError || submitSuccess}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RegisterPage;