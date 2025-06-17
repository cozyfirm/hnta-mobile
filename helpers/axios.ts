import Axios from 'axios';
import Constants from 'expo-constants';

export const axios = Axios.create({
  baseURL: Constants.expoConfig?.extra?.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
