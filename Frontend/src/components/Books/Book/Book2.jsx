import { Link } from 'react-router-dom'
import ImageComponent from '../../Image/Image'

export default function Book2({indo ,element: { id, title, image_url, authors, rating, review_count, rating_count, discount}, size = 6 }) {
    return (
        <>
            <div className={`cardo col-sm-12 col-md-6 col-lg-${size} my-3`} >
                <div className="layout product rounded-5  bg-body-tertiary shadow px-3">
                        <img src={ImageComponent(image_url)} className="w-100 rounded-5 my-3 shadow" height={400} alt="Fetched Image" />
                        {discount>0?  <h6 className='discount position-relative'></h6>:null}
                        <div className='d-flex justify-content-between p-0 m-0' >
                            <div className='w-100 text-center py-4'>
                                <h4 className='fw-bolder main-color ' >{title}</h4>
                                <div className='d-flex  py-3 '>
                                    <h5 className='text-danger w-50 d-inline'> Authors : <span className='text-dark'>{authors.split(' ')[0]}</span> </h5>
                                    <h5 className='text-danger w-50 d-inline'> Rate : <span className='text-dark d-inline-block ps-3 fw-medium'>{rating} <i className='fa fa-star rating-color'></i></span> </h5>
                                </div>
                                <div className='d-flex  py-3'>
                                    <h5 className='text-danger w-50 d-inline'>Review_count : <span className='text-dark'>{review_count} </span> </h5>
                                    <h5 className='text-danger w-50 d-inline'> Rate_count : <span className='text-dark d-inline-block ps-3 fw-medium'>{rating_count} </span> </h5>
                                </div>
                            </div>
                        </div>
                        <Link to={"/details/" + id} className='nav-link'>
                            <button className='btn bg-main text-white w-100 my-3' style={{ fontSize: '1.3rem' }}>See More Details</button>
                        </Link>
                </div>
            </div>
        </>
    )
}