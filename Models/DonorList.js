const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonorSchema = new Schema({
  phoneNumber: {
    type: Number
  },
  address: {
    type: String
  },
  location: {
    type: String
  },
  donorName: {
    type: String
  },
  bloodGroup: {
    type: String
  },
  hasDisease: {
    type: String
  },
  donatedEarlier: {
    type: String
  },
  postBy: {
    type: String
  }
});

module.exports = Donor = mongoose.model("Donor", DonorSchema);
