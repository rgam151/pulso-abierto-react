
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { obtenerPrecios } from './services/cryptoService';

vi.mock('./services/cryptoService', () => ({
  obtenerPrecios: vi.fn()
}));

const obtenerPreciosMock = vi.mocked(obtenerPrecios);

const preciosSimulados = {
  bitcoin: { usd: 78000 },
  ethereum: { usd: 2300 },
  solana: { usd: 95 }
};

function renderizarApp() {
  return render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
}

describe('Aplicación Pulso Abierto', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('muestra el estado de carga mientras consulta los precios', () => {
    obtenerPreciosMock.mockImplementation(
      () => new Promise(() => {})
    );

    renderizarApp();

    expect(
      screen.getByText('Consultando precios...')
    ).toBeInTheDocument();
  });

  it('muestra las criptomonedas cuando la consulta es exitosa', async () => {
    obtenerPreciosMock.mockResolvedValue(preciosSimulados);

    renderizarApp();

    expect(
      await screen.findByText('Precios actualizados correctamente.')
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Bitcoin' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Ethereum' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Solana' })
    ).toBeInTheDocument();
  });

  it('muestra un mensaje de error cuando falla la API', async () => {
    obtenerPreciosMock.mockRejectedValue(
      new Error('Error de conexión simulado')
    );

    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    try {
      renderizarApp();

      expect(
        await screen.findByText(
          'No pudimos obtener los precios. Intentá nuevamente.'
        )
      ).toBeInTheDocument();
    } finally {
      consoleSpy.mockRestore();
    }
  });

  it('permite reintentar la consulta después de un error', async () => {
    const usuario = userEvent.setup();

    obtenerPreciosMock
      .mockRejectedValueOnce(
        new Error('Error de conexión simulado')
      )
      .mockResolvedValueOnce(preciosSimulados);

    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    try {
      renderizarApp();

      expect(
        await screen.findByText(
          'No pudimos obtener los precios. Intentá nuevamente.'
        )
      ).toBeInTheDocument();

      const botonConsultar = screen.getByRole('button', {
        name: /actualizar precios/i
      });

      await usuario.click(botonConsultar);

      await waitFor(() => {
        expect(obtenerPreciosMock).toHaveBeenCalledTimes(2);
      });

      expect(
        await screen.findByText(
          'Precios actualizados correctamente.'
        )
      ).toBeInTheDocument();

      expect(
        screen.getByRole('heading', { name: 'Bitcoin' })
      ).toBeInTheDocument();
    } finally {
      consoleSpy.mockRestore();
    }
  });
});
