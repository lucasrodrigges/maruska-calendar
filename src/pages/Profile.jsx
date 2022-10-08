import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { UserContext } from '../context/UserProvider';
import useLogin from '../hooks/useLogin';
import { app } from '../services/firebase';

export default function Profile() {
  const { setUserEdit, toUpdateProfile, setUpdateProfile } = useContext(UserContext);
  const [isLoaging, setLoading] = useState(true);
  const [user, setUser] = useState({
    uid: '',
    displayName: '',
    email: '',
    photoURL: '',
  });

  const isLogged = useLogin();
  const auth = getAuth(app);
  const navigate = useNavigate();

  useEffect(() => isLogged && setLoading(false), [isLogged]);
  useEffect(() => setUpdateProfile(!toUpdateProfile), []);

  useEffect(() => {
    onAuthStateChanged(auth, ({
      uid, email, displayName, photoURL,
    }) => {
      // console.log(photoURL);
      setUser({
        uid, email, displayName, photoURL,
      });
    });
  }, [toUpdateProfile]);

  function goToProfileEdit() {
    setUserEdit(user);
    navigate('/editar-perfil');
  }

  return (
    <div>
      {isLoaging ? <Loading /> : (
        <div>
          <Header />
          <div>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="Imagem de Perfil"
                width="100px"
              />
            )}
            <p>
              {`Nome: ${user.displayName ? user.displayName : 'Não definido'}`}
            </p>
            <p>
              {`Email: ${user.email ? user.email : 'Não definido'}`}
            </p>
          </div>
          <button type="button" onClick={goToProfileEdit}>Editar Perfil</button>
          <Link to="/painel-de-controle">Painel de Controle</Link>
          <Link to="/">Sair</Link>
          <Footer />
        </div>
      )}
    </div>
  );
}
