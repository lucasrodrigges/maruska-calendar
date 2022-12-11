import fetchApi from './fetchApi';

export const getEvent = async () => {
  try {
    const { status, data } = await fetchApi.get('/event');

    return { status, data };
  } catch ({ response: { status, data: { message } } }) {
    return { status, message };
  }
};

export const createEvent = async (body) => {
  try {
    const { status, data } = await fetchApi.post('/event', body);

    return { status, data };
  } catch ({ response: { status, data: { message } } }) {
    return { status, message };
  }
};

export const deleteEvent = async (id) => {
  try {
    const { status, data } = await fetchApi.delete(`/event/${id}`);

    return { status, data };
  } catch ({ response: { status, data: { message } } }) {
    return { status, message };
  }
};
