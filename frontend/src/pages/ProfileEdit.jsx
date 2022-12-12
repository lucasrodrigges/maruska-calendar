import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { EMAIL_RGX } from '../helpers/data';
import '../style/ProfileEdit.css';
import { GlobalContext } from '../context/GlobalProvider';
import { editUser } from '../api/routes/userRoute';

export default function ProfileEdit() {
  const {
    user, setUser,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  function handleChange({ target: { name, value } }) {
    if (name === 'email' && EMAIL_RGX.test(value)) {
      setUser({
        ...user,
        [name]: value,
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    editUser(user).then(({ status, data }) => {
      if (status === 200) navigate(-1);
      else console.log(data);
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
