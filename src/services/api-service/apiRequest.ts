import { AxiosInstance } from 'axios';

import config from '../../configs';

import axiosInstance from './axiosInstance';
import routes from './route';

function uriPlaceholderReplacer(uri: string, replace: KeyValue) {
  let placeholders = uri.match(/:(.*?):/g);

  placeholders?.forEach(function (placeholder) {
    let phText = placeholder.substring(1, placeholder.length - 1);

    if (replace[phText]) {
      uri = uri.replace(placeholder, replace[phText]);
    }
  });

  return uri;
}

type KeyValue = {
  [key: string]: any;
};

class Request {
  axios: AxiosInstance = axiosInstance();
  headers: any = {};
  body: KeyValue = {};
  params: KeyValue = {};

  setHeaders(headers: KeyValue): this {
    this.headers = headers;

    return this;
  }

  setBody(body: KeyValue): this {
    this.body = body;

    return this;
  }

  setParams(params: KeyValue): this {
    this.params = params;

    return this;
  }

  api(name: string, attr: KeyValue = {}): Promise<any> {
    const api = routes.getRoute(name);

    if (!api) {
      return null;
    }

    const defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-localization':
        (typeof window !== 'undefined' &&
          window.localStorage.getItem('localize')) ||
        '',
    };

    let uri = config.apiPrefix + api.uri;
    if (Object.keys(attr).length) {
      uri = uriPlaceholderReplacer(uri, attr);
    }

    let method = api.method ?? 'get';
    method = method.toLowerCase();
    let headers = { ...defaultHeaders, ...this.headers };
    let payload = {
      headers: headers,
      params: this.params,
    };

    if (method === 'get') {
      return this.axios[method](uri, payload);
    }

    return this.axios[method](uri, this.body, payload);
  }

  direct(method: string, uri: string): Promise<any> {
    method = method.toLowerCase();
    const defaultHeaders: KeyValue = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-localization':
        (typeof window !== 'undefined' &&
          window.localStorage.getItem('localize')) ||
        'en',
    };

    let headers: KeyValue = { ...defaultHeaders, ...this.headers };
    let payload: { [key: string]: KeyValue } = {
      headers: headers,
      params: this.params,
    };

    if (method === 'get') {
      return this.axios[method](uri, payload);
    }

    return this.axios[method](uri, this.body, payload);
  }
}

const request = new Request();

export default request;
