import React from 'react'
import SearchedBook from './Book/SearchedBook'

export default function AllSearched(props) {
  
const books=props.books
    return (
            <div className="row position-static">
                {books.map((elem, index) => {
                    return <SearchedBook key={elem.id} element={elem} size={4} />
                }
                )}
            </div>
  )
}
