// Fetch logic
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://sound-wave.b.goit.study/api',
});
