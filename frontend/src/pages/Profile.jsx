import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { GlobalContext } from '../context/GlobalProvider';
import UserRoute from '../hooks/axios/routes/UserRoute';
import '../style/Profile.css';

export default function Profile() {
  const {
    user, setUser, setUserEdit,
  } = useContext(GlobalContext);

  const [isLoaging, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const route = UserRoute();

  useEffect(() => {
    route.getMe().then(({ status, data }) => {
      if (status === 200) {
        setUser({
          id: data.id, name: data.name, email: data.email, isAdmin: data.isAdmin,
        });
        setIsLoading(!isLoaging);
      } else {
        navigate('/perfil');
      }
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
