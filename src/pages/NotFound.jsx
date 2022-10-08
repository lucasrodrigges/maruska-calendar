import React from 'react';
import '../style/NotFound.css';
import { createBrowserHistory } from 'history';

function NotFound() {
  function returnToLastPage() {
    const history = createBrowserHistory();
    history.back();
  }

  return (
    <div className="notfound">
      <img src="https://cdn130.picsart.com/283263328005211.png" alt="crying unicorn" height={150} />
      <section className="notfound-text">
        Desculpe, mas a página que você tentou acessar não existe ou é limitada à administradores.
      </section>
      <button
        type="button"
        onClick={returnToLastPage}
      >
        Voltar
      </button>
    </div>
  );
}

export default NotFound;
