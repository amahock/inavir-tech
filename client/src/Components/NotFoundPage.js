import React from "react";
import {useHistory} from "react-router-dom";
import { routes } from "../Routes/routes";
// import PageNotFoundImage from "../Images/PageNotFoundImage.png";

const NotFoundPage = () => {
  const history = useHistory();
  return (
    <div>
      {/* <img src={PageNotFoundImage} alt="Page Not Found" /> */}
      <h2 style={{ textAlign: "center" }}> Page Not Found </h2>
      <p style={{ textAlign: "center" }}>
      <button className="btn-primary" onClick={()=> history.push(routes.home)}>Go Home</button>
      </p>
    </div>
  );
};

export default NotFoundPage;
