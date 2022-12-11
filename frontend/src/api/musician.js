import fetchApi from './fetchApi';

export const getMusician = async () => {
  try {
    const { status, data } = await fetchApi.get('/musician');

    return { status, data };
  } catch ({ response: { status, data: { message } } }) {
    return { status, message };
  }
};

export const createMusician = async (body) => {
  try {
    const { status, data } = await fetchApi.post('/musician', body);

    return { status, data };
  } catch ({ response: { status, data: { message } } }) {
    return { status, message };
  }
};
