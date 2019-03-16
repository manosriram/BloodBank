import React from "react";
import Navbar from "./Navbar";
import "./dash.css";

class UserProfile extends React.Component {
  state = {
    details: {},
    posts: [],
    deleted: null
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

      this.setState({ posts: res4.posts });
    } catch (er) {
      console.log(er);
    }
  };

  deletePost = async e => {
    console.log(e.target.name);
    const res1 = await fetch("/api/deletePost", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ postID: e.target.name })
    });
    const res2 = await res1.json();
    this.setState({ deleted: res2.deleted });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <h1>User Profile.</h1>
        <div id="userBox">
          <div id="userInfo">
            <h1>{this.state.details.name}</h1>
            <h2>{this.state.details.email}</h2>
          </div>
          {this.state.deleted === true && <h6>Post Deleted.</h6>}

          {this.state.posts.map((post, postID) => {
            return (
              <div>
                <div id="userPosts">
                  <h2>Blood Available : {post.bloodGroup}</h2>
                  <h3>Phone Number : {post.phoneNumber}</h3>
                  <h3>Has any Disease ? {post.hasDisease}</h3>
                  <h3>Has Donated in 6 Months ? {post.donatedEarlier}</h3>
                  <h2>{post.address}</h2>
                  <a href="#" onClick={this.deletePost} name={post._id}>
                    Delete
                  </a>
                </div>
                <br />
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default UserProfile;
