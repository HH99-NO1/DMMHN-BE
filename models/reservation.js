const mongoose = require("mongoose");

// required: 무조건 필요한지
const reservationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    // required: true,
  },
  companyAdmin: {
    type: String,
    // required: true,
  },
  reservationDate: {
    type: String,
    // required: true,
  },
  reservationTopic: {
    type: String,
    // required: true,
  },
  startReservation: {
    type: String,
    // required: true,
  },
  endReservation: {
    type: String,
    // required: true,
  },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

module.exports = mongoose.model("reservation", reservationSchema);
