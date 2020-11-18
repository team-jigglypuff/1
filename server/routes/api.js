const express = require("express");
const {
  jwt: { AccessToken },
} = require("twilio");

const twilioController = require("../controllers/twilioController");
const userController = require("../controllers/userController");
const router = express.Router();

// SET UP ENV VARIABLES
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// USERS
// create user
router.post("/register", userController.signUp, (req, res, next) => {
  const { user } = res.locals;
  res.status(200).json(user);
});

router.post("/login", userController.login, (req, res, next) => {
  res.status(200).json(res.locals.data);
});

router.post("/message", userController.postMessage, (req, res, next) => {
  res.status(200).json("message is successfully saved to database");
});

router.get("/getMessages", userController.getMessages, (req, res, next) => {
  res.status(200).json(res.locals.data);
});

router.get("/", (req, res) => {
  res.status(200).json({ message: "/api route ping" });
});

// VIDEO
// router.post("/video", twilioController.createRoom);

// GET ACCESS TOKEN FOR TWILIO VIDEO CHAT
router.post("/video/token", twilioController.getToken);

module.exports = router;
