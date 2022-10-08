import React, { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (component, initialEntries = ['/']) => {
  const history = createMemoryHistory({ initialEntries });
  return ({
    ...render(
      <BrowserRouter history={history}>
        {component}
      </BrowserRouter>,
    ),
    history,
  });
};
export default renderWithRouter;
