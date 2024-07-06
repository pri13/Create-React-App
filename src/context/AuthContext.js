// Import necessary React functions and Firebase authentication functions.
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

// Create a new context for authentication.
const AuthContext = createContext();

// Custom hook to use the AuthContext.
export const useAuth =  () => useContext(AuthContext);

// Create a provider component to wrap the application and provide authentication context.
export const AuthProvider = ({ children }) => {
  // State to hold the currently authenticated user.
  const [currentUser, setCurrentUser] = useState(null);
  // State to manage loading state while checking authentication status.
  const [loading, setLoading] = useState(true);

  // useEffect hook to set up an authentication state observer and get user data.
  useEffect(() => {
    // Subscribe to the Firebase authentication state change.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Update the currentUser state with the authenticated user.
      setCurrentUser(user);
      // Set loading to false once the authentication state is checked.
      setLoading(false);
    });

    // Unsubscribe from the observer when the component unmounts.
    return unsubscribe;
  }, []);

  // Function to log in a user using email and password.
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to sign up a new user using email and password.
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Function to log out the current user.
  const logout = () => {
    return signOut(auth);
  };

  // Define the value to be passed to the context consumers.
  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  // Provide the authentication context to the children components if not loading.
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
