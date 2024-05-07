import React, { useContext } from 'react'
import bookimg from '../../../images/book.jpg'
import book1 from '../../../images/New\ folder/1.png'
import book2 from '../../../images/New\ folder/2.jpg'
import book3 from '../../../images/New\ folder/3.png'
import { Link } from 'react-router-dom';
import { authContext } from '../../../Context/AuthContext';


export default function Book({indo, element: { subtitle, title, price, image: imageCover, isbn13 }, size = 6 }) {

  let { role,del } = useContext(authContext);

  return (
    <>
      <div className={` cardo col-sm-12 col-md-12 col-lg-${size} my-3 cursor-pointer `} >

        <div className="layout product rounded-5  bg-body-tertiary shadow px-3">
          {isbn13===251?<img src={book1} className='w-100 rounded-5 my-3  shadow' height={400} alt="" />
          : isbn13===252?<img src={book2} className='w-100 rounded-5 my-3  shadow' height={400} alt="" />
          :isbn13===253?<img src={book3} className='w-100 rounded-5 my-3  shadow' height={400} alt="" />:
          isbn13===254?<img src={bookimg} className='w-100 rounded-5 my-3  shadow' height={400} alt="" />:
          <img src={imageCover} className='w-100 rounded-5 my-3  shadow' height={400} alt="" />
        }
          {indo%2===0?  <h6 className='discount2 position-relative'></h6>:null}

          <div className='d-flex justify-content-between ' >
            <div>
              <span className='fw-bolder main-color ' >{title}</span>
              <h5 className='fw-light'>{subtitle}</h5>
            </div>
          </div>
          <span>{price} EGP</span>
          <div className='d-flex justify-content-end position-relative'>

          </div>

{role==='admin'?

<button onClick={()=>{del(isbn13)}} className='btn bg-danger text-white w-100 my-3'>Delete</button>

:
<Link to={"/details/" + isbn13} className='nav-link'>

<button  className='btn bg-main text-white w-100 my-3'>SEE MORE DETAILS</button>
</Link>


}
        </div>
      </div>

    </>
  )
}
