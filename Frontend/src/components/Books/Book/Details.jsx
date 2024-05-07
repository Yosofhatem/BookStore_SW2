import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import { authContext } from '../../../Context/AuthContext';

export default function Details() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [bookImage, setBookImage] = useState('');
  const { token,userId } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    getBook();
  }, [id]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  let getBook = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/books/most-popular/${id}`
      );
      const {
        image_url,
        title,
        authors,
        num_pages,
        description,
        rating,
        price,
      } = data;
      setBook({
        id:id,
        auth: authors,
        tit: title,
        des: description,
        rate: rating,
        page: num_pages,
        img: image_url,
        p: price,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (book.img) {
      axios
        .get(book.img, {
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

  const addToCart = async (userId, bookId) => {
    try {
      console.log(userId);
      console.log(bookId);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let { data } = await axios.get(`http://localhost:8080/api/cart/add_book?userId=${userId}&bookId=${bookId}&quantity=1`);
      console.log(data);
      setTimeout(() => {
        navigate('/cart');
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container pt-5 mt-5">
      <div className="book-details grid">
        <img
          src={bookImage}
          className="book-image shadow-lg rounded-5"
          alt=""
          style={{ width: '350px', height: '350px' }}
        />
        <div className="book-info">
        <h1 className="text-center">{book.tit}</h1>
          <div className="book-meta">
            <div className="book-meta-item">
              <p className="book-details-item">
                Author: <span className="main-color">{book.auth}</span>
              </p>
              <p className="book-details-item">
                Pages: <span className="main-color">{book.page}</span>
              </p>
            </div>
            <div className="book-meta-item">
              <p className="book-details-item">
                {book.p === 0 ? 'Free' : `Price: ${book.p} $`}
              </p>
              <p className="book-details-item">
                Rating: {book.rate} <i className="fa fa-star rating-color"></i>
              </p>
            </div>
          </div>      
          <h4 className="text-center ">Description</h4>
          <p className="book-details-item">{book.des}</p>
        </div>
        <div className="button-container">
          {/* <Link  to={"/cart/"}> */}
            <button className="add-to-cart-button" onClick={()=>{addToCart(userId,book.id)}} >Add to Cart</button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}