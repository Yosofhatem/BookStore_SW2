import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { authContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem'; // Import the new component

function Cart() {
  let { token, userId } = useContext(authContext);
  let [data, setData] = useState([]);
  let navigate = useNavigate();

  let getCart = async (id) => {
    try {
      console.log(id);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let { data } = await axios.get('http://localhost:8080' + `/api/cart/get_books?userId=${id}`);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  let clearCart = async (id) => {
    try {
      console.log(id);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let { data } = await axios.delete('http://localhost:8080' + `/api/cart/delete_all_books?userId=${id}`);
      setTimeout(() => {
        navigate('/mostpopular');
      }, 1500);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  let deleteBook = async (userid, bookid) => {
    try {
      console.log(userid);
      console.log(bookid);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let { data } = await axios.delete('http://localhost:8080' + `/api/cart/delete_book?userId=${userid}&bookID=${bookid}`);
      console.log(data);
      getCart(userId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart(userId);
  }, [userId]);

  const numIcons = 30;
  const cartIcons = Array.from({ length: numIcons }, (_, index) => (
    <i key={index} className="fas fa-shopping-cart cart-icon"></i>
  ));

  return (
    <div>
      <div className="cart-app-bar">
        {cartIcons}
      </div>
      <div className='min-vh-100 py-3 overflow-hidden container'>
        <h2 className='px-4 pt-3 m-0 cato fw-bolder fs-1 '>Your Cart</h2>
        <hr className='position-relative ' style={{ top: '-22px', left: '230px' }} />
        <button className='btn btn-outline-danger' onClick={() => { clearCart(userId) }}>Clear Cart</button>
        {data.map((elem) => (
          <CartItem key={elem.book.id} elem={elem} userId={userId} deleteBook={deleteBook} />
        ))}
        <div className="contaienr"></div>
      </div>
    </div>
  );
}

export default Cart;
