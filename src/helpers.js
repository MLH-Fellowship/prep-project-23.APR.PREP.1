export function padMinutes(min) {
  return (min < 10 ? '0' : '') + min.toString();
}

export function findMinMaxTemp(dayForecast) {
  const temps = dayForecast.map(f => f.main.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  
  return { minTemp, maxTemp };
}

export function dtToDate(dt) {
  return new Date(dt * 1000);
}
