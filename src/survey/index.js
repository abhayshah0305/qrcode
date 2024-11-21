const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const surveyRoutes = require("./routes");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/katalyze-surveys", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/survey", surveyRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Survey API running on http://localhost:${PORT}`);
});