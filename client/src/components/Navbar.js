import React from "react";
import "./components.css";
const Cookie = require("js-cookie");

class Navbar extends React.Component {
  state = {
    isLoggedIn: false,
    user: null
  };

  logOut = () => {
    Cookie.remove("auth_t");
    window.location = "/";
  };

  componentDidMount = async () => {
    try {
      const res1 = await fetch("/auth/checkStatus", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      });
      const re = await res1.json();
      this.setState({ isLoggedIn: re.logged, user: re.user });
    } catch (error) {
      console.log(error);
    }
  };

  logout = () => {
    Cookie.remove("auth_t");
    window.location = "/";
  };

  render() {
    return (
      <>
        <header>
          <nav id="navbar">
            <h1 className="logo">
              <a href="/" id="home">
                Home
              </a>
            </h1>
            <ul>
              <li>
                <a href="/dashBoard">DashBoard</a>
              </li>
            </ul>
            {this.state.isLoggedIn === true && (
              <div>
                <ul>
                  <li>
                    <a href="#" onClick={this.logout}>
                      logout
                    </a>
                  </li>
                  <li>
                    <a href="/userProfile">{this.state.user.name}</a>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </header>
      </>
    );
  }
}

export default Navbar;
