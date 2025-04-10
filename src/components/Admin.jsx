import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addEmployees } from "../utils/employeeSlice";

const Admin = () => {
  const dispatch = useDispatch();

  const [toast, setToast] = useState(false);

  const employeesDetails = useSelector((store) => store.employees) || [];

  const fetchUsersDetails = async () => {
    try {
      const res = await axios.get(BASE_URL + "/users", {
        withCredentials: true,
      });
      dispatch(addEmployees(res.data?.users));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePromoteToAdmin = async (_id) => {
    try {
      const res = await axios.patch(
        BASE_URL + "/users/" + _id + "/promote",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        setToast(true);
        setTimeout(() => {
          setToast(false);
          dispatch(addEmployees(res.data.data));
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!Array.isArray(employeesDetails) || employeesDetails.length === 0) {
      fetchUsersDetails();
    }
  }, [employeesDetails, dispatch]);

  const nonAdminEmployees = Array.isArray(employeesDetails)
    ? employeesDetails.filter((emp) => emp.role !== "admin")
    : [];

  if (nonAdminEmployees.length === 0)
    return (
      <h1 className="text-center mt-72 text-4xl text-red-500">
        No Employees details available..!
      </h1>
    );

  return (
    employeesDetails.length > 0 && (
      <div className="w-10/12 m-auto flex flex-wrap gap-4 justify-start mt-8">
        {toast && (
          <div className="toast toast-top toast-end z-50 transition-all duration-300 ease-in-out">
            <div className="alert alert-success shadow-lg">
              <span>Promoted as admin successfully</span>
            </div>
          </div>
        )}
        {nonAdminEmployees.map((employee) => (
          <div
            key={employee._id}
            className="card card-border my-3 bg-black w-96 text-center hover:scale-105"
          >
            <div className="card-body">
              <p className="mb-2">{employee.name}</p>
              <p className="mb-2">{employee.email}</p>
              <p className="mb-2">{employee.role}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => {
                    handlePromoteToAdmin(employee._id);
                  }}
                  className="mt-5 px-3 py-2 bg-[#4169e1] border-none rounded-lg cursor-pointer"
                  disabled={employee.role === "admin"}
                >
                  {employee.role === "admin"
                    ? "Already Admin"
                    : "Promote to Admin"}
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
