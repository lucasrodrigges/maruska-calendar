import UseAxios from '../UseAxios';

export default function UserRoute() {
  const axios = UseAxios();

  const login = (body) => (
    axios.post('/login', body)
      .then(({ status, data }) => ({ status, data }))
      .catch(({ response: { status, data } }) => ({ status, data }))
  );

  const getMe = () => (
    axios.get('/user/me')
      .then(({ status, data }) => ({ status, data }))
      .catch(({ response: { status, data } }) => ({ status, data }))
  );

  const editUser = (body) => (
    axios.put('/user', body)
      .then(({ status, data }) => ({ status, data }))
      .catch(({ response: { status, data } }) => ({ status, data }))
  );

  const createUser = (body) => (
    axios.put('/user', body)
      .then(({ status, data }) => ({ status, data }))
      .catch(({ response: { status, data } }) => ({ status, data }))
  );

  return {
    login, getMe, editUser, createUser,
  };
}
