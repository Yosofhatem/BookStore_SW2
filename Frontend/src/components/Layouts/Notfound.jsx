import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default function Notfound() {
  return (
    <>
      <Navbar />
      <div className=' d-flex justify-content-center vh-100 bg-danger'>
               <h1>page not found</h1>
            </div>
      <Footer />
    </>

  )
}
