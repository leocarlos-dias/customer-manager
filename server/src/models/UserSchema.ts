import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now() },
});

export const User = mongoose.model("User", userSchema);
