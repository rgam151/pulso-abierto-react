
const API_URL = '/api/precios';

export interface CryptoPrices {
  bitcoin: { usd: number };
  ethereum: { usd: number };
  solana: { usd: number };
}

export async function obtenerPrecios(): Promise<CryptoPrices> {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error(
      `Error al consultar CoinGecko: ${respuesta.status}`
    );
  }

  const datos: unknown = await respuesta.json();

  if (
    typeof datos !== 'object' ||
    datos === null ||
    !('bitcoin' in datos) ||
    !('ethereum' in datos) ||
    !('solana' in datos)
  ) {
    throw new Error('La API devolvió datos incompletos');
  }

  const precios = datos as CryptoPrices;

  const valores = [
    precios.bitcoin?.usd,
    precios.ethereum?.usd,
    precios.solana?.usd
  ];

  if (
    valores.some(
      (precio) =>
        typeof precio !== 'number' ||
        !Number.isFinite(precio) ||
        precio < 0
    )
  ) {
    throw new Error('La API devolvió precios inválidos');
  }

  return precios;
}

