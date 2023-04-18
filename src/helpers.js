import React from 'react';

export function padLeftTwo(min) {
  return (min < 10 ? '0' : '') + min.toString();
}

export function dtToDate(dt, timezone) {
  return new Date((dt + timezone) * 1000);
}

export function dayOfWeek(date) {
  return [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  ][date.getDay()];
}

export function DayName(day, todayDate) {
  const date = day.date.getDate();
  const today = todayDate.getDate();
  return (
    <>
      {date === today
      ? 'Today'
      : `${dayOfWeek(day.date)} ${day.date.getDate()}`}
    </>
  );
}

