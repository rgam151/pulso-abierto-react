
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CryptoCard from './CryptoCard';

describe('Componente CryptoCard', () => {
  const datosBitcoin = {
    id: 'bitcoin',
    nombre: 'Bitcoin',
    simbolo: 'BTC',
    icono: '₿',
    precio: 78000,
    clase: 'bitcoin'
  };

  it('muestra la información de Bitcoin', () => {
    render(
      <MemoryRouter>
        <CryptoCard
          {...datosBitcoin}
          esFavorito={false}
          onToggleFavorito={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: 'Bitcoin' })
    ).toBeInTheDocument();

    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('$78,000.00')).toBeInTheDocument();
  });

  it('permite marcar Bitcoin como favorito', async () => {
    const usuario = userEvent.setup();
    const onToggleFavorito = vi.fn();

    render(
      <MemoryRouter>
        <CryptoCard
          {...datosBitcoin}
          esFavorito={false}
          onToggleFavorito={onToggleFavorito}
        />
      </MemoryRouter>
    );

    const boton = screen.getByRole('button', {
      name: 'Agregar Bitcoin a favoritos'
    });

    await usuario.click(boton);

    expect(onToggleFavorito).toHaveBeenCalledWith('bitcoin');
  });

  it('muestra el estado de favorito activo', () => {
    render(
      <MemoryRouter>
        <CryptoCard
          {...datosBitcoin}
          esFavorito={true}
          onToggleFavorito={vi.fn()}
        />
      </MemoryRouter>
    );

    const boton = screen.getByRole('button', {
      name: 'Quitar Bitcoin de favoritos'
    });

    expect(boton).toHaveAttribute('aria-pressed', 'true');
  });

  it('incluye el enlace a la página de detalles', () => {
    render(
      <MemoryRouter>
        <CryptoCard
          {...datosBitcoin}
          esFavorito={false}
          onToggleFavorito={vi.fn()}
        />
      </MemoryRouter>
    );

    const enlace = screen.getByRole('link', {
      name: 'Ver detalles'
    });

    expect(enlace).toHaveAttribute(
      'href',
      '/criptomonedas/bitcoin'
    );
  });
});
