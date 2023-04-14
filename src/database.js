import { MONGO_URL } from "./config.js";
import mongoose from "mongoose";

export function _connect() {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => console.log("Database is connected"))
    .catch((err) => console.log(err));
}
