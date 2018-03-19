import axios from 'axios';
import config from '../../../../config/config';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || config.port}/api`) :
  '/api';

export default function callApi(endpoint, method = 'get', body) {
  return axios({
    method,
    url: `${API_URL}/${endpoint}`,
    data: JSON.stringify(body),
    headers: { 'content-type': 'application/json' },
  });
}
