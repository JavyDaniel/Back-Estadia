import { config } from "dotenv";

config();

export const PORT = process.env.PORT
export const MONGO_URL = process.env.MONGO_URL
export const SECRET_KEY = process.env.SECRET_KEY