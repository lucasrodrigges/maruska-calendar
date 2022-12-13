import axios from '../axios';

export const login = (body) => (
  axios().post('/login', body)
    .then(({ status, data }) => ({ status, data }))
    .catch(({ response: { status, data } }) => ({ status, data }))
);

export const getMe = () => (
  axios().get('/user/me')
    .then(({ status, data }) => ({ status, data }))
    .catch(({ response: { status, data } }) => ({ status, data }))
);

export const editUser = (body) => (
  axios().put('/user', body)
    .then(({ status, data }) => ({ status, data }))
    .catch(({ response: { status, data } }) => ({ status, data }))
);

export const createUser = (body) => (
  axios().post('/user', body)
    .then(({ status, data }) => ({ status, data }))
    .catch(({ response: { status, data } }) => ({ status, data }))
);

export const deleteMe = () => (
  axios().delete('/user/me')
    .then(({ status, data }) => ({ status, data }))
    .catch(({ response: { status, data } }) => ({ status, data }))
);
