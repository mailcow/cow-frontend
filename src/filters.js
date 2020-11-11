export function truncate (value, limit) {
  if (value.length > limit) {
    value = value.substring(0, (limit - 3)) + '...';
  }
  return value;
}

export function get_date (unix_date, locale="en-en") {
  var date = new Date(unix_date * 1000);
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
  return date.toLocaleDateString(locale, options);
}

export function get_time (unix_date, locale="en-en") {
  var date = new Date(unix_date * 1000);
  const options = { hour: 'numeric', minute: 'numeric' };
  return date.toLocaleTimeString(locale, options);
}

export function from_now (date) {
  var seconds = Math.floor(((new Date().getTime()/1000) - date))

  var interval = seconds / 31536000;
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
