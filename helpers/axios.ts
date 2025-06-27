import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'https://staging.talentakademija.ba/',
  headers: {
    'Content-Type': 'application/json',
  },
});
