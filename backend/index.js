import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// custom import
import connectToDB from "./database/db.js";
import EmailRouter from "./routes/EmailRouter.js";

dotenv.config();

// initialize express app
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/email", EmailRouter);

// connect to database
connectToDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
