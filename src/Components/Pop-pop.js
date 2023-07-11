import React from "react";

const Modal = ({ visible, onClose, data }) => {
  if (!visible || !data) return null;

  return (
    <div className="">
      <div className="text-white mt-3">
        <h2 className="text-center">Suggestion Data</h2>
        <p>Want Ball: {data.want_ball}</p>
        <p className="mt-2 mb-3">Want Color: {data.ball_color}</p>
        {data.bucket && data.bucket.length > 0 ? (
          <div className="table-responsive table-color">
            <table className="table table-striped bg-transparent">
              <thead>
                <tr>
                  <th>Bucket Name</th>
                  <th>Total Size</th>
                  <th>Remaining Size</th>
                  <th>Ball Count</th>
                </tr>
              </thead>
              <tbody>
                {data.bucket.map((bucket) => (
                  <tr key={bucket.bucket_id}>
                    <td>{bucket.bucket_name}</td>
                    <td>{bucket.total_size}</td>
                    <td>{bucket.remaining_size}</td>
                    <td>{bucket.ball_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No buckets available.</p>
        )}
        {/* <p>Ball Size: {data.ball_size}</p>
        <p>Ball Color: {data.ball_color}</p> */}
        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
};

export default Modal;
