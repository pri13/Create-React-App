import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA0RzX5KW4hBvPwZY5oykAt1xUOyRN-h28",
    authDomain: "learn-react-with-auth.firebaseapp.com",
    projectId: "learn-react-with-auth",
    storageBucket: "learn-react-with-auth.appspot.com",
    messagingSenderId: "854824964832",
    appId: "1:854824964832:web:65a4333fbf00d98fbcb685"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  export {auth};