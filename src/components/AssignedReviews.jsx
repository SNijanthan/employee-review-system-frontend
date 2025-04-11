import React from "react";

const AssignedReviews = () => {
  return (
    <>
      <div>
        <h1 className="my-10">Assigned Reviews</h1>
        <div className="card card-dash bg-base-100 w-96">
          <div className="card-body">
            <h2 className="card-title">Card Title</h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignedReviews;
