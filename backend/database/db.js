import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error while connecting with database", error.message);
    process.exit(1);
  }
};

export default connectToDB;
