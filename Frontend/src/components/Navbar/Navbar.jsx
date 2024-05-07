import React, { useContext, useEffect } from "react";
import axios from "axios";

import { NavLink } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";

export default function Navbar() {
  let { role, setRole, setRole2, setToken, setUsername } =
    useContext(authContext);
  let { token } = useContext(authContext);
  useEffect(() => {}, []);

  function logout() {
    localStorage.setItem("role", "");
    localStorage.setItem("role2", "");
    sessionStorage.setItem("token", "");
    setToken("");
    setRole("");
    setRole2("");
    setUsername("");
    logoutInServer(token);
  }

  async function logoutInServer(token) {
    if (!token) {
      return;
    }
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.get("http://localhost:8080/logout");
    } catch (error) {
    } finally {
      delete axios.defaults.headers.common["Authorization"];
    }
  }

  return (
    <nav className="navbar shadow-lg navbar-expand-lg py-4">
      <div className="container-fluid ff">
        <NavLink className="nav-link fw-bolder fs-4 ff2" to="/home">
          WHICH BK?
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse nav-font"
          id="navbarSupportedContent"
        >
          {role === "user" && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item px-3">
                <NavLink
                  className="nav-link position-relative"
                  to="/comingsoon"
                >
                  Coming Soon
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    soon
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/mostpopular">
                  Most Popular
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/free">
                  Free Books
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li>
            </ul>
          )}
          {(role === "admin" || role==="suber_admin")&& (
            <>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    New Book
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/allbooks">
                    Books
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/manage">
                    Manage Users
                  </NavLink>
                </li>
              </ul>
            </>
          )}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!role ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {role === "user" && (
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/cart">
                        <i
                          className="fas fa-shopping-cart"
                          style={{ fontSize: "30px", paddingRight: "10px" }}
                        ></i>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        onClick={logout}
                        className="nav-link"
                        to="/login"
                      >
                        <i className="fa-solid fa-right-from-bracket"></i> Log
                        out
                      </NavLink>
                    </li>
                  </ul>
                )}
                {(role === "admin" || role === "suber_admin")&& (
                  <li className="nav-item">
                    <NavLink onClick={logout} className="nav-link" to="/login">
                      <i className="fa-solid fa-right-from-bracket"></i> Log out
                    </NavLink>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
