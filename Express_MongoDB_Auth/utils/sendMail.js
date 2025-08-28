import transporter from "./../configs/nodeMailerConfig.js";
import nodemailer from "nodemailer";
import { otpEmail, resetPasswordEmail } from "../templates/mailTemplates.js";

import dotenv from "dotenv";

dotenv.config();

export const sendOtpEmail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER, // sender address
      to: process.env.SMTP_USER, // receiver from parameter
      subject: "Hello", // Subject line
      text: "Hello world?", // plain text body
      html: otpEmail.replace("{otp}", otp), // html body
    });

    console.log("Message sent: %s", info.messageId);

    // Only works with Ethereal test accounts
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return true; // let your controller know it's successful
  } catch (err) {
    console.error("Error while sending mail", err);
    throw new Error("Could not send OTP email");
  }
};

export const sendResetPasswordEmail = async (to, name, resetLink) => {
  try {
    const appName = process.env.APP_NAME || "MyApp";
    const expiry = "10 minutes"; 
    const year = new Date().getFullYear();

    const emailHtml = resetPasswordEmail
      .replace(/{{name}}/g, name)
      .replace(/{{appName}}/g, appName)
      .replace(/{{expiry}}/g, expiry)
      .replace(/{{resetLink}}/g, resetLink)
      .replace(/{{year}}/g, year);

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER, // sender address
      to, // receiver from parameter
      subject: `${appName} Password Reset`, // Subject line
      text: `Hi ${name}, we received a request to reset your ${appName} password. Click the link below to choose a new one. This link expires in ${expiry}: ${resetLink}`, // plain text body
      html: emailHtml, // html body
    });

    console.log("Message sent: %s", info.messageId);

    // Only works with Ethereal test accounts
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return true; // let your controller know it's successful
  } catch (err) {
    console.error("Error while sending mail", err);
    throw new Error("Could not send reset password email");
  }
}
