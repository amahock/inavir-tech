import React,{useEffect, useState,Fragment} from "react";
import { useParams,useHistory } from "react-router-dom";
import networkRequests from "../Utils/networkRequests";
import {routes} from "../Routes/routes";
import FormLayout from "../Components/FormLayout";

const VerifyEmailPage = () =>{
  const { token } = useParams();
  const history = useHistory();

  const [email,setEmail] = useState();
  const [isEmailVerified,setIsEmailVerified] = useState(false);
  const [emailVerificationErr,setEmailVerificationErr] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [showError, setShowError] = useState(false);

  const updateEmail = event => {
    setEmail(event.target.value);
  };

  useEffect(() => {

    console.log("Inside Useeffect : " + token);
    networkRequests("/signUp/verifyEmail", "POST", {
      emailVerificationToken: token
    })
      .then(response => {
        console.log(response.message);
        if (response.message === "email verified") {
          setIsEmailVerified(true);
        } else {
          setIsEmailVerified(false);
          setEmailVerificationErr(response.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const formSubmit = event => {
    event.preventDefault();
    // setErrorMessage("");
    networkRequests("/user/sendVerificationEmailLink", "POST", { email })
      .then(response => {
        console.log(response.data);
        if (response.data === "email sent") {
          console.log("mail sent sucess");
          setShowError(false);
          setMessageFromServer("email sent");
          setSendingEmail(false);
        } else if (response.data === "email not in db") {
          // console.log("email not present" + response.data);
          setShowError(true);
          setMessageFromServer("");
          setSendingEmail(false);
        }
      })
      .catch(error => {
        // user.setIsLoggedIn(false);
        // console.error(error);
        // console.log("entered into login route catch part");
        console.log("error message from server" + error);
      });
  };


if(isEmailVerified){
  const heading="Email verified successfully";
  const formContent = [
    <Fragment>
    <div>Please login with your email...</div>
    <div>
        <button
          className="btn btn-lg btn-primary btn-block text-uppercase"
          type="submit"
          onClick={()=>history.push(routes.login)}
        >
          Login
        </button>
    </div>
    </Fragment>
  ]
  return(
    <FormLayout heading={heading} formContent={formContent} />
  )
  }
  else if(emailVerificationErr !== ""){
    const heading="Email verified failed";
    const formContent = [
      <Fragment>
      <div className="errorMsg">There is some problem in email verification.</div>
      <div>
      <form className="form-signin" onSubmit={formSubmit}>
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
          <button
            className="btn btn-lg btn-primary btn-block text-uppercase"
            type="submit"
            disabled={messageFromServer === "email sent"?true:false}
          >
            Send Email verification Link.
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
      </Fragment>
    ]
    return (
      <FormLayout heading={heading} formContent={formContent} />
    )
  }
  else{
    return(
      <div className="text-info bg-light">
        <h2>Verifying your email.Please wait...</h2>
        <span className="spinner-border text-info"></span>
      </div>
    )
  }
}

export default VerifyEmailPage;