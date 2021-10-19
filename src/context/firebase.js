import React, { useEffect, useState, useContext } from "react";
import { auth, createUserProfileDocument } from "../utils/firebase";

export const FirebaseContext = React.createContext({ currentUser: null });

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used with provider");
  }
};

export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ currentUser: null });
  let unsubscribeFromAuth = null;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            currentUser: { id: snapshot.id, ...snapshot.data() },
          });
        });
        return;
      }
      setCurrentUser({ currentUser: null });
      return () => {
        unsubscribeFromAuth();
      };
    });
  }, []);

  return (
    <FirebaseContext.Provider value={currentUser}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
