
type ConsultaFormProps = {
  busqueda: string;
  onBusquedaChange: (valor: string) => void;
  seleccion: string;
  onSeleccionChange: (valor: string) => void;
  soloFavoritos: boolean;
  onSoloFavoritosChange: (valor: boolean) => void;
  errorBusqueda: string;
  errorSeleccion: string;
  cargando: boolean;
  onConsultar: () => void;
};

function ConsultaForm({
  busqueda,
  onBusquedaChange,
  seleccion,
  onSeleccionChange,
  soloFavoritos,
  onSoloFavoritosChange,
  errorBusqueda,
  errorSeleccion,
  cargando,
  onConsultar
}: ConsultaFormProps) {
  return (
    <div className="consulta-form">
      <div className="buscador">
        <label htmlFor="buscar-cripto">
          Buscar criptomoneda
        </label>

        <input
          id="buscar-cripto"
          type="search"
          placeholder="Ej: Bitcoin, Ethereum, SOL..."
          value={busqueda}
          onChange={(evento) =>
            onBusquedaChange(evento.target.value)
          }
          aria-invalid={Boolean(errorBusqueda)}
          aria-describedby={
            errorBusqueda ? 'error-busqueda' : undefined
          }
        />

        {errorBusqueda && (
          <p
            id="error-busqueda"
            className="mensaje-error"
            role="alert"
          >
            {errorBusqueda}
          </p>
        )}
      </div>

      <div className="buscador">
        <label htmlFor="seleccionar-cripto">
          Seleccionar criptomoneda
        </label>

        <select
          id="seleccionar-cripto"
          value={seleccion}
          onChange={(evento) =>
            onSeleccionChange(evento.target.value)
          }
          aria-invalid={Boolean(errorSeleccion)}
          aria-describedby={
            errorSeleccion ? 'error-seleccion' : undefined
          }
        >
          <option value="todas">Todas las criptomonedas</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="solana">Solana</option>
        </select>

        {errorSeleccion && (
          <p
            id="error-seleccion"
            className="mensaje-error"
            role="alert"
          >
            {errorSeleccion}
          </p>
        )}
      </div>

      <label className="filtro-favoritos">
        <input
          type="checkbox"
          checked={soloFavoritos}
          onChange={(evento) =>
            onSoloFavoritosChange(evento.target.checked)
          }
        />
        Mostrar solo favoritos
      </label>

      <button
        type="button"
        className="boton-consulta"
        onClick={onConsultar}
        disabled={cargando}
      >
        {cargando ? 'Consultando...' : 'Actualizar precios'}
      </button>
    </div>
  );
}

export default ConsultaForm;
