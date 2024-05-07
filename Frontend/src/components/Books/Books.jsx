import React, { useContext, useEffect, useState } from 'react'
import Book from './Book/Book'
import axios from 'axios';
import { authContext } from '../../Context/AuthContext';

export default function Books() {

let [books, setBooks] = useState([]);
let{newBooks}=useContext(authContext);


  useEffect(()=>{getBooks()},[]);

  let getBooks=async()=>{
      try {
          console.log(newBooks);
          let {data:{books}} = await axios.get('https://api.itbook.store/1.0/new');
          let cc=[...newBooks,...books]
          console.log(cc);
          setBooks(cc);
      } catch (error) {
          console.log(error);
      }
  }

  return (
  <>
    <div className="container-fluid  ">
      <div className="row">
       
          {books.map((elem,index)=>
          {
            return <Book indo={index} key={elem.isbn13} element={elem} size={4} />
          }
          )}
      </div>
    </div>
  </>
  )
}