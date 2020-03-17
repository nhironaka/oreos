import { API_URL } from '../constants/config';

function request(method) {
  return async (url, body) => {
    const response = await fetch(`${API_URL}${url}`, {
      method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(body), // body data type must match "Content-Type" header,
    });
    const data = await response.json();

    return data.data || {};
  };
}

export default {
  GET: request('GET'),
  POST: request('POST'),
  PUT: request('PUT'),
  DELETE: request('DELETE'),
};
