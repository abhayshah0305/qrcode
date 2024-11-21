const twilio = require("twilio");

// Twilio configuration
const accountSid = "your_twilio_account_sid"; // Replace with your Twilio Account SID
const authToken = "your_twilio_auth_token";   // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

// Twilio WhatsApp number
const twilioWhatsAppNumber = "whatsapp:your_twilio_number"; // Replace with your Twilio WhatsApp number

// Send a WhatsApp message
async function sendWhatsAppMessage(phone, message) {
  try {
    const response = await client.messages.create({
      from: twilioWhatsAppNumber,
      to: `whatsapp:${phone}`,
      body: message,
    });
    return response;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    throw error;
  }
}

// Handle incoming messages (business logic can go here)
async function handleIncomingMessage(phone, message) {
  if (message.startsWith("FORM")) {
    // Simulate initiating a survey
    const shortcode = message.split(" ")[1];
    return { message: `Survey initiated with shortcode ${shortcode}. First question coming up...` };
  } else {
    // Simulate processing a survey response
    return { message: `Thanks for your response: ${message}. Next question coming up...` };
  }
}

module.exports = {
  sendWhatsAppMessage,
  handleIncomingMessage,
};