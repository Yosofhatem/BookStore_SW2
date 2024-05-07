import React, { useContext, useEffect, useState } from "react";
import { baseUrlNEW } from "../../Shared/baseUrl";
import axios from "axios";
import Book from "./Book";
import { authContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

export default function BookList() {
  let [data, setData] = useState([]);
  let { token } = useContext(authContext);

  let getAllBooks = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      let { data } = await axios.get(baseUrlNEW + `?page=0&size=100`);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className="container   my-5">
      <Link
        to={"/dashboard"}
        className=" btn btn-outline-info py-2 my-3 w-100  "
      >
        Add New Book
      </Link>
      {data?.content?.map((elem) => (
        <Book book={elem} key={elem.id} />
      ))}
    </div>
  );
}
