const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const key = require("../setup/url").secret;

router.get("/", (req, res) => {
  res.send("Hey there from Auth.");
});

router.post("/checkStatus", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
    if (user) {
      return res.json({ logged: true, user: user });
    }
    return res.json({ logged: false });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body.payload;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.json({ logged: false });
      }

      bcrypt
        .compare(password, user.password)
        .then(isCorrect => {
          if (isCorrect) {
            var payload = {
              id: user.id,
              name: user.name,
              email: user.email
            };
            jsonwt.sign(payload, key, { expiresIn: 9000000 }, (err, token) => {
              res.cookie("auth_t", token, { maxAge: 90000000 });
              return res.json({ logged: true });
            });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.post("/register", (req, res) => {
  const {
    email,
    password,
    location,
    age,
    address,
    bloodGroup,
    name
  } = req.body.payload;
  console.log(req.body);

  User.findOne({ email })
    .then(person => {
      console.log(person);
      if (person) {
        return res.json({
          registered: false,
          message: "Email Already Registered."
        });
      }

      const user = new User({
        name: name,
        email: email,
        password: password,
        location: location,
        age: age,
        address: address,
        bloodGroup: bloodGroup
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          user.save().catch(err => console.log(err));
        });
      });
      return res.json({ registered: true, message: "User Registered." });
    })
    .catch(err => console.log(err));
});

module.exports = router;
