// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/connectDb.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// path.resolve() <=> process.cwd(), khi chạy "npm run start" -> npm tìm vị trí file package.json -> trả về path nây
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    // mặc định CORS ko cho phép gửi kèm cookie, session nên phải bật true
    credentials: true,
  })
);

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

if (process.env.NODE_ENV === "production") {
  // Serve toàn bộ file tĩnh (JS/CSS/assets) đã build bởi Vite tại frontend/dist
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // vì path-to-regex là 8.2.0 nên "*" hay "/*" ko còn hợp lệ (dùng lệnh npm ls express path-to-regexp) để check phiên bản

  // Catch-all cho SPA routes NHƯNG loại trừ các route bắt đầu bằng /api/
  // Regex ^(?!\/api\/).* = mọi đường dẫn KHÔNG khởi đầu bằng "/api/"
  app.get(/^(?!\/api\/).*/, (req, res) => {
    // Trả về index.html để client-side router render trang tương ứng
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
