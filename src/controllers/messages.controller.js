import { message } from "../models/message.js";

export const addMessage = async (req, res) => {
  try {
    const { from, to, messages } = req.body;

    const data = await message.create({
      message: {
        text: messages,
        users: [from, to],
        sender: from,
      },
    });

    if (data) {
      return res.status(200).json("Message added successfully");
    } else {
      return res.status(202).json("Failed");
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getAllMessage = async (req, res) => {
  try {
    const { from, to } = req.body;

    const mensajes = await message
      .find({
        "message.users": {
          // users: {
            $all: [ from, to ],
          // },
        },
      })
      .sort({ updateAt: 1 });

  

    const projectMessages = mensajes.map((msg) => {
      return {
        fromSelf: msg.message.sender.toString() === from,
        message: msg.message.text,
      };
    });

    
    return res.json(projectMessages);
  } catch (error) {
    return res.status(500).json({ massage: error.massage });
  }
};
