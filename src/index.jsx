import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { EventProvider } from './context/EventProvider';
import { CalendarProvider } from './context/CalendarProvider';
import { MusiciansProvider } from './context/MusiciansProvider';
import { UserProvider } from './context/UserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CalendarProvider>
          <EventProvider>
            <MusiciansProvider>
              <App />
            </MusiciansProvider>
          </EventProvider>
        </CalendarProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
