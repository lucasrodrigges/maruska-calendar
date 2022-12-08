import axios from 'axios';

const fetch = axios.create({
  baseURL: `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BASE_URL}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default fetch;
