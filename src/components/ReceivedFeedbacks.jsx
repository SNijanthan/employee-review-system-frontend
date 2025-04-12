import React from "react";
import { useSelector } from "react-redux";

const ReceivedFeedbacks = () => {
  const reviews = useSelector((store) => store.reviews);
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-5 text-6xl font-serif tracking-wider mb-10 text-sky-500">
        ReceivedFeedbacks
      </h1>
      {reviews.length === 0 ? (
        <p className="text-xl mt-5 text-gray-500">No Feedbacks Received..!</p>
      ) : (
        <div className="w-full text-center flex flex-col items-center">
          {reviews.map((review) => (
            <div className="card bg-base-300 w-96">
              <div className="card-body text-center ">
                <p className="text-2xl font-light mb-2">
                  {review.reviewerId.name.toUpperCase()}
                </p>
                <p className="tracking-wide">{review.comments}</p>
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <p className="text-xl mt-5 text-gray-500">
              No Feedbacks Received..!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReceivedFeedbacks;
