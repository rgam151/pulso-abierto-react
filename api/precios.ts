
export default async function handler(
  request: { method?: string },
  response: {
    status: (code: number) => {
      json: (data: unknown) => void;
    };
    setHeader: (name: string, value: string) => void;
  }
) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({
      error: 'Método no permitido'
    });
  }

  try {
    const url =
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd';

    const resultado = await fetch(url);

    if (!resultado.ok) {
      return response.status(502).json({
        error: 'CoinGecko no respondió correctamente',
        status: resultado.status
      });
    }

    const datos = await resultado.json();

    response.setHeader(
      'Cache-Control',
      's-maxage=60, stale-while-revalidate=120'
    );

    return response.status(200).json(datos);
  } catch (error) {
    console.error('Error consultando CoinGecko:', error);

    return response.status(500).json({
      error: 'No se pudieron obtener los precios'
    });
  }
}
