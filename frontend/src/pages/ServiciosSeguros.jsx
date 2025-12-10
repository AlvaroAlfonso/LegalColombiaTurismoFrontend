import React from "react";
import "./styles/ServiciosSeguros.css"; // Archivo de estilos separado

export default function ServiciosSeguros() {
  return (
    <div className="servicios-container">

      <h1 className="titulo-principal">
        PERFIL DEL PROVISOR LEGAL  
        <br />
        <span>(LOS 3 BOTONES DE TRANSPARENCIA)</span>
      </h1>

      <div className="modulo">
        <div className="modulo-texto">
          <h2>1. DOCUMENTACIÓN LEGAL DE LA EMPRESA</h2>
          <p>
            Muestra el Registro Nacional de Turismo (RNT) vigente de la empresa, 
            su Cámara de Comercio y su estado de cumplimiento fiscal. 
            Te asegura que la entidad es un actor formal y regulado en Colombia.
          </p>
        </div>
        <img 
          src="/Images/DocLegal.png"
          alt="Documentación Legal Empresa"
          className="modulo-imagen"
        />
      </div>

      <div className="modulo reverse">
        <img 
          src="/Images/LegalService.png"
          alt="Documentación Servicio"
          className="modulo-imagen"
        />
        <div className="modulo-texto">
          <h2>2. DOCUMENTACIÓN LEGAL DEL SERVICIO</h2>
          <p>
            Muestra la certificación específica del servicio que se va a prestar 
            (ej. recorridos en transporte turístico, actividades guiadas, 
            operado por profesionales certificados).
          </p>
        </div>
      </div>

      <div className="modulo">
        <div className="modulo-texto">
          <h2>3. VERIFICACIÓN DE PRECIOS ESTANDARIZADOS</h2>
          <p>
            Despliega el listado de tarifas validadas por el Ministerio de Comercio, 
            Industria y Turismo basado en la Plataforma Única de Tarifas Estándar 
            (PUE). Garantiza que no pagarás de más por un servicio legal.
          </p>
        </div>
        <img 
          src="/Images/Verificar.png"
          alt="Verificación de Precios"
          className="modulo-imagen"
        />
      </div>

    </div>
  );
}
