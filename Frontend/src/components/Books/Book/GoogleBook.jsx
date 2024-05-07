import{Link} from 'react-router-dom'
import ImageComponent from '../../Image/Image'

export default function GoogleBook({element ,element: { id, title, image_url, book_link}, size = 4 }) {
        if (image_url !== undefined) {
        return (
            <>
                <div className={`cardo col-sm-12 col-md-12 col-lg-${size} my-3 cursor-pointer `}  >
                    <div className="layout product rounded-5 bg-body-secondary shadow px-3">
                        <Link to={"/details/" + id} className='nav-link'>
                            <img  src={ImageComponent(image_url)} className='w-100 rounded-5 my-3  shadow' height={400} alt="" />
                            <div className='' >
                                <div>
                                    <p className='text-center fw-bolder fs-5 main-color w-100'>{title.split(' ').slice(0, 4).join(' ')}</p>
                                </div>
                            </div>
                        </Link>
                        <div className='d-flex justify-content-end position-relative'>
                        </div>
                        <div className='d-flex justify-content-around py-3' >
                            <a href={book_link} className='btn bg-main text-white fw-bolder shadow w-100 '>Download</a>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}