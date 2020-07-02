const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const UserLoginModel = require("../Models/Users");
const {sendEmail} = require("../Utils/emailManager");

const ForgotPasswordRouter = express.Router();

ForgotPasswordRouter.post("/", (req, res) => {
  const { email } = req.body;
  console.log(req.body.email);
  UserLoginModel.findOne({ email })
    .exec()
    .then(user => {
      if (user === null) {
        // console.error("email not in database");
        res.status(403).send({
         data:"email not in db"
        });
      } else {
        // console.log("email is found and entered into else part");
        const token = crypto.randomBytes(20).toString("hex");
        const myQuery = {
            email : email
        };
        UserLoginModel.updateOne(myQuery,{
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000
        },(err,res) => {
          if (err){
            console.log("error occured when update the reset link in DB    \n"+err);
          }
          else{
            console.log("reset link updated in DB");
          }
        });

        const mailOptions = {
          from: `${process.env.EMAIL_ADDRESS}`,
          to: `${user.email}`,
          subject: "Link To Reset Password",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
            `${process.env.CLIENT_DOMAIN}/reset/${token}\n\n` +
            "If you did not request this, please ignore this email  and your password will remain unchanged.\n"
        };
       sendEmail(mailOptions)
          .then(sendEmailResult =>{
                // console.log("sendEmailResult from router  "+sendEmailResult);
                if (sendEmailResult === "email sent"){
                  res.status(200).json({
                    data: "email sent"
                  });
                } else{
                  res.status(200).json({
                    data: "error occured"
                  });
                }
          })
          .catch(error=>{
            res.status(403).json({
              data: "error occured"
            });
          });
      };
    });
});

module.exports = ForgotPasswordRouter;
