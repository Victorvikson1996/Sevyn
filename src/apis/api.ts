/* eslint-disable indent */
import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse
} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Alert } from 'react-native';

import { type ApiError, type Token } from '../types';

export const BASE_API_URL = '';
export const BASE_API_URL_V2 = '';
export const PAYSTACK_SECRET_KEY = '';

let _retry = false;

const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  const token = await EncryptedStorage.getItem('tokens');
  if (token) {
    config.headers.Authorization = `Bearer ${
      (JSON.parse(token) as Token).access
    }`;
  }

  return config;
};

const responseInterceptor = async (error: AxiosError) => {
  const originalRequest = error?.config;
  const token = await EncryptedStorage.getItem('tokens');

  if (
    !!token &&
    error?.response?.status === 401 &&
    !originalRequest?.url?.includes('/auth/token/refresh/') &&
    !originalRequest?.url?.includes('/auth/token/refresh/') &&
    !originalRequest?.url?.includes('/wallet/cards/tapped-card') &&
    !_retry
  ) {
    _retry = true;

    const refresh = (JSON.parse(token) as Token).refresh;
    api
      .post('/auth/token/refresh/', { refresh })
      .then(async ({ data }: { data: { access: string } }) => {
        console.log('refresh', data);
        await EncryptedStorage.setItem(
          'token',
          JSON.stringify({ access: data?.access, refresh })
        );

        return await api({
          ...originalRequest,
          headers: {
            Authorization: `Bearer ${data?.access}`
          }
        });
      })
      .catch(await Promise.reject(error));
  }

  return await Promise.reject(error);
};

export const api: AxiosInstance = axios.create({
  baseURL: BASE_API_URL
});

api.interceptors.request.use(
  requestInterceptor,
  async (error: AxiosError) => await Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  responseInterceptor
);

export const apiV2: AxiosInstance = axios.create({
  baseURL: BASE_API_URL_V2
});

apiV2.interceptors.request.use(
  requestInterceptor,
  async (error: AxiosError) => await Promise.reject(error)
);

apiV2.interceptors.response.use(
  (response: AxiosResponse) => response,
  responseInterceptor
);

export const payStackApi: AxiosInstance = axios.create({
  baseURL: 'https://api.paystack.co'
});

payStackApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${PAYSTACK_SECRET_KEY}`;
    return config;
  },
  async (error: AxiosError) => await Promise.reject(error)
);

export const handleApiError = (
  err: AxiosError<ApiError>,
  tryAgain?: boolean,
  tryAgainFunc?: () => void,
  onDismiss?: () => void,
  tryAgainText = 'Try Again',
  title = ''
) => {
  const message = err.response?.data?.errors
    ? Object.values(err.response?.data?.errors)[0][0]
    : err.response?.data?.message ??
      err.response?.data?.detail ??
      err.response?.data?.error ??
      err?.message;

  console.log(
    'api error',
    err?.config?.url,
    err.response?.data ?? err?.message
  );

  Alert.alert(
    title,
    message,
    [
      { text: 'Dismiss', onPress: onDismiss?.() ?? undefined },
      tryAgain !== null
        ? {
            text: tryAgainText,
            onPress: tryAgainFunc
          }
        : {}
    ],
    { onDismiss: onDismiss?.() ?? undefined }
  );
};
