const mongoose = require("mongoose");
// const busMockData = require("../MockData/BusModal");
// require("../Config/MongoDB");
const { Schema } = mongoose;

const { ObjectId } = Schema;

const busSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  type: {
    type: String,
    enum: ["AC", "Delux", "Normal", "Suspense AC", "Suspense Delux"]
  },
  busNumber: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  fare: {
    type: Number,
    trim: true,
    required: true,
    maxlength: 32
  },
  features: {
    type: []
  },
  description: {
    type: String,
    maxlength: 2000
  },
  noOfSeatsAvailable: {
    type: Number,
    trim: true,
    default: 30,
    maxlength: 10
  },
  seatNames: {
    type: []
  },
  bookedSeat: {
    type: []
  },
  seatsAvailable: {
    type: []
  },
  numberOfSeats: {
    type: Number,
    trim: true,
    default: 30,
    maxlength: 32
  },
  image: {
    type: String
  },
  departure_time: {
    type: String,
    trim: true,
    maxlength: 32
  },
  isAvailable: {
    type: Boolean,
    default: false
  },
  journeyDate: {
    type: String
  },

  boardingPoints: [
    {
      type: String,
      trim: true
    }
  ],
  droppingPoints: [
    {
      type: String,
      trim: true
    }
  ],
  startPoint: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  endPoint: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  }
});

const BusModel = mongoose.model("BusModel", busSchema);

// const testRecord = new BusModel({
//   name: "Apple Travels",
//   type : "AC",
//   busNumber: "TN01A5555",

// });

// busMockData.map(item => {
//   const testRecord = new BusModel(item);
//   testRecord
//     .save()
//     .then(response => {
//       console.log(response);
//       // return "success";
//     })
//     .catch(error => {
//       console.log(error);
//       // return "error";
//     });
//   return "";
// });

module.exports = BusModel;
