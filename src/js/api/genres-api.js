import { api } from './api';

/* Повертається масив з 123 об'єктів */

export async function getGenres() {
  const response = await api.get('/genres');
  return response.data;
}
