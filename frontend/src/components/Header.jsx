import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import '../style/Header.css';
import maruskaLogo2 from '../images/maruska-logo-2.png';
import { GlobalContext } from '../context/GlobalProvider';

export default function Header() {
  const { currMonth } = useContext(GlobalContext);

  const location = useLocation();
  const { pathname } = location;

  function generateH2() {
    let H2;

    if (pathname.includes('calendario')) {
      H2 = (<h2 className="header-items header-subtitle">{`Agenda de ${currMonth}`}</h2>);
    } if (pathname.includes('novo-show')) {
      H2 = (<h2 className="header-items header-subtitle">Cadastro de Evento</h2>);
    } if (pathname.includes('banda')) {
      H2 = (<h2 className="header-items header-subtitle">Cadastro de Banda</h2>);
    } if (pathname.includes('musicos')) {
      H2 = (<h2 className="header-items header-subtitle">Músicos Cadastrados</h2>);
    } if (pathname.includes('novo-musico')) {
      H2 = (<h2 className="header-items header-subtitle">Cadastro de músico</h2>);
    } if (pathname.includes('perfil')) {
      H2 = (<h2 className="header-items header-subtitle">Perfil</h2>);
    }
    return H2;
  }

  return (
    <header className="header">
      <div>
        <h1 className="header-items header-title">Maruska Calendar</h1>
        {generateH2()}
      </div>
      <div>
        <img className="header-items" src={maruskaLogo2} alt="" width="50px" />
      </div>
    </header>
  );
}
