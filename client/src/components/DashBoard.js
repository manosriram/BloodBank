import Spinner from "react-spinner-material";
import React from "react";
import Navbar from "./Navbar";
import "./dash.css";
const cities = require("./cities");

class DashBoard extends React.Component {
  state = {
    posts: [],
    showAll: true,
    city: "",
    isSpinning: false,
    swap: false,
    bloodGroup: ""
  };

  handleAnotherSubmit = async e => {
    e.preventDefault();
    try {
      const res1 = await fetch("/api/searchPostsByBG", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ bloodGroup: this.state.bloodGroup })
      });
      const res2 = await res1.json();
      this.setState({ posts: res2.posts });
    } catch (er) {
      console.log(er);
    }
  };

  swapChoices = () => {
    this.setState({ swap: !this.state.swap });
  };

  showAllPosts = async e => {
    e.preventDefault();
    try {
      const res1 = await fetch("/api/getPosts", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      });
      const res2 = await res1.json();
      this.setState({ posts: res2.posts });
    } catch (er) {
      console.log(er);
    }
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const res1 = await fetch("/api/searchPostsByLocation", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ location: this.state.city })
      });
      const res2 = await res1.json();
      this.setState({ posts: res2.data });
    } catch (er) {
      console.log(er);
    }
  };

  handleFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentWillMount = async () => {
    try {
      const res1 = await fetch("/api/getPosts", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      });
      const res2 = await res1.json();
      this.setState({ posts: res2.posts });
      this.sortCity(cities);
    } catch (er) {
      console.log(er);
    }
  };

  sortCity = objArray => {
    objArray.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
  };

  componentDidMount = async () => {
    try {
      this.sortCity(cities);
      var el = document.getElementById("city");
      for (var t = 0; t < cities.length; t++) {
        var option = document.createElement("option");
        option.text = `${cities[t].name}`;
        option.value = `${cities[t].name}`;
        el.add(option);
      }
    } catch (er) {
      console.log(er);
    }
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

    return (
      <React.Fragment>
        <Navbar />
        <br />
        <br />
        <h2>Filter Posts.</h2>
        {this.state.swap === false && (
          <div>
            <form
              id="searchBox"
              onChange={this.handleFormChange}
              onSubmit={this.handleFormSubmit}
            >
              <br />
              <select name="city" id="city">
                <option value="" selected>
                  By Location
                </option>
              </select>
              <br />
              <br />
              <input
                type="submit"
                value="Search"
                id="search"
                className="btn btn-primary"
              />
              <br />
              <br />
              <h4>
                or by{" "}
                <a href="#" id="bg" onClick={this.swapChoices}>
                  {" "}
                  Blood Group.
                </a>
              </h4>
            </form>
            <br />
            <br />
          </div>
        )}

        {this.state.swap === true && (
          <div>
            <form
              id="searchBox"
              onChange={this.handleFormChange}
              onSubmit={this.handleAnotherSubmit}
            >
              <br />
              <select name="bloodGroup" id="bloodGroup">
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
              <br />
              <br />
              <input
                type="submit"
                value="Search"
                id="search"
                className="btn btn-primary"
              />
              <br />
              <br />
              <h4>
                or by{" "}
                <a href="#" id="bg" onClick={this.swapChoices}>
                  {" "}
                  Location.
                </a>
              </h4>
            </form>
            <br />
            <br />
          </div>
        )}

        {this.state.showAll === true && (
          <div>
            {this.state.posts.map((post, postID) => {
              return (
                <div id="mainBox">
                  <div id="box">
                    <h1 id="group">Blood Group : {post.bloodGroup}</h1>
                    <h2 id="location">Location : {post.location}</h2>
                    <br />
                    <br />
                    <br />
                    <h2 id="phoneNumber">
                      Donor Phone Number : {post.phoneNumber}
                    </h2>
                    <p>Donor Address : {post.address}</p>
                    <p>Has any Diseases : {post.hasDisease}</p>
                    <p>Have donated in 6 months ? {post.donatedEarlier}</p>
                  </div>
                  <br />
                </div>
              );
            })}
          </div>
        )}
        <h2>
          <a href="#" onClick={this.showAllPosts}>
            Show all Posts.
          </a>
        </h2>
      </React.Fragment>
    );
  }
}

export default DashBoard;
