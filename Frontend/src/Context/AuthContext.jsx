import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import React from "react";
export let authContext = createContext();
export default function AuthProvider({ children }) {
  let [newBooks, setNewBooks] = useState(
    JSON.parse(localStorage.getItem("newBooks"))
  );
  let [token, setToken] = useState(sessionStorage.getItem("token"));
  let [role, setRole] = useState(localStorage.getItem("role"));
  let [role2, setRole2] = useState(localStorage.getItem("role2"));
  let [userId, setUserId] = useState(0);
  let [username, setUsername] = useState("");

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(
        token,
        "4bb6d1dfbafb64a681139d1586b6f1160d18159afd57c8c79136d7490630407c"
      );
      setUserId(decoded.userId);
      setUsername(decoded.username);
    }
  }, [token]);

  useEffect(() => {}, [newBooks]);

  useEffect(() => {
    if (role != null) setRole(localStorage.getItem("role"));
    else {
      return;
    }
  }, [role]);

  useEffect(() => {
    if (role2 != null) setRole2(localStorage.getItem("role2"));
    else {
      return;
    }
  }, [role2]);

  function del(id) {
    for (let i = 0; i < newBooks.length; i++) {
      if (newBooks[i].isbn13 === id) {
        newBooks.splice(i, 1);
        localStorage.setItem("newBooks", JSON.stringify(newBooks));
        setNewBooks(newBooks);
      }
    }
  }

  return (
    <authContext.Provider
      value={{
        role,
        setRole,
        setNewBooks,
        newBooks,
        del,
        setRole2,
        token,
        setToken,
        userId,
        username,
        setUsername,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
