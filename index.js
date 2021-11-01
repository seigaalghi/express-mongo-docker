"use strict";

const User = require("./models/User");

const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  mongoose = require("mongoose");

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!name || !email || !password) {
      return res.sendStatus(400);
    }
    const user = await User.create({ name, email, password });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

mongoose.connect("mongodb://localhost:27017/laptopDB", {}, (err) => {
  if (err) console.log(err);
  console.log("MongoDB Connected");
  app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
  });
});
