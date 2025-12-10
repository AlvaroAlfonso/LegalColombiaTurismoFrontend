import "./styles/InformacionTurist.css";

export default function Informacion() {
  return (
    <div className="info-container">

      {/* PROBLEMAS Y SOLUCIONES */}
      <section className="section-title">
        <h2>¿POR QUÉ NACIMOS? LA REALIDAD DEL TURISMO EN COLOMBIA</h2>
      </section>

      <section className="problems-solutions">
        <div className="column">
          <h3>PROBLEMA QUE VIMOS</h3>

          <div className="item">
            <h4>EL FRAUDE DEL SOBRECOSTO (EL 600%)</h4>
            <p>
              Vimos cómo a los visitantes extranjeros se les llegan a cobrar tarifas
              hasta 600% superiores al mercado real. Esto daña la imagen del país
              y la confianza del turista.
            </p>
          </div>

          <div className="item">
            <h4>LA INFORMALIDAD SIN ACREDITACIÓN</h4>
            <p>
              Muchos servicios se prestan sin ningún registro oficial. Esto pone en
              riesgo al turista y afecta a profesionales que sí cumplen la ley.
            </p>
          </div>

          <div className="item">
            <h4>LA INFORMALIDAD SIN DIFERENCIACIÓN</h4>
            <p>
              La víctima de un abuso rara vez tiene un canal formal para reportar.
              El Provisor Legal honesto no puede diferenciarse.
            </p>
          </div>
        </div>

        <div className="column">
          <h3>NUESTRA SOLUCIÓN</h3>

          <div className="item">
            <h4>ESTANDARIZACIÓN DE PRECIOS</h4>
            <p>
              Creamos la Cuota de Estándar de Precio Justo y obligamos a los Provisores
              Legales a registrar tarifas reales, eliminando sobrecostos abusivos.
            </p>
          </div>

          <div className="item">
            <h4>VERIFICACIÓN DEL RNT</h4>
            <p>
              Nuestro sistema permite validar instantáneamente si un Provisor Legal
              tiene RNT activo usando un código QR.
            </p>
          </div>

          <div className="item">
            <h4>SISTEMA DE FEEDBACK Y DENUNCIA</h4>
            <p>
              Creamos un sistema para que el turista reporte irregularidades y
              reciba soporte oficial. Transparencia para todos.
            </p>
          </div>
        </div>
      </section>

    
    </div>
  );
}
