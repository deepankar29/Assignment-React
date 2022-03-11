import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDuqqiZrJO8ynsIznF-Q8ssXQD1Fx4_D4U",
  authDomain: "assignment-dade2.firebaseapp.com",
  projectId: "assignment-dade2",
  storageBucket: "assignment-dade2.appspot.com",
  messagingSenderId: "193421132614",
  appId: "1:193421132614:web:bf7e54b240b23d44b91b47"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();