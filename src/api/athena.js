import apiUsage from '../axios';
import {API_URL} from '@env';
import {token} from '../token/token';

const urls = {
  production: "https://internals.pointx.one/",
  development: "https://internals.pointx.one/",
};

const athena = apiUsage({
  baseURL: urls.development,
  headers: {
    // Authorization: Session Token
  },
});

athena.interceptors.request.use(
  async config => {
    // const authToken = await token.get('AccessToken');
    if (authToken) {
    //   config.headers.Authorization = `LOYALTY_TOKEN ${JSON.parse(authToken)}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

athena.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    return Promise.reject(err);
  },
);

export default athena;
