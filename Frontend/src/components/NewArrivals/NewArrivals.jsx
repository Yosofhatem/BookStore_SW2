import React, { useContext } from 'react'
import Books from '../Books/Books'
import { authContext } from '../../Context/AuthContext';

export default function NewArrivals() {
  let {token} = useContext(authContext);


  console.log("my token is: "+token);
  return (
    <div className='min-vh-100 overflow-hidden py-3' >
          <h2 className='px-4 pt-3 m-0 cato fw-bolder fs-1 '>NEW REALESES</h2>
          <hr className='position-relative ' style={{top:'-39px', left:'336px'}}/>
          <Books/>
    </div>
  )
}
