import mongoose from "mongoose";

export const connectDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};