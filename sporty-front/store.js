import React, { createContext, useContext, useReducer } from "react";
import { getStorageItem, setStorageItem } from "./utils/userLocalStorage";

const AppContext = createContext();

const reducer = (prevState, action) => {
  const { type } = action;
  if (type === SET_TOKEN) {
    const { palyload: jwtToken } = action;
    setStorageItem("jwtToken", jwtToken);
    return { ...prevState, jwtToken, isAuthenticated: true };
  } else if (type === DELETE_TOKEN) {
    setStorageItem("jwtToken", "");
    return { ...prevState, jwtToken: "", isAuthenticated: false };
  }
  return prevState;
};

export const AppProvider = ({ children }) => {
  const jwtToken = getStorageItem("jwtToken", "");
  const [store, dispatch] = useReducer(reducer, {
    jwtToken,
    isAuthenticated: jwtToken.length > 0,
  });
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

//Actions
const SET_TOKEN = "APP/TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

//Action Creators
export const setToken = (token) => ({ type: SET_TOKEN, palyload: token });
export const deleteToken = () => ({ type: DELETE_TOKEN });
