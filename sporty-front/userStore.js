import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

const initialState = {
  user: {
    loading: false,
    data: null,
    error: null,
  },
  post: {
    loading: false,
    data: null,
    error: null,
  },
};

const loadingState = {
  loading: true,
  data: null,
  error: null,
};

const success = (data) => ({
  loading: false,
  data,
  error: null,
});

const error = (e) => ({
  loading: false,
  data: null,
  error: e,
});

function userReducer(state, action) {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        user: loadingState,
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        user: success(action.data),
      };
    case "GET_USER_ERROR":
      return {
        ...state,
        error: error(action.error),
      };
    case "LOG_OUT":
      return initialState;

    default:
      throw new Error(`Unhanded action type: ${action.type}`);
  }
}

const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

export function UserProvieder({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const state = useContext(UserStateContext);
  if (!state) {
    throw new Error("Cannot find UserProvider");
  }
  return state;
}

export function useUserDispatch() {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find UsersProvider");
  }
  return dispatch;
}

export async function getUser(dispatch, id) {
  dispatch({ type: "GET_USER" });
  try {
    const response = await axios.get(
      `http://localhost:8000/accounts/api/user/${id}`,
    );
    dispatch({ type: "GET_USER_SUCCESS", data: response.data });
  } catch (error) {
    dispatch({ type: "GET_USER_ERROR", error: e });
  }
}
