import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';
import '../style/Footer.css';
import AdminButtons from './AdminButtons';

export default function Footer() {
  const { showActions, setShowActions } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => setShowActions(false), []);

  return (
    <div className="footer-container">
      {showActions && (
      <div className="buttons-container">
        <AdminButtons type="addEvent" />
        <button
          className="button-2"
          type="button"
          onClick={() => navigate('/eventos-finalizados')}
        >
          Shows Realizados
        </button>
        <button
          className="button-2"
          type="button"
          onClick={() => {
            setShowActions(!showActions);
            navigate('/musicos');
          }}
        >
          Músicos Cadastrados
        </button>
      </div>
      )}
      <footer className="footer">
        <Link to="/calendario">
          <i className="fa-solid fa-house icons footer-icons" />
        </Link>
        <button
          className="plus-footer-button fa-solid fa-circle-plus icons plus-button footer-icons"
          type="button"
          onClick={() => setShowActions(!showActions)}
        >
          <i />
          {/* <i className="fa-solid fa-circle-plus icons plus-button footer-icons" /> */}
        </button>
        <Link to="/perfil">
          <i className="fa-solid fa-user icons footer-icons" />
        </Link>
      </footer>
    </div>
  );
}
