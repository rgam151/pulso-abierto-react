
type Estado = 'inicial' | 'carga' | 'resultado' | 'error';

type EstadoConsultaProps = {
  estado: Estado;
};

function EstadoConsulta({ estado }: EstadoConsultaProps) {
  return (
    <div role="status" aria-live="polite">
      {estado === 'inicial' && (
        <p>Presioná el botón para consultar los precios.</p>
      )}

      {estado === 'carga' && (
        <p>Consultando precios...</p>
      )}

      {estado === 'resultado' && (
        <p>Precios actualizados correctamente.</p>
      )}

      {estado === 'error' && (
        <p className="mensaje-error">
          No pudimos obtener los precios. Intentá nuevamente.
        </p>
      )}
    </div>
  );
}

export default EstadoConsulta;
