export function dateToHourMinString(date) {
  return padLeftTwo(date.getHours()) + ':' +
	 padLeftTwo(date.getMinutes());
}

function padLeftTwo(min) {
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

export function dayOfWeek(date) {
  return [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  ][date.getDay()];
}
