import React, { createContext, useReducer, useEffect } from "react";

const initialState = {
  posts: [],
  users: [],
  authUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return { ...state, posts: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_AUTH_USER":
      return { ...state, authUser: action.payload };
    case "LOGOUT":
      return { ...state, authUser: null };
    default:
      return state;
  }
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3003/api/blog/posts-comments"
      );
      const data = await response.json();
      dispatch({ type: "SET_POSTS", payload: data });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3003/api/blog/users");
      const data = await response.json();
      dispatch({ type: "SET_USERS", payload: data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const setAuthUser = (user) => {
    dispatch({ type: "SET_AUTH_USER", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const value = {
    ...state,
    fetchPosts,
    fetchUsers,
    setAuthUser,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
