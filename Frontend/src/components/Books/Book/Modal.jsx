import React from 'react';
import ImageComponent from '../../Image/Image';

export default function Modal({ show, element: { title, image_url, authors, rating, review_count, rating_count, discount, description, book_link,price}, onClose }) {

  if (!show) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal fade show d-flex align-items-center" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg modal-xl">
        <div className="modal-content bg-dark text-light rounded-3 shadow-lg border border-dark">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTitle">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body d-flex flex-wrap justify-content-between align-items-center">
            <div className="modal-image-wrapper p-3">
              <img src={ImageComponent(image_url)} alt={title} className="img-fluid rounded-3" style={{ maxHeight: '400px', width: '100%' }} />
            </div>

                  <div className='modal-info text-start px-4 py-3' >
                            <div className='modal-info text-start px-4 py-3'>
                                <h3 className='fw-bolder main-color'>{title}</h3>
                                <div className='d-flex  py-3'>
                                  <h4 className='my-price'> Authors : <span className='my-price'>{authors}</span> </h4>
                                </div>
                                <div className='d-flex py-3'>
                                  <h4 className='my-price'> Rate : <span className='my-price'>{rating}</span> <i class="fas fa-star"></i></h4>
                                </div>
                                <div className='d-flex  py-3'>
                                  <h4 className='my-price'>Review count : <span className='my-price'>{review_count}</span> </h4>
                                </div>
                                <div className='d-flex  py-3'>
                                  <h4 className='my-price'> Rate count : <span className='my-price'>{rating_count} </span> </h4>
                                </div>
                                <div>
                                    <p><a href={book_link} class="my-button">Preview</a></p>
                                </div>
                            </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}