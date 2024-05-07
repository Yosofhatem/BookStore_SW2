import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "../../Context/AuthContext";
import { useFormik } from "formik";
import { baseUrlNEW } from "../../Shared/baseUrl";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
  const [title, setTitle] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [authors, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [num_pages, setNumPages] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  let { token } = useContext(authContext);
  let navigate = useNavigate();
  let [ID, setID] = useState(null);

  const myFormik = useFormik({
    initialValues: {
      title: "",
      authors: "",
      price: 0,
      discount: 0,
      num_pages: 0,
      description: "",
      category: "",
      book_link: "",
      review_count: Math.floor(Math.random() * 301),
      rating_count: Math.floor(Math.random() * 201),
      rating: (Math.random() * 2 + 3).toFixed(1),
    },
    onSubmit: async (values) => {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log(values);
        let { data } = await axios.post(baseUrlNEW, values);
        console.log("Added successfully", data.id);
        handleUpload(data.id);
        setTimeout(() => {
          navigate("/allbooks");
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    },

    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = "Title is required";
      }
      if (!values.authors) {
        errors.authors = "Authors are required";
      }
      if (!values.description) {
        errors.description = "Description is required";
      }
      if (!values.category) {
        errors.category = "Category is required";
      }
      if (!values.book_link) {
        errors.book_link = "Book Link is required";
      }
      if (values.price < 0) {
        errors.price = "Price cannot be negative";
      }
      if (values.discount < 0) {
        errors.discount = "Discount cannot be negative";
      }
      if (values.num_pages < 0) {
        errors.num_pages = "Number of pages cannot be negative";
      }

      return errors;
    },
  });

  const uploadFile = async (file, ID) => {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", ID);
      const response = await axios.put(baseUrlNEW + `/photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("File uploaded:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
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

  return (
    <div className="container ">
      <form
        className="form shadow-lg rounded-5 p-5 bg-body-secondary py-5 my-5"
        onSubmit={myFormik.handleSubmit}
      >
        <div className="row">
          <div className="col-md-6">
            <label className="text-main">Title</label>
            <input
              onBlur={myFormik.handleBlur}
              id="title"
              onChange={myFormik.handleChange}
              value={myFormik.values.title}
              name="title"
              type="text"
              className="form-control my-3"
            />
            {myFormik.errors.title && myFormik.touched.title ? (
              <div className="alert alert-danger"> {myFormik.errors.title}</div>
            ) : null}

            <label className="text-main">Authors</label>
            <input
              onBlur={myFormik.handleBlur}
              id="authors"
              onChange={myFormik.handleChange}
              value={myFormik.values.authors}
              name="authors"
              type="text"
              className="form-control my-3"
            />
            {myFormik.errors.authors && myFormik.touched.authors ? (
              <div className="alert alert-danger">
                {" "}
                {myFormik.errors.authors}
              </div>
            ) : null}

            <label className="text-main">Price</label>
            <input
              onBlur={myFormik.handleBlur}
              id="price"
              onChange={myFormik.handleChange}
              value={myFormik.values.price}
              name="price"
              type="text"
              className="form-control my-3"
            />
            {myFormik.errors.price && myFormik.touched.price ? (
              <div className="alert alert-danger"> {myFormik.errors.price}</div>
            ) : null}

            <label className="text-main">Book Link</label>
            <input
              onBlur={myFormik.handleBlur}
              id="book_link"
              onChange={myFormik.handleChange}
              value={myFormik.values.book_link}
              name="book_link"
              type="text"
              className="form-control my-3"
            />
            {myFormik.errors.book_link && myFormik.touched.book_link ? (
              <div className="alert alert-danger">
                {" "}
                {myFormik.errors.book_link}
              </div>
            ) : null}
          </div>
          <div className="col-md-6">
            <label className="text-main">Discount</label>
            <input
              onBlur={myFormik.handleBlur}
              id="discount"
              onChange={myFormik.handleChange}
              value={myFormik.values.discount}
              name="discount"
              type="text"
              className="form-control my-3"
            />
            {myFormik.errors.discount && myFormik.touched.discount ? (
              <div className="alert alert-danger">
                {" "}
                {myFormik.errors.discount}
              </div>
            ) : null}

            <label className="text-main">description</label>
            <input
              onBlur={myFormik.handleBlur}
              id="description"
              onChange={myFormik.handleChange}
              value={myFormik.values.description}
              name="description"
              type="text"
              className="form-control my-3"
            />
            {myFormik.errors.description && myFormik.touched.description ? (
              <div className="alert alert-danger">
                {" "}
                {myFormik.errors.description}
              </div>
            ) : null}

            <label className="text-main">Category</label>
            <input
              onBlur={myFormik.handleBlur}
              id="category"
              onChange={myFormik.handleChange}
              value={myFormik.values.category}
              name="category"
              type="text"
              className="form-control my-3"
            />
            {myFormik.errors.category && myFormik.touched.category ? (
              <div className="alert alert-danger">
                {" "}
                {myFormik.errors.category}
              </div>
            ) : null}

            <label className="text-main">Num Pages</label>
            <input
              onBlur={myFormik.handleBlur}
              id="num_pages"
              onChange={myFormik.handleChange}
              value={myFormik.values.num_pages}
              name="num_pages"
              type="text"
              className="form-control my-3"
            />
            {myFormik.errors.num_pages && myFormik.touched.num_pages ? (
              <div className="alert alert-danger">
                {" "}
                {myFormik.errors.num_pages}
              </div>
            ) : null}
          </div>
        </div>

        <label className=" py-2   ">Pick Photo </label>
        <input
          type="file"
          className="form-control my-2"
          onChange={handleFileChange}
        />

        <button type="submit" className="btn btn-success mx-3">
          Save
        </button>
      </form>
    </div>
  );
}
