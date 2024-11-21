const express = require("express");
const router = express.Router();
const surveyServices = require("./services");

// Initialize a new survey
router.post("/:shortcode/:phone", async (req, res) => {
  try {
    const { shortcode, phone } = req.params;
    const response = await surveyServices.initializeSurvey(shortcode, phone);
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to initialize survey" });
  }
});

// Submit an answer
router.post("/:phone", async (req, res) => {
  try {
    const { phone } = req.params;
    const { answer } = req.body;
    const response = await surveyServices.submitAnswer(phone, answer);
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to submit answer" });
  }
});

module.exports = router;