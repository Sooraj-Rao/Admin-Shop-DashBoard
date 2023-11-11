import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

export const loginModel = mongoose.model("shop", loginSchema);
