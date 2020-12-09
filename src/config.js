import firebase from 'firebase/app'
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDzbMuAV3Xo5j39dwTjrakOuG2tEXz9BoM",
    authDomain: "pylp2020-sawczuk.firebaseapp.com",
    databaseURL: "https://pylp2020-sawczuk.firebaseio.com",
    projectId: "pylp2020-sawczuk",
    storageBucket: "pylp2020-sawczuk.appspot.com",
    messagingSenderId: "23159248482",
    appId: "1:23159248482:web:eab6bed0761b940439a33b"
  };

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore()

export {
    db
}

