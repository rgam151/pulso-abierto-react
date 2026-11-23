
import { beforeEach, describe, expect, it } from 'vitest';
import { useFavoritesStore } from './favoritesStore';

describe('Store global de favoritos', () => {
  beforeEach(() => {
    localStorage.clear();

    useFavoritesStore.setState({
      favoritos: []
    });
  });

  it('comienza sin favoritos', () => {
    const favoritos = useFavoritesStore.getState().favoritos;

    expect(favoritos).toEqual([]);
  });

  it('permite agregar una criptomoneda a favoritos', () => {
    useFavoritesStore.getState().toggleFavorito('bitcoin');

    const favoritos = useFavoritesStore.getState().favoritos;

    expect(favoritos).toContain('bitcoin');
  });

  it('permite quitar una criptomoneda de favoritos', () => {
    useFavoritesStore.getState().toggleFavorito('bitcoin');
    useFavoritesStore.getState().toggleFavorito('bitcoin');

    const favoritos = useFavoritesStore.getState().favoritos;

    expect(favoritos).not.toContain('bitcoin');
  });

  it('permite guardar varias criptomonedas', () => {
    useFavoritesStore.getState().toggleFavorito('bitcoin');
    useFavoritesStore.getState().toggleFavorito('ethereum');

    const favoritos = useFavoritesStore.getState().favoritos;

    expect(favoritos).toEqual(['bitcoin', 'ethereum']);
  });

  it('persiste los favoritos en localStorage', () => {
    useFavoritesStore.getState().toggleFavorito('solana');

    const guardado = localStorage.getItem(
      'pulso-favoritos-zustand'
    );

    expect(guardado).not.toBeNull();

    const datos = JSON.parse(guardado!);

    expect(datos.state.favoritos).toContain('solana');
  });
});
