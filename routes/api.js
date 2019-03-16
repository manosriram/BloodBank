const express = require("express");
const router = express.Router();
const Donor = require("../Models/DonorList");

router.post("/deletePost", (req, res) => {
  const postID = req.body.postID;
  Donor.deleteOne({ _id: postID })
    .then(res => {
      return res.json({ deleted: true });
    })
    .catch(err => console.log(err));
});

router.post("/getAllPostsByUser", (req, res) => {
  const email = req.body.email;

  Donor.find({ postBy: email })
    .then(posts => {
      if (!posts) {
        return res.json({ empty: true });
      }
      return res.json({ empty: false, posts: posts });
    })
    .catch(err => console.log(err));
});

router.post("/searchPostsByBG", (req, res) => {
  const bloodGroup = req.body.bloodGroup;

  Donor.find({ bloodGroup })
    .then(posts => {
      if (!posts) {
        return res.json({ empty: true });
      }
      return res.json({ empty: false, posts: posts });
    })
    .catch(err => console.log(err));
});

router.post("/searchPostsByLocation", (req, res) => {
  const location = req.body.location;
  Donor.find({ location })
    .then(posts => {
      if (!posts) {
        return res.json({ empty: true });
      }
      return res.json({ empty: false, data: posts });
    })
    .catch(err => console.log(err));
});

router.post("/getPosts", (req, res) => {
  Donor.find()
    .then(posts => {
      return res.json({ posts: posts });
    })
    .catch(err => console.log(err));
});

router.post("/postStatus", (req, res) => {
  const {
    phoneNumber,
    address,
    location,
    bloodGroup,
    hasDiseases,
    donatedEarlier,
    donorName,
    email
  } = req.body.payload;

  const donor = new Donor({
    phoneNumber: phoneNumber,
    address: address,
    location: location,
    donorName: donorName,
    bloodGroup: bloodGroup,
    hasDisease: hasDiseases,
    donatedEarlier: donatedEarlier,
    postBy: email
  });
  donor.save();
  return res.json({ posted: true });
});

module.exports = router;
