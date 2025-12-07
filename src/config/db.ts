import mongoose from "mongoose";

export const connectDB = async (mongoUri: string) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection fail:", err);
    process.exit(1);
  }
};
