
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="contenedor">
      <section className="panel pagina-error">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>
          La dirección que intentaste visitar no existe
          en Pulso Abierto.
        </p>

        <Link to="/" className="enlace-volver">
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
