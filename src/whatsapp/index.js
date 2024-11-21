const express = require("express");
const bodyParser = require("body-parser");
const { handleIncomingMessage, sendWhatsAppMessage } = require("./twilioClient");

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Webhook to handle incoming WhatsApp messages
app.post("/whatsapp-webhook", async (req, res) => {
  const { From, Body } = req.body; 
  const phone = From.replace("whatsapp:", ""); 

  try {
    if (Body.startsWith("FORM")) {
      const shortcode = Body.split(" ")[1];
      // Initiate survey with shortcode and phone
      const response = await handleIncomingMessage(phone, shortcode);
      await sendWhatsAppMessage(phone, response.message);
    } else {
      // Process regular survey responses
      const response = await handleIncomingMessage(phone, Body);
      await sendWhatsAppMessage(phone, response.message);
    }
    res.status(200).send("Message processed");
  } catch (error) {
    console.error("Error handling WhatsApp message:", error);
    res.status(500).send("Error processing message");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`WhatsApp Interface running on http://localhost:${PORT}`);
});