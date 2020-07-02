import React, { useState, useContext,Fragment } from "react";
// import "../styles/loginStyle.css";
// import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
// import { useHistory } from "react-router-dom";
import networkRequests from "../Utils/networkRequests";
import { userContext } from "../Context/Context";
import validateForm from "../Components/FormValidation";
import { routes } from "../Routes/routes";
import FormLayout from "../Components/FormLayout";

const SignupPage = props => {
  // console.log("Entered in signup page");

  const errormsg = {
    firstnameErr: "",
    lastnameErr: "",
    phonemunberErr: "",
    emailErr: "",
    passwordErr: ""
  };

  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [isValidForm, setIsValidForm] = useState(true);
  const [messageFromServer, setMessageFromServer] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [showError, setShowError] = useState(false);

  const [firstnameErr, setFirstNameErr] = useState("");
  const [lastnameErr, setLastNameErr] = useState("");
  const [phonenumberErr, setPhoneNumberErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const user = useContext(userContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const history = useHistory();

  const updateFirstName = event => setFirstName(event.target.value);
  const updateLastName = event => setLastName(event.target.value);
  const updatePhoneNumber = event => setPhoneNumber(event.target.value);
  const updateEmail = event => setEmail(event.target.value);
  const updatePassword = event => setPassword(event.target.value);

  const formSubmit = event => {
    event.preventDefault();
    setEmailErr("");
    setFirstNameErr("");
    setLastNameErr("");
    setPasswordErr("");
    setPhoneNumberErr("");
    setShowError(false);
    setMessageFromServer("");
    setSendingEmail(false);
    // console.log(email);
    const validationResult = validateForm(
      email,
      password,
      firstname,
      lastname,
      phonenumber,
      errormsg
    );
    console.log(validationResult);
    if (validationResult.formIsValid === true) {
      setSendingEmail(true);
      networkRequests(routes.signUp, "POST", {
        email,
        password,
        firstname,
        lastname,
        phonenumber
      })
        .then(response => {
          console.log(response.userStatus);
          if (response.userStatus === "UAP") {
            setEmailErr("*User already present");
          } else {
            setShowError(false);
            setMessageFromServer("email sent");
            localStorage.setItem("jwtToken", response.jwtToken);
            // user.setIsLoggedIn(true);
            // history.push("/home");
          }
        })
        .catch(error => {
          user.setIsLoggedIn(false);
          console.error(error);
        });
    } else {
      console.log("validation error occured");
      console.log(errormsg);
      setFirstNameErr(errormsg.firstnameErr);
      setLastNameErr(errormsg.lastnameErr);
      setEmailErr(errormsg.emailErr);
      setPhoneNumberErr(errormsg.phonenumberErr);
      setPasswordErr(errormsg.passwordErr);
      // setIsValidForm(false);
    }
  };

  const formContent = [
    <div key="formContentSignupPage">
      <form className="form-signin" onSubmit={formSubmit}>
        <div className="form-label-group">
          <input
            type="text"
            id="firstName"
            className="form-control"
            placeholder="First Name"
            onChange={updateFirstName}
            required
            autoFocus
          />
          <label htmlFor="firstName">First Name</label>
        </div>
        <div className="errorMsg">{firstnameErr}</div>
        <div className="form-label-group">
          <input
            type="text"
            id="lastName"
            className="form-control"
            placeholder="Last Name"
            onChange={updateLastName}
            required
            autoFocus
          />
          <label htmlFor="lastName">Last Name</label>
        </div>
        <div className="errorMsg">{lastnameErr}</div>
        <div className="form-label-group">
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            onChange={updateEmail}
            required
            autoFocus
          />
          <label htmlFor="inputEmail">Email address</label>
        </div>
        <div className="errorMsg">{emailErr}</div>
        <div className="form-label-group">
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            onChange={updatePassword}
            required
          />
          <label htmlFor="inputPassword">Password</label>
        </div>
        <div className="errorMsg">{passwordErr}</div>
        <div className="form-label-group">
          <input
            type="number"
            id="phoneNumber"
            className="form-control"
            placeholder="Phone Number"
            onChange={updatePhoneNumber}
            required
            autoFocus
          />
          <label htmlFor="phoneNumber">Phone Number</label>
        </div>
        <div className="errorMsg">{phonenumberErr}</div>
        <button
          className="btn btn-lg btn-primary btn-block text-uppercase"
          type="submit"
          // disabled={messageFromServer === "email sent"?true:false}
        >
          SignUp
        </button>

        <hr className="my-4" />
        <div>
        {sendingEmail && messageFromServer === "" ? (
          <div className="text-white">
            <h4>Sending verification email. Please wait....</h4>
          </div>
        ) : null}

        {showError && (
          <div>
            <h4 className="errorMsg">
              That email address isn&apos;t recognized. Please try again or
              register for a new account.
            </h4>
          </div>
        )}

        {messageFromServer === "email sent" && (
          <div className="text-success">
            <h3>Verification Email Successfully Sent to your email id. Please check your email ...!</h3>
          </div>
        )}
      </div>
      </form>
    </div>
  ];

  return (
    <Fragment>
      <FormLayout heading="SignUp" formContent={formContent} />
      
    </Fragment>
  
  )
};

export default SignupPage;
