import axios from '../axios';

export const getMusicians = () => (
  axios().get('/musician')
    .then(({ status, data }) => ({ status, data }))
    .catch(({ response: { status, data } }) => ({ status, data }))
);

export const createMusician = (body) => (
  axios().post('/musician', body)
    .then(({ status, data }) => ({ status, data }))
    .catch(({ response: { status, data } }) => ({ status, data }))
);
