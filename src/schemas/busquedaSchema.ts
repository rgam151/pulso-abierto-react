
import { z } from 'zod';

export const busquedaSchema = z.object({
  busqueda: z
    .string()
    .max(30, 'La búsqueda no puede superar los 30 caracteres.')
    .refine(
      (valor) => /^[\p{L}\p{N}\s]*$/u.test(valor),
      'Usá solamente letras, números y espacios.'
    ),

  seleccion: z.enum(
    ['todas', 'bitcoin', 'ethereum', 'solana'],
    {
      error: 'Seleccioná una criptomoneda válida.'
    }
  )
});
