import firebase from 'firebase';
// import 'firebase/firestore';
const config = {
  apiKey: "AIzaSyC6P23lmKJapcq1wZPTtCHlTK9EDZ4u2ss",
  authDomain: "lost-and-found-proj.firebaseapp.com",
  projectId: "lost-and-found-proj",
  storageBucket: "lost-and-found-proj.appspot.com",
  messagingSenderId: "835920232037",
  appId: "1:835920232037:web:b8b3c1c3221529578e908c",
  measurementId: "G-YXPT4CZGFE"
}
export const Firebase = firebase.initializeApp(config);

export const Firestore = firebase.firestore();

export const Firestorage = firebase.storage();