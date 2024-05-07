import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import ImageComponent from '../../Image/Image';

export default function CartBook({ indo, element: { id, title, image_url, authors, rating, review_count, rating_count, price, discount }, size = 6, increaseQuantity }) {
    return (
        <div className={`cardo col-sm-12 col-md-6 col-lg-${size} my-3`} >
            <div className="layout product rounded-5 bg-body-tertiary shadow px-3">
                <Link to={"/details/" + id} className='nav-link'>
                    <img src={ImageComponent(image_url)} className='w-100 rounded-5 my-3 shadow img-responsive' height={400} alt="" />
                    <div className='d-flex justify-content-between p-0 m-0'>
                        <div className='w-100 text-center py-4'>
                            <h3 className='fw-bolder main-color'>{title}</h3>
                            <div className='d-flex py-3'>
                                <h4 className='text-danger w-50 d-inline'> Price : <span className='text-dark'>{price} $</span> </h4>
                                <h4 className='text-danger w-50 d-inline'> Quantity : <span className='text-dark'>{1}</span> </h4>
                            </div>
                            <div className='d-flex py-3'>
                                <h4 className='text-danger w-50 d-inline'> Discount : <span className='text-dark'>{discount} %</span> </h4>
                                <h4 className='text-danger w-50 d-inline'> Total Price : <span className='text-dark'>{price} $</span> </h4>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="d-flex justify-content-around">
                    <button className='btn bg-main text-white my-3 ml-auto py-3 px-4' style={{ fontSize: '2rem' }}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    <div className="d-flex flex-column align-items-center">
                        <button className='btn bg-main text-white my-1 py-2 px-3' style={{ fontSize: '1.2rem' }} onClick={increaseQuantity}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <button className='btn bg-main text-white my-1 py-2 px-3' style={{ fontSize: '1.2rem' }}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
