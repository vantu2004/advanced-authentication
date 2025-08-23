// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/connectDb.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware để parse body dạng JSON từ request
// Ví dụ: client gửi {"email":"abc@gmail.com"} thì có thể đọc qua req.body.email
app.use(express.json());

// Middleware để parse cookie từ request
// Giúp đọc cookie dễ dàng qua req.cookies["token"] thay vì phải tự parse header
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
