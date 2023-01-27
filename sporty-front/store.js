import React, { createContext, useContext, useReducer } from "react";
import { getStorageItem, setStorageItem } from "./utils/userLocalStorage";

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

const stateContext = createContext(null);
const dispatchContext = createContext(null);

export const AppProvider = ({ children }) => {
  const jwtToken = getStorageItem("jwtToken", "");
  const [store, dispatch] = useReducer(reducer, {
    jwtToken,
    isAuthenticated: jwtToken?.length > 0,
  });

  return (
    <stateContext.Provider value={store}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
};

export const useStoreState = () => {
  const state = useContext(stateContext);
  if (!state) {
    throw new Error("Cannot find UserProvider");
  }
  return state;
};

export function useStoreDispatch() {
  const dispatch = useContext(dispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find UsersProvider");
  }
  return dispatch;
}

//Actions
const SET_TOKEN = "APP/TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

//Action Creators
export const setToken = (token) => ({ type: SET_TOKEN, palyload: token });
export const deleteToken = () => ({ type: DELETE_TOKEN });
