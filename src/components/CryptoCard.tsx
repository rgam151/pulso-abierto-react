
import { Link } from 'react-router-dom';

type CryptoCardProps = {
  id: string;
  nombre: string;
  simbolo: string;
  icono: string;
  precio: number;
  clase: string;
  esFavorito: boolean;
  onToggleFavorito: (id: string) => void;
};

function CryptoCard({
  id,
  nombre,
  simbolo,
  icono,
  precio,
  clase,
  esFavorito,
  onToggleFavorito
}: CryptoCardProps) {
  return (
    <article className={`tarjeta ${clase}`}>
      <div className="tarjeta-encabezado">
        <span className="cripto-icono" aria-hidden="true">
          {icono}
        </span>

        <div className="tarjeta-info">
          <h3>{nombre}</h3>
          <span className="simbolo">{simbolo}</span>
        </div>

        <button
          type="button"
          className={`boton-favorito ${esFavorito ? 'activo' : ''}`}
          onClick={() => onToggleFavorito(id)}
          aria-label={
            esFavorito
              ? `Quitar ${nombre} de favoritos`
              : `Agregar ${nombre} a favoritos`
          }
          aria-pressed={esFavorito}
        >
          {esFavorito ? '★' : '☆'}
        </button>
      </div>

      <p className="precio-etiqueta">Precio actual</p>

      <p className="precio">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(precio)}
      </p>

      <Link
        to={`/criptomonedas/${id}`}
        className="enlace-detalle"
      >
        Ver detalles
      </Link>
    </article>
  );
}

export default CryptoCard;


