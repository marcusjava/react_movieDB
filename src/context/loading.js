import React, { useState, useMemo, useContext } from "react";
import Spinner from "../components/Spinner";

// import { Container } from './styles';

/* const useContextFactory = (name, context) => {
  return () => {
    const ctx = useContext(context);
    if (ctx === undefined) {
      throw new Error(
        `use${name}Context must be used withing a ${name}ContextProvider.`
      );
    }
    return ctx;
  };
}; */

export const GlobalSpinnerContext = React.createContext();

export const useGlobalSpinner = () => {
  const context = useContext(GlobalSpinnerContext);
  if (context === undefined) {
    throw new Error(
      `useGlobalSpinnerContext must be called within GlobalSpinnerContextProvider`
    );
  }

  return context;
};

function GlobalSpinnerProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const value = useMemo(() => ({ loading, setLoading }), [loading]);

  return (
    <GlobalSpinnerContext.Provider value={{ loading, setLoading }}>
      {loading ? <Spinner /> : children}
    </GlobalSpinnerContext.Provider>
  );
}

export default GlobalSpinnerProvider;
