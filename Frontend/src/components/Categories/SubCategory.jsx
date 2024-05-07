import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import SubCategoryDetails from '../Books/Book/SubCategoryDetails';
import { authContext } from '../../Context/AuthContext';
export default function SubCategory() {
    let { category } = useParams()
    let [books, setBooks] = useState([]);
    let {token} = useContext(authContext);

    useEffect(() => { getBooks() }, []);

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    let getBooks = async () => {
        try {
            let { data } = await axios.get('http://localhost:8080/api/books/category/'+category);
            setBooks(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='min-vh-100 py-5'>
            <div className="container ">
                <div className='bg-body-tertiary shadow rounded-5 py-2 '>
                    <h2 className='sh text-center ff fw-bolder main-color cato' ><i className=" fa fa-solid fa-bookmark pe-3"></i>{category} Books<i className=" fa fa-solid fa-bookmark ps-3"></i>
                    </h2>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {books.map((elem) => {
                        return <SubCategoryDetails key={elem.id} element={elem} size={4} />
                    }
                    )}
                </div>
            </div>
        </div>

    )
}
