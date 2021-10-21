import React, { useEffect, useState, useContext } from "react";
import {
  auth,
  createUserProfileDocument,
  addCollectionDocs,
  removeCollectionDocs,
  getMoviesDocs,
} from "../utils/firebase";

export const FirebaseContext = React.createContext({ currentUser: null });

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [favoritesMovies, setFavoritesMovies] = useState([]);

  let unsubscribeFromAuth = null;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot(async (snapshot) => {
          setCurrentUser({ id: snapshot.id, ...snapshot.data() });
          const movies = await getMoviesDocs(snapshot.id);
          setFavoritesMovies(movies);
        });

        return;
      }
      setCurrentUser(null);
      setFavoritesMovies([]);
      return () => {
        unsubscribeFromAuth();
      };
    });
  }, []);

  const addFavoriteMovieToFirebase = async (movie) => {
    const { id } = currentUser;
    try {
      const movieAdded = await addCollectionDocs("movies", {
        ...movie,
        userId: id,
      });
      setFavoritesMovies([...favoritesMovies, movieAdded]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeFavoriteFromFirebase = async (id) => {
    try {
      await removeCollectionDocs("movies", id);
      setFavoritesMovies((favorites) =>
        favorites.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        currentUser,
        favoritesMovies,
        setCurrentUser,
        addFavoriteMovieToFirebase,
        removeFavoriteFromFirebase,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
