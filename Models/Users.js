// require("../config/config");
const mongoose = require("mongoose");
// const { generateHashSync } = require("../Utils/hash");
const { Schema, model } = mongoose;

const UserLoginSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  phonenumber: {
    type: Number
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  emailVerificationTokenExpires: {
    type: Date
  }
});

// AdminSchema.virtual("password").set(function(passwordPlainText) {
//   generateHash(passwordPlainText)
//     .then(hash => {
// AdminSchema.passwordHash = hash;
//       this.set({ passwordHash: hash });
//     })
//     .catch(console.error);
// });

const UserLoginModel = model("UserLoginModel", UserLoginSchema);

// const UserLoginTest = new UserLoginModel({
//   email: "user1@test.com",
//   passwordHash: generateHashSync("123456")
// });

// UserLoginTest
//   .save()
//   .then(response => {
//     console.log(response);
//   })
//   .catch(console.error);

module.exports = UserLoginModel;
