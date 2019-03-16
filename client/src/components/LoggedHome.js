import "./auth.css";
import React from "react";
import Navbar from "./Navbar";
var cities = require("./cities");

class LoggedHome extends React.Component {
  state = {
    email: "",
    phoneNumber: null,
    address: "",
    location: "",
    donorName: "",
    bloodGroup: "",
    hasDiseases: null,
    donatedEarlier: null,
    urgencyLevel: ""
  };

  handleFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentWillMount = async () => {
    const res1 = await fetch("/auth/checkStatus", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
    const res2 = await res1.json();
    this.setState({ donorName: res2.user.name, email: res2.user.email });
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    var payload = {
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      location: this.state.location,
      bloodGroup: this.state.bloodGroup,
      hasDiseases: this.state.hasDiseases,
      donatedEarlier: this.state.donatedEarlier,
      donorName: this.state.donorName,
      email: this.state.email
    };
    if (
      !payload.phoneNumber ||
      !payload.address ||
      !payload.bloodGroup ||
      !payload.donorName ||
      !payload.donatedEarlier
    ) {
      var msg = document.getElementById("msg");
      msg.innerHTML = "Please Fill all the Fields.";
      return;
    }
    if (payload.phoneNumber.length !== 10) {
      var msg = document.getElementById("msg");
      msg.innerHTML = "Phone Number must be exactly of length 10";
      return;
    }

    const res1 = await fetch("/api/postStatus", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ payload })
    });
    const res2 = await res1.json();
    var msg2 = document.getElementById("msg2");
    msg2.innerHTML = "Posted.";
  };

  sortCity = objArray => {
    objArray.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
  };

  componentDidMount = async () => {
    this.sortCity(cities);
    var el = document.getElementById("cityState");
    for (var t = 0; t < cities.length; t++) {
      var option = document.createElement("option");
      option.text = `${cities[t].name}`;
      option.value = `${cities[t].name}`;
      el.add(option);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <h2>Welcome {this.state.donorName}.</h2>
        <form
          id="statusBox"
          onChange={this.handleFormChange}
          onSubmit={this.handleFormSubmit}
        >
          <h1 id="msg" />
          <select name="" id="cityState" name="location">
            <option selected>Location of Donor</option>
          </select>
          <br />
          <label>Blood Group</label>{" "}
          <select name="bloodGroup" name="bloodGroup">
            <option selected>Blood Group</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <input
            type="textarea"
            placeholder="Your Address"
            name="address"
            required
          />
          <input
            type="number"
            maxLength="10"
            name="phoneNumber"
            placeholder="Donor Phone Number"
          />
          <label>Donated in the past 6 Months ?</label>
          <select name="donatedEarlier">
            <option value="" selected>
              Select
            </option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
          <br />
          <label>Any Disease ?</label>
          <select name="hasDiseases">
            <option value="" selected>
              Select
            </option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
          <input type="submit" value="Post" id="postStatus" />
        </form>
        <h1 id="msg2" />
      </React.Fragment>
    );
  }
}

export default LoggedHome;
