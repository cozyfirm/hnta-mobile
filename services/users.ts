import { axios } from '../helpers/axios';

export const fetchMyInfo = (api_token: string) =>
  axios.post('/api/users/fetch-my-info', { api_token });

export const updateBasicData = (params: {
  api_token: string;
  name: string;
  phone: string;
  birth_date: string;
  address: string;
  city: string;
  country: string;
  about: string;
}) => axios.post('/api/users/update-basic-data', params);

export const changePassword = (params: {
  api_token: string;
  password: string;
  repeat: string;
}) => axios.post('/api/users/change-password', params);

export const deleteProfile = (api_token: string) =>
  axios.post('/api/users/delete-profile', { api_token });

export const uploadPhoto = (api_token: string, photo: any) => {
  const formData = new FormData();
  formData.append('api_token', api_token);
  formData.append('photo', photo);
  return axios
    .post('/api/users/upload-photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchCountries = (api_token: string) =>
  axios.post('/api/common-routes/countries/fetch', { api_token });
