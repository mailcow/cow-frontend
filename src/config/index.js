const IS_LOCAL = process.env.NODE_ENV !== 'production';
const API_URL = '';

const DEFAULT_APP = 'email';

const API_BASE_URL = IS_LOCAL
  ? 'http://localhost:8090/api/'
  : API_URL + '/app/';

export {
  IS_LOCAL,
  API_BASE_URL,
  DEFAULT_APP
};
