export function padMinutes(min) {
  return (min < 10 ? '0' : '') + min.toString();
}
