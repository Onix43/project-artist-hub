import { api } from './api';

export async function getArtists(fetchParams) {
  const response = await api.get('/artists', {
    params: { limit: 8, ...fetchParams },
  });
  return response.data;
}
/* 

const params = 
{
 name: 'Some name', 
 sortName: 'asc',
 genre: 'pop'
}

! Кожне з полів можна пропустити або не передати параметри зовсім

const response = await getArtists(params);
console.log(response);

*/

export async function getArtistById(id) {
  const response = await api.get(`/artists/${id}/albums`);
  return response.data;
}

/* 
const id = '65ada227af9f6d155db46908'

const response = await getArtistById();
console.log(response);

*/
