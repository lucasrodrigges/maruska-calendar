import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { EMAIL_RGX } from '../helpers/data';
import { UserContext } from '../context/UserProvider';
import '../style/ProfileEdit.css';
import UseAxios from '../hooks/UseAxios';

export default function ProfileEdit() {
  const {
    user, setUser,
  } = useContext(UserContext);

  const navigate = useNavigate();
  const axios = UseAxios();

  function handleChange({ target: { name, value } }) {
    if (name === 'email' && EMAIL_RGX.test(value)) {
      return setUser({
        ...user,
        [name]: value,
      });
    }

    return setUser({
      ...user,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios.put('/user', user).then(() => {
      navigate(-1);
    }).catch((err) => {
      console.error('ERROR => ', err);
    });

    // const { displayName, email, photoURL } = userEdit;
  }

  return (
    <div>
      <Header />
      <div className="pofile-edit-form-container">
        <form className="profile-edit-form" action="profileEdit" onSubmit={handleSubmit}>
          <input
            className="input-1"
            type="text"
            name="name"
            placeholder={user?.name || 'Nome'}
            onChange={handleChange}
          />
          <input
            className="input-1"
            type="text"
            name="email"
            placeholder={user?.email || 'Email'}
            onChange={handleChange}
          />
          <button
            className="button-1"
            type="submit"
          >
            Editar
          </button>
          <button
            className="button-1"
            type="button"
            onClick={() => navigate(-1)}
          >
            Voltar

          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
