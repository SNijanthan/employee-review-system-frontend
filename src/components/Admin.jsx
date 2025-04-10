import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addEmployees } from "../utils/employeeSlice";

const Admin = () => {
  const dispatch = useDispatch();

  const employeesDetails = useSelector((store) => store.employees);

  const fetchUsersDetails = async () => {
    try {
      const res = await axios.get(BASE_URL + "/users", {
        withCredentials: true,
      });
      console.log(res.data.users);
      dispatch(addEmployees(res.data?.users));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!Array.isArray(employeesDetails) || employeesDetails.length === 0) {
      fetchUsersDetails();
    }
  }, [employeesDetails]);

  return (
    employeesDetails.length > 0 && (
      <div className="w-10/12 m-auto flex flex-wrap gap-4 justify-start mt-8 ">
        {employeesDetails.map((employee) => (
          <div className="card card-border my-3 bg-black w-96 text-center hover:scale-105">
            <div className="card-body">
              <p className="mb-2">{employee.name}</p>
              <p className="mb-2">{employee.email}</p>
              <p className="mb-2">{employee.role}</p>
              <div className="card-actions justify-end">
                <button className=" mt-5 px-3 py-2 bg-[#4169e1] border-none rounded-lg cursor-pointer">
                  Promote to Admin
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default Admin;
