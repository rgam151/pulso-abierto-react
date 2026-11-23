
import CryptoCard from './CryptoCard';

type Criptomoneda = {
  id: string;
  nombre: string;
  simbolo: string;
  icono: string;
  precio: number;
  clase: string;
};

type CryptoListProps = {
  criptomonedas: Criptomoneda[];
  favoritos: string[];
  onToggleFavorito: (id: string) => void;
};

function CryptoList({
  criptomonedas,
  favoritos,
  onToggleFavorito
}: CryptoListProps) {
  return (
    <div className="lista-criptomonedas">
      {criptomonedas.map((cripto) => (
        <CryptoCard
          key={cripto.id}
          id={cripto.id}
          nombre={cripto.nombre}
          simbolo={cripto.simbolo}
          icono={cripto.icono}
          precio={cripto.precio}
          clase={cripto.clase}
          esFavorito={favoritos.includes(cripto.id)}
          onToggleFavorito={onToggleFavorito}
        />
      ))}
    </div>
  );
}

export default CryptoList;

