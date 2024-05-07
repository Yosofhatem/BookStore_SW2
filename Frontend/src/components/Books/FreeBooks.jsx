import React, { useContext, useEffect, useState } from 'react'
import GoogleBook from './Book/GoogleBook'
import axios from 'axios';
import { authContext } from '../../Context/AuthContext';

export default function FreeBooks() {
    let [books, setBooks] = useState([]);
    let {token} = useContext(authContext);

    useEffect(() => { getBooks() }, []);

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    let getBooks = async () => {
        try {
            let { data } = await axios.get('http://localhost:8080/api/books/free-book');
            setBooks(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='min-vh-100 py-3 overflow-hidden container'>
            <div className="row">
                <h2 className='px-4 pt-3 m-0 cato fw-bolder fs-1 '>FREE BOOKS</h2>
                <hr className='position-relative ' style={{ top: '-22px', left: '292px' }} />

                {books.map((elem) => {
                    return <GoogleBook key={elem.id} element={elem} size={3} />
                }
                )}
            </div>
        </div>
    )
}
