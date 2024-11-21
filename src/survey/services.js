const { Survey, Response } = require("./models");

// Initialize a survey
async function initializeSurvey(shortcode, phone) {
  const survey = await Survey.findOne({ shortcode });
  if (!survey) throw new Error("Survey not found");

  // Create a response document for the user
  await Response.create({
    phone,
    surveyId: survey._id,
    answers: [],
  });

  // Return the first question
  return { question: survey.questions[0].text };
}

// Submit an answer
async function submitAnswer(phone, answer) {
  const response = await Response.findOne({ phone });
  if (!response) throw new Error("User not found");

  const survey = await Survey.findById(response.surveyId);
  if (!survey) throw new Error("Survey not found");

  const currentQuestionIndex = response.answers.length;
  const currentQuestion = survey.questions[currentQuestionIndex];

  // Save the answer
  response.answers.push({ questionId: currentQuestion.id, answer });
  await response.save();

  // Check for the next question
  const nextQuestion = survey.questions[currentQuestionIndex + 1];
  if (nextQuestion) {
    return { nextQuestion: nextQuestion.text };
  } else {
    return { message: "Survey complete. Thank you!" };
  }
}

module.exports = {
  initializeSurvey,
  submitAnswer,
};