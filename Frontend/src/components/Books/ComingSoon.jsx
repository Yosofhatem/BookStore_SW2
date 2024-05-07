import React, { useContext, useEffect, useState } from 'react'
import Book3 from './Book/Book3';
import axios from 'axios';
import { authContext } from '../../Context/AuthContext';

export default function ComingSoon() {
    let [books, setBooks] = useState([]);
    let {token} = useContext(authContext);

    useEffect(() => { getBooks() }, []);

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    let getBooks = async () => {
        try {
            let { data } = await axios.get('http://localhost:8080/api/books/get-all-coming-soon');
            setBooks(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container-fluid min-vh-100 overflow-hidden py-3 ">
                <div className="row">
                    <h2 className='px-4 pt-3 m-0 cato fw-bolder fs-1 '>Coming Soon</h2>
                    <hr className='position-relative ' style={{ top: '-15px', left: '300px' }} />
                    {books.map((elem, index) => {
                        return <Book3 indo={index} key={elem.id} element={elem} size={4} />
                    }
                    )}
                </div>
            </div>
        </>
    )
}
