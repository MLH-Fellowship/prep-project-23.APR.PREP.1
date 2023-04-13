export function padMinutes(min) {
  return (min < 10 ? '0' : '') + min.toString();
}

export function findMinMaxTemp(dayForecast) {
  let minTemp = dayForecast[0].main.temp;
  let maxTemp = dayForecast[0].main.temp;
  dayForecast.forEach((threeHourBlock) => {
    let temp = threeHourBlock.main.temp;

    if (temp < minTemp) {
      minTemp = temp;
    }

    if (temp > maxTemp) {
      maxTemp = temp;
    }
  });

  return { minTemp, maxTemp };
}
