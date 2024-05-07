import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { authContext } from '../../Context/AuthContext';
import { baseUrlNEW } from '../../Shared/baseUrl';
import axios from 'axios';
import { useFormik } from 'formik';

export default function BookDetails() {
    let { id } = useParams();
    let { token } = useContext(authContext);
    let navigate = useNavigate();

    let [book, setBook] = useState({});
    let [bookImage, setBookImage] = useState('');

    let getBook = async (Id) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.get(baseUrlNEW + `/${Id}`);
            console.log(data);
            setBook(data)
        } catch (error) {
            console.log(error)
        }

    }

    const myFormik = useFormik({
        initialValues: { id: id, title: '', authors: '', price: '', discount: '', num_pages: '', description: '', category: '',image_url: '',book_link: ''},
        onSubmit: async (values) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log(values);
            let { data } = await axios.post(baseUrlNEW, values)
                .then(() => {


                })
                .catch(({ response }) => { console.log(response); });
        },
        validate: (values) => {

            const errors = {}


            return errors
        }

    })

    useEffect(() => {
        getBook(id);
    }, [])

    useEffect(() => {
        myFormik.initialValues.title = book?.title
        myFormik.initialValues.authors = book?.authors
        myFormik.initialValues.price = book?.price
        myFormik.initialValues.discount = book?.discount
        myFormik.initialValues.num_pages = book?.num_pages
        myFormik.initialValues.description = book?.description
        myFormik.initialValues.category = book?.category
        myFormik.initialValues.image_url = book?.image_url
        myFormik.initialValues.book_link = book?.book_link
    }, [book])



    let deleteBook = async (bookId) => {
        // try {



        try {
            console.log(bookId);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.delete(baseUrlNEW + `/${bookId}`);
            console.log("deleted successfully", data);
            setTimeout(() => {
                navigate('/allbooks');
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    }

    let [selectedvalue, setSelectValue] = useState('');



    const uploadFile = async (file, ID) => {
        try {       
            const formData = new FormData();
            formData.append('file', file,file.name);
            formData.append('id', ID);
            const response = await axios.put(baseUrlNEW + `/photo`, formData, {
                headers: { 'Content-Type': 'multipart/form-data', },
            });
            console.log('File uploaded:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    let [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log("Selected file:", event.target.files[0]);
    };

    const handleUpload = (taskidd) => {
        if (selectedFile) {
            uploadFile(selectedFile, taskidd);
        } else {
            console.log("No file selected.");
        }
    };


    useEffect(() => {
        if (book?.image_url) {
          axios
            .get(book?.image_url, {
              responseType: 'blob',
            })
            .then((response) => {
              const objectURL = URL.createObjectURL(response.data);
              setBookImage(objectURL);
            })
            .catch((error) => {
              console.error('Error fetching image:', error);
            });
        }
      }, [book]);

    return (
        <>
            <div className='container'>
                <div className="row  shadow-lg rounded-5 bg-body-secondary p-4">
                    <div className="col-md-6 ">
                        <div className="row d-flex flex-column justify-content-between align-items-center h-100" >
                            <div className="col-md-8">
                                <img src={bookImage} alt={book.title} width={300} height={300}/>
                            </div>
                            <div className="col-md-4">

                                <label className=' py-2   '>Change Photo </label>
                                <input type="file" className='form-control my-2' onChange={handleFileChange} />
                                <button className='btn btn-outline-warning' onClick={() => { handleUpload(id) }}>Upload File </button>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6  ">
                        <form className="form py-5 my-5" onSubmit={myFormik.handleSubmit}>

                            <div className="row">
                                <div className="col-md-6">

                                    <label className='text-main'>Title</label>
                                    <input onBlur={myFormik.handleBlur} id='title' onChange={myFormik.handleChange} value={myFormik.values.title} name='title' type="text" className="form-control my-3" />
                                    {myFormik.errors.title && myFormik.touched.title ? <div className="alert alert-danger"> {myFormik.errors.title}</div> : null}

                                    <label className='text-main'>Authors</label>
                                    <input onBlur={myFormik.handleBlur} id='authors' onChange={myFormik.handleChange} value={myFormik.values.authors} name='authors' type="text" className="form-control my-3" />
                                    {myFormik.errors.authors && myFormik.touched.authors ? <div className="alert alert-danger"> {myFormik.errors.authors}</div> : null}


                                    <label className='text-main'>Price</label>
                                    <input onBlur={myFormik.handleBlur} id='price' onChange={myFormik.handleChange} value={myFormik.values.price} name='price' type="text" className="form-control my-3" />
                                    {myFormik.errors.price && myFormik.touched.price ? <div className="alert alert-danger"> {myFormik.errors.price}</div> : null}

                                </div>
                                <div className="col-md-6">
                                    <label className='text-main'>Discount</label>
                                    <input onBlur={myFormik.handleBlur} id='discount' onChange={myFormik.handleChange} value={myFormik.values.discount} name='discount' type="text" className="form-control my-3" />
                                    {myFormik.errors.discount && myFormik.touched.discount ? <div className="alert alert-danger"> {myFormik.errors.discount}</div> : null}

                                    <label className='text-main'>description</label>
                                    <input onBlur={myFormik.handleBlur} id='description' onChange={myFormik.handleChange} value={myFormik.values.description} name='description' type="text" className="form-control my-3" />
                                    {myFormik.errors.description && myFormik.touched.description ? <div className="alert alert-danger"> {myFormik.errors.description}</div> : null}

                                    <label className='text-main'>Category</label>
                                    <input onBlur={myFormik.handleBlur} id='category' onChange={myFormik.handleChange} value={myFormik.values.category} name='category' type="text" className="form-control my-3" />
                                    {myFormik.errors.category && myFormik.touched.category ? <div className="alert alert-danger"> {myFormik.errors.category}</div> : null}

                                </div>
                            </div>
                            <button type='submit' className='btn btn-success mx-3' >Save</button>
                            <button className='btn btn-danger' onClick={() => { deleteBook(id) }}>Delete</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
