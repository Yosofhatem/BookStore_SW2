
import './App.css';

import Home from './components/Home/Home';
import Mainlayout from './components/Layouts/Mainlayout';
import Notfound from './components/Layouts/Notfound';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Categories from './components/Categories/Categories';

import FreeBooks from './components/Books/FreeBooks';
import ComingSoon from './components/Books/ComingSoon';
import Cart from './components/Cart/Cart';
import MostPopular from './components/Books/MostPopular';
import SubCategory from './components/Categories/SubCategory';
import Details from './components/Books/Book/Details';
import { ToastContainer } from 'react-toastify';
import DashBoard from './components/DashBoard/DashBoard';
import AuthProvider from './Context/AuthContext';
import BookList from './components/DashBoard/BookList';
import BookDetails from './components/DashBoard/BookDetails';
import ManageUsers from './components/DashBoard/ManageUsers';
import AddUser from './components/DashBoard/AddUser';


function App() {

  const routes = createBrowserRouter([
    {
      path: '/', element: <Mainlayout />, children: [

        { index: true, element: <Login /> },
        
        { path: '/home', element: <Home /> },
        { path: '/comingsoon', element: <ComingSoon /> },
        { path: '/mostpopular', element: <MostPopular /> },
        { path: '/free', element: <FreeBooks /> },
        { path: '/categories', element: <Categories /> },
        { path: '/subcategory/:category', element: <SubCategory /> },
        { path: '/details/:id', element: <Details /> },
        { path: '/dashboard', element: <DashBoard /> },
        { path: '/allbooks', element: <BookList /> },
        { path: '/books/:id', element: <BookDetails /> },

        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/manage', element: <ManageUsers /> },
        { path: '/adduser', element: <AddUser /> },
        
      ]
    },
    
    { path: '/cart', element: <Cart /> },
    { path: '*', element: <Notfound /> },

  ])
  return (
    <>
      <AuthProvider>
        <RouterProvider router={routes} />
        <ToastContainer />
      </AuthProvider>

    </>
  );
}

export default App;