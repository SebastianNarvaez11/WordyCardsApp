import axios from 'axios';
import {Platform} from 'react-native';

import {BASE_URL_ANDROID, BASE_URL_IOS} from '../constants';

const mainApi = axios.create({
  baseURL: Platform.OS === 'android' ? BASE_URL_ANDROID : BASE_URL_IOS,
  headers: {
    'Content-Type': 'application/json',
  },
});

mainApi.interceptors.request.use(async config => {
  return config;
});

export {mainApi};
