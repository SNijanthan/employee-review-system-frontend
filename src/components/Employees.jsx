import React, { useEffect } from "react";
import ReceivedFeedbacks from "./ReceivedFeedbacks";
import AssignedReviews from "./AssignedReviews";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addAssignedReviews } from "../utils/assignedReview";

const Employees = () => {
  const assignedReviews = useSelector((store) => store.assignedReview);

  const dispatch = useDispatch();

  const fetchReceivedFeedbacks = async () => {
    try {
      await axios.get(BASE_URL + "/feedbacks/received", {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAssignedReviwes = async () => {
    try {
      const res = await axios.get(BASE_URL + "/my-feedbacks", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addAssignedReviews(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReceivedFeedbacks();
    if (!Array.isArray(assignedReviews) || assignedReviews.length === 0) {
      fetchAssignedReviwes();
    }
  }, [assignedReviews]);

  return (
    <div className="w-4/6 m-auto flex items-center justify-between mt-10">
      <ReceivedFeedbacks />
      <AssignedReviews />
    </div>
  );
};

export default Employees;
