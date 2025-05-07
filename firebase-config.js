const firebaseConfig = {
    apiKey: "AIzaSyBGeqR13hR3vjc4fpBl3oY3i9ZooS7IbiE",
    authDomain: "rastreador-mattos.firebaseapp.com",
    databaseURL: "https://rastreador-mattos-default-rtdb.firebaseio.com",
    projectId: "rastreador-mattos",
    storageBucket: "rastreador-mattos.firebasestorage.app",
    messagingSenderId: "504029209311",
    appId: "1:504029209311:web:42946dbe8a0a82d14a3f6a"
  };
  
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();