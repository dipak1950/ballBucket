import React, { useState } from "react";
import axios from "axios";
import "./Style.css";
import { useNavigate } from "react-router-dom";

function BucketForm() {
  const [bucket, setBucket] = useState({
    name: "",
    size: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setBucket({ ...bucket, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (bucket.name.trim() === "" || bucket.size.trim() === "") {
      setError("Please fill in all the fields");
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:5000/api/create/bucket", bucket, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setBucket({
          name: "",
          size: "",
        });
        setError("");
        navigate("/Suggetion");
      })
      .catch((error) => {
        console.log(error.response);

        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred. Please try again.");
        }
      });
  };

  return (
    <>
      <div className="grid grid-cols-3 relative text-black ">
        <div className="absolute left-[60%] top-1/2 h-20 w-20 rounded-full bg-[#1930e1] circle2"></div>
        <div className="absolute right-[60%] top-[15%] h-20 w-20 rounded-full bg-[#be16f1] circle2"></div>
        <div className="absolute right-[50%] bottom-[15%] h-20 w-20 rounded-full bg-[#f11683] circle2"></div>

        <div className="col-span-1"></div>

        <form
          onSubmit={handleSubmit}
          className="form1 flex flex-col justify-start items-center col-span-1  neumorphism border p-10 font-medium "
        >
          <label htmlFor="name">Bucket Name</label>
          <input
            type="text"
            id="name"
            placeholder="Bucket name"
            value={bucket.name}
            name="name"
            onChange={handleChange}
            className="bg-transparent border rounded-md px-3"
          />
          <br />
          <label htmlFor="size">Bucket size</label>
          <input
            type="number"
            id="size"
            placeholder="Bucket size"
            value={bucket.size}
            name="size"
            onChange={handleChange}
            className="bg-transparent border rounded-md px-3"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button className="my-5">
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front text">Add Bucket</span>
          </button>
        </form>
        <div className="col-span-1"></div>
      </div>
    </>
  );
}

export default BucketForm;
