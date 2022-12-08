import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminButtons from '../components/AdminButtons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { UserContext } from '../context/UserProvider';
import fetch from '../services/fetchers/axios';
import '../style/Profile.css';

export default function Profile() {
  const { setUserEdit, toUpdateProfile, setUpdateProfile } = useContext(UserContext);
  const [isLoaging, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: '',
    email: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    setUpdateProfile(!toUpdateProfile);
  }, []);

  useEffect(() => {
    fetch.get('/user/me').then(({ data: { name, email } }) => {
      // console.log(me);
      setUser({ name, email });
      setIsLoading(!isLoaging);
    });
  }, []);

  function goToProfileEdit() {
    setUserEdit(user);
    navigate('/editar-perfil');
  }

  return (
    <div>
      {isLoaging ? <Loading /> : (
        <div>
          <Header />
          <div className="profile-container">
            <div className="user-card">
              <p>
                {`Nome: ${user.name ? user.name : 'Não definido'}`}
              </p>
              <p>
                {`Email: ${user.email ? user.email : 'Não definido'}`}
              </p>
            </div>
            <button
              className="button-1"
              type="button"
              onClick={goToProfileEdit}
            >
              Editar Perfil
            </button>
            <AdminButtons type="dashboard" />
            <button
              className="button-1"
              type="button"
              onClick={() => navigate('/')}
            >
              Sair

            </button>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
