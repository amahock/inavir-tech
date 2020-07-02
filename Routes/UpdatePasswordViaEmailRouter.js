const express = require("express");
const UserLoginModel = require("../Models/Users");
const { generateHashSync } = require("../Utils/hash");

const UpdatePasswordViaEmailRouter = express.Router();

UpdatePasswordViaEmailRouter.put("/", (req, res, next) => {
  const { username, password, resetPasswordToken } = req.body;
  // console.log("username from request : " + username);
  const myQuery = {
    $and: [{ email: username }, { resetPasswordToken }]
  };

  UserLoginModel.findOne(myQuery)
    .exec()
    .then(user => {
      if (user === null) {
        // console.log("in updatepasswordViaEmail , find query return empty");
        res.status(403).send({
          message: "password reset link is invalid or has expired"
        });
      } else {
        const myQuery = {
          email: username
        };
        UserLoginModel.updateOne(
          myQuery,
          {
            passwordHash: generateHashSync(password),
            resetPasswordToken: null,
            resetPasswordExpires: null
          },
          (err, response, next) => {
            if (err) {
              console.log(
                "error occured when update the password in DB    \n" + err
              );
              res.status(403).send({
                message: "error occured when update the password in DB"
              });
            } else {
              // console.log("password updated successfully in DB");
              res.status(200).json({ message: "password updated" });
            }
          }
        );
      }
    });
});

module.exports = UpdatePasswordViaEmailRouter;
