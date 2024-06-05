import axios from 'axios';
import {Platform} from 'react-native';

import {StorageAdapter} from '../../common/adapters';
import {IRefreshTokenResponse} from '../../modules/auth/infrastructure/interfaces';
import {BASE_URL_ANDROID, BASE_URL_IOS} from '../constants';

const BASE_URL = Platform.OS === 'android' ? BASE_URL_ANDROID : BASE_URL_IOS;

const mainApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

mainApi.interceptors.request.use(async config => {
  const accessToken = await StorageAdapter.getItem('ACCESS-TOKEN-WC');

  // console.log(accessToken);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// INTERCEPTOR DE RESPUESTAS
mainApi.interceptors.response.use(
  response => {
    // respuesta exitosa
    return response;
  },
  async error => {
    // respuesta fallida
    if (error.response.status === 401) {
      if (error.response.data.error.name === 'TokenExpiredError') {
        console.log('401:TokenExpiredError');
        try {
          const refreshToken = await StorageAdapter.getItem('REFRESH-TOKEN-WC');

          const {data} = await axios.get<IRefreshTokenResponse>(
            `${BASE_URL}/auth/refresh-token`,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          );

          await StorageAdapter.setItem('ACCESS-TOKEN-WC', data.newAccessToken);

          const originalRequest = error.config;
          return mainApi.request(originalRequest);
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }
    return Promise.reject(error);
  },
);

export {mainApi};
