import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthContext';
import { jwtDecode } from 'jwt-decode';

export default function Register() {
  let { setRole } = useContext(authContext);
  let [errMsg, setErrMsg] = useState('');
  let [sucMsg, setSucMsg] = useState('');
  let [spin] = useState(false);
  let navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: { firstName: '', lastName: '', username: '', password: ''},
    onSubmit: async (values) => {
      const user = {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        password: values.password,
        role: "USER"
      };
      console.log(user);
      try {
        const response = await axios.post('http://localhost:8080/register', user);
        const decoded = jwtDecode(response.data.token, '4bb6d1dfbafb64a681139d1586b6f1160d18159afd57c8c79136d7490630407c');
        const myrole = decoded.role;
        if (myrole === "USER") {
          localStorage.setItem('role', 'user')
          setRole('user');
          sessionStorage.setItem('token', response.data.token);
          setSucMsg('Welcome back');
          setTimeout(() => {
            navigate('/home');
          }, 1000);
        } else if (myrole === "ADMIN") {
          localStorage.setItem('role', 'admin')
          setRole('admin');
          sessionStorage.setItem('token', response.data.token);
          setSucMsg('Dashboard activated');
          setTimeout(() => {
            navigate('/newarrivals');
          }, 1000);
        } else {
          setErrMsg('Error: Incorrect Username or password');
        }
      } catch (error) {
        setErrMsg('Error: An error occurred during login');
        console.error(error);
      }
    },
    validate: (values) => {
      const errors = {}
      if (values.firstName.length < 4) {
        errors.firstName = 'name must be more than 4 characters'
      }
      if (values.lastName.length < 4) {
        errors.lastName = 'name must be more than 4 characters'
      }
      let regEmail = /^[a-zA-z0-9]{5,20}@(gmail|yahoo|outlook).(com|org)$/;
      if (!regEmail.test(values.username)) {
        errors.username = 'email is invalid';
      }
      if (!values.password.match(/^[a-zA-z0-9]{5,15}$/)) {
        errors.password = 'password is invalid';
      }
      return errors;
    }
  });

  return (
    <div className="w-50 m-auto my-5 py-5 min-vh-100">
      <form className="form py-5 my-5 px-5 shadow-lg rounded-5" onSubmit={myFormik.handleSubmit}>
        <h2 className='cato fw-bolder h1'>Register Now :</h2>
        <input onBlur={myFormik.handleBlur} id='firstName' onChange={myFormik.handleChange} value={myFormik.values.firstName} name='firstName' type="text" className="form-control my-3" placeholder='Enter Your First Name' />
        {myFormik.errors.firstName && myFormik.touched.firstName ? <div className="alert alert-danger"> {myFormik.errors.firstName}</div> : null}
        <input onBlur={myFormik.handleBlur} id='lastName' onChange={myFormik.handleChange} value={myFormik.values.lastName} name='lastName' type="text" className="form-control my-3" placeholder='Enter Your Last Name' />
        {myFormik.errors.lastName && myFormik.touched.lastName ? <div className="alert alert-danger"> {myFormik.errors.lastName}</div> : null}
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.username} name='username' type="email" className="form-control my-3" placeholder='Enter Your Email' />
        {myFormik.errors.username && myFormik.touched.username ? <div className="alert alert-danger"> {myFormik.errors.username}</div> : null}
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} name='password' type="password" className="form-control my-3" placeholder='Enter Your Password' />
        {myFormik.errors.password && myFormik.touched.password ? <div className="alert alert-danger"> {myFormik.errors.password}</div> : null}
        <div className='d-flex justify-content-end'>
          <button type='submit' disabled={!myFormik.isValid || !myFormik.dirty} className=' btn bg-main text-white'>
            {spin ? <i className='fa fa-spin fa-spinner'></i> : 'Register'}
          </button>
        </div>
        {errMsg ? <div className="alert alert-danger my-3">{errMsg}</div> : null}
        {sucMsg ? <div className='alert alert-success'>{sucMsg}</div> : null}
      </form>
    </div>
  );
}