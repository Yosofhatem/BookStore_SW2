import React from 'react';
import ImageComponent from '../Image/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faListAlt, faFileAlt, faTag, faDollarSign, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function CartItem({ elem, userId, deleteBook }) {
  return (
    <div className="row rounded-5 bg-body-secondary shadow-lg p-3 my-4 ">
      <div className="col-md-4 ">
        <img src={ImageComponent(elem?.book?.image_url)} alt="Image_not_download" width={300} height={300} />
      </div>
      <div className="col-md-8 d-flex flex-column justify-content-between">
        <div>
          <p className='fw-bolder' style={{ color: 'black', fontFamily: 'Courier New, monospace', fontSize: '18px' }}>
            <FontAwesomeIcon icon={faListAlt} size="lg" /> Title: {elem.book.title}
          </p>
          <p className='fw-bolder' style={{ color: 'black', fontFamily: 'Courier New, monospace', fontSize: '18px' }}>
            <FontAwesomeIcon icon={faUser} size="lg" /> Authors: {elem.book.authors}
          </p>
          <p className='fw-bolder' style={{ color: 'black', fontFamily: 'Courier New, monospace', fontSize: '18px' }}>
            <FontAwesomeIcon icon={faTag} size="lg" /> Category: {elem.book.category}
          </p>
          <p className='fw-bolder' style={{ color: 'black', fontFamily: 'Courier New, monospace', fontSize: '18px' }}>
            <FontAwesomeIcon icon={faFileAlt} size="lg" /> Description: {elem.book.description}
          </p>
          <p className='fw-bolder' style={{ color: 'black', fontFamily: 'Courier New, monospace', fontSize: '18px' }}>
            <FontAwesomeIcon icon={faDollarSign} size="lg" /> Price: {elem.book.price}
          </p>
          <p className='fw-bolder' style={{ color: 'black', fontFamily: 'Courier New, monospace', fontSize: '18px' }}>
            <FontAwesomeIcon icon={faListAlt} size="lg" /> Quantity: {elem.quantity}
          </p>
        </div>
        <button className='btn btn-outline-danger align-self-end' onClick={() => { deleteBook(userId, elem.book.id) }}>
          <FontAwesomeIcon icon={faTrashAlt} size="lg" /> Delete
        </button>
      </div>
    </div>
  );
}

export default CartItem;