import mongoose from "mongoose";
import {user} from "../models/user.js"
const MessageSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
      users: Array,
      sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const message = new mongoose.model("message", MessageSchema, "messages");
