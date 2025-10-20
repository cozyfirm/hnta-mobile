import Axios from 'axios';

import { updateAxiosBaseURL } from '@/helpers/axios';
import { AppStageResponse } from '@/types';

// Create a temporary axios instance for the initial API call
const tempAxios = Axios.create({
  baseURL: 'https://talentakademija.ba',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const initializeApp = async (): Promise<void> => {
  try {
    // Make the initial API call to get app stage
    const response = await tempAxios.post<AppStageResponse>(
      '/api/common-unauthenticated/app-stage'
    );

    if (response.data.code === '0000' && response.data.data.app_url) {
      // Update the axios instance with the dynamic base URL
      updateAxiosBaseURL(response.data.data.app_url);

      console.log('App initialized with base URL:', response.data.data.app_url);
    } else {
      throw new Error('Invalid response from app stage API');
    }
  } catch (error) {
    console.error('Failed to initialize app:', error);
    // Keep the fallback staging URL if initialization fails
    console.log('Using fallback staging URL');
  }
};
