const express = require("express");
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser");
const BusSearchRouter = require("./Routes/BusSearchRouter");
const LoginRouter = require("./Routes/LoginRouter");
const SignUpRouter = require("./Routes/SignUpRouter");
const ForgotPasswordRouter = require("./Routes/ForgotPasswordRouter");
const ResetPasswordRouter = require("./Routes/ResetPasswordRouter");
const UpdatePasswordViaEmailRouter = require("./Routes/UpdatePasswordViaEmailRouter");

const PORT = process.env.PORT || 5000;
require("dotenv").config();
require("./Config/MongoDB");

const app = express();
app.use(bodyParser.json());
app.use(cors());


// app.get("/", (req, res) => {
//   res.send("Backend for Bus booking website");
// });

app.use(express.static(path.join(__dirname, '/client/build')));

app.get("/", (req, res) => {
  // res.send("Backend for Java site");
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


app.use("/user", LoginRouter);
app.use("/signUp", SignUpRouter);
app.use("/forgotPassword", ForgotPasswordRouter);
app.use("/reset", ResetPasswordRouter);
app.use("/updatePasswordViaEmail", UpdatePasswordViaEmailRouter);

app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
 })

const server = app.listen(PORT, () => {
  console.log("Server running on port " + server.address().port);
});
