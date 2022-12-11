import fetchApi from './fetchApi';

export const login = async (body) => {
  try {
    const { status, data } = await fetchApi.post('login', body);

    return { status, data };
  } catch ({ response: { status, data: { message } } }) {
    return { status, message };
  }
};

export const getMe = async () => {
  try {
    const { status, data } = await fetchApi.get('user/me');

    return { status, data };
  } catch ({ response: { status, data: { message } } }) {
    return { status, message };
  }
};

export const createUser = async (body) => {
  try {
    const { status, data } = await fetchApi.post('/user', body);

    return { status, data };
  } catch ({ response: { status, data: { message } } }) {
    return { status, message };
  }
};

export const editUser = async (body) => {
  try {
    const { status, data } = await fetchApi.put('/user', body);

    return { status, data };
  } catch ({ response: { status, data: { message } } }) {
    return { status, message };
  }
};
