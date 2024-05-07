import React, { useContext, useState } from "react";
import axios from "axios";
import { authContext } from "../../Context/AuthContext";

export default function Footer() {
  const [message, setMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false); // State for showing error message
  const { username, token } = useContext(authContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!message) {
        setShowErrorMessage(true); // Show error message
        return; // Do not proceed if message is empty
      }

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.post(
        "http://localhost:8080/api/books/send-suggestion",
        {
          email: username,
          message: message,
        }
      );
      console.log(response.data);
      setMessage("");
      setShowErrorMessage(false); // Hide error message if submission is successful
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-white bg-main mt-5 shadow-lg">
      <div className="container py-4">
        <div className="row m-0 p-0 w-100">
          <div className="col-md-2 d-flex align-items-center">
            <i
              className="fa fa-solid fa-comments fa-2xl fs-1"
              style={{ color: "#fff" }}
            ></i>
          </div>
          <div className="col-md-4 py-5">
            <h2 className="">CONTACT WITH US</h2>
            <hr />
            <p>
              You can now send us a suggestion or complaint via email, and your
              message will be answered as quickly as possible.
            </p>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="container bg-body-tertiary rounded-5 w-100 h-100 ms-5 shadow-lg">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="enter your email"
                  className="form-control my-4"
                  value={username}
                  onChange={(e) => e.target.value}
                />
                <textarea
                  placeholder="enter your message"
                  name=""
                  id=""
                  cols="30"
                  rows="3"
                  className="form-control my-4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                {showErrorMessage && (
                  <div className="alert alert-danger" role="alert">
                    Please enter a message before sending.
                  </div>
                )}
                <button
                  className="btn btn-info text-white fw-bolder w-100 my-3"
                  type="submit"
                >
                  send messages
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center py-4 mb-0">
        {" "}
        Developed By FCIH Teams © All Rights Reserved
      </p>
    </div>
  );
}
