import store from './store';
import { TZ } from "mailcow-config";

function get_timezone () {
  let timezone = TZ;
  if (store.getters.general_settings.timezone) {
    timezone = store.getters.general_settings.timezone;
  }
  return timezone;
}

export function truncate (value, limit) {
  if (value.length > limit) {
    value = value.substring(0, (limit - 3)) + '...';
  }
  return value;
}

export function get_date (unix_date, locale="en-en") {
  let timezone = get_timezone();
  let date = new Date(unix_date * 1000);
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', timeZone: timezone };
  return date.toLocaleDateString(locale, options);
}

export function get_time (unix_date, locale="en-en") {
  let timezone = get_timezone();
  let date = new Date(unix_date * 1000);
  const options = { hour: 'numeric', minute: 'numeric', timeZone: timezone  };
  return date.toLocaleTimeString(locale, options);
}

export function from_now (date) {
  let seconds = Math.floor(((new Date().getTime()/1000) - date))
  // let timezone = get_timezone();
  // let now = new Date();
  // let options = {timeZone: timezone};
  // let now_tz = new Date(now.toLocaleString("en-en", options));
  // let msg_date = new Date(date * 1000);
  // let msg_tz = new Date(msg_date.toLocaleString("en-en", options));
  // let seconds = Math.floor((now_tz.getTime() / 1000) - (msg_tz.getTime() / 1000));

  let interval = seconds / 31536000;
  if (interval >= 1) {
    return Math.floor(interval) + "y";
  }
  interval = seconds / 2592000;
  if (interval >= 1) {
    return Math.floor(interval) + "M";
  }
  interval = seconds / 86400;
  if (interval >= 1) {
    return Math.floor(interval) + "d";
  }
  interval = seconds / 3600;
  if (interval >= 1) {
    return Math.floor(interval) + "h";
  }
  interval = seconds / 60;
  if (interval >= 1) {
    return Math.floor(interval) + "m";
  }
  return Math.floor(seconds) + "s";
}

export function get_size (bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
