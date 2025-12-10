// src/components/EmployeeForm.jsx (NUEVO ARCHIVO)

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmployeeSchema } from '../schemas/EmployeeSchema'; // Ajustar ruta
import './styles/EmployeeForm.css'; // Lo crearemos a continuación

const DOC_TYPES = ['CC', 'CE', 'Pasaporte'];

const EmployeeForm = ({ onEmployeeSubmit, onCancel }) => {
    const { 
        register, 
        handleSubmit, 
        control, // Necesario para useFieldArray
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(EmployeeSchema), 
        defaultValues: {
            certificados: [{ 
                nombreCertificado: '', 
                tipoCertificado: '', 
                entidadEmisora: '',
                numeroRegistro: '',
                fechaExpedicion: '',
                fechaVencimiento: '',
            }]
        }
    });

    // Hook para manejar arrays (certificados)
    const { fields, append, remove } = useFieldArray({
        control,
        name: "certificados",
    });

    const onSubmit = (data) => {
        console.log("Datos de Empleado Válidos:", data);
        onEmployeeSubmit(data);
    };

    return (
        <div className="dashboard-content-box employee-form-container">
            <h3>👥 Registrar Nuevo Empleado</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                {/* -------------------- SECCIÓN 1: DATOS PERSONALES Y DE ACCESO -------------------- */}
                <h4>1. Información Personal y de Acceso</h4>
                <div className="form-grid">
                    <div>
                        <label>Nombre</label>
                        <input type="text" {...register("nombre")} />
                        {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}
                    </div>
                    <div>
                        <label>Apellido</label>
                        <input type="text" {...register("apellido")} />
                        {errors.apellido && <p className="error-message">{errors.apellido.message}</p>}
                    </div>
                    <div>
                        <label>Correo Electrónico</label>
                        <input type="email" {...register("correoElectronico")} />
                        {errors.correoElectronico && <p className="error-message">{errors.correoElectronico.message}</p>}
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input type="password" {...register("password")} />
                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </div>
                    {/* ... (resto de campos personales) ... */}
                    <div>
                        <label>Tipo Documento</label>
                        <select {...register("tipoDocumento")}>
                            <option value="">Selecciona</option>
                            {DOC_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                        {errors.tipoDocumento && <p className="error-message">{errors.tipoDocumento.message}</p>}
                    </div>
                    <div>
                        <label>Número Documento</label>
                        <input type="text" {...register("numeroDocumento")} />
                        {errors.numeroDocumento && <p className="error-message">{errors.numeroDocumento.message}</p>}
                    </div>
                    <div>
                        <label>Teléfono</label>
                        <input type="tel" {...register("numeroTelefonico")} />
                        {errors.numeroTelefonico && <p className="error-message">{errors.numeroTelefonico.message}</p>}
                    </div>
                    <div>
                        <label>Cargo en la Empresa</label>
                        <input type="text" {...register("cargo")} />
                        {errors.cargo && <p className="error-message">{errors.cargo.message}</p>}
                    </div>
                    <div className="full-width">
                        <label>Foto Documento de Identidad</label>
                        <input type="file" accept="image/*" {...register("fotoDocumento")} />
                        {errors.fotoDocumento && <p className="error-message">{errors.fotoDocumento.message}</p>}
                    </div>
                </div>

                {/* -------------------- SECCIÓN 2: CERTIFICADOS -------------------- */}
                <h4 style={{marginTop: '40px'}}>2. Certificados y Competencias</h4>
                {fields.map((item, index) => (
                    <div key={item.id} className="certificate-block">
                        <h5 className="certificate-title">Certificado #{index + 1}</h5>
                        <div className="form-grid certificate-grid">
                            
                            {/* Nombre y Tipo */}
                            <div>
                                <label>Nombre del Certificado</label>
                                <input type="text" {...register(`certificados.${index}.nombreCertificado`)} />
                                {errors.certificados?.[index]?.nombreCertificado && <p className="error-message">{errors.certificados[index].nombreCertificado.message}</p>}
                            </div>
                            <div>
                                <label>Tipo de Certificado</label>
                                <input type="text" {...register(`certificados.${index}.tipoCertificado`)} />
                                {errors.certificados?.[index]?.tipoCertificado && <p className="error-message">{errors.certificados[index].tipoCertificado.message}</p>}
                            </div>

                            {/* Entidad y Registro */}
                            <div>
                                <label>Entidad Emisora</label>
                                <input type="text" {...register(`certificados.${index}.entidadEmisora`)} />
                                {errors.certificados?.[index]?.entidadEmisora && <p className="error-message">{errors.certificados[index].entidadEmisora.message}</p>}
                            </div>
                            <div>
                                <label>N° Registro / Tarjeta (Opcional)</label>
                                <input type="text" {...register(`certificados.${index}.numeroRegistro`)} />
                            </div>

                            {/* Fechas */}
                            <div>
                                <label>Fecha de Expedición</label>
                                <input type="date" {...register(`certificados.${index}.fechaExpedicion`)} />
                                {errors.certificados?.[index]?.fechaExpedicion && <p className="error-message">{errors.certificados[index].fechaExpedicion.message}</p>}
                            </div>
                            <div>
                                <label>Fecha de Vencimiento</label>
                                <input type="date" {...register(`certificados.${index}.fechaVencimiento`)} />
                                {errors.certificados?.[index]?.fechaVencimiento && <p className="error-message">{errors.certificados[index].fechaVencimiento.message}</p>}
                            </div>

                            {/* Fotos */}
                            <div>
                                <label>Foto del Diploma/Certificado</label>
                                <input type="file" accept="image/*" {...register(`certificados.${index}.fotoDiploma`)} />
                                {errors.certificados?.[index]?.fotoDiploma && <p className="error-message">{errors.certificados[index].fotoDiploma.message}</p>}
                            </div>
                            <div>
                                <label>Foto Documento Vigente</label>
                                <input type="file" accept="image/*" {...register(`certificados.${index}.fotoDocumentoVigente`)} />
                                {errors.certificados?.[index]?.fotoDocumentoVigente && <p className="error-message">{errors.certificados[index].fotoDocumentoVigente.message}</p>}
                            </div>
                            
                            {/* Botón de eliminar certificado */}
                            <div className="full-width delete-cert-container">
                                {fields.length > 1 && (
                                    <button type="button" onClick={() => remove(index)} className="btn-remove-cert">
                                        Eliminar Certificado
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Botón para añadir más certificados */}
                <button 
                    type="button" 
                    onClick={() => append({ nombreCertificado: '', tipoCertificado: '', entidadEmisora: '' })}
                    className="btn-add-cert"
                >
                    + Añadir Otro Certificado
                </button>

                {/* -------------------- ACCIONES -------------------- */}
                <div className="form-actions full-width" style={{marginTop: '40px'}}>
                    <button type="submit" className="btn-primary-action">REGISTRAR EMPLEADO</button>
                    <button type="button" onClick={onCancel} className="btn-secondary-action">Cancelar / Volver</button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;