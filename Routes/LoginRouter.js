const express = require("express");
const {
  userTokenGenerator,
  userTokenValidator
} = require("../Utils/userTokenManager");
const { compareHash } = require("../Utils/hash");
const UserLoginModel = require("../Models/Users");

const LoginRouter = express.Router();


LoginRouter.post("/login", (req, res) => {

  const { email, password } = req.body;
  
  UserLoginModel.findOne({ email })
    .exec()
    .then(userData => {
      if (userData) {
        if (userData.emailVerified){
              compareHash(password, userData.passwordHash)
              .then(result => {
                if (result) {
                  const jwtToken = userTokenGenerator({ email });
                  const name = userData.firstname +" "+ userData.lastname;
                    res.status(200).send({
                      status: "Success",
                      name,
                      jwtToken
                    });
                  } else {
                    console.log("Invalid request");
                    res.status(400).send("Invalid Request");
                  }
              })
              .catch(error => {
                console.error(error);
                res.status(500).send("Internal Server Error");
              });
        } else {
          res.status(200).send({
            status: "email not verified"
          });
        }

      } else {
        res.status(400).send("Invalid request !!!! ");
      }
    })
    .catch(error => {
      console.log("UserLoginModel find error" + error);
      res.status(500).send("UserLoginModel find error");
    });
});

LoginRouter.get("/isLoggedIn", (req, res) => {
  
  const jwt = req.header("Authorization");

  if(jwt!==null){
      if (userTokenValidator(jwt)) {
        res.status(200).send({
          loggedInStatus: true
        });
      } else {
        res.status(200).send({
          loggedInStatus: false
        });
      }
    }else{
        res.status(200).send({
          loggedInStatus: false
    });
}
});

LoginRouter.post("/sendVerificationEmailLink",(req,res)=>{
    const {email} = req.body;
    UserLoginModel.findOne({ email })
    .exec()
    .then(userData => {
      if (userData !== null) {
        const token = crypto.randomBytes(20).toString("hex");
        const myQuery = {
            email : email
        };
        UserLoginModel.updateOne(myQuery,{
          emailVerificationToken: token,
          emailVerificationTokenExpires: Date.now() + 3600000
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
          to: `${email}`,
          subject: "Link To verify your email address",
          text:
            "You are receiving this because you (or someone else) have requested to register your email address for our site.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
            `${process.env.CLIENT_DOMAIN}/signUp/verifyEmail/${token}\n\n` +
            "If you did not request this, please ignore this email.\n"
        };

        sendEmail(mailOptions)
          .then(sendEmailResult => {
            if (sendEmailResult === "email sent") {
              res.status(200).json({
                data: "email sent"
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
        res.status(403).send({
          data:"email not in db"
         });
      }
    })
    .catch(error => {
      console.log("UserLoginModel find error " + error);
      res.status(500).send("UserLoginModel find error");
    });
});


module.exports = LoginRouter;
