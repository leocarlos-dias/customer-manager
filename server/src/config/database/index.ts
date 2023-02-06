import 'dotenv/config';
import mongoose from "mongoose";

const URI = process.env.DB_URI;

export async function connectDatabase() {
    mongoose.set("strictQuery", false);
    return await mongoose.connect(URI);
}