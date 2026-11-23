
import { useEffect, useRef, useState } from 'react';
import CryptoList from './components/CryptoList';
import ConsultaForm from './components/ConsultaForm';
import EstadoConsulta from './components/EstadoConsulta';
import { obtenerPrecios } from './services/cryptoService';
import { busquedaSchema } from './schemas/busquedaSchema';
import { useFavoritesStore } from './store/favoritesStore';
import {
  crearCriptomonedas,
  type Criptomoneda
} from './data/criptomonedas';
import './index.css';

type Estado = 'inicial' | 'carga' | 'resultado' | 'error';

function App() {
  const [criptomonedas, setCriptomonedas] = useState<Criptomoneda[]>([]);
  const [estado, setEstado] = useState<Estado>('carga');

  const [busqueda, setBusqueda] = useState('');
  const [seleccion, setSeleccion] = useState('todas');
  const [soloFavoritos, setSoloFavoritos] = useState(false);

  const favoritos = useFavoritesStore((state) => state.favoritos);
  const toggleFavorito = useFavoritesStore(
    (state) => state.toggleFavorito
  );

  const consultandoRef = useRef(false);

  const validacion = busquedaSchema.safeParse({
    busqueda,
    seleccion
  });

  const errorBusqueda = validacion.success
    ? ''
    : validacion.error.issues.find(
        (error) => error.path[0] === 'busqueda'
      )?.message ?? '';

  const errorSeleccion = validacion.success
    ? ''
    : validacion.error.issues.find(
        (error) => error.path[0] === 'seleccion'
      )?.message ?? '';

  useEffect(() => {
    let activo = true;

    async function cargarPreciosIniciales(): Promise<void> {
      try {
        const datos = await obtenerPrecios();

        if (!activo) return;

        setCriptomonedas(crearCriptomonedas(datos));
        setEstado('resultado');
      } catch (error) {
        if (!activo) return;

        console.error('Error al consultar CoinGecko:', error);
        setEstado('error');
      }
    }

    void cargarPreciosIniciales();

    return () => {
      activo = false;
    };
  }, []);

  async function consultarPrecios(): Promise<void> {
    const resultado = busquedaSchema.safeParse({
      busqueda,
      seleccion
    });

    if (
      !resultado.success ||
      consultandoRef.current ||
      estado === 'carga'
    ) {
      return;
    }

    consultandoRef.current = true;
    setEstado('carga');

    try {
      const datos = await obtenerPrecios();

      setCriptomonedas(crearCriptomonedas(datos));
      setEstado('resultado');
    } catch (error) {
      console.error('Error al consultar CoinGecko:', error);
      setEstado('error');
    } finally {
      consultandoRef.current = false;
    }
  }

  const criptomonedasFiltradas = criptomonedas.filter((cripto) => {
    if (!validacion.success) return false;

    const texto = validacion.data.busqueda.trim().toLowerCase();

    const coincideBusqueda =
      cripto.nombre.toLowerCase().includes(texto) ||
      cripto.simbolo.toLowerCase().includes(texto);

    const coincideSeleccion =
      validacion.data.seleccion === 'todas' ||
      cripto.id === validacion.data.seleccion;

    const coincideFavoritos =
      !soloFavoritos || favoritos.includes(cripto.id);

    return (
      coincideBusqueda &&
      coincideSeleccion &&
      coincideFavoritos
    );
  });

  return (
    <>
      <header className="header">
        <h1>Pulso Abierto</h1>
        <p>Consulta el precio actualizado de criptomonedas</p>
      </header>

      <main className="contenedor">
        <section className="panel">
          <h2>Cotizaciones en USD</h2>

          <ConsultaForm
            busqueda={busqueda}
            onBusquedaChange={setBusqueda}
            seleccion={seleccion}
            onSeleccionChange={setSeleccion}
            soloFavoritos={soloFavoritos}
            onSoloFavoritosChange={setSoloFavoritos}
            errorBusqueda={errorBusqueda}
            errorSeleccion={errorSeleccion}
            cargando={estado === 'carga'}
            onConsultar={() => void consultarPrecios()}
          />

          <EstadoConsulta estado={estado} />

          {estado === 'resultado' && validacion.success && (
            criptomonedasFiltradas.length > 0 ? (
              <CryptoList
                criptomonedas={criptomonedasFiltradas}
                favoritos={favoritos}
                onToggleFavorito={toggleFavorito}
              />
            ) : (
              <p role="status">
                {soloFavoritos && favoritos.length === 0
                  ? 'Todavía no agregaste criptomonedas a favoritos.'
                  : 'No se encontraron criptomonedas con esos filtros.'}
              </p>
            )
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Datos proporcionados por CoinGecko</p>
      </footer>
    </>
  );
}

export default App;




