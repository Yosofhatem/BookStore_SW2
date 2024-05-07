import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faTags, faMoneyBill, faPercent } from '@fortawesome/free-solid-svg-icons'; // Added faPercent
import ImageComponent from '../Image/Image';

export default function Book({ book }) {
  return (
    <div className='container'>
      <Link className='nav-link' to={`/books/${book.id}`}>
        <div className="row shadow-lg rounded-5 bg-body-secondary p-5">
          <div className="col-md-6 flex">
            <img src={ImageComponent(book.image_url)} width={225} height={225} alt={book.title} />
          </div>
          <div className="col-md-6">
            <div className="book-info text-left" style={{ fontFamily: 'Courier New, monospace' }}>
              <p className='text-black fw-bolder fs-4'><FontAwesomeIcon icon={faBook} /> {book.title} </p>
              <p className='text-black fw-bolder fs-4'><FontAwesomeIcon icon={faTags} /> {book.authors}</p>
              <p className='text-black fw-bolder fs-4'>
                <FontAwesomeIcon icon={faMoneyBill} /> {book.price}
              </p>
              <p className='text-black fw-bolder fs-4'>
                <FontAwesomeIcon icon={faPercent} /> {book.discount}
              </p>
              <p className='text-black fw-bolder fs-4'> <FontAwesomeIcon icon={faTags} /> {book.category}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
