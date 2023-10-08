import express from "express";
import authRouter from "./routes/auth.route.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect( process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to the mongo db");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
const port = 3000;

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`app is listing on port ${port} `);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
