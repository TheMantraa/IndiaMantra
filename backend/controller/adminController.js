var express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");

// Secret key for JWT
const JWT_SECRET = process.env.SECRET_KEY || "your_secret_key";

// Registration API
const api_registration = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    // Validate input fields
    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(409)
        .json({ message: "Admin with this email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    // Save the admin to the database
    await newAdmin.save();

    return res.status(201).json({ message: "Admin registered successfully." });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Login API
const api_login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expiration time
    );

    return res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  api_registration,
  api_login,
};
