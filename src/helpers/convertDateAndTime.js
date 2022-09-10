import { months } from './data';

export default function convertDateAndTime(date, time) {
  const dateSplit = date.split('-');
  const timeSplit = time.split(':');
  const { month } = months[Number(dateSplit[1]) - 1];
  // -1 because the array starts at 0 // 0 === 'jan'
  const day = dateSplit[2];
  const hour = timeSplit[0];
  const min = timeSplit[1];

  return `${day} de ${month} às ${hour}h${min}min`;
}
