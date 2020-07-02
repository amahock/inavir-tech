const express = require("express");
const UserLoginModel = require("../Models/Users");

const ResetPasswordRouter = express.Router();

ResetPasswordRouter.post("/", (req, res) => {
  // console.log(req.body);
  const {resetPasswordToken} = req.body;
  // console.log(
  //   " inside reset route ,reset password token value from request : ");
  const myQuery = {
    resetPasswordToken
  };

  // const myQuery = {
  //   $and: [
  //     { resetPasswordToken },
  //     {
  //       resetPasswordExpires: { $gt: Date.now() }
  //     }
  //   ]
  // };

  UserLoginModel.findOne(myQuery)
    .exec()
    .then(userdata => {
      if (userdata === null) {
        // console.error("password reset link is invalid or has expired");
        res.status(403).send({
          message: "password reset link is invalid or has expired"
        });
      } else {
        // console.log(userdata);
        res.status(200).send({
          username: userdata.email,
          message: "password reset link a-ok"
        });
      }
    })
    .catch(error => {
      console.log("Error occured  " + error);
    });
});

module.exports = ResetPasswordRouter;
