// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB1BD_5kOwwfxgWXX9YIix0ug6k5xpBpjw',
  authDomain: 'fleety-c8830.firebaseapp.com',
  projectId: 'fleety-c8830',
  storageBucket: 'fleety-c8830.appspot.com',
  messagingSenderId: '171555363542',
  appId: '1:171555363542:web:d82bdec8966e9bac74c777',
  measurementId: 'G-YP5EYQES36',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
