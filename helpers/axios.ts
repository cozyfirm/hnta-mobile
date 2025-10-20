import Axios from 'axios';

// Create a fallback axios instance with staging URL
let axiosInstance = Axios.create({
  baseURL: 'https://staging.talentakademija.ba/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to update the axios instance with the correct base URL
export const updateAxiosBaseURL = (baseURL: string) => {
  axiosInstance.defaults.baseURL = baseURL;
};

// Function to get the current base URL
export const getBaseURL = (): string => {
  return (
    axiosInstance.defaults.baseURL || 'https://staging.talentakademija.ba/'
  );
};

// Export the axios instance
export const axios = axiosInstance;
