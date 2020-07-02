const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  startPoint:{
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  endPoint:{
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  }
});

module.exports = mongoose.model("Location", locationSchema);