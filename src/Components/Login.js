import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/login", {
        email,
        password,
      })
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/BucketForm");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <>
      <div className="grid grid-cols-3 relative text-black p-10">
        <div className="absolute left-[60%] top-1/2 h-20 w-20 rounded-full bg-[#1930e1] circle2"></div>
        <div className="absolute right-[60%] top-[15%] h-20 w-20 rounded-full bg-[#be16f1] circle2"></div>
        <div className="absolute right-[50%] bottom-[15%] h-20 w-20 rounded-full bg-[#f11683] circle2"></div>

        <div className="col-span-1"></div>
        <form
          onSubmit={handleLogin}
          className="form1 flex flex-col justify-start items-center col-span-1  neumorphism border p-10 font-medium"
        >
          <div className="m-3 text-center">
            <label>Email:</label>
            <br />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent border rounded-md px-3"
            />
          </div>
          <div className="m-3 text-center">
            <label>Password:</label>
            <br />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent border rounded-md px-3"
            />
          </div>
          <button className="my-4" type="submit">
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front text">Login</span>
          </button>
          <p>
            Don't have an account? &nbsp;
            <Link
              to="/signup"
              className="hover:text-[#a30036] text-[#a30036]"
              style={{ textDecoration: "none" }}
            >
              Signup
            </Link>
          </p>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <div className="col-span-1"></div>
      </div>
    </>
  );
}

export default Login;
