const express = require("express");
const crypto = require("crypto");
const { generateHashSync } = require("../Utils/hash");
const {
  userTokenGenerator,
  userTokenValidator
} = require("../Utils/userTokenManager");
const { compareHash } = require("../Utils/hash");
const UserLoginModel = require("../Models/Users");
const { sendEmail } = require("../Utils/emailManager");

const SignUpRouter = express.Router();

SignUpRouter.post("/", (req, res) => {
  const { email, password, firstname, lastname, phonenumber } = req.body;
  console.log(email);
  // console.log(req.originalUrl);
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log(fullUrl);
  // console.log(req.url);
  UserLoginModel.findOne({ email })
    .exec()
    .then(userData => {
      if (userData === null) {
        console.log(process.env.CLIENT_DOMAIN);
        const token = crypto.randomBytes(20).toString("hex");
        const mailOptions = {
          from: `${process.env.EMAIL_ADDRESS}`,
          to: `${email}`,
          subject: "Link To verify your email address",
          text:
            "You are receiving this because you (or someone else) have requested to register your email address for our site.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
            `${process.env.CLIENT_DOMAIN}`+"/verifyEmail/"+`${token}`+"\n\n" +
            "If you did not request this, please ignore this email.\n"
        };

        sendEmail(mailOptions)
          .then(sendEmailResult => {
            console.log("sendEmailResult from router  "+sendEmailResult);
            if (sendEmailResult === "email sent") {
              const UserLoginTest = new UserLoginModel({
                email: email,
                passwordHash: generateHashSync(password),
                firstname: firstname,
                lastname: lastname,
                phonenumber: phonenumber,
                emailVerified: false,
                emailVerificationToken: token,
                resetPasswordToken: null,
                resetPasswordExpires: null,
                emailVerificationTokenExpires: Date.now() + 3600000
              });

              UserLoginTest.save()
                .then(response => {
                  console.log(response);
                  res.status(200).json({
                    data: "email sent"
                  });
                })
                .catch(error => {
                  console.log("userdata from table find" + error);
                  res.status(400).send("Invalid request !!!! ");
                });
            } else {
              res.status(200).json({
                data: "error occured"
              });
            }
          })
          .catch(error => {
            res.status(403).json({
              data: "error occured"
            });
          });
      } else {
        // console.log(userData);
        res.status(200).send({
          status: "Success",
          userStatus: "UAP"
        });
      }
    })
    .catch(error => {
      console.log("UserLoginModel find error " + error);
      res.status(500).send("UserLoginModel find error");
    });
});

SignUpRouter.post("/verifyEmail", (req, res) => {
  const { emailVerificationToken } = req.body;
  UserLoginModel.findOne({ emailVerificationToken })
    .exec()
    .then(userData => {
      if (userData === null) {
        res.status(200).json({
          message: "email verification failed"
        });
      } else {
        const myQuery = {
          emailVerificationToken
        };
        UserLoginModel.updateOne(
          myQuery,
          {
            emailVerified: true,
            emailVerificationToken: null,
            emailVerificationTokenExpires: null
          },
          (err, response, next) => {
            if (err) {
              console.log("error occured when update in DB \n" + err);
              res.status(403).send({
                message: "error occured when update the DB"
              });
            } else {
              // console.log("password updated successfully in DB");
              res.status(200).json({ message: "email verified" });
            }
          }
        );
      }
    });
});
module.exports = SignUpRouter;
