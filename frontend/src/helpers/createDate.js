import moment from 'moment';
import { months } from './data';

export default (when) => {
  const date = moment(when).format('DD MMM HH:mm');
  const dateSlit = date.split(' ');

  return `${dateSlit[0]} de ${months[dateSlit[1]]} às ${dateSlit[2].split(':').join('h')}`;
};
