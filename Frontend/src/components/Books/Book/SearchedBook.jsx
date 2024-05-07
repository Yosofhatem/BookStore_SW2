import React, { useState } from 'react'
import Modal from './Modal';
import ImageComponent from '../../Image/Image';

export default function SearchedBook({element ,element: { id, title, image_url, authors, rating, review_count, rating_count, discount,book_link}, size = 6 }) {

const [show,setShow]=useState(false);
const [book,setBook]=useState({});
    if (image_url !== undefined) {
        return (
            <>
                <div className={`cardo col-sm-12 col-md-12 col-lg-${size} my-3 cursor-pointer `}   >
                    <div className="layout product rounded-5 bg-main shadow px-3">
                        {/* <img src={image_url} className='w-100 rounded-5 my-3  shadow' height={400} alt="" /> */}
                        <img src={ImageComponent(image_url)} className='w-100 rounded-5 my-3  shadow' height={400} alt="" />

                        <div className='' >
                            <div>
                                <p className='text-center fw-bolder fs-5 text-white w-100'>{title.split(' ').slice(0, 4).join(' ')}</p>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end position-relative'>
                        </div>
                        <div className='d-flex justify-content-around py-3' >
                            <button className='btn bg-white main-color fw-bolder shadow  ' onClick={()=>{setShow(true);setBook(element)}}>See Details</button>
                            <a href={book_link} className='btn bg-white  main-color fw-bolder shadow '>Preview</a>
                        </div>
                    </div>
                </div>
                <Modal show={show} element={book} onClose={()=>setShow(false)}/>
            </>
        )
    }
}