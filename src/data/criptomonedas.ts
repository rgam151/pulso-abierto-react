
import type { obtenerPrecios } from '../services/cryptoService';

export const criptomonedasInfo = {
  bitcoin: {
    nombre: 'Bitcoin',
    simbolo: 'BTC',
    icono: '₿',
    clase: 'bitcoin'
  },
  ethereum: {
    nombre: 'Ethereum',
    simbolo: 'ETH',
    icono: 'Ξ',
    clase: 'ethereum'
  },
  solana: {
    nombre: 'Solana',
    simbolo: 'SOL',
    icono: '◎',
    clase: 'solana'
  }
} as const;

export type CryptoId = keyof typeof criptomonedasInfo;

export type Criptomoneda = {
  id: CryptoId;
  nombre: string;
  simbolo: string;
  icono: string;
  precio: number;
  clase: string;
};

export function crearCriptomonedas(
  datos: Awaited<ReturnType<typeof obtenerPrecios>>
): Criptomoneda[] {
  return (
    Object.entries(criptomonedasInfo) as [
      CryptoId,
      (typeof criptomonedasInfo)[CryptoId]
    ][]
  ).map(([id, info]) => ({
    id,
    ...info,
    precio: datos[id].usd
  }));
}
