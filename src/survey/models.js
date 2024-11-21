const mongoose = require("mongoose");

// Survey Schema
const questionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
});

const surveySchema = new mongoose.Schema({
  shortcode: { type: String, required: true },
  questions: [questionSchema],
});

const Survey = mongoose.model("Survey", surveySchema);

// Response Schema
const answerSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  answer: { type: String, required: true },
});


const responseSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  surveyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Survey" },
  answers: [answerSchema],
});

const Response = mongoose.model("Response", responseSchema);

module.exports = {
  Survey,
  Response,
};