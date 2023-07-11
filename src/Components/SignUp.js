import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/register", formData)
      .then((response) => {
        console.log(response.data);
        setIsSignedUp(true);
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Signup failed");
        }
        console.log(error);
      });
  };

  return (
    <>
      <div className="grid grid-cols-3 relative text-black p-10 text-center">
        <div className="absolute left-[60%] top-1/2 h-20 w-20 rounded-full bg-[#1930e1] circle2"></div>
        <div className="absolute right-[60%] top-[15%] h-20 w-20 rounded-full bg-[#be16f1] circle2"></div>
        <div className="absolute right-[50%] bottom-[15%] h-20 w-20 rounded-full bg-[#f11683] circle2"></div>

        <div className="col-span-1"></div>
        <form
          className="form1 flex flex-col justify-start items-center col-span-1 neumorphism border p-10 font-medium"
          onSubmit={handleSignup}
        >
          {isSignedUp ? (
            <div className="success-message">
              Signup successful! Please <Link to="/login">login</Link> to
              continue.
            </div>
          ) : (
            <>
              <div className="m-3">
                <label htmlFor="name">Name:</label>
                <br />
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  required
                  className="bg-transparent border rounded-md px-3"
                />
              </div>
              <div className="m-3">
                <label htmlFor="email">Email:</label>
                <br />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  required
                  className="bg-transparent border rounded-md px-3"
                />
              </div>
              <div className="m-3">
                <label htmlFor="password">Password:</label>
                <br />
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  required
                  className="bg-transparent border rounded-md px-3"
                />
              </div>
              <div className="m-3">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <br />
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                  required
                  className="bg-transparent border rounded-md px-3"
                />
              </div>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              <button className="my-5">
                <span className="shadow"></span>
                <span className="edge"></span>
                <span className="front text">Sign up</span>
              </button>
            </>
          )}
          <p>
            Already have an account?
            <Link
              to="/login"
              className="hover:text-[#a30036] hover:underline underline-offset-4"
            >
              Login
            </Link>
          </p>
        </form>
        <div className="col-span-1"></div>
      </div>
    </>
  );
};

export default Signup;
