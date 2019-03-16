const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  age: {
    type: Number
  },
  location: {
    type: String
  },
  bloodGroup: {
    type: String
  },
  address: {
    type: String
  },
  joined: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("User", UserSchema);
