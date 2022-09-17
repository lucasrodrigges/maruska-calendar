import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_DATA_BASE_URL,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
  apiKey: 'AIzaSyBw6sZhMuuAZ-hiEQd0y0a7oFqyGwVV5BQ',
  authDomain: 'maruska-calendar.firebaseapp.com',
  databaseURL: 'https://maruska-calendar-default-rtdb.firebaseio.com',
  projectId: 'maruska-calendar',
  storageBucket: 'maruska-calendar.appspot.com',
  messagingSenderId: '888903651711',
  appId: '1:888903651711:web:0245e72024e48d532cca4a',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
