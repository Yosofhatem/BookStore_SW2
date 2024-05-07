import React from 'react'
import { Link } from 'react-router-dom'
import sport from '../../images/img_catgories/sports.jpg'
import cooking from '../../images/img_catgories/cooking.jpg'
import psychology from '../../images/img_catgories/psychology.jpg'
import novels from '../../images/img_catgories/novels.jpg'
import economics from '../../images/img_catgories/economics.jpg'
import travel from '../../images/img_catgories/travel.jpg'
import Fantasy from '../../images/img_catgories/fantacy.jpg'
import math from '../../images/img_catgories/math.jpg'
import science from '../../images/img_catgories/science.jpg'
import programming from '../../images/img_catgories/programming.jpg'

export default function Categories() {

  return (

    <div className='min-vh-100 py-5'>
      <div className="container ">
        <div className='bg-body-tertiary shadow rounded-5 py-2 '>

          <h2 className='sh text-center ff1 fw-bolder main-color cato' ><i className=" fa fa-solid fa-bookmark pe-3"></i>All Categories<i className=" fa fa-solid fa-bookmark ps-3"></i>
          </h2>
        </div>
      </div>

      <div className="container  ">

        <div className="row my-5  d-flex justify-content-around px-3 ">
          <div className="cardo cursor-pointer col-md-5 bg-body-secondary shadow rounded-5 py-2 mt-4">
            <div className="layout">
              <Link to={"/subcategory/" + 'sports'} className='nav-link'>
                <img height={300} className='w-100 rounded-5 p-3' src={sport} alt="" />
                <h2 className='text-center main-color fw-bold'>Sports</h2>

              </Link>
            </div>
          </div>


          <div className="cardo cursor-pointer col-md-5 bg-body-secondary shadow rounded-5 py-2 mt-4">
            <div className="layout">
              <Link to={"/subcategory/" + 'cooking'} className='nav-link'>
                <img height={300} className='w-100 rounded-5 p-3' src={cooking} alt="" />
                <h2 className='text-center main-color fw-bold'>Cooking</h2>

              </Link>
            </div>
          </div>

          <div className="cardo cursor-pointer col-md-5 bg-body-secondary shadow rounded-5 py-2 mt-4">
            <div className="layout">
              <Link to={"/subcategory/" + 'psychology'} className='nav-link'>
                <img height={300} className='w-100 rounded-5 p-3' src={psychology} alt="" />
                <h2 className='text-center main-color fw-bold'>psychology</h2>

              </Link>
            </div>
          </div>

          <div className="cardo cursor-pointer col-md-5 bg-body-secondary shadow rounded-5 py-2 mt-4">
            <div className="layout">
              <Link to={"/subcategory/" + 'novels'} className='nav-link'>
                <img height={300} className='w-100 rounded-5 p-3' src={novels} alt="" />
                <h2 className='text-center main-color fw-bold'>Novels</h2>

              </Link>
            </div>
          </div>

          <div className="cardo cursor-pointer col-md-5 bg-body-secondary shadow rounded-5 py-2 mt-4">
            <div className="layout">
              <Link to={"/subcategory/" + 'economics'} className='nav-link'>
                <img height={300} className='w-100 rounded-5 p-3' src={economics} alt="" />
                <h2 className='text-center main-color fw-bold'>Economics</h2>

              </Link>
            </div>
          </div>

          <div className="cardo cursor-pointer col-md-5 bg-body-secondary shadow rounded-5 py-2 mt-4">
            <div className="layout">
              <Link to={"/subcategory/" + 'travel'} className='nav-link'>
                <img height={300} className='w-100 rounded-5 p-3' src={travel} alt="" />
                <h2 className='text-center main-color fw-bold'>Travel</h2>

              </Link>
            </div>
          </div>

          <div className="cardo cursor-pointer col-md-5 bg-body-secondary shadow rounded-5 py-2 mt-4">
            <div className="layout">
              <Link to={"/subcategory/" + 'fantasy'} className='nav-link'>
                <img height={300} className='w-100 rounded-5 p-3' src={Fantasy} alt="" />
                <h2 className='text-center main-color fw-bold'>Fantasy</h2>

              </Link>
            </div>
          </div>

          <div className="cardo cursor-pointer col-md-5 bg-body-secondary shadow rounded-5 py-2 mt-4">
            <div className="layout">
              <Link to={"/subcategory/" + 'mathmatics'} className='nav-link'>
                <img height={300} className='w-100 rounded-5 p-3' src={math} alt="" />
                <h2 className='text-center main-color fw-bold'>Mathmatics</h2>

              </Link>
            </div>
          </div>

          <div className="cardo cursor-pointer col-md-5 bg-body-secondary shadow rounded-5 py-2 mt-4">
            <div className="layout">
              <Link to={"/subcategory/" + 'science'} className='nav-link'>
                <img height={300} className='w-100 rounded-5 p-3' src={science} alt="" />
                <h2 className='text-center main-color fw-bold'>Science</h2>

              </Link>
            </div>
          </div>

          <div className="cardo cursor-pointer col-md-5 bg-body-secondary shadow rounded-5 py-2 mt-4">
            <div className="layout">
              <Link to={"/subcategory/" + 'programming'} className='nav-link'>
                <img height={300} className='w-100 rounded-5 p-3' src={programming} alt="" />
                <h2 className='text-center main-color fw-bold'>Programming</h2>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
