import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCOf26rMETwWaaoUGKt6UJTGX7PIcvP6Y0",
    authDomain: "final-project-back-end.firebaseapp.com",
    projectId: "final-project-back-end",
    storageBucket: "final-project-back-end.appspot.com",
    messagingSenderId: "37969147227",
    appId: "1:37969147227:web:91b5eed46a4b9714dc567e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;