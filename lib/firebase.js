import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAUJuzoscRsBs76UkEcByf6OcsdW8Rovxo',
  authDomain: 'note-9d00a.firebaseapp.com',
  projectId: 'note-9d00a',
  storageBucket: 'note-9d00a.appspot.com',
  messagingSenderId: '641341130079',
  appId: '1:641341130079:web:fd3770a5b4a2e72f5be2ea',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
