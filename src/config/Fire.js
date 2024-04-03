import { getStorage, ref } from '@firebase/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage'
const config= {

//Simulasi

  // apiKey: "AIzaSyAJ7plhJGhXcPLsXMjkXGkBblmBzQaMTMU",
  // authDomain: "asapedia-staging.firebaseapp.com",
  // databaseURL: "https://asapedia-staging-default-rtdb.asia-southeast1.firebasedatabase.app",
  // projectId: "asapedia-staging",
  // storageBucket: "asapedia-staging.appspot.com",
  // messagingSenderId: "32869104013",
  // appId: "1:32869104013:web:e8deea82a86e1dbc6fe5c4"

  //Running
  apiKey: "AIzaSyC42Ov8lrObmGfbnu4tD-XWJLBX2xzL4c0",
  authDomain: "asapedia-running.firebaseapp.com",
  databaseURL: "https://asapedia-running-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "asapedia-running",
  storageBucket: "asapedia-running.appspot.com",
  messagingSenderId: "492010598096",
  appId: "1:492010598096:web:6d55defa64d9bcf35538d5"
}

const Fire = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export const storage = getStorage(Fire)


export default Fire;