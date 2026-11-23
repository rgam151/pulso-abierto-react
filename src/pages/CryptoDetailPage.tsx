
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerPrecios } from '../services/cryptoService';
import { useFavoritesStore } from '../store/favoritesStore';
import {
  criptomonedasInfo,
  type CryptoId
} from '../data/criptomonedas';

function CryptoDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [precio, setPrecio] = useState<number | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const favoritos = useFavoritesStore((state) => state.favoritos);
  const toggleFavorito = useFavoritesStore(
    (state) => state.toggleFavorito
  );

  const esValida =
    id !== undefined &&
    Object.prototype.hasOwnProperty.call(criptomonedasInfo, id);

  const cripto = esValida
    ? criptomonedasInfo[id as CryptoId]
    : null;

  const esFavorito = id !== undefined && favoritos.includes(id);

  useEffect(() => {
    if (!id || !Object.prototype.hasOwnProperty.call(criptomonedasInfo, id)) {
      return;
    }

    let activo = true;

    async function cargarDetalle(): Promise<void> {
      try {
        const datos = await obtenerPrecios();

        if (!activo) return;

        setPrecio(datos[id as CryptoId].usd);
        setError('');
        setCargando(false);
      } catch (error) {
        if (!activo) return;

        console.error('Error al consultar el detalle:', error);
        setError('No pudimos obtener el precio. Intentá nuevamente.');
        setCargando(false);
      }
    }

    void cargarDetalle();

    return () => {
      activo = false;
    };
  }, [id]);

  if (!cripto || !id) {
    return (
      <main className="contenedor">
        <section className="panel">
          <h2>Criptomoneda no encontrada</h2>
          <Link to="/" className="enlace-volver">
            Volver al inicio
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="contenedor">
      <section className="panel detalle-panel">
        <div className={`detalle-encabezado ${cripto.clase}`}>
          <span className="cripto-icono" aria-hidden="true">
            {cripto.icono}
          </span>

          <div className="tarjeta-info">
            <h1>{cripto.nombre}</h1>
            <p>{cripto.simbolo}</p>
          </div>

          <button
            type="button"
            className={`boton-favorito ${esFavorito ? 'activo' : ''}`}
            onClick={() => toggleFavorito(id)}
            aria-label={
              esFavorito
                ? `Quitar ${cripto.nombre} de favoritos`
                : `Agregar ${cripto.nombre} a favoritos`
            }
            aria-pressed={esFavorito}
            title={esFavorito ? 'Quitar favorito' : 'Agregar favorito'}
          >
            {esFavorito ? '★' : '☆'}
          </button>
        </div>

        <div className="detalle-precio" aria-live="polite">
          <p>Cotización actual en USD</p>

          {cargando && <p>Consultando precio...</p>}

          {error && (
            <p className="mensaje-error" role="alert">
              {error}
            </p>
          )}

          {!cargando && !error && precio !== null && (
            <h2>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(precio)}
            </h2>
          )}
        </div>

        <p className="detalle-fuente">
          Datos proporcionados por CoinGecko.
        </p>

        <Link to="/" className="enlace-volver">
          Volver a cotizaciones
        </Link>
      </section>
    </main>
  );
}

export default CryptoDetailPage;

