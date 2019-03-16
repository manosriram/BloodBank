import React from "react";
import Navbar from "./Navbar";
import "./dash.css";

class UserProfile extends React.Component {
  state = {
    details: {},
    posts: []
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
      const res2 = await res1.json();
      console.log(res2);
      this.setState({ details: res2.user });
      const email = res2.user.email;

      const res3 = await fetch("/api/getAllPostsByUser", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
      const res4 = await res3.json();
      this.setState({ posts: res4.posts }, () => console.log(this.state));
    } catch (er) {
      console.log(er);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <h1>User Profile.</h1>
        <div id="userBox">
          <h1>{this.state.details.name}</h1>
          {this.state.posts.map((post, postID) => {
            return (
              <div>
                <h3>Blood Group : {post.bloodGroup}</h3>
                <h3>Location: {post.location}</h3>
                <h3>{post.address}</h3>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default UserProfile;
