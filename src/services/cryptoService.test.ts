
import {
  afterEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';

import { obtenerPrecios } from './cryptoService';

describe('Servicio de CoinGecko', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('obtiene correctamente los precios de las criptomonedas', async () => {
    const respuestaSimulada = {
      bitcoin: { usd: 78000 },
      ethereum: { usd: 2300 },
      solana: { usd: 95 }
    };

    const fetchSimulado = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => respuestaSimulada
    });

    vi.stubGlobal('fetch', fetchSimulado);

    const resultado = await obtenerPrecios();

    expect(fetchSimulado).toHaveBeenCalledTimes(1);
    expect(resultado).toEqual(respuestaSimulada);
    expect(resultado.bitcoin.usd).toBe(78000);
  });

  it('detecta una respuesta HTTP incorrecta', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500
      })
    );

    await expect(obtenerPrecios()).rejects.toThrow();
  });

  it('detecta datos incompletos de la API', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          bitcoin: { usd: 78000 }
        })
      })
    );

    await expect(obtenerPrecios()).rejects.toThrow(
      'La API devolvió datos incompletos'
    );
  });

  it('detecta precios inválidos', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          bitcoin: { usd: -100 },
          ethereum: { usd: 2300 },
          solana: { usd: 95 }
        })
      })
    );

    await expect(obtenerPrecios()).rejects.toThrow(
      'La API devolvió precios inválidos'
    );
  });
});
