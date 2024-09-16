const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../model/User"); // Assuming you have a User model
const bcrypt = require("bcryptjs");
require("dotenv").config();

const resetPassword = async (req, res) => {
  const { email } = req.body;
  // console.log(email);

  try {
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate token
    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    // Send reset link via email
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // This allows self-signed certificates
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${process.env.CLIENT_URL}reset-pass/${token}">here</a> to reset your password</p>`,
      html: `
    <h2>Hello, ${user.fullName}</h2>
    <p>You are receiving this email because we received a request to reset the password for your account.</p>
    <p>If you made this request, please click the link below to reset your password:</p>
    <a href="${process.env.CLIENT_URL}reset-pass/${token}" style="background-color: #ea580c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p>This link will expire in 1 hour. If you didn’t request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
    <p>If you are having trouble clicking the link, copy and paste the URL below into your web browser:</p>
    <p>${process.env.CLIENT_URL}/reset-pass/${token}</p>
    <br />
    <p>Thank you,</p>
    <p>The Support Team</p>
  `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const handleToken = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  // console.log(password, token);

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ message: "Invalid token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      // Handle token expiration
      return res.status(400).json({
        message: "Token expired. Please request a new password reset.",
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      // Handle invalid token
      return res.status(400).json({
        message: "Invalid token. Please request a new password reset.",
      });
    }

    // Handle other errors
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = { resetPassword, handleToken };
