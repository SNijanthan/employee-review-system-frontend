import React, { useEffect } from "react";
import Admin from "./Admin";
import Employees from "./Employees";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchLoggedInUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user", {
        withCredentials: true,
      });
      dispatch(addUser(res.data?.user));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (!user) {
      fetchLoggedInUser();
    }
  }, [user]);

  if (!user) return <div>Loading...</div>;

  return <>{user.role === "admin" ? <Admin /> : <Employees />}</>;
};

export default Main;

/**
 * ! Completed
 *
 * ? ADMIN
 *
 * ! 1. Login API
 * ! 2. Signup API
 * ! 3. Authorize users
 * ! 4. Dashboard based on user role
 * ! 5. Redux store cannot be empty even after refresh
 * ! 6. View employees API.
 * ! 7. Promote employee to "Admin"
 * ! 8. Assign reviews to employees
 * ! 9. Delete User
 *
 * ? Employees
 *
 * * Todos
 * * 1.
 */
