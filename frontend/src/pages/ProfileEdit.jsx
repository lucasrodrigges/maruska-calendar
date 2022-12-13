import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { EMAIL_RGX } from '../helpers/data';
import '../style/ProfileEdit.css';
import { GlobalContext } from '../context/GlobalProvider';
import { deleteMe, editUser } from '../api/routes/userRoute';
import AlertConfirm from '../components/AlertConfirm';

export default function ProfileEdit() {
  const {
    user, setUser,
  } = useContext(GlobalContext);

  const [showAlert, setShowAlert] = useState(false);

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
  }

  const handleDelete = () => {
    deleteMe().then(({ status }) => {
      if (status === 204) navigate('/');
      else alert('Não foi possível deleter usuário.');
    });
  };

  return (
    <div>
      <Header />
      <div className={showAlert ? 'disable' : 'pofile-edit-form-container'}>
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
            onClick={() => setShowAlert(!showAlert)}
          >
            Excluir conta
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
      {showAlert && (
        <AlertConfirm
          func={handleDelete}
          setShowAlert={setShowAlert}
          content="Deseja realmente excluir a conta?"
        />
      )}
      <Footer />
    </div>
  );
}
