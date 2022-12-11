import axios from 'axios';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalProvider';
import { getFromLS } from '../../services/localStorage';

export default function UseAxios() {
  const { userToken } = useContext(GlobalContext);

  return axios.create({
    baseURL: `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BASE_URL}/`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: userToken || getFromLS('token'),
    },
  });
}
