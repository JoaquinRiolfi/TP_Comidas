import React, { createContext, useReducer, useContext } from "react";


const initialState = {
  userToken: "",
  menu: [],
};

const ActionTypes = {
  setUserToken: "SET_USER_TOKEN",
  setMenu: "SET_MENU",
  eliminarMenu: "ELIMINAR_MENU",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.setUserToken:
      return { ...state, userToken: action.newValue };
    case ActionTypes.setMenu:
      return { ...state, menu: [...state.menu, action.newValue] };
    case ActionTypes.eliminarMenu:
      return {
        ...state,
        menu: state.menu.filter((element) => element.id !== action.newValue),
      };
    default:
      return state;
  }
};


const Context = createContext();


export const ContextProvider = ({ children }) => {
  const [contextState, dispatch] = useReducer(reducer, initialState);

  const setContextState = (action) => {
    dispatch(action);
  };

  return (
    <Context.Provider value={{ contextState, setContextState }}>
      {children}
    </Context.Provider>
  );
};

export const useContextState = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useContextState debe usarse dentro de un ContextProvider");
  }
  return context;
};