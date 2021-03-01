const TEMP_TZ = "__TIMEZONE__"; // !! Don't edit this line !!
const IS_LOCAL = process.env.VUE_APP_LOCATION !== 'container';
const API_URL = '';
const TZ = TEMP_TZ.indexOf('__') !== -1 ? 'Europe/Berlin' : TEMP_TZ;

const DEFAULT_APP = 'email';
const MAX_ATTACH_SIZE = 100 * 1024 * 1024 // 100 MB

const API_BASE_URL = IS_LOCAL
  ? 'http://localhost:8090/api/'
  : API_URL + '/app/';

export {
  IS_LOCAL,
  API_BASE_URL,
  DEFAULT_APP,
  MAX_ATTACH_SIZE,
  TZ
};
