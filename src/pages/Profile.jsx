import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import useLogin from '../hooks/useLogin';

export default function Profile() {
  const [isLoaging, setLoading] = useState(true);
  const isLogged = useLogin();

  useEffect(() => isLogged && setLoading(false), [isLogged]);

  return (
    <div>
      {isLoaging ? <Loading /> : (
        <div>
          <Header />
          <Link to="/editar-perfil">Editar Perfil</Link>
          <Link to="/painel-de-controle">Painel de Controle</Link>
          <Footer />
        </div>
      )}
    </div>
  );
}
