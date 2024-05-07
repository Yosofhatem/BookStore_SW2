import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { authContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:8080/api/books";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(authContext);
  const myRole = localStorage.getItem("role"); // Get role from localStorage

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        const usersResponse = await axios.get(`${BASE_URL}/get_all_users`);
        const adminsResponse = await axios.get(`${BASE_URL}/get_all_admins`);
        setUsers(usersResponse.data);
        console.log(usersResponse.data);
        setAdmins(adminsResponse.data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      await axios.delete(`${BASE_URL}/delete_user/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      {
        myRole === "suber_admin"?
        <Link
        to={"/adduser"}
        className=" btn btn-outline-info py-2 my-3 w-100  "
      >
        Add Admin
      </Link>:null
      }
      <div className="row">
        <div className="col text-center">
          <h2>Users</h2>
          <ul className="list-group">
            {users.map((user) => (
              <li
                key={user.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {user.username}
                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Conditionally render Admins section based on role */}
        {myRole === "suber_admin" && ( // Check if role is 'admin'
          <div className="col text-center">
            <h2>Admins</h2>
            <ul className="list-group">
              {admins.map((admin) => (
                <li
                  key={admin.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {admin.username}
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(admin.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
