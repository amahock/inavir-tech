import React, { useState,useEffect } from 'react';
import { Switch,Route,useHistory,useLocation } from "react-router-dom";
import './Styles/App.css';
import NavBar from "./Components/NavBar";
import MainContent from "./Components/MainContent";
import SecondPage from './Components/SecondPage';
import Footer from "./Components/Footer";
import NotFoundPage from "./Components/NotFoundPage";
import {mainContext,userContext} from "./Context/Context";
import {routes} from "./Routes/routes";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import networkRequests from "./Utils/networkRequests";
import VerifyEmailPage from "./Pages/VerifyEmailPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";

const App= () => {

  const [knowMoreButtonClicked,setKnowMoreButtonClicked] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      history.replace(routes.home);
    }
    localStorage.setItem("checkedValue", "");
    localStorage.setItem("filterValues", "");

    networkRequests("/user/isLoggedIn")
      .then(response => {
        if (response.loggedInStatus) {
          console.log("Inside the /user/isLoggedIn page then loop" + response);
          console.log("isloggedin value is   :   " + isLoggedIn);
          setIsLoggedIn(true);
          console.log("isloggedin value is after change  :   " + isLoggedIn);
          // user.validUser = true;
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(error => {
        console.log("isloggedin catch part" + error);
        setIsLoggedIn(false);
        // user.validUser = false;
      });
  }, []);

  return (
    <userContext.Provider value={{ isLoggedIn, setIsLoggedIn,knowMoreButtonClicked, setKnowMoreButtonClicked }}>
      <div className="App">
        <NavBar />
          <Switch>
              <Route exact path={routes.home}>
                <MainContent />
              </Route>
              {!isLoggedIn ?
                <Route path={routes.login}>
                <LoginPage />
              </Route>: 
              (
              <div className="text-danger bg-light">
                <h2>User Already Logged In. Please logout and try to login again...</h2></div>
              )
            }

            <Route path={routes.signUp}>
              <SignupPage />
            </Route>
            <Route path={routes.signUpVerify}>
              <VerifyEmailPage />
            </Route>
            <Route path={routes.forgotPassword}>
              <ForgotPasswordPage />
            </Route>
            <Route path={routes.resetPassword}>
              <ResetPasswordPage />
            </Route>
              <Route path={routes.knowMore}>
                <SecondPage />
              </Route>
              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
        <Footer />
      </div>
    </userContext.Provider>
  );
}

export default App;
