import createApp from '@shopify/app-bridge';

import axios from 'axios';

import { getSessionToken } from '@shopify/app-bridge/utilities';
import config from '../../configs';

var __axiosSingleton = null;

const axiosInstance = function () {
  if (__axiosSingleton) {
    return __axiosSingleton;
  }

  const instance = axios.create({
    baseURL: config.baseUrl,
  });

  if (config.environment !== 'production' && config.testModeEnable === 'true') {
    __axiosSingleton = localAxios(instance);
  } else {
    __axiosSingleton = appBridgeAxios(instance);
  }

  return __axiosSingleton;
  // Intercept all requests on this Axios instance
};

function appBridgeAxios(axiosInstance) {
  if (typeof window === 'undefined') {
    return localAxios(axiosInstance);
  }

  let host = getQueryParam('host');

  const shopifyHost = config.environment === 'development' ? config.host : host;

  const app =
    shopifyHost &&
    createApp({
      apiKey: config.shopifyApiKey,
      host: shopifyHost,
      forceRedirect: config.environment !== 'development',
    });

  axiosInstance.interceptors.request.use(function (axiosConfig) {
    return getSessionToken(app) // requires a Shopify App Bridge instance
      .then((token) => {
        // Append your request headers with an authenticated token
        axiosConfig.headers['Authorization'] = `Bearer ${token}`;

        return axiosConfig;
      });
  });
  // Export your Axios instance to use within your app
  return axiosInstance;
}

function localAxios(axiosInstance) {
  axiosInstance.interceptors.request.use(function (axiosConfig) {
    axiosConfig.headers['Authorization'] = `Bearer ${config.testToken}`;
    axiosConfig.headers['X-Test-Mode'] = 'true';

    return axiosConfig;
  });
  // Export your Axios instance to use within your app
  return axiosInstance;
}

function getQueryParam(name) {
  if (typeof window !== 'undefined')
    return new URLSearchParams(window.location.search).get(name);
  return null;
}

export default axiosInstance;
