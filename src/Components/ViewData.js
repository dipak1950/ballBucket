import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewData() {
  const [buckets, setBuckets] = useState([]);

  const navigate = useNavigate();
  const fetchBucketData = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/view/bucket", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setBuckets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const goback = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchBucketData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 relative text-black">
        <div className="absolute left-[60%] top-1/2 h-20 w-20 rounded-full bg-[#1930e1] circle2"></div>
        <div className="absolute right-[60%] top-[15%] h-20 w-20 rounded-full bg-[#be16f1] circle2"></div>
        <div className="absolute right-[50%] bottom-[15%] h-20 w-20 rounded-full bg-[#f11683] circle2"></div>
        <div className="col-span-1"></div>
      </div>
      <div className="text-white form1 flex flex-col justify-start items-center col-span-1 neumorphism border p-10 font-medium">
        <h2 className="fs-2 mb-3 heading">Bucket List</h2>
        <div className="card-container">
          {buckets.bucket && buckets.bucket.length > 0 ? (
            buckets.bucket.map((bucket) => (
              <div className="card" key={bucket._id}>
                <h3 className="card-title">{bucket.name}</h3>
                <p className="card-size">Size: {bucket.size}</p>
              </div>
            ))
          ) : (
            <p>No buckets available.</p>
          )}
        </div>
        <button className="my-4" onClick={goback}>
          <span class="shadow"></span>
          <span class="edge"></span>
          <span class="front text">Go Back</span>
        </button>
      </div>
    </>
  );
}

export default ViewData;
