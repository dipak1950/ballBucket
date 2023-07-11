import React from "react";
import BucketForm from "./Components/BucketForm";
import Suggetion from "./Components/Suggetion";
import { Route, Routes } from "react-router-dom";
import ViewData from "./Components/ViewData";
import Signup from "./Components/SignUp";
import Login from "./Components/Login";

const App = () => {
  const isLoggedIn = false;

  return (
    <>
      <div className=" relative flex flex-col justify-center items-center p-20">
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<BucketForm />} />
              <Route path="/Suggetion" element={<Suggetion />} />
              <Route path="/view" element={<ViewData />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
};

export default App;
