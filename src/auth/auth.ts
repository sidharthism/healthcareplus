import React, { useContext, useEffect, useState } from "react";
import { auth as firebaseAuth } from "../firebase/firebase";

// For use by components within app after logging in
interface Auth {
  loggedIn: boolean;
  userId?: string;
}

// Used by App component in initializing firebase authentication
// To set auth value available only when loading is false
interface AuthInit {
  loading: boolean;
  auth?: Auth;
}

// Authentication Context
export const AuthContext = React.createContext<Auth>({ loggedIn: false });

export function useAuth(): Auth {
  return useContext(AuthContext);
}

export function useAuthInit(): AuthInit {
  const [authInit, setAuthInit] = useState<AuthInit>({
    loading: true,
  });
  useEffect(() => {
    // Call onAuthStateChanged only once when the App is rendered for first time ([])
    // To get notified when the authentication state changes
    // If not logged in, returns null
    // Using it to set login flag
    // Should be returned since a component being unmounted should
    // need to unsubscribe.
    return firebaseAuth.onAuthStateChanged((firebaseUser) => {
      const auth = firebaseUser
        ? { loggedIn: true, userId: firebaseUser.uid }
        : { loggedIn: false };
      setAuthInit({ loading: false, auth });
    });
  }, []);
  return authInit;
}

// Auth provider
export const appAuth = firebaseAuth;
