import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { AdminRouter } from "./Routes/Admin/Admin.js";
import { ShopRouter } from "./Routes/Shop/Shop.js";
import { AuthRouter } from "./Routes/Auth/Auth.js";
import dotenv from "dotenv";
const app = express();

app.use(cors());
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/", AdminRouter);
app.use("/", ShopRouter);

app.use("/auth", AuthRouter);

try {
  let DB_URL = process.env.DATABASE;
  mongoose.connect(DB_URL);
  console.log("Connected to Database");
} catch (error) {
  console.log("Database Connection Error:", error);
}

app.listen(PORT, () => console.log("Server started"));
