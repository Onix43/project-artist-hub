import { api } from './api';

export async function getArtists(fetchParams) {
  const response = await api.get('/artists', {
    params: { limit: 8, ...fetchParams },
  });
  console.log(response);
  return response.data;
}
