import Navbar from "./Navbar";
import Spinner from "react-spinner-material";
import LoggedHome from "./LoggedHome";
import React from "react";
import "./auth.css";
var cities = require("./cities");

class Home extends React.Component {
  state = {
    choice: null,
    isSpinning: false,
    logged: null,
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    location: "",
    age: "",
    bloodGroup: "",
    address: "",
    registered: null,
    message: ""
  };

  sortCity = objArray => {
    objArray.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
  };

  componentDidMount = async () => {
    this.setState({ isSpinning: true });
    try {
      const res1 = await fetch("/auth/checkStatus", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      });
      const res2 = await res1.json();
      this.setState({
        logged: res2.logged,
        isSpinning: false
      });
    } catch (er) {
      console.log(er);
    }
    this.sortCity(cities);
    var el = document.getElementById("cityState");
    for (var t = 0; t < cities.length; t++) {
      var option = document.createElement("option");
      option.text = `${cities[t].name}`;
      option.value = `${cities[t].name}`;
      el.add(option);
    }
  };

  handleFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLoginSubmit = async e => {
    e.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.password
    };
    const res1 = await fetch("/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ payload })
    });
    const res2 = await res1.json();
    this.setState({ logged: res2.logged });
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const payload = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      repeatPassword: this.state.repeatPassword,
      location: this.state.location,
      age: this.state.age,
      bloodGroup: this.state.bloodGroup,
      address: this.state.address
    };
    if (payload.password !== payload.repeatPassword) {
      var msg = document.getElementById("msg");
      msg.innerHTML = "Password Don't Match!";
      return;
    }
    if (payload.password.length < 5) {
      var msg = document.getElementById("msg");
      msg.innerHTML = "Password Minimum Length 5.";
    }
    const res1 = await fetch("/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ payload })
    });
    const res2 = await res1.json();
    this.setState({ message: res2.message });
    if (res2.registered === true) window.location = "/";
  };

  render() {
    if (this.state.isSpinning === true) {
      return (
        <div>
          <Spinner
            size={80}
            spinnerColor={"white"}
            spinnerWidth={2}
            visible={this.state.isSpinning}
            id="spinner"
          />
        </div>
      );
    }
    if (this.state.logged === true) {
      return <LoggedHome data={this.state} />;
    }

    return (
      <React.Fragment>
        <Navbar />
        <div id="authBox">
          <input type="checkbox" id="form-switch" />
          <div id="loginBox">
            <form
              id="login-form"
              action=""
              method="post"
              onChange={this.handleFormChange}
              onSubmit={this.handleLoginSubmit}
            >
              <input type="email" placeholder="Email" name="email" required />
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
              />
              <button
                type="submit"
                className="btn btn-outline-primary"
                id="log"
              >
                Login
              </button>
              {"  "} or {"    "}
              <label htmlFor="form-switch">
                <span id="reg">Register</span>
              </label>
            </form>
          </div>

          <form
            id="register-form"
            action=""
            method="post"
            onChange={this.handleFormChange}
            onSubmit={this.handleFormSubmit}
          >
            <h4 id="msg" />
            {this.state.message}
            <input type="text" placeholder="Name" name="name" required />
            <input type="email" placeholder="Email" name="email" required />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
            />
            <input
              type="password"
              placeholder="Repeat Password"
              name="repeatPassword"
              required
            />
            <label>Location :</label>
            <select id="cityState" name="location">
              <option selected>Select City</option>
            </select>
            <br />
            <input type="number" placeholder="Age" name="age" required />
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
            <button type="submit" className="btn btn-outline-primary" id="log">
              Register
            </button>
            <label htmlFor="form-switch" id="signIN">
              Already Member ? Sign In Now..
            </label>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
