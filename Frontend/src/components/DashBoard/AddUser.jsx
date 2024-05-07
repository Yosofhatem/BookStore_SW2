import React, { useContext, useState } from 'react';
import { authContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';




export default function AddUser() {
  let { setRole,token } = useContext(authContext);
  let [errMsg, setErrMsg] = useState('');
  let [sucMsg, setSucMsg] = useState('');
  let [spin] = useState(false);
  let navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: { firstName: '', lastName: '', username: '', password: '',role: "ADMIN"},
    onSubmit: async (values) => {
      // const user = {
      //   firstName: values.firstName,
      //   lastName: values.lastName,
      //   username: values.username,
      //   password: values.password,
      //   role: "USER"
      // };
      // console.log(user);
      try {
        // let {data} = await axios.post()
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        let response = await axios.post('http://localhost:8080/api/books/add_new_admin', values);
        console.log(response)
        setTimeout(() => {
          navigate('/manage');
        }, 1000);

        
      } catch (error) {
        setErrMsg('Error: An error occurred during login');
        console.error(error);
      }
    },
    validate: (values) => {
      
    }
  });

  return (
    <div className="w-50 m-auto my-5 py-5 min-vh-100">
      <form className="form py-5 my-5 px-5 shadow-lg rounded-5" onSubmit={myFormik.handleSubmit}>
        <h2 className='cato fw-bolder h1'>Add admin :</h2>


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
  