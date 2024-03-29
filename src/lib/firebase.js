// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAZ9nrYGRvhQvwlM9x10dDVp9HXyKQ9LZw',
  authDomain: 'tcl-32-smart-shopping-list.firebaseapp.com',
  projectId: 'tcl-32-smart-shopping-list',
  storageBucket: 'tcl-32-smart-shopping-list.appspot.com',
  messagingSenderId: '871543897916',
  appId: '1:871543897916:web:67a8a476ae40984ff0e839',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
