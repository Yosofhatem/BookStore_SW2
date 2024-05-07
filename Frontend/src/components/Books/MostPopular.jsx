import React, { useContext, useEffect, useState } from 'react';
import Book2 from './Book/Book2';
import axios from 'axios';
import { authContext } from '../../Context/AuthContext';

export default function MostPopular() {
  const [books, setBooks] = useState([]);
  const { token } = useContext(authContext);

  useEffect(() => {
    const getBooks = async () => {
      try {
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        const { data } = await axios.get('http://localhost:8080/api/books/most-popular');
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };

    getBooks();
  }, [token]);

  return (
    <>
      <div className="min-vh-100 py-3 overflow-hidden container">
        <div className="row">
          <h2 className="px-4 pt-3 m-0 cato fw-bolder fs-1">TOP RATED</h2>
          <hr className="position-relative" style={{ top: '-20px', left: '250px' }} />
          {books.map((elem) => (
            <Book2 key={elem.id} element={elem} size={4} />
          ))}
        </div>
      </div>
    </>
  );
}
