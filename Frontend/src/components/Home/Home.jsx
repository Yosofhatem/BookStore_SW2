import React, {useContext, useState } from 'react'
import jpgimg from "../../images/bg2.png"
import AllSearched from '../Books/AllSearched'
import axios from 'axios';
import { authContext } from '../../Context/AuthContext';


export default function Home() {

let [search, setSearch] = useState("");
let [books, setBooks] = useState([]);
let {token} = useContext(authContext);

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const searchBook=async(evt)=>{
  if(evt.key==="Enter")
  {
      axios.get('http://localhost:8080/api/books/search-book/'+search)
      .then(res=>setBooks(res.data))
      .catch(err=>null)
  }
}

  return (
    <div className='min-vh-100' >
      <div className='shadow-lg'>


        <div className="header bg-main">
          <div className="row1">
            <h1 className='z-3 position-relative text-white'>A room without books is like<br/> a body without a soul.</h1>
          </div>
          <div className="row2 vh-100">
            <h2 className='text-white fw-semibold ff1'>Find Your Book</h2>

            <div className="search shadow ">
              <input  value={search}  onChange={e=>setSearch(e.target.value)}  onKeyPress={searchBook}  className='rounded-start-3' type="search" placeholder="Enter Your Book Name"
              />
              <button className='rounded-end-3'><i className="fas fa-search"></i></button>
            </div>
            <img src={jpgimg} alt="" />
          </div>
        </div>

      </div>

      <h2 className='fw-bolder text-center  fs-1  py-4 '> Searched books</h2>
      <div className="container">
        {
          <AllSearched books={books} />
        }
      </div>
    </div>
  )
}
