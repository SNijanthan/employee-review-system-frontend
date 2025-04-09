import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content h-20 flex items-center justify-between">
        <Link
          to={user ? "/" : "/login"}
          className="p-3 hover:py-3 hover:rounded-2xl hover:bg-indigo-600 text-xl font-light"
        >
          Employee Review System
        </Link>
        <div className="flex items-center mr-20 font-mono">
          {user?.name && <p className="mr-20">Welcome {user.name} 😊</p>}
          {user?.role && <p className="mr-20">Role: {user.role}</p>}
          {user && (
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
