import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return ({
    ...render(<BrowserRouter history={history}>{component}</BrowserRouter>), history,
  });
};
export default renderWithRouter;
