import axios from 'axios';
import { getFromLS } from '../localStorage';

const fetch = axios.create({
  baseURL: `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BASE_URL}/`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: getFromLS('user'),
  },
});

export default fetch;
