import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <img src="https://cdn130.picsart.com/283263328005211.png" alt="crying unicorn" height={150} />
      <section className="notfound-text">
        Desculpe, mas a página que você tentou acessar não existe ou é limitada à administradores.
      </section>
      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        Voltar
      </button>
    </div>
  );
}

export default NotFound;
