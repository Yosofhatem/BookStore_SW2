import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  let { setRole } = useContext(authContext);
  let [errMsg, setErrMsg] = useState("");
  let [sucMsg, setSucMsg] = useState("");
  let [spin] = useState(false);
  let navigate = useNavigate();
  let { setToken } = useContext(authContext);

  const myformik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: async (values) => {
      const user = {
        username: values.username,
        password: values.password,
      };
      try {
        const response = await axios.post("http://localhost:8080/login", user);
        const decoded = jwtDecode(
          response.data.token,
          "4bb6d1dfbafb64a681139d1586b6f1160d18159afd57c8c79136d7490630407c"
        );
        const myrole = decoded.role;
        if (myrole === "USER") {
          localStorage.setItem("role", "user");
          setRole("user");
          sessionStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          setSucMsg("Welcome back");
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        } else if (myrole === "ADMIN") {
          localStorage.setItem("role", "admin");
          setRole("admin");
          sessionStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          setSucMsg("Dashboard activated");
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } else if (myrole === "SUPER_ADMIN") {
          localStorage.setItem("role", "suber_admin");
          setRole("suber_admin");
          sessionStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          setSucMsg("Dashboard activated");
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } else {
          setErrMsg("Error: Incorrect Username or password");
        }
      } catch (error) {
        setErrMsg("Error: An error occurred during login");
      }
    },
    validate: (values) => {
      const errors = {};
      let regEmail = /^[a-zA-z0-9]{5,20}@(gmail|yahoo|outlook).(com|org)$/;
      if (!regEmail.test(values.username)) {
        errors.username = "Email is invalid";
      }
      if (!values.password.match(/^[a-zA-z0-9]{5,15}$/)) {
        errors.password = "Password is invalid";
      }
      return errors;
    },
  });

  return (
    <div className="d-flex align-items-center min-vh-100">
      <form
        onSubmit={myformik.handleSubmit}
        className="w-50 m-auto px-5 shadow-lg rounded-5 py-5"
      >
        <h2 className="cato fw-bolder h1">Login Now:</h2>

        <input
          onBlur={myformik.handleBlur}
          onChange={myformik.handleChange}
          value={myformik.values.username}
          className="form-control my-3"
          type="email"
          name="username"
          placeholder="Enter your email"
        />
        {myformik.errors.username && myformik.touched.username ? (
          <div className="alert alert-danger">{myformik.errors.username}</div>
        ) : null}

        <input
          onBlur={myformik.handleBlur}
          onChange={myformik.handleChange}
          value={myformik.values.password}
          className="form-control my-3"
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        {myformik.errors.password && myformik.touched.password ? (
          <div className="alert alert-danger">{myformik.errors.password}</div>
        ) : null}

        <a
          onClick={() => {
            navigate("/register");
          }}
          className="cato h5 cursor-pointer"
        >
          Register Now ?
        </a>
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            disabled={!myformik.isValid || !myformik.dirty}
            className="btn bg-main my-3 text-white"
          >
            {spin ? <i className="fa fa-spin fa-spinner"></i> : "Login"}
          </button>
        </div>

        {errMsg ? <div className="alert alert-danger">{errMsg}</div> : null}
        {sucMsg ? <div className="alert alert-success">{sucMsg}</div> : null}
      </form>
    </div>
  );
}
