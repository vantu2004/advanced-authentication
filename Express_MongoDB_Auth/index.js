import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDb } from "./db/connectDb.js";
import User from "./models/User.js";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import { verifyToken } from "./middlewares/verifyToken.js";

const app = express();

//Giup app co the doc duoc cookie tu client
app.use(cookieParser());

//Giup app co the doc duoc json data tu client
app.use(express.json());


dotenv.config();

const PORT = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/api/auth", authRoutes);
app.use("/api/user", verifyToken ,userRoutes);
// const user = new User({
//   email: "dddadsas@gmail.com",
//   username: "ddaddsdas",
//   password: "12d345",
//   firstName: "Dawit",
//   lastname: "Tesfaye",
// });

//user.save().then(() => console.log("User saved"));

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
