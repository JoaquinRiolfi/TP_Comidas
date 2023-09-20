import React, { useContext, useReducer } from "react";

export const initialState = {
  loading: false,
  userToken: "",
  allRecepies: [],
  detallado: undefined
};

export const ActionTypes = {
  setLoading: "SET_LOADING",
  setUserToken: "SET_USER_TOKEN",
  setRecepies: "SET_RECEPIES",
  setDetallado: "SET_DETALLADO"
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.setLoading: {
      return { ...state, loading: action.newValue };
    }
    case ActionTypes.setRecepies: {
      return { ...state, allRecepies: action.newValue };
    }
    case ActionTypes.setUserToken: {
      return { ...state, userToken: action.newValue };
    }
    case ActionTypes.setDetallado: {
      return { ...state, detallado: action.newValue };
    }
    default: {
      return state;
    }
  }
};

const Context = React.createContext();

export function ContextProvider({ children, initialState = initialState }) {
  const [contextState, setContextState] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ contextState, setContextState }}>
      {children}
    </Context.Provider>
  );
}

export const useContextState = () => useContext(Context);
