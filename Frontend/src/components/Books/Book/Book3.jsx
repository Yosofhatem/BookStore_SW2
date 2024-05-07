import React from 'react';

export default function Book3({ element: { title, image_url }, size = 6 }) {

  return (
    <>
      <div className={`cardo col-sm-12 col-md-6 col-lg-${size} my-3`}>
        <div className="layout product rounded-5 bg-body-tertiary shadow px-3">
          <img src={image_url} className="w-100 rounded-5 my-3 shadow" height={600} alt="" />
          <h6 className='coming position-relative'></h6>
          <div className="d-flex justify-content-between p-0 m-0">
            <div className="w-100 text-center py-4">
              <h3 className="fw-bolder main-color">{title}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}