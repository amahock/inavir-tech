import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { routes } from "../Routes/routes";
import { userContext } from "../Context/Context";
import logoImage from "../Images/logo1.png";

const NavBar = () => {
  const history = useHistory();
  const user = useContext(userContext);

  const logout = event => {
    event.preventDefault();
    // console.log("logout function");
    user.setIsLoggedIn(false);
    localStorage.removeItem("jwtToken");
    history.push(routes.home);
  };
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
      <div className="nav-logo align-content-start">
              <a className="navbar-brand" href={routes.home}>
                <img className="img-fluid" src={logoImage} alt="Logo" style={{width:"50px",align:"left"}}/>
              </a>
      </div>
      <h4>
          <Link className="text-white text-left" to={routes.home}>
            InaVir Technologies
          </Link>
      </h4>


        {user.isLoggedIn ? (
          <div className="navbar-nav justify-content-end">
            <div className="nav-item ">
              <button className="btn btn-primary" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="navbar-nav justify-content-end">
            <div className="nav-links mr-8">
              <button
                className="btn btn-outline-success"
                onClick={() => history.push(routes.login)}
              >
                Login
              </button>
            </div>
            <div className="nav-links ">
              <button
                className="btn btn-outline-success"
                onClick={() => history.push(routes.signUp)}
              >
                SignUp
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
