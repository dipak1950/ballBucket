import React, { useState } from "react";
import axios from "axios";
import "./Style.css";
import Modal from "./Pop-pop";
import { useNavigate } from "react-router-dom";

function Suggetion() {
  const [suggestion, setSuggestion] = useState({
    want_ball: "",
    ball_size: "",
    ball_color: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSuggestion({ ...suggestion, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      suggestion.want_ball.trim() === "" ||
      suggestion.ball_size.trim() === "" ||
      suggestion.ball_color.trim() === ""
    ) {
      setError("Please fill in all the fields");
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:5000/suggestion/create", suggestion, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);

        setResponseData(response.data);
        setModalVisible(true);

        setSuggestion({
          want_ball: "",
          ball_size: "",
          ball_color: "",
        });
        setError("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRedirect = () => {
    navigate(-1);
  };

  const view = () => {
    navigate("/view");
  };

  return (
    <>
      <div className="grid grid-cols-3 relative text-black text-center">
        <div className="absolute left-[60%] top-1/2 h-20 w-20 rounded-full bg-[#1930e1] circle2"></div>
        <div className="absolute right-[60%] top-[15%] h-20 w-20 rounded-full bg-[#be16f1] circle2"></div>
        <div className="absolute right-[50%] bottom-[15%] h-20 w-20 rounded-full bg-[#f11683] circle2"></div>

        <div className="col-span-1"></div>

        <form
          onSubmit={handleSubmit}
          className="form1 flex flex-col justify-start items-center col-span-1 neumorphism border p-10 font-medium"
        >
          <div className="m-3">
            <label htmlFor="want_ball">Want Ball</label>
            <br />
            <input
              type="number"
              id="want_ball"
              placeholder="Want ball"
              value={suggestion.want_ball}
              name="want_ball"
              onChange={handleChange}
              className="bg-transparent border rounded-md px-3"
            />
          </div>

          <div className="m-3">
            <label htmlFor="ball_color">Ball Color</label>
            <br />
            <input
              type="text"
              id="ball_color"
              placeholder="Ball color"
              value={suggestion.ball_color}
              name="ball_color"
              onChange={handleChange}
              className="bg-transparent border rounded-md px-3"
            />
          </div>

          <div className="m-3">
            <label htmlFor="ball_size">Ball Size</label>
            <br />
            <input
              type="number"
              id="ball_size"
              placeholder="Ball size"
              value={suggestion.ball_size}
              name="ball_size"
              onChange={handleChange}
              className="bg-transparent border rounded-md px-3"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="button-container">
            <button className="my-4 me-2" type="submit">
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text">Add Bucket</span>
            </button>
            <button className="my-2 me-2" onClick={view}>
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text">View All</span>
            </button>
            <button
              className="my-2 me-2"
              type="button"
              onClick={handleRedirect}
            >
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text">Go Back</span>
            </button>
          </div>
        </form>
      </div>
      <div
        className={`modal fade ${modalVisible ? "show" : ""}`}
        id="exampleModalLong"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden={!modalVisible}
        style={{ display: modalVisible ? "block" : "none" }}
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content pop-pop">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                View All Data
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setModalVisible(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-black">
              <p>
                <Modal
                  visible={modalVisible}
                  onClose={() => setModalVisible(false)}
                  data={responseData?.data}
                />
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary text-white"
                data-dismiss="modal"
                onClick={() => setModalVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Suggetion;
