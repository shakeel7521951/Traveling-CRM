// utils/sendBulkMessages.js
import nodemailer from "nodemailer";
import twilio from "twilio";

// Email transporter (Nodemailer)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bmxadventure8@gmail.com",
    pass: "yoie uzhf crai ccks",
  },
  secure: true,
  timeout: 10000,
});

// Twilio client
const twilioClient = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendBulkMessages = async (recipients, channel, subject, messageBuilder) => {
  try {
    for (const user of recipients) {
      const personalizedMessage =
        typeof messageBuilder === "function"
          ? messageBuilder(user.name || "Customer")
          : messageBuilder;

      if (channel === "email" && user.email) {
        // Send Email
        await transporter.sendMail({
          from: `"Travelling Agency" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: subject,
          text: personalizedMessage,
          html: personalizedMessage.replace(/\n/g, "<br>"),
        });
      } 
      else if (channel === "whatsapp" && user.phone) {
        let phoneNumber = user.phone.toString().trim();
        if (!phoneNumber.startsWith("+")) {
          phoneNumber = "+" + phoneNumber;
        }

        await twilioClient.messages.create({
          from: `whatsapp:${process.env.TWILIO_PHONE}`,
          to: `whatsapp:${phoneNumber}`,
          body: personalizedMessage,
        });
      }
    }
  } catch (error) {
    console.error("❌ Error in sending bulk messages:", error);
    throw new Error("Failed to send bulk messages");
  }
};

export default sendBulkMessages;
