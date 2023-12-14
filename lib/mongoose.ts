import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) return console.log("MongoDB Url not found");
  if (isConnected) {
    return console.log("Already connected to database");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("Connected to DB");
  } catch (error) {
    throw new Error(`Error while connecting to DB ${error}`);
  }
};
