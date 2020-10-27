export function truncate (value, limit) {
  if (value.length > limit) {
    value = value.substring(0, (limit - 3)) + '...';
  }
  return value;
}
