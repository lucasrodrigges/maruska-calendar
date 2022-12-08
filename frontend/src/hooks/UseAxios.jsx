import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { getFromLS } from '../services/localStorage';

function UseAxios() {
  const { userToken } = useContext(UserContext);

  return axios.create({
    baseURL: `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BASE_URL}/`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: userToken || getFromLS('user'),
    },
  });
}

export default UseAxios;
