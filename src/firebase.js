// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCkZAR60NOBlujknQVdBhixumuVacmZ5aE',
  authDomain: 'camp-ing.firebaseapp.com',
  projectId: 'camp-ing',
  storageBucket: 'camp-ing.appspot.com',
  messagingSenderId: '812235456970',
  appId: '1:812235456970:web:30aa050ed69a1d6b0ecf33',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
export const storage = getStorage(app);
